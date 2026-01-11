<?php

if( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Default attributes
$default_attributes = array(
    'btnLabel'     => 'Learn More',
    'renderPageId' => '',
    'popupMaxWidth'=> '656px',
);

$attrs          = wp_parse_args( $attributes, $default_attributes );
$btn_label      = esc_html( $attrs['btnLabel'] );
$render_page_id = absint( $attrs['renderPageId'] ); // Use absint instead of esc_html for IDs

$block_props = get_block_wrapper_attributes();

?>

<div <?php echo wp_kses_data($block_props); ?>>
    <div class="popup-trigger-button">
        <button class="popup-trigger"><?php echo esc_html($btn_label); ?></button>
    </div>
    <div class="popup-box frontend" style="--popup-max-width: <?php echo esc_attr( $attrs['popupMaxWidth'] ); ?>;">
        <div class="popup-head">
            <div class="title">
                <?php 
                    echo esc_html( get_the_title( $render_page_id ) );
                ?>
            </div>
            <button class="close-btn">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M19 5 5 19M5 5l14 14"></path>
                </svg>
            </button>
        </div>
        <div class="popup-inner-content">
            <?php
                echo do_blocks( get_post_field( 'post_content', $render_page_id ) );
            ?>
        </div>
    </div>
</div>