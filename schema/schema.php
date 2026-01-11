<?php
/**
 * Class to accumulate schema data from blocks and render JSON-LD
 */
class TrustSelect_Schema_Accumulator {

    // Store collected data here
    private static $products = [];
    private static $sources = [];
    private static $accordion_items = [];
    private static $author_data = null;
    private static $review = null;

    private static $breadcrumbs = [];
    private static $data_extracted = false;

    public static function init() {
        // Integrate with Yoast if available
        add_filter( 'wpseo_schema_graph', [ __CLASS__, 'modify_yoast_graph' ], 10, 2 );

        // Collect block data
        add_filter( 'render_block', [ __CLASS__, 'extract_block_data' ], 10, 2 );
        
        // Render standalone if Yoast is NOT handling it
        add_action( 'wp_footer', [ __CLASS__, 'render_json_ld' ], 100 );
    }

    /**
     * Helper: Aggressively cleans text to raw UTF-8
     */
    private static function clean_text( $string ) {
        if ( empty( $string ) ) {
            return '';
        }

        $clean = wp_strip_all_tags( $string );
        $decoded = html_entity_decode( $clean, ENT_QUOTES | ENT_HTML5, 'UTF-8' );

        if ( strpos( $decoded, '&' ) !== false && strpos( $decoded, ';' ) !== false ) {
            $decoded = html_entity_decode( $decoded, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
        }

        return trim( $decoded );
    }

    /**
     * Build BreadcrumbList schema
     */
    private static function build_breadcrumbs() {

        if ( is_front_page() || ! is_single() ) {
            return null;
        }

        $items = [];
        $position = 1;

        // Home
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $position++,
            'name'     => 'Home',
            'item'     => home_url( '/' )
        ];

        // Blog page (if set)
        $blog_page_id = get_option( 'page_for_posts' );
        if ( $blog_page_id ) {
            $items[] = [
                '@type'    => 'ListItem',
                'position' => $position++,
                'name'     => self::clean_text( get_the_title( $blog_page_id ) ),
                'item'     => get_permalink( $blog_page_id )
            ];
        }

        // Category
        $cats = get_the_category();
        if ( ! empty( $cats ) ) {
            $cat = $cats[0];
            $items[] = [
                '@type'    => 'ListItem',
                'position' => $position++,
                'name'     => self::clean_text( $cat->name ),
                'item'     => get_category_link( $cat->term_id )
            ];
        }

        // Current post
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $position++,
            'name'     => self::clean_text( get_the_title() ),
            'item'     => get_permalink()
        ];

        return [
            '@type'           => 'BreadcrumbList',
            'itemListElement' => $items
        ];
    }

    /**
     * The Collector
     */
    public static function extract_block_data( $block_content, $block ) {

        if ( ! isset( $block['blockName'] ) ) {
            return $block_content;
        }

        // Avoid duplication if we already manually extracted
        // But we must NOT return here if we are INSIDE the manual extraction loop.
        // The manual extraction loop calls this method.
        // We can check if we are currently running the render_block filter or if it's our direct call.
        // Actually, simpler: The manual extraction sets the flag AFTER it's done. 
        // But wait, if we run manual extraction, we fill the arrays. 
        // Then render_block runs later. We want to skip adding to arrays.
        if ( self::$data_extracted && doing_filter( 'render_block' ) ) {
            return $block_content;
        }

        $attrs = $block['attrs'] ?? [];

        // Product Block
        if ( 'gutenbergnative/result-box' === $block['blockName'] ) {
            self::$products[] = [
                '@type'    => 'ListItem',
                'position' => count(self::$products) + 1,
                'item'     => [
                    '@type'       => 'Product',
                    'name'        => self::clean_text( $attrs['title'] ?? '' ),
                    'description' => self::clean_text( $attrs['desc'] ?? '' ),
                    'image'       => $attrs['photo']['url'] ?? '',
                    'brand'       => [
                        '@type' => 'Brand',
                        'name'  => self::clean_text( $attrs['subtitle'] ?? '' )
                    ],
                    'offers' => [
                        '@type'         => 'Offer',
                        'price'         => str_replace(',', '.', $attrs['price']['value'] ?? '0.00'),
                        'priceCurrency' => strtoupper(trim(str_replace(['€', '$', '£'], ['EUR', 'USD', 'GBP'], $attrs['price']['currency'] ?? 'USD'))),
                        'availability'  => 'https://schema.org/InStock'
                    ],
                    'aggregateRating' => [
                        '@type'       => 'AggregateRating',
                        'ratingValue' => $attrs['score'] ?? '8.5',
                        'bestRating'  => '10',
                        'worstRating' => '0',
                    ],
                    'additionalProperty' => self::format_specs( $attrs['scoreBars'] ?? [] )
                ]
            ];
        }

        // Sources
        if ( 'gutenbergnative/list' === $block['blockName'] ) {
            self::$sources[] = [
                '@type' => 'CreativeWork',
                'name'  => self::clean_text( $attrs['list'] ?? '' ),
                'url'   => $attrs['pLink']['url'] ?? '#'
            ];
        }

        // Accordion
        if ( 'gutenbergnative/accordion-item' === $block['blockName']) {
            $type = $attrs['schemaType'] ?? 'FAQ';

            if ( $type === 'NoSchema' ) {
                return $block_content;
            }

            if ( $type === 'FAQ') {
                self::$accordion_items['FAQ'][] = [
                    '@type' => 'Question',
                    'name' => self::clean_text( $attrs['title'] ?? '' ),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => self::clean_text( $attrs['description'] ?? '' )
                    ]
                ];
            } elseif ( $type === 'DefinedTermSet') {
                self::$accordion_items['Term'][] = [
                    '@type' => 'DefinedTerm',
                    'name' => self::clean_text( $attrs['title'] ?? '' ),
                    'description' => self::clean_text( $attrs['description'] ?? '' )
                ];
            }
        }

        // Author
        if ( 'gutenbergnative/info' === $block['blockName'] ) {
            self::$author_data = [
                '@type' => 'Organization',
                'name'  => self::clean_text( $attrs['authorName'] ?? get_bloginfo( 'name' ) ),
                'url'   => $attrs['aboutUrl'] ?? home_url(),
                'logo'  => [
                    '@type' => 'ImageObject',
                    'url'   => $attrs['authorPhoto']['url'] ?? ''
                ],
                'description' => self::clean_text( $attrs['description'] ?? '' ),
            ];

            // Review
            self::$review = [
                '@type'  => 'Review',
                'author' => [
                    '@type' => 'Organization',
                    'name'  => self::clean_text( $attrs['authorName'] ?? get_bloginfo( 'name' ) ),
                    'url'   => $attrs['aboutUrl'] ?? home_url()
                ]
            ];
        }

        return $block_content;
    }

    /**
     * Modify Yoast Schema Graph
     */

    public static function modify_yoast_graph( $pieces, $context ) {
        if ( ! is_array( $pieces ) ) {
            return $pieces;
        }

        // 0. Ensure data is extracted (Yoast runs in head, before render_block)
        if ( ! self::$data_extracted && is_singular() ) {
            global $post;
            if ( $post && has_blocks( $post->post_content ) ) {
                $blocks = parse_blocks( $post->post_content );
                self::walk_blocks( $blocks );
                self::$data_extracted = true;
            }
        }

        // Find the Main Entity (Article, BlogPosting, or WebPage)
        $main_entity_index = -1;
        foreach ( $pieces as $index => $piece ) {
            if ( isset( $piece['@type'] ) ) {
                if ( in_array( 'BlogPosting', (array)$piece['@type'] ) || in_array( 'Article', (array)$piece['@type'] ) ) {
                    $main_entity_index = $index;
                    break;
                }
            }
        }
        // Fallback to WebPage if no Article found
        if ( $main_entity_index === -1 ) {
            foreach ( $pieces as $index => $piece ) {
                if ( isset( $piece['@type'] ) && in_array( 'WebPage', (array)$piece['@type'] ) ) {
                    $main_entity_index = $index;
                    break;
                }
            }
        }

        if ( $main_entity_index !== -1 ) {
            $main_entity = &$pieces[ $main_entity_index ];

            // 1. Author Replacement
            // Find the author ID referenced by the main entity
            $author_id = null;
            if ( isset( $main_entity['author'] ) ) {
                if ( is_array( $main_entity['author'] ) && isset( $main_entity['author']['@id'] ) ) {
                    $author_id = $main_entity['author']['@id'];
                } elseif ( is_string( $main_entity['author'] ) ) { // Less likely in Yoast graph but possible
                     $author_id = $main_entity['author'];
                }
            }

            // If we have an author ID and our replacement data
            if ( $author_id && self::$author_data ) {
                 foreach ( $pieces as &$piece ) {
                    if ( isset( $piece['@id'] ) && $piece['@id'] === $author_id ) {
                        // Found the author node!
                        // Completely replace it with our Organization data, but KEEP the @id
                        $piece = self::$author_data; 
                        $piece['@id'] = $author_id;
                        
                        // Ensure type is Organization
                        $piece['@type'] = 'Organization';

                        // If Yoast has 'image' for Person, and we have 'logo' for Organization, that's fine.
                        // We strictly use our data.
                        break; 
                    }
                }
            }

            // 2. Inject Review
            if ( self::$review ) {
                $main_entity['review'] = self::$review;
            }

            // 3. Inject Products (Main Entity)
            if ( ! empty( self::$products ) ) {
                 $main_entity['mainEntity'] = [
                    '@type' => 'ItemList',
                    'itemListElement' => self::$products
                ];
            }

            // 4. Inject Citations
             if ( ! empty( self::$sources ) ) {
                $main_entity['citation'] = self::$sources;
            }

            // 5. Inject FAQs / Terms (hasPart)
            $hasPart = $main_entity['hasPart'] ?? [];
            if ( ! is_array( $hasPart ) ) {
                $hasPart = [ $hasPart ]; // Ensure array
            }

            if ( ! empty( self::$accordion_items['FAQ'] ) ) {
                $hasPart[] = [
                    '@type' => 'FAQPage',
                    'mainEntity' => self::$accordion_items['FAQ']
                ];
            }
            if ( ! empty( self::$accordion_items['Term'] ) ) {
                $hasPart[] = [
                    '@type' => 'DefinedTermSet',
                    'hasDefinedTerm' => self::$accordion_items['Term']
                ];
            }

            if ( ! empty( $hasPart ) ) {
                $main_entity['hasPart'] = $hasPart;
            }
        }

        return $pieces;
    }

    private static function walk_blocks( $blocks ) {
        if ( empty( $blocks ) ) {
            return;
        }
        foreach ( $blocks as $block ) {
            self::extract_block_data( '', $block );
            if ( ! empty( $block['innerBlocks'] ) ) {
                self::walk_blocks( $block['innerBlocks'] );
            }
        }
    }

    private static function format_specs( $specs_array ) {
        $formatted = [];
        foreach ( $specs_array as $spec ) {
            $formatted[] = [
                '@type' => 'PropertyValue',
                'name'  => self::clean_text( $spec['title'] ),
                'value' => self::clean_text( $spec['value'] ),
            ];
        }
        return $formatted;
    }

    public static function render_json_ld() {

        // If Yoast is successfully modifying the graph, we don't need to output our own.
        // We check if the Yoast filter ran? Or just check if Yoast is active.
        // The safest is: if Yoast is active, we assume our data was injected.
        // There is a case where Yoast is active but NOT outputting JSON-LD (user disabled it). 
        // But the requirement says "Yoast won't be disabled completely". 
        // Let's check for the Yoast class.
        
        if ( class_exists( 'WPSEO_Frontend' ) ) {
            return;
        }

        if ( ! is_single() ) {
            return;
        }

        global $post;

        $desc = self::clean_text( get_the_excerpt( $post ) ?: $post->post_content );
        $logo_url = has_custom_logo()
            ? wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' )
            : get_site_icon_url();

        $schema = [
            '@context'         => 'https://schema.org',
            '@type'            => 'BlogPosting',
            'headline'         => self::clean_text( get_the_title( $post ) ),
            'datePublished'    => get_the_date( 'c', $post ),
            'dateModified'     => get_the_modified_date( 'c', $post ),
            'inLanguage'       => get_bloginfo( 'language' ),
            'description'      => $desc,
            'mainEntityOfPage' => array_filter([
                '@type'      => 'WebPage',
                '@id'        => get_permalink( $post ),
                'breadcrumb' => self::build_breadcrumbs()
            ]),
            'image' => [
                '@type' => 'ImageObject',
                'url'   => get_the_post_thumbnail_url( $post, 'full' ) ?: ''
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name'  => self::clean_text( get_bloginfo( 'name' ) ),
                'url'   => home_url(),
                'logo'  => [
                    '@type' => 'ImageObject',
                    'url'   => $logo_url ?: ''
                ]
            ]
        ];

        if ( self::$author_data ) {
            $schema['author'] = self::$author_data;
        }

        if ( self::$review ) {
            $schema['review'] = self::$review;
        }

        if ( ! empty( self::$sources ) ) {
            $schema['citation'] = self::$sources;
        }

        if ( ! empty( self::$products ) ) {
            $schema['mainEntity'] = [
                '@type' => 'ItemList',
                'itemListElement' => self::$products
            ];
        }

        $hasPart = [];
        if ( ! empty( self::$accordion_items['FAQ'] ) ) {
            $hasPart[] = [
                '@type' => 'FAQPage',
                'mainEntity' => self::$accordion_items['FAQ']
            ];
        }
        if ( ! empty( self::$accordion_items['Term'] ) ) {
            $hasPart[] = [
                '@type' => 'DefinedTermSet',
                'hasDefinedTerm' => self::$accordion_items['Term']
            ];
        }

        if ( $hasPart ) {
            $schema['hasPart'] = $hasPart;
        }

        echo '<script type="application/ld+json">';
        echo json_encode( $schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        echo '</script>';
    }
}

TrustSelect_Schema_Accumulator::init();