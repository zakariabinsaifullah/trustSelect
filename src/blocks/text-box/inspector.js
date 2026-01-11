/**
 * WordPress dependencies
 */
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { bgColor, textColor } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: textColor,
                            onChange: value => setAttributes({ textColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: bgColor,
                            onChange: value => setAttributes({ bgColor: value }),
                            label: __('Background Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
