/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const HEADING_TAGS = [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' },
    { label: 'Div', value: 'div' },
    { label: 'Span', value: 'span' },
    { label: 'P', value: 'p' }
];

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { title, titleTag, headingColor, borderColor, iconColor, listColors, bgColor } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <TextControl
                        label={__('Title', 'gutenbergnative-blocks')}
                        value={title}
                        onChange={v => {
                            setAttributes({
                                title: v
                            });
                        }}
                        placeholder={__('Enter title', 'gutenbergnative-blocks')}
                    />
                    <SelectControl
                        label={__('Title Tag', 'gutenbergnative-blocks')}
                        value={titleTag}
                        onChange={v => {
                            setAttributes({
                                titleTag: v
                            });
                        }}
                        options={HEADING_TAGS}
                    />
                </PanelBody>
                <PanelColorSettings
                    title={__('Core Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: headingColor,
                            onChange: value => setAttributes({ headingColor: value }),
                            label: __('Title Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: iconColor,
                            onChange: value => setAttributes({ iconColor: value }),
                            label: __('Icon Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: bgColor,
                            onChange: value => setAttributes({ bgColor: value }),
                            label: __('Background Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('List Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: listColors.listColor,
                            onChange: value => setAttributes({ listColors: { ...listColors, listColor: value } }),
                            label: __('List Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: listColors.iconColor,
                            onChange: value => setAttributes({ listColors: { ...listColors, iconColor: value } }),
                            label: __('Icon Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: listColors.numberColor,
                            onChange: value => setAttributes({ listColors: { ...listColors, numberColor: value } }),
                            label: __('Number Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
