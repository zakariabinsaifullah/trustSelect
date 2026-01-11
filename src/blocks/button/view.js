/**
 * Frontend JavaScript for Popup Block (jQuery)
 */

jQuery(document).ready(function ($) {
    const $popupWrappers = $('.wp-block-gutenbergnative-button');
    const $infoContainer = $('.wp-block-gutenbergnative-info');
    const $header = $('#top');

    $popupWrappers.each(function () {
        const $wrapper = $(this);
        const $triggerBtn = $wrapper.find('.popup-trigger');
        const $popupBox = $wrapper.find('.popup-box');
        const $closeBtn = $wrapper.find('.close-btn');

        if ($triggerBtn.length === 0 || $popupBox.length === 0) return;

        const openPopup = function () {
            $popupBox.addClass('active');
            if ($infoContainer.length) $infoContainer.addClass('gtvb-popup-open');
            if ($header.length) $header.addClass('lowerindex');
        };

        const closePopup = function () {
            $popupBox.removeClass('active');
            if ($infoContainer.length) $infoContainer.removeClass('gtvb-popup-open');
            if ($header.length) $header.removeClass('lowerindex');
        };

        $triggerBtn.on('click', openPopup);

        if ($closeBtn.length) {
            $closeBtn.on('click', closePopup);
        }

        // Close popup when clicking on the popup overlay itself
        $(document).on('click', function (e) {
            if (e.target === $popupBox.get(0)) {
                closePopup();
            }
        });

        // Close popup with Escape key
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $popupBox.hasClass('active')) {
                closePopup();
            }
        });
    });

    $(document).on('click', function (e) {
        const $target = $(e.target);

        // Early return if clicking inside any popup box
        if ($target.closest('.popup-box, .wp-block-gutenbergnative-button').length) {
            return;
        }

        // Remove active classes from all popup boxes
        $('.popup-box').removeClass('active');
        $('.wp-block-gutenbergnative-info').removeClass('gtvb-popup-open');
    });
});
