/**
 * GTVB Admin Scripts - Modern Interactive Features
 * Handles all admin page interactivity with jQuery
 */

(function ($) {
    'use strict';

    // DOM Ready
    $(document).ready(function () {
        GTVB_Admin.init();
    });

    /**
     * Main Admin Object
     */
    const GTVB_Admin = {
        /**
         * Initialize all functionality
         */
        init: function () {
            this.initColorPicker();
            this.initImageUpload();
            this.initRepeatableFields();
            this.initFormSubmission();
            this.initTooltips();
            this.initAnimations();
        },

        /**
         * Initialize WordPress Color Picker
         */
        initColorPicker: function () {
            if ($.fn.wpColorPicker) {
                $('.gtvb-color-picker').wpColorPicker({
                    change: function (event, ui) {
                        const color = ui.color.toString();
                        $(this).closest('.gtvb-color-picker-wrapper').find('.gtvb-color-preview').css('background-color', color);
                    },
                    clear: function () {
                        $(this).closest('.gtvb-color-picker-wrapper').find('.gtvb-color-preview').css('background-color', '#ffffff');
                    }
                });
            }
        },

        /**
         * Initialize Image Upload Functionality
         */
        initImageUpload: function () {
            // Handle image upload button click
            $(document).on('click', '.gtvb-upload-image', function (e) {
                e.preventDefault();

                const $button = $(this);
                const $wrapper = $button.closest('.gtvb-image-upload-wrapper');
                const $preview = $wrapper.find('.gtvb-image-preview');
                const $input = $wrapper.find('input[type="hidden"]');
                const $img = $preview.find('img');

                // Get label text for title
                const labelText = $wrapper.closest('.single-bg-container').find('.gtvb-label').text().trim();
                const title = labelText ? 'Choose ' + labelText : 'Choose Image';

                // Create media uploader
                const mediaUploader = wp.media({
                    title: title,
                    button: {
                        text: 'Use This Image'
                    },
                    multiple: false,
                    library: {
                        type: 'image'
                    }
                });

                // Handle image selection
                mediaUploader.on('select', function () {
                    const attachment = mediaUploader.state().get('selection').first().toJSON();

                    // Update preview and input
                    $img.attr('src', attachment.url);
                    $input.val(attachment.url);
                    $preview.fadeIn(300);

                    // Show success message
                    GTVB_Admin.showMessage('Image uploaded successfully!', 'success');
                });

                // Open media uploader
                mediaUploader.open();
            });

            // Handle image removal
            $(document).on('click', '.gtvb-remove-image', function (e) {
                e.preventDefault();

                const $button = $(this);
                const $wrapper = $button.closest('.gtvb-image-upload-wrapper');
                const $preview = $wrapper.find('.gtvb-image-preview');
                const $input = $wrapper.find('input[type="hidden"]');

                // Animate removal
                $preview.fadeOut(300, function () {
                    $input.val('');
                    GTVB_Admin.showMessage('Image removed successfully!', 'success');
                });
            });
        },

        /**
         * Initialize Repeatable Fields
         */
        initRepeatableFields: function () {
            const self = this;

            // Add new field
            $(document).on('click', '.gtvb-add-field', function (e) {
                e.preventDefault();

                const $button = $(this);
                const $container = $button.closest('.gtvb-repeatable-fields');
                const $lastField = $container.find('.gtvb-repeatable-field').last();
                const newIndex = $container.find('.gtvb-repeatable-field').length;

                // Clone the field
                const $newField = $lastField.clone();

                // Update the new field
                $newField.attr('data-index', newIndex);
                $newField.find('input[type="text"]').val('').focus();

                // Ensure remove button exists
                if (!$newField.find('.gtvb-remove-field').length) {
                    const $removeBtn = $(
                        '<button type="button" class="gtvb-remove-field button button-secondary" title="Remove Feature">' +
                            '<span class="dashicons dashicons-trash"></span>' +
                            '</button>'
                    );
                    $newField.find('.gtvb-field-actions').append($removeBtn);
                }

                // Add to container with animation
                $newField.hide().appendTo($container).fadeIn(300);

                self.updateFieldIndices($container);
            });

            // Remove field
            $(document).on('click', '.gtvb-remove-field', function (e) {
                e.preventDefault();

                const $button = $(this);
                const $field = $button.closest('.gtvb-repeatable-field');
                const $container = $field.closest('.gtvb-repeatable-fields');

                // Don't remove if it's the only field
                if ($container.find('.gtvb-repeatable-field').length <= 1) {
                    GTVB_Admin.showMessage('At least one field is required!', 'error');
                    return;
                }

                // Animate removal
                $field.fadeOut(300, function () {
                    $(this).remove();
                    self.updateFieldIndices($container);
                });
            });
        },

        /**
         * Update field indices for repeatable fields
         */
        updateFieldIndices: function ($container) {
            $container.find('.gtvb-repeatable-field').each(function (index) {
                $(this).attr('data-index', index);
            });
        },

        /**
         * Initialize Form Submission
         */
        initFormSubmission: function () {
            const self = this;

            $('#gtvb-settings-form').on('submit', function (e) {
                e.preventDefault();

                const $form = $(this);
                const $button = $form.find('.gtvb-save-button');
                const $buttonText = $button.find('.gtvb-save-text');

                // Show loading state
                $button.addClass('loading').prop('disabled', true);
                $buttonText.text('Saving...');

                // Collect form data
                const formData = {
                    action: 'gtvb_save_settings',
                    gtvb_nonce: $('#gtvb_nonce').val(),
                    bc_text_color: $('#bc_text_color').val() || '#001011',
                    bc_link_color: $('#bc_link_color').val() || '#00755e',
                    excerpt_color: $('#excerpt_color').val() || '#dadedf',
                    excerpt_bg: $('#excerpt_bg').val() || '#3a4b51',
                    tpb_page_id: $('#tpb_page_id').val() || '',
                    tpb_text: $('#tpb_text').val() || 'So testen wir',
                    tpb_bg_color: $('#tpb_bg_color').val() || '#eef9ef',
                    tpb_text_color: $('#tpb_text_color').val() || '#001011',
                    header_text_color: $('#header_text_color').val() || '#ffffff',
                    header_bg_color: $('#header_bg_color').val() || '#0d242c',
                    header_bg_image: $('#header_bg_image').val() || '',
                    header_mobile_bg_image: $('#header_mobile_bg_image').val() || '',
                    header_bg_overlay: $('#header_bg_overlay').is(':checked') ? '1' : '0',
                    icon_bg_color: $('#icon_bg_color').val() || '#ffffff',
                    // Table of Content
                    tc_text_color: $('#tc_text_color').val() || '#001011',
                    tc_bg_color: $('#tc_bg_color').val() || '#f2f2f2',
                    tc_separator_color: $('#tc_separator_color').val() || '#ebeced'
                };

                // Submit via AJAX
                $.ajax({
                    url: gtvb_ajax.ajax_url,
                    type: 'POST',
                    data: formData,
                    success: function (response) {
                        if (response.success) {
                            self.showMessage(response.data.message, 'success');

                            // Update form with saved values if provided
                            if (response.data.settings) {
                                const settings = response.data.settings;

                                $('#bc_text_color').val(settings.bc_text_color).trigger('change');
                                $('#bc_link_color').val(settings.bc_link_color).trigger('change');
                                $('#tpb_page_id').val(settings.tpb_page_id);
                                $('#tpb_text').val(settings.tpb_text);
                                $('#tpb_bg_color').val(settings.tpb_bg_color).trigger('change');
                                $('#tpb_text_color').val(settings.tpb_text_color).trigger('change');
                                $('#excerpt_color').val(settings.excerpt_color).trigger('change');
                                $('#excerpt_bg').val(settings.excerpt_bg).trigger('change');

                                $('#header_text_color').val(settings.header_text_color).trigger('change');
                                $('#header_bg_color').val(settings.header_bg_color).trigger('change');
                                $('#header_bg_image').val(settings.header_bg_image);
                                $('#header_mobile_bg_image').val(settings.header_mobile_bg_image);
                                $('#header_bg_overlay').prop('checked', settings.header_bg_overlay);
                                $('#icon_bg_color').val(settings.icon_bg_color).trigger('change');

                                // Update color preview
                                $('.gtvb-color-preview').css('background-color', settings.header_bg_color);

                                // table of content
                                $('#tc_text_color').val(settings.tc_text_color).trigger('change');
                                $('#tc_bg_color').val(settings.tc_bg_color).trigger('change');
                                $('#tc_separator_color').val(settings.tc_separator_color).trigger('change');

                                // Update image preview
                                if (settings.header_bg_image) {
                                    $('#header_bg_image_preview').attr('src', settings.header_bg_image);
                                    $('#header_bg_image_preview').closest('.gtvb-image-preview').show();
                                } else {
                                    $('#header_bg_image_preview').closest('.gtvb-image-preview').hide();
                                }

                                if (settings.header_mobile_bg_image) {
                                    $('#header_mobile_bg_image_preview').attr('src', settings.header_mobile_bg_image);
                                    $('#header_mobile_bg_image_preview').closest('.gtvb-image-preview').show();
                                } else {
                                    $('#header_mobile_bg_image_preview').closest('.gtvb-image-preview').hide();
                                }
                            }
                        } else {
                            self.showMessage(response.data.message || 'An error occurred', 'error');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('GTVB AJAX Error:', xhr, status, error);
                        self.showMessage('Network error occurred. Please try again.', 'error');
                    },
                    complete: function () {
                        // Reset button state
                        $button.removeClass('loading').prop('disabled', false);
                        $buttonText.text('Save Settings');
                    }
                });
            });
        },

        /**
         * Initialize Tooltips
         */
        initTooltips: function () {
            // Add tooltips for buttons
            $('[title]').each(function () {
                const $element = $(this);
                const title = $element.attr('title');

                $element.hover(
                    function () {
                        const $tooltip = $('<div class="gtvb-tooltip">' + title + '</div>');
                        $('body').append($tooltip);

                        const offset = $element.offset();
                        $tooltip
                            .css({
                                position: 'absolute',
                                top: offset.top - $tooltip.outerHeight() - 10,
                                left: offset.left + $element.outerWidth() / 2 - $tooltip.outerWidth() / 2,
                                background: 'rgba(0, 0, 0, 0.8)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                zIndex: 99999,
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap'
                            })
                            .fadeIn(200);
                    },
                    function () {
                        $('.gtvb-tooltip').fadeOut(200, function () {
                            $(this).remove();
                        });
                    }
                );
            });
        },

        /**
         * Initialize Animations
         */
        initAnimations: function () {
            // Animate cards on scroll
            if (window.IntersectionObserver) {
                const observer = new IntersectionObserver(
                    function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }
                        });
                    },
                    {
                        threshold: 0.1
                    }
                );

                $('.gtvb-setting-card').each(function () {
                    this.style.opacity = '0';
                    this.style.transform = 'translateY(20px)';
                    this.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(this);
                });
            }

            // Hover effects for interactive elements
            $('.gtvb-toggle-switch').hover(
                function () {
                    $(this).find('.gtvb-toggle-slider').addClass('hover');
                },
                function () {
                    $(this).find('.gtvb-toggle-slider').removeClass('hover');
                }
            );
        },

        /**
         * Show notification message
         */
        showMessage: function (message, type) {
            const $message = $('#gtvb-message');

            $message.removeClass('success error').addClass(type).text(message).addClass('show');

            // Auto hide after 3 seconds
            setTimeout(function () {
                $message.removeClass('show');
            }, 3000);
        },

        /**
         * Utility: Debounce function
         */
        debounce: function (func, wait, immediate) {
            let timeout;
            return function () {
                const context = this,
                    args = arguments;
                const later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    };

    // Expose to global scope for debugging
    window.GTVB_Admin = GTVB_Admin;

    // Handle toggle switch animations
    $(document).on('change', '.gtvb-toggle-switch input[type="checkbox"]', function () {
        const $switch = $(this).closest('.gtvb-toggle-switch');
        const $slider = $switch.find('.gtvb-toggle-slider');

        if ($(this).is(':checked')) {
            $slider.addClass('checked');
        } else {
            $slider.removeClass('checked');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate(
                {
                    scrollTop: target.offset().top - 100
                },
                500
            );
        }
    });
})(jQuery);
