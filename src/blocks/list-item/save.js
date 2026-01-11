/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// List Item Block Save Function
const Save = props => {
    const { attributes } = props;
    const { title, titleTag, blockStyle } = attributes;

    // Block Props
    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: 'guten-list-item'
    });

    return (
        <div {...blockProps}>
            <div className="guten-list-editor-wrapper source">
                <div className="list-header" data-parent={title}>
                    <div className="list-button">
                        <RichText.Content tagName={titleTag} className="list-title" value={title} />
                        <div className="list-icons">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={128}
                                height={128}
                                viewBox="0 0 24 24"
                                style={{ fill: 'none' }}
                                color="#000000"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.75 10.75V4H13.25V10.75H20V13.25H13.25V20H10.75V13.25H4V10.75H10.75Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="list-collapse source" data-parent={title}>
                    <div className="source-header">
                        <span className="source-title">{title}</span>
                        <button className="source-close" id="source-close">
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M19 5 5 19M5 5l14 14"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="guten-list-inner-blocks">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
