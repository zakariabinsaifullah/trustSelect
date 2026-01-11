<?php
/**
 * Plugin Name: TrustSelect
 * Author: Zakaria Binsaifullah
 * Author URI: https://devzakaria.com/
 * Description: Showcase top products, table of contents in Gutenberg editor.
 * Version: 2.10.0
 * Text Domain: gutenbergnative-blocks
 * Domain Path: /languages
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package GutenbergnativeBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// define plugin version
define( 'GTVB_VERSION', '2.10.0' );

// include the schema accumulator
require_once plugin_dir_path( __FILE__ ) . 'schema/schema.php';

if ( ! class_exists( 'GutenbergnativeBlocks' ) ) {

	/**
	 * Gutenbergnative Blocks Final Class
	 *
	 * @since 1.0.0
	 * @package GutenbergnativeBlocks
	 */
	final class GutenbergnativeBlocks {

		/**
		 * Gutenbergnative Blocks Instance
		 *
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Gutenbergnative Blocks Constructor
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function __construct() {
			add_action( 'init', array( $this, 'register_blocks' ) );
			add_action( 'plugins_loaded', array( $this, 'include_files' ) );
			add_filter('attachment_fields_to_edit', [ $this, 'add_custom_link_field_to_media'], 10, 2);
			add_filter('attachment_fields_to_save', [ $this, 'save_custom_link_field'], 10, 2);
			add_action('rest_api_init', [ $this, 'register_custom_link_rest_field']);
			add_action('init', [ $this, 'gtvb_register_extra_info_meta']);
			add_action('enqueue_block_editor_assets', [ $this, 'gtvb_enqueue_extra_info_script']);

			// render block
			add_filter( 'render_block', [ $this, 'gtvb_render_blocks' ], 10, 2 );
		}

		/**
		 * Gutenbergnative Blocks Instance
		 *
		 * @since 1.0.0
		 * @return GutenbergnativeBlocks
		 */
		public static function get_instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Register Blocks
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function register_blocks() {
			// blocks list.
			$blocks = array(
				'result-box',
				'table-of-content',
				'accordion',
				'accordion-item',
				'list-item',
				'list',
				'info',
				'button',
				'text-box',
				'anchornavigation',
				'test-report',
				'step-item',
				'steps',
			);

			if ( ! empty( $blocks ) and is_array( $blocks ) ) {
				foreach ( $blocks as $block ) {
					register_block_type( trailingslashit( plugin_dir_path( __FILE__ ) ) . '/build/blocks/' . $block );
				}
			}
		}

		/**
		 * Include Files
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function include_files() {
			// Include required files.
			require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
		}

		// Add custom Link field to media attachments
		public function add_custom_link_field_to_media($form_fields, $post) {
			$form_fields['gtvb_custom_link'] = array(
				'label' => __('Link', 'gutenbergnative-blocks'),
				'input' => 'text',
				'value' => get_post_meta($post->ID, '_gtvb_custom_link', true),
				'helps' => __('Custom link for this image', 'gutenbergnative-blocks')
			);
			return $form_fields;
		}

		// Save the custom Link field value
		public function save_custom_link_field($post, $attachment) {
			if (isset($attachment['gtvb_custom_link'])) {
				update_post_meta($post['ID'], '_gtvb_custom_link', sanitize_text_field($attachment['gtvb_custom_link']));
			}
			return $post;
		}

		// Register custom link field with REST API (IMPORTANT for Gutenberg)
		public function register_custom_link_rest_field() {
			register_rest_field('attachment', 'gtvb_custom_link', array(
				'get_callback' => function($object) {
					return get_post_meta($object['id'], '_gtvb_custom_link', true);
				},
				'update_callback' => function($value, $object) {
					return update_post_meta($object->ID, '_gtvb_custom_link', sanitize_text_field($value));
				},
				'schema' => array(
					'description' => __('Custom link for the image', 'gutenbergnative-blocks'),
					'type'        => 'string',
					'context'     => array('view', 'edit')
				)
			));
		}

		// Register custom post meta field
		public function gtvb_register_extra_info_meta() {
			// Register for posts only
			register_post_meta('post', 'gtvb_extra_info', array(
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_textarea_field',
				'auth_callback'     => '__return_true'
			));
			register_post_meta('post', 'gtvb_template', array(
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
				'default'           => 'default',
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => '__return_true'
			));
			// register a post meta called gtvb_key_features
			register_post_meta('post', 'gtvb_key_features', array(
				'show_in_rest'      => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'object',
							'properties' => array(
								'feature' => array(
									'type' => 'string',
								),
								'icon'    => array(
									'type' => 'string',
								),
							),
						),
					),
				),
				'single'            => true,
				'type'              => 'array',
				'default'           => array(),
				'sanitize_callback' => function( $items ) {
					if ( ! is_array( $items ) ) {
						return array();
					}
					$sanitized_items = array();
					foreach ( $items as $item ) {
						if ( ! is_array( $item ) ) {
							continue;
						}
						$sanitized_items[] = array(
							'feature' => isset( $item['feature'] ) ? sanitize_text_field( $item['feature'] ) : '',
							'icon'    => isset( $item['icon'] ) ? sanitize_text_field( $item['icon'] ) : '',
						);
					}

					return $sanitized_items;
				},
				'auth_callback'     => '__return_true'
			));
		}

		// Enqueue Extra Info Panel Script
		public function gtvb_enqueue_extra_info_script() {
			wp_enqueue_script(
				'gtvb-extra-info-panel',
				plugins_url('build/metadata/index.js', __FILE__),
				array('wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n'),
				GTVB_VERSION,
				true
			);
			wp_enqueue_style(
				'gtvb-extra-info-panel-style',
				plugins_url('build/metadata/index.css', __FILE__),
				array(),
				GTVB_VERSION
			);
		}

		// Render blocks on frontend
		public function gtvb_render_blocks( $block_content, $block ) {

			// check if the block name is gutenbergnative/result-box or gutenbergnative/test-report
			if ( 'gutenbergnative/result-box' === $block['blockName'] || 'gutenbergnative/test-report' === $block['blockName'] ) {
				$current_date = date_i18n( 'm/Y' );
				$block_content = str_replace( '{{current_date}}', $current_date, $block_content );
			}

			return $block_content;
		}

	}

}

/**
 * Gutenbergnative Blocks
 *
 * @since 1.0.0
 * @return GutenbergnativeBlocks
 */
function gutenbergnative_blocks() {
	return GutenbergnativeBlocks::get_instance();
}
gutenbergnative_blocks(); // Initialize the Gutenbergnative Blocks class.
