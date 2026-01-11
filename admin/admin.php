<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Include required files
require_once plugin_dir_path( __FILE__ ) . 'class-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'class-media-handler.php';

// Initialize admin settings
add_action( 'init', function() {
    new GTVB_Admin_Settings();
    new GTVB_Media_Handler();
} );

// Add admin scripts and styles
add_action( 'admin_enqueue_scripts', 'gtvb_admin_enqueue_scripts' );
function gtvb_admin_enqueue_scripts( $hook ) {

    if ( $hook !== 'settings_page_gtvb-admin-page' ) {
        return;
    }
    
    // Enqueue WordPress media scripts
    wp_enqueue_media();
    
    // Enqueue color picker
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_script( 'wp-color-picker' );
    
    // Enqueue custom admin styles
    wp_enqueue_style(
        'gtvb-admin-style',
        plugin_dir_url( __FILE__ ) . 'assets/admin-style.css',
        array(),
        '1.0.0'
    );
    
    // Enqueue custom admin scripts
    wp_enqueue_script(
        'gtvb-admin-script',
        plugin_dir_url( __FILE__ ) . 'assets/admin-script.js',
        array( 'jquery', 'wp-color-picker' ),
        '1.0.0',
        true
    );
    
    // Localize script for AJAX
    wp_localize_script( 'gtvb-admin-script', 'gtvb_ajax', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'nonce' => wp_create_nonce( 'gtvb_admin_nonce' )
    ));
}