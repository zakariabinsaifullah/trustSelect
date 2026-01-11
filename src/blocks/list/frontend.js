/**
 * Frontend JavaScript for Reference Block
 * Auto-number reference items dynamically
 */

(function () {
    'use strict';

    // Initialize reference numbering
    function initReferenceNumbering() {
        // Get all reference blocks on the page
        const referenceBlocks = document.querySelectorAll('.Referencance-list');

        if (!referenceBlocks.length) {
            return;
        }

        // Loop through each reference block and assign sequential numbers
        referenceBlocks.forEach(function (block, index) {
            const numberElement = block.querySelector('.referance-number');

            if (numberElement) {
                // Set the number (index + 1 for 1-based counting)
                numberElement.textContent = index + 1;

                // Optionally add data attribute for styling purposes
                numberElement.setAttribute('data-number', index + 1);
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReferenceNumbering);
    } else {
        initReferenceNumbering();
    }

    // Re-initialize on dynamic content load (for AJAX/SPA sites)
    // For WordPress block themes or FSE
    if (typeof window.wp !== 'undefined' && window.wp.domReady) {
        window.wp.domReady(initReferenceNumbering);
    }

    // For page builders that load content dynamically
    window.addEventListener('load', initReferenceNumbering);
})();
