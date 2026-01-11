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
    const { titleTag, titleColor, separatorColor, iconColor, hColors, bgColors, schemaType } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody>
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
                    <SelectControl
                        label={__('Schema Type', 'gutenbergnative-blocks')}
                        value={schemaType}
                        options={[
                            { label: 'No Schema', value: 'NoSchema' },
                            { label: 'FAQ', value: 'FAQ' },
                            { label: 'Defined Term Set', value: 'DefinedTermSet' }
                        ]}
                        onChange={value => setAttributes({ schemaType: value })}
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
                            value: hColors?.title,
                            onChange: value => setAttributes({ hColors: { ...hColors, title: value } }),
                            label: __('Hover Title', 'gutenbergnative-blocks')
                        },
                        {
                            value: separatorColor,
                            onChange: value => setAttributes({ separatorColor: value }),
                            label: __('Separator', 'gutenbergnative-blocks')
                        },
                        {
                            value: iconColor,
                            onChange: value => setAttributes({ iconColor: value }),
                            label: __('Icon', 'gutenbergnative-blocks')
                        },
                        {
                            value: hColors?.icon,
                            onChange: value => setAttributes({ hColors: { ...hColors, icon: value } }),
                            label: __('Hover Icon', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Background Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: bgColors?.normal,
                            onChange: value => setAttributes({ bgColors: { ...bgColors, normal: value } }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: bgColors?.hover,
                            onChange: value => setAttributes({ bgColors: { ...bgColors, hover: value } }),
                            label: __('Hover Background', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
