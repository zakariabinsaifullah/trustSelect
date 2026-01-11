import { parseTocSlug } from './helper';

window.addEventListener('DOMContentLoaded', function () {
    const tableOfContent = {
        init() {
            this.addLinkInContent();
            this.scrollToTargetElement();
        },

        addLinkInContent() {
            const tocWrapper = document.querySelector('.wp-block-gutenbergnative-table-of-content');
            if (!tocWrapper) return null;

            const headers = JSON.parse(tocWrapper.getAttribute('data-headers') || '[]');
            const visibleHeaders = JSON.parse(tocWrapper.getAttribute('data-tags') || '{}');

            const allowedHTags =
                Object.entries(visibleHeaders)
                    .filter(([, isVisible]) => isVisible)
                    .map(([tag]) => tag)
                    .join(',') || 'h1, h2, h3, h4, h5, h6';

            const allHeaders = document.querySelectorAll(allowedHTags);
            if (headers.length === 0 || allHeaders.length === 0) return;

            headers.forEach(({ content: elementText }) => {
                const elementSlug = parseTocSlug(elementText);
                allHeaders.forEach(header => {
                    const headerSlug = parseTocSlug(header.textContent);
                    if (elementSlug === headerSlug) {
                        header.innerHTML = `<span id="${headerSlug}"></span>${header.innerHTML}`;
                    }
                });
            });
        },

        scrollToTargetElement() {
            const tocLinks = document.querySelectorAll('.wp-block-gutenbergnative-table-of-content a');

            tocLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    const hash = this.hash;
                    if (hash !== '') {
                        event.preventDefault();

                        const targetElement = document.querySelector(hash);

                        if (targetElement) {
                            const offset = 50; // Adjust for fixed header or spacing
                            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });

                            // Add and remove the 'active' class for the target element
                            targetElement.classList.add('active');
                            setTimeout(() => {
                                targetElement.classList.remove('active');
                            }, 800);
                        }
                    }
                });
            });
        }
    };

    tableOfContent.init();

    // toggle button functionality
    const tocLists = document.querySelectorAll('.wp-block-gutenbergnative-table-of-content');
    if (tocLists) {
        tocLists.forEach(function (tocList) {
            const toggleButton = tocList.querySelector('.native-toc-heading');
            const content = tocList.querySelector('.native-toc-content');

            if (toggleButton && content) {
                toggleButton.addEventListener('click', function () {
                    content.classList.toggle('active');
                    toggleButton.classList.toggle('active');

                    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
                    toggleButton.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
                    toggleButton.setAttribute('aria-label', isExpanded ? 'Expand' : 'Collapse');
                });
            }
        });
    }
});
