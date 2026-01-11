/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkControl from '../../controls/link-control';
import AddControl from '../../controls/add-control';
import RemoveControl from '../../controls/remove-control';

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
    const {
        rating,
        btnLink,
        btnText,
        // badge
        showBadge,
        badgeText,
        dateText,
        badgeDesc,
        desc,
        badIn,
        badgeScText,
        badgemarText,
        websiteText,
        // style
        containerBg,
        textColor,
        btnColor,
        btnBg,
        checkMarkColor,
        badgeColor,
        badgeBg
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Badge', 'gutenbergnative-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Badge', 'gutenbergnative-blocks')}
                        checked={showBadge}
                        onChange={v => {
                            setAttributes({
                                showBadge: v
                            });
                        }}
                    />
                    {showBadge && (
                        <>
                            <TextControl
                                label={__('Title', 'gutenbergnative-blocks')}
                                value={badgeText}
                                onChange={v => {
                                    setAttributes({
                                        badgeText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Subtitle', 'gutenbergnative-blocks')}
                                value={badIn}
                                onChange={v => {
                                    setAttributes({
                                        badIn: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Rating Label', 'gutenbergnative-blocks')}
                                value={badgeScText}
                                onChange={v => {
                                    setAttributes({
                                        badgeScText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Description', 'gutenbergnative-blocks')}
                                value={badgeDesc}
                                onChange={v => {
                                    setAttributes({
                                        badgeDesc: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Output Text', 'gutenbergnative-blocks')}
                                value={dateText}
                                onChange={v => {
                                    setAttributes({
                                        dateText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Checkmark Label', 'gutenbergnative-blocks')}
                                value={badgemarText}
                                onChange={v => {
                                    setAttributes({
                                        badgemarText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Website', 'gutenbergnative-blocks')}
                                value={websiteText}
                                onChange={v => {
                                    setAttributes({
                                        websiteText: v
                                    });
                                }}
                            />
                        </>
                    )}
                </PanelBody>
                <PanelBody title={__('Button', 'gutenbergnative-blocks')} initialOpen={false}>
                    <LinkControl
                        label={__(' Link', 'gutenbergnative-blocks')}
                        value={btnLink}
                        onChange={value => setAttributes({ btnLink: value })}
                    />

                    <TextControl
                        label={__('Button Text', 'gutenbergnative-blocks')}
                        value={btnText}
                        onChange={v => {
                            setAttributes({
                                btnText: v
                            });
                        }}
                        placeholder={__('Enter button text', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
                <PanelBody title={__('Rating', 'gutenbergnative-blocks')} initialOpen={false}>
                    <TextControl
                        label={__('Rating Value', 'gutenbergnative-blocks')}
                        value={rating}
                        onChange={v => {
                            setAttributes({
                                rating: v
                            });
                        }}
                        placeholder={__('4,9', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings
                    title={__('Global Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: containerBg,
                            onChange: value => setAttributes({ containerBg: value }),
                            label: __('Container Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: textColor,
                            onChange: value => setAttributes({ textColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Badge', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: badgeBg,
                            onChange: value => setAttributes({ badgeBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: badgeColor,
                            onChange: value => setAttributes({ badgeColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />

                <PanelColorSettings
                    title={__('Button', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: btnBg,
                            onChange: value => setAttributes({ btnBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: btnColor,
                            onChange: value => setAttributes({ btnColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('CheckMark', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: checkMarkColor,
                            onChange: value => setAttributes({ checkMarkColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
