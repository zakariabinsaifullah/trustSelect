/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// Accordion Item Block Save Function
const Save = props => {
    const { attributes } = props;
    const { title, titleTag, description } = attributes;

    // Block Props
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="accordion-header">
                <button className="accordion-button" type="button" aria-expanded="false">
                    <RichText.Content tagName={titleTag} className="accordion-title" value={title} />
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
                </button>
            </div>

            <div className="accordion-collapse">
                <div className="accordion-body">
                    <RichText.Content tagName="p" className="accordion-description" value={description} />
                </div>
            </div>
        </div>
    );
};

export default Save;
