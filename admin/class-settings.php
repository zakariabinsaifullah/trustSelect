<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * GTVB Admin Settings Class
 */
class GTVB_Admin_Settings {

    /**
     * Settings group name
     */
    private $settings_group = 'gtvb_settings_group';

    /**
     * Option name
     */
    private $option_name = 'gtvb_settings';

    /**
     * Default settings
     */
    private $default_settings = array(
        'tpb_page_id'            => '',
        'tpb_text'               => 'So testen wir',
        'tpb_bg_color'           => '#eef9ef',
        'tpb_text_color'         => '#001011',
        'header_bg_color'        => '#0d242c',
        'header_text_color'      => '#ffffff',
        'header_bg_image'        => '',
        'header_mobile_bg_image' => '',
        'header_bg_overlay'      => false,
        'bc_text_color'          => '#001011',
        'bc_link_color'          => '#00755e',
        'excerpt_color'          => '#dadedf',
        'excerpt_bg'             => '#3a4b51',
        'icon_bg_color'          => '#ffffff',
        'tc_bg_color'            => '#f2f2f2',
        'tc_text_color'          => '#001011',
        'tc_separator_color'     => '#ebeced',
    );

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
        add_action( 'admin_init', array( $this, 'init_settings' ) );
        add_action( 'wp_ajax_gtvb_save_settings', array( $this, 'save_settings_ajax' ) );
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_submenu_page(
            'options-general.php',
            __( 'TrustSelect', 'gutenbergnative-blocks' ),
            __( 'TrustSelect', 'gutenbergnative-blocks' ),
            'manage_options',
            'gtvb-admin-page',
            array( $this, 'admin_page_callback' )
        );
    }

    /**
     * Initialize settings
     */
    public function init_settings() {
        register_setting( $this->settings_group, $this->option_name );
    }

    /**
     * Get default settings
     */
    public function get_default_settings() {
        return $this->default_settings;
    }

    /**
     * Get settings
     */
    public function get_settings() {
        $settings = get_option( $this->option_name, $this->default_settings );
        return wp_parse_args( $settings, $this->default_settings );
    }

    /**
     * Admin page callback
     */
    public function admin_page_callback() {
        $settings = $this->get_settings();
        ?>
        <div class="wrap gtvb-admin-wrap">
            <div class="gtvb-admin-header">
                <h1 class="gtvb-admin-title">
                    <?php esc_html_e( 'TrustSelect Post Templates Settings', 'gutenbergnative-blocks' ); ?>
                </h1>
                <p class="gtvb-admin-subtitle"><?php esc_html_e( 'Configure your TrustSelect templates and customization options', 'gutenbergnative-blocks' ); ?></p>
            </div>

            <div class="gtvb-admin-container">
                <form id="gtvb-settings-form" class="gtvb-settings-form">
                    <?php wp_nonce_field( 'gtvb_admin_nonce', 'gtvb_nonce' ); ?>
                    <div class="settings-grid">
                        <!-- Template Popup -->
                        <div class="gtvb-setting-card">
                            <div class="gtvb-setting-header">
                                <h3 class="gtvb-setting-title">
                                    <?php esc_html_e( 'Menu Popup Button', 'gutenbergnative-blocks' ); ?>
                                </h3>
                                <p class="gtvb-setting-description"><?php esc_html_e( 'Customize the appearance of the menu popup button', 'gutenbergnative-blocks' ); ?></p>
                            </div>
                            <div class="gtvb-setting-content">
                                <div class="gtvb-setting-row">
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper mb-20">
                                            <label for="tpb_page_id" class="gtvb-label">
                                                <?php esc_html_e( 'Page Id', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-text-wrapper">
                                                <input type="text" 
                                                    id="tpb_page_id" 
                                                    name="tpb_page_id" 
                                                    value="<?php echo esc_attr( $settings['tpb_page_id'] ); ?>" 
                                                    class="gtvb-text-input">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="tpb_text" class="gtvb-label">
                                                <?php esc_html_e( 'Button Text', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-text-wrapper">
                                                <input type="text" 
                                                    id="tpb_text" 
                                                    name="tpb_text" 
                                                    value="<?php echo esc_attr( $settings['tpb_text'] ); ?>" 
                                                    class="gtvb-text-input">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="tpb_text_color" class="gtvb-label">
                                                <?php esc_html_e( 'Text Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="tpb_text_color" 
                                                    name="tpb_text_color" 
                                                    value="<?php echo esc_attr( $settings['tpb_text_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="tpb_bg_color" class="gtvb-label">
                                                <?php esc_html_e( 'Background Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="tpb_bg_color" 
                                                    name="tpb_bg_color" 
                                                    value="<?php echo esc_attr( $settings['tpb_bg_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Header Styling -->
                        <div class="gtvb-setting-card">
                            <div class="gtvb-setting-header">
                                <h3 class="gtvb-setting-title">
                                    <span class="gtvb-setting-icon">🎨</span>
                                    <?php esc_html_e( 'Header Styling', 'gutenbergnative-blocks' ); ?>
                                </h3>
                                <p class="gtvb-setting-description"><?php esc_html_e( 'Customize your header appearance with colors and background images', 'gutenbergnative-blocks' ); ?></p>
                            </div>
                            <div class="gtvb-setting-content">
                                <div class="gtvb-setting-row">
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="icon_bg_color" class="gtvb-label">
                                                <?php esc_html_e( 'Key Features Icon Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="icon_bg_color" 
                                                    name="icon_bg_color" 
                                                    value="<?php echo esc_attr( $settings['icon_bg_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="header_text_color" class="gtvb-label">
                                                <?php esc_html_e( 'Text Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="header_text_color" 
                                                    name="header_text_color" 
                                                    value="<?php echo esc_attr( $settings['header_text_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="header_bg_color" class="gtvb-label">
                                                <?php esc_html_e( 'Background Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="header_bg_color" 
                                                    name="header_bg_color" 
                                                    value="<?php echo esc_attr( $settings['header_bg_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="gtvb-setting-col">
                                        <div class="single-bg-container mb-20">
                                            <label class="gtvb-label">
                                                <?php esc_html_e( 'Desktop Background Image', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-image-upload-wrapper">
                                                <div class="gtvb-image-preview" style="display: <?php echo $settings['header_bg_image'] ? 'block' : 'none'; ?>;">
                                                    <img id="header_bg_image_preview" src="<?php echo esc_url( $settings['header_bg_image'] ); ?>" alt="">
                                                    <button type="button" class="gtvb-remove-image" title="<?php esc_attr_e( 'Remove Image', 'gutenbergnative-blocks' ); ?>">
                                                        <span class="dashicons dashicons-no-alt"></span>
                                                    </button>
                                                </div>
                                                <div class="gtvb-upload-buttons">
                                                    <button type="button" class="gtvb-upload-image button button-secondary">
                                                        <span class="dashicons dashicons-camera"></span>
                                                        <?php esc_html_e( 'Choose Image', 'gutenbergnative-blocks' ); ?>
                                                    </button>
                                                </div>
                                                <input type="hidden" id="header_bg_image" name="header_bg_image" value="<?php echo esc_attr( $settings['header_bg_image'] ); ?>">
                                            </div>
                                        </div>
                                        <div class="single-bg-container">
                                            <label class="gtvb-label">
                                                <?php esc_html_e( 'Mobile Background Image', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-image-upload-wrapper">
                                                <div class="gtvb-image-preview" style="display: <?php echo $settings['header_mobile_bg_image'] ? 'block' : 'none'; ?>;">
                                                    <img id="header_mobile_bg_image_preview" src="<?php echo esc_url( $settings['header_mobile_bg_image'] ); ?>" alt="">
                                                    <button type="button" class="gtvb-remove-image" title="<?php esc_attr_e( 'Remove Image', 'gutenbergnative-blocks' ); ?>">
                                                        <span class="dashicons dashicons-no-alt"></span>
                                                    </button>
                                                </div>
                                                <div class="gtvb-upload-buttons">
                                                    <button type="button" class="gtvb-upload-image button button-secondary">
                                                        <span class="dashicons dashicons-camera"></span>
                                                        <?php esc_html_e( 'Choose Image', 'gutenbergnative-blocks' ); ?>
                                                    </button>
                                                </div>
                                                <input type="hidden" id="header_mobile_bg_image" name="header_mobile_bg_image" value="<?php echo esc_attr( $settings['header_mobile_bg_image'] ); ?>">
                                            </div>
                                        </div>
                                        <div class="gtvb-overlay">
                                            <label for="header_bg_overlay" class="gtvb-label">
                                                <input type="checkbox" id="header_bg_overlay" name="header_bg_overlay" value="1" <?php checked( $settings['header_bg_overlay'], true ); ?>>
                                                <?php esc_html_e( 'Enable Overlay', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Breadcrumbs -->
                        <div class="gtvb-setting-card">
                            <div class="gtvb-setting-header">
                                <h3 class="gtvb-setting-title">
                                    <?php esc_html_e( 'Breadcrumbs', 'gutenbergnative-blocks' ); ?>
                                </h3>
                                <p class="gtvb-setting-description"><?php esc_html_e( 'Customize the appearance of the breadcrumbs', 'gutenbergnative-blocks' ); ?></p>
                            </div>
                            <div class="gtvb-setting-content">
                                <div class="gtvb-setting-row">
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="bc_text_color" class="gtvb-label">
                                                <?php esc_html_e( 'Text Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="bc_text_color" 
                                                    name="bc_text_color" 
                                                    value="<?php echo esc_attr( $settings['bc_text_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="bc_link_color" class="gtvb-label">
                                                <?php esc_html_e( 'Link Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="bc_link_color" 
                                                    name="bc_link_color" 
                                                    value="<?php echo esc_attr( $settings['bc_link_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Excerpt -->
                        <div class="gtvb-setting-card">
                            <div class="gtvb-setting-header">
                                <h3 class="gtvb-setting-title">
                                    <?php esc_html_e( 'Excerpt', 'gutenbergnative-blocks' ); ?>
                                </h3>
                                <p class="gtvb-setting-description"><?php esc_html_e( 'Customize the appearance of the excerpts', 'gutenbergnative-blocks' ); ?></p>
                            </div>
                            <div class="gtvb-setting-content">
                                <div class="gtvb-setting-row">
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="excerpt_color" class="gtvb-label">
                                                <?php esc_html_e( 'Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="excerpt_color" 
                                                    name="excerpt_color" 
                                                    value="<?php echo esc_attr( $settings['excerpt_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="excerpt_bg" class="gtvb-label">
                                                <?php esc_html_e( 'Background', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="excerpt_bg" 
                                                    name="excerpt_bg" 
                                                    value="<?php echo esc_attr( $settings['excerpt_bg'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Table of Content -->
                        <div class="gtvb-setting-card">
                            <div class="gtvb-setting-header">
                                <h3 class="gtvb-setting-title">
                                    <?php esc_html_e( 'Table of Content', 'gutenbergnative-blocks' ); ?>
                                </h3>
                                <p class="gtvb-setting-description"><?php esc_html_e( 'Customize the appearance of the table of content', 'gutenbergnative-blocks' ); ?></p>
                            </div>
                            <div class="gtvb-setting-content">
                                <div class="gtvb-setting-row">
                                    <div class="gtvb-setting-col">
                                        <div class="single-color-wrapper top-color-wrapper">
                                            <label for="tc_text_color" class="gtvb-label">
                                                <?php esc_html_e( 'Text Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="tc_text_color" 
                                                    name="tc_text_color" 
                                                    value="<?php echo esc_attr( $settings['tc_text_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper mb-20">
                                            <label for="tc_bg_color" class="gtvb-label">
                                                <?php esc_html_e( 'Background Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="tc_bg_color" 
                                                    name="tc_bg_color" 
                                                    value="<?php echo esc_attr( $settings['tc_bg_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                        <div class="single-color-wrapper">
                                            <label for="tc_separator_color" class="gtvb-label">
                                                <?php esc_html_e( 'Separator Color', 'gutenbergnative-blocks' ); ?>
                                            </label>
                                            <div class="gtvb-color-picker-wrapper">
                                                <input type="text" 
                                                    id="tc_separator_color" 
                                                    name="tc_separator_color" 
                                                    value="<?php echo esc_attr( $settings['tc_separator_color'] ); ?>" 
                                                    class="gtvb-color-picker">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="gtvb-save-section">
                        <button type="submit" class="gtvb-save-button button button-primary button-hero">
                            <span class="gtvb-save-text"><?php esc_html_e( 'Save Settings', 'gutenbergnative-blocks' ); ?></span>
                            <span class="gtvb-save-spinner"></span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Success/Error Messages -->
            <div id="gtvb-message" class="gtvb-message" style="display: none;"></div>
        </div>
        <?php
    }

    /**
     * Save settings via AJAX
     */
    public function save_settings_ajax() {
        // Verify nonce
        check_ajax_referer( 'gtvb_admin_nonce', 'gtvb_nonce' );

        // Check user capabilities
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array(
                'message' => __( 'You do not have sufficient permissions', 'gutenbergnative-blocks' )
            ) );
        }

        
        // Sanitize and validate inputs
        $bc_text_color = ! empty( $_POST['bc_text_color'] ) 
            ? sanitize_hex_color( $_POST['bc_text_color'] ) 
            : $this->default_settings['bc_text_color'];
        $bc_link_color = ! empty( $_POST['bc_link_color'] ) 
            ? sanitize_hex_color( $_POST['bc_link_color'] ) 
            : $this->default_settings['bc_link_color'];

        $tpb_page_id = ! empty( $_POST['tpb_page_id'] ) 
            ? sanitize_text_field( $_POST['tpb_page_id'] ) 
            : $this->default_settings['tpb_page_id'];
        $tpb_text = ! empty( $_POST['tpb_text'] ) 
            ? sanitize_text_field( $_POST['tpb_text'] ) 
            : $this->default_settings['tpb_text'];

        $tpb_bg_color = ! empty( $_POST['tpb_bg_color'] ) 
            ? sanitize_hex_color( $_POST['tpb_bg_color'] ) 
            : $this->default_settings['tpb_bg_color'];

        $tpb_text_color = ! empty( $_POST['tpb_text_color'] ) 
            ? sanitize_hex_color( $_POST['tpb_text_color'] ) 
            : $this->default_settings['tpb_text_color'];

        $header_text_color = ! empty( $_POST['header_text_color'] ) 
            ? sanitize_hex_color( $_POST['header_text_color'] ) 
            : $this->default_settings['header_text_color'];

        $header_bg_color = ! empty( $_POST['header_bg_color'] ) 
            ? sanitize_hex_color( $_POST['header_bg_color'] ) 
            : $this->default_settings['header_bg_color'];
        
        $excerpt_color = ! empty( $_POST['excerpt_color'] ) 
            ? sanitize_hex_color( $_POST['excerpt_color'] ) 
            : $this->default_settings['excerpt_color'];
        $excerpt_bg = ! empty( $_POST['excerpt_bg'] ) 
            ? sanitize_hex_color( $_POST['excerpt_bg'] ) 
            : $this->default_settings['excerpt_bg'];

        $icon_bg_color = ! empty( $_POST['icon_bg_color'] ) 
            ? sanitize_hex_color( $_POST['icon_bg_color'] ) 
            : $this->default_settings['icon_bg_color'];
            
        // FIX: Properly handle checkbox - unchecked checkboxes don't send POST data
        $header_bg_overlay = isset( $_POST['header_bg_overlay'] ) && $_POST['header_bg_overlay'] === '1';
        
        $header_bg_image = ! empty( $_POST['header_bg_image'] ) 
            ? esc_url_raw( $_POST['header_bg_image'] ) 
            : '';

        $header_mobile_bg_image = ! empty( $_POST['header_mobile_bg_image'] ) 
            ? esc_url_raw( $_POST['header_mobile_bg_image'] ) 
            : '';

        // table of content 
        $tc_text_color = ! empty( $_POST['tc_text_color'] ) 
            ? sanitize_hex_color( $_POST['tc_text_color'] ) 
            : $this->default_settings['tc_text_color'];
        $tc_bg_color = ! empty( $_POST['tc_bg_color'] ) 
            ? sanitize_hex_color( $_POST['tc_bg_color'] ) 
            : $this->default_settings['tc_bg_color'];
        $tc_separator_color = ! empty( $_POST['tc_separator_color'] ) 
            ? sanitize_hex_color( $_POST['tc_separator_color'] ) 
            : $this->default_settings['tc_separator_color'];

        // Fallback for invalid color
        if ( empty( $header_bg_color ) ) {
            $header_bg_color = $this->default_settings['header_bg_color'];
        }

        // Prepare settings array
        $settings = array(
            'tpb_page_id'       => $tpb_page_id,
            'tpb_text'          => $tpb_text,
            'tpb_bg_color'      => $tpb_bg_color,
            'tpb_text_color'    => $tpb_text_color,
            'header_text_color' => $header_text_color,
            'header_bg_color'   => $header_bg_color,
            'header_bg_image'   => $header_bg_image,
            'header_mobile_bg_image' => $header_mobile_bg_image,
            'header_bg_overlay' => $header_bg_overlay,
            'bc_text_color'     => $bc_text_color,
            'bc_link_color'     => $bc_link_color,
            'excerpt_color'     => $excerpt_color,
            'excerpt_bg'        => $excerpt_bg,
            'icon_bg_color'     => $icon_bg_color,
            'tc_text_color'     => $tc_text_color,
            'tc_bg_color'       => $tc_bg_color,
            'tc_separator_color'=> $tc_separator_color,
        );

        // Save settings
        $updated = update_option( $this->option_name, $settings );

        if ( $updated !== false ) {
            wp_send_json_success( array(
                'message'  => __( 'Settings saved successfully!', 'gutenbergnative-blocks' ),
                'settings' => $settings
            ) );
        } else {
            wp_send_json_error( array(
                'message' => __( 'Failed to save settings. Please try again.', 'gutenbergnative-blocks' )
            ) );
        }
    }
}