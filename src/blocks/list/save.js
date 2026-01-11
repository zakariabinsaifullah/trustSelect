/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// Reference List Block Save Function
const Save = props => {
    const { attributes } = props;
    const { list, pLink } = attributes;

    // Block Props
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="Referencance-list">
                <div className="referance-number" data-number="auto"></div>
                <div className="refrance-title">
                    <RichText.Content value={list} />
                </div>
                <a
                    href={pLink?.url || '#'}
                    {...(pLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="icon"
                    aria-label="Open reference link"
                >
                    <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    >
                        <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75" />
                        <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Save;
