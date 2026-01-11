/**
 * WordPress dependencies
 */
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { btnLabel, renderPageId, popupMaxWidth } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <TextControl
                        label={__('Label', 'gutenbergnative-blocks')}
                        value={btnLabel}
                        onChange={v => {
                            setAttributes({
                                btnLabel: v
                            });
                        }}
                    />
                    <TextControl
                        label={__('Render Page ID', 'gutenbergnative-blocks')}
                        value={renderPageId}
                        onChange={v => {
                            setAttributes({
                                renderPageId: v
                            });
                        }}
                    />
                    <TextControl
                        label={__('Popup Max Width (e.g., 656px, 80%)', 'gutenbergnative-blocks')}
                        value={popupMaxWidth}
                        onChange={v => {
                            setAttributes({
                                popupMaxWidth: v
                            });
                        }}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
