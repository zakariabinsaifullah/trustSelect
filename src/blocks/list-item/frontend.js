/**
 * Frontend JavaScript for List Item Block (jQuery)
 * Handles accordion/collapse functionality
 */
(function ($) {
    $(function () {
        // Get all list items
        const $listItems = $('.guten-list-item');

        if ($listItems.length > 0) {
            $listItems.each(function () {
                const $listItem = $(this);
                const $wrapper = $listItem.find('.guten-list-editor-wrapper');
                const $listButton = $listItem.find('.list-button');
                const $listCollapse = $listItem.find('.list-collapse');
                const $closeBtn = $listItem.find('.source-close');

                if ($listButton.length && $listCollapse.length) {
                    // Add click event listener to toggle collapse
                    $listButton.on('click', function (e) {
                        e.preventDefault();

                        // add active class on collapse content
                        $listCollapse.addClass('active');

                        // add active class on wrapper
                        $wrapper.addClass('active');
                    });
                }

                if ($closeBtn.length && $listCollapse.length) {
                    // Add click event listener to close button
                    $closeBtn.on('click', function (e) {
                        e.preventDefault();

                        // Remove active class on collapse content
                        $listCollapse.removeClass('active');
                        // Remove active class on wrapper
                        $wrapper.removeClass('active');
                    });
                }
            });
        }

        // Handle anchor link clicks to open corresponding list item
        $('.gn-main-content a[href^="#"]').on('click', function () {
            const $anchor = $(this);
            // check the anchor doesn't have class .not-source and .gtvb-toc-link
            if ($anchor.hasClass('not-source') || $anchor.hasClass('gtvb-toc-link')) {
                return;
            }

            const $wrapper = $('.guten-list-editor-wrapper.source');
            const $collapseList = $('.list-collapse');

            $collapseList.each(function () {
                const $collapse = $(this);
                // check if it has active class, if not add active class
                if (!$collapse.hasClass('active')) {
                    $collapse.addClass('active');
                }

                // add active class on wrapper if not have active class
                if ($wrapper.length && !$wrapper.hasClass('active')) {
                    $wrapper.addClass('active');
                }
            });
        });

        // Close all list items when clicking outside
        $(document).on('click', function (e) {
            const $target = $(e.target);

            // Early return if clicking on anchor links or within list items
            if ($target.closest('.gn-main-content a[href^="#"], .list-collapse, .list-button, .source-close').length) {
                return;
            }

            // Remove active classes from all list items
            $('.guten-list-editor-wrapper, .list-collapse').removeClass('active');
        });
    });
})(jQuery);
