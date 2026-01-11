/**
 * Frontend Script for Accordion Block - Smooth Animation
 */
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.wp-block-gutenbergnative-accordion');

    accordions.forEach(accordion => {
        const accordionItems = accordion.querySelectorAll('.wp-block-gutenbergnative-accordion-item');

        accordionItems.forEach(item => {
            const button = item.querySelector('.accordion-button');
            const collapse = item.querySelector('.accordion-collapse');
            // Initialize maxHeight to 0 for all accordion bodies
            if (collapse) {
                collapse.style.maxHeight = '0px';
            }

            if (button && collapse) {
                button.addEventListener('click', () => {
                    const isActive = collapse.classList.contains('active');

                    // Close other accordions
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherBtn = otherItem.querySelector('.accordion-button');
                            const otherCollapse = otherItem.querySelector('.accordion-collapse');

                            otherItem.classList.remove('active');
                            if (otherBtn) otherBtn.classList.remove('active');
                            if (otherCollapse) {
                                otherCollapse.classList.remove('active');
                                otherCollapse.style.maxHeight = '0px';
                            }
                        }
                    });

                    // Toggle current accordion
                    button.classList.toggle('active');
                    item.classList.toggle('active');
                    collapse.classList.toggle('active');

                    // Smooth height animation
                    if (!isActive) {
                        // Opening
                        collapse.style.maxHeight = collapse.scrollHeight + 'px';
                    } else {
                        // Closing
                        collapse.style.maxHeight = '0px';
                    }
                });
            }
        });
    });
});
