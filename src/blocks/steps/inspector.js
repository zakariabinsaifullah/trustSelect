/**
 * WordPress dependencies
 */
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { titleTag, titleColor, nbColor, borderColor, bgColor, stepType } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <SelectControl
                        label={__('Step Type', 'gutenbergnative-blocks')}
                        value={stepType}
                        options={[
                            { label: 'Number', value: 'number' },
                            { label: 'Icon', value: 'icon' }
                        ]}
                        onChange={value => setAttributes({ stepType: value })}
                    />
                    <SelectControl
                        label={__('Title Tag', 'gutenbergnative-blocks')}
                        value={titleTag}
                        options={[
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'Div', value: 'div' },
                            { label: 'Paragraph', value: 'p' },
                            { label: 'Span', value: 'span' }
                        ]}
                        onChange={value => setAttributes({ titleTag: value })}
                    />
                </PanelBody>
                <PanelColorSettings
                    title={__('Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: titleColor,
                            onChange: value => setAttributes({ titleColor: value }),
                            label: __('Title', 'gutenbergnative-blocks')
                        },
                        {
                            value: nbColor,
                            onChange: value => setAttributes({ nbColor: value }),
                            label: __('Step Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: borderColor,
                            onChange: value => setAttributes({ borderColor: value }),
                            label: __('Border', 'gutenbergnative-blocks')
                        },
                        {
                            value: bgColor,
                            onChange: value => setAttributes({ bgColor: value }),
                            label: __('Step Background', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
