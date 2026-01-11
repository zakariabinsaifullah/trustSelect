/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        anchorBtnText,
        anchorId,
        tablecontentColor,
        tableheadingBg,
        iconColor,
        tableheadingColor,
        containerColor,
        headingText,
        subHeading,
        showCollapsible,
        borderColor,
        separatorColor,
        anchorColor,
        anchorBg,
        anchorBorderColor,
        subHeadingColor
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('General', 'gutenbergnative-blocks')} initialOpen={true}>
                    <TextControl
                        label={__('Title', 'gutenbergnative-blocks')}
                        value={subHeading}
                        onChange={v => setAttributes({ subHeading: v })}
                    />
                    <TextControl
                        label={__('Heading Text', 'gutenbergnative-blocks')}
                        value={headingText}
                        onChange={v => setAttributes({ headingText: v })}
                    />
                    <ToggleControl
                        label={__('Icon', 'gutenbergnative-blocks')}
                        checked={showCollapsible}
                        onChange={() =>
                            setAttributes({
                                showCollapsible: !showCollapsible
                            })
                        }
                    />
                    <TextControl
                        label={__('Anchor Button Text', 'gutenbergnative-blocks')}
                        value={anchorBtnText}
                        onChange={v => setAttributes({ anchorBtnText: v })}
                    />
                    <TextControl
                        label={__('Anchor ID', 'gutenbergnative-blocks')}
                        value={anchorId}
                        onChange={v => setAttributes({ anchorId: v })}
                        help={__('Enter anchor ID without # sign', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings
                    title={__('Sub Headign', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: subHeadingColor,
                            onChange: value => setAttributes({ subHeadingColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Header', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: tableheadingBg,
                            onChange: value => setAttributes({ tableheadingBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: tableheadingColor,
                            onChange: value => setAttributes({ tableheadingColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: iconColor,
                            onChange: value => setAttributes({ iconColor: value }),
                            label: __('Icon Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: borderColor,
                            onChange: value => setAttributes({ borderColor: value }),
                            label: __('Border Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Content', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: containerColor,
                            onChange: value => setAttributes({ containerColor: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: tablecontentColor,
                            onChange: value => setAttributes({ tablecontentColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: separatorColor,
                            onChange: value => setAttributes({ separatorColor: value }),
                            label: __('Separator Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Anchor Button', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: anchorColor,
                            onChange: value => setAttributes({ anchorColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: anchorBg,
                            onChange: value => setAttributes({ anchorBg: value }),
                            label: __('Background Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: anchorBorderColor,
                            onChange: value => setAttributes({ anchorBorderColor: value }),
                            label: __('Border Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
