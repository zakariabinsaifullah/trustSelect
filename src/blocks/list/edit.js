/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// inspector controls
import Inspector from './inspector';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const blockPosition = wp.data.select('core/block-editor').getBlockIndex(clientId);
    const { list, pLink } = attributes;

    // start
    const blockProps = useBlockProps();

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="Referencance-list">
                    <div className="referance-number">{blockPosition + 1}</div>
                    <div className="refrance-title">
                        <RichText
                            value={list}
                            onChange={v =>
                                setAttributes({
                                    list: v
                                })
                            }
                            placeholder={__('source title', 'gutennative-blocks')}
                        />
                    </div>
                    <a
                        href={pLink?.url || '#'}
                        {...(pLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="icon"
                    >
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                        >
                            <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75" />
                            <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5" />
                        </svg>
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
