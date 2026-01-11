<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * GTVB Media Handler Class
 */
class GTVB_Media_Handler {

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'wp_ajax_gtvb_upload_image', array( $this, 'upload_image_ajax' ) );
        add_action( 'wp_ajax_gtvb_remove_image', array( $this, 'remove_image_ajax' ) );
    }

    /**
     * Handle image upload via AJAX
     */
    public function upload_image_ajax() {
        // Verify nonce
        if ( ! wp_verify_nonce( $_POST['nonce'], 'gtvb_admin_nonce' ) ) {
            wp_send_json_error( array( 
                'message' => __( 'Security check failed', 'gutenbergnative-blocks' ) 
            ) );
        }

        // Check user capabilities
        if ( ! current_user_can( 'upload_files' ) ) {
            wp_send_json_error( array( 
                'message' => __( 'You do not have permission to upload files', 'gutenbergnative-blocks' ) 
            ) );
        }

        // Check if file was uploaded
        if ( empty( $_FILES['file'] ) ) {
            wp_send_json_error( array( 
                'message' => __( 'No file uploaded', 'gutenbergnative-blocks' ) 
            ) );
        }

        // Handle the upload
        $uploaded_file = $_FILES['file'];
        $upload_overrides = array( 'test_form' => false );

        // Upload the file
        $movefile = wp_handle_upload( $uploaded_file, $upload_overrides );

        if ( $movefile && ! isset( $movefile['error'] ) ) {
            // Create attachment
            $attachment = array(
                'post_mime_type' => $movefile['type'],
                'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $movefile['file'] ) ),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );

            $attachment_id = wp_insert_attachment( $attachment, $movefile['file'] );

            if ( ! is_wp_error( $attachment_id ) ) {
                require_once( ABSPATH . 'wp-admin/includes/image.php' );
                $attachment_data = wp_generate_attachment_metadata( $attachment_id, $movefile['file'] );
                wp_update_attachment_metadata( $attachment_id, $attachment_data );

                wp_send_json_success( array(
                    'url' => $movefile['url'],
                    'attachment_id' => $attachment_id,
                    'message' => __( 'Image uploaded successfully', 'gutenbergnative-blocks' )
                ) );
            } else {
                wp_send_json_error( array( 
                    'message' => __( 'Failed to create attachment', 'gutenbergnative-blocks' ) 
                ) );
            }
        } else {
            wp_send_json_error( array( 
                'message' => $movefile['error'] 
            ) );
        }
    }

    /**
     * Handle image removal via AJAX
     */
    public function remove_image_ajax() {
        // Verify nonce
        if ( ! wp_verify_nonce( $_POST['nonce'], 'gtvb_admin_nonce' ) ) {
            wp_send_json_error( array( 
                'message' => __( 'Security check failed', 'gutenbergnative-blocks' ) 
            ) );
        }

        // Check user capabilities
        if ( ! current_user_can( 'delete_posts' ) ) {
            wp_send_json_error( array( 
                'message' => __( 'You do not have permission to delete files', 'gutenbergnative-blocks' ) 
            ) );
        }

        wp_send_json_success( array(
            'message' => __( 'Image removed successfully', 'gutenbergnative-blocks' )
        ) );
    }
}