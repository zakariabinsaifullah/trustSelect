/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Accordion Item Block Edit Function
const Edit = props => {
    const { attributes, setAttributes, context } = props;
    const { title, titleTag, description } = attributes;

    // Block Props
    const blockProps = useBlockProps();

    // accordion ref
    const gutenAccordionRef = useRef(null);
    useEffect(() => {
        if (gutenAccordionRef.current) {
            const accordionBtn = gutenAccordionRef.current.querySelector('.accordion-button');

            accordionBtn.addEventListener('click', () => {
                const accordionCollapse = gutenAccordionRef.current.querySelector('.accordion-collapse');
                accordionCollapse.classList.toggle('active');

                // toggle class to button
                accordionBtn.classList.toggle('active');

                // toggle class to item container
                gutenAccordionRef.current.classList.toggle('active');
            });
        }
    }, []);

    useEffect(() => {
        setAttributes({ titleTag: context['gtvb/titleTag'] });
        setAttributes({ schemaType: context['gtvb/schemaType'] });
    }, [context['gtvb/titleTag'], context['gtvb/schemaType']]);

    return (
        <Fragment>
            <div {...blockProps}>
                <div className="guten-accordion-editor-wrapper" ref={gutenAccordionRef}>
                    <div className="accordion-header" data-parent={title}>
                        <div className="accordion-button">
                            <RichText
                                tagName={titleTag}
                                className="accordion-title"
                                value={title}
                                onChange={v =>
                                    setAttributes({
                                        title: v
                                    })
                                }
                                placeholder={__('Accordion title', 'gutennative-blocks')}
                            />
                            <div className="accordion-icons">
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="accordion-icon"
                                >
                                    <polygon points="14,7 9,7 9,2 7,2 7,7 2,7 2,9 7,9 7,14 9,14 9,9 14,9" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-collapse" data-parent={title}>
                        <div className="accordion-body">
                            <RichText
                                tagName="p"
                                className="accordion-description"
                                value={description}
                                onChange={v =>
                                    setAttributes({
                                        description: v
                                    })
                                }
                                placeholder={__('Accordion description', 'gutennative-blocks')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
