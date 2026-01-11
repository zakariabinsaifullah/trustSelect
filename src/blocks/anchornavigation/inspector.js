/**
 * WordPress dependencies
 */
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkControl from '../../controls/link-control';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { pLink, sLink, anHeading, pbtnColors, sbtnColors, headingColor } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody>
                    <TextControl
                        label={__('Title', 'gutenbergnative-blocks')}
                        value={anHeading}
                        onChange={v => {
                            setAttributes({
                                anHeading: v
                            });
                        }}
                    />
                    <LinkControl
                        label={__('Primary Button', 'gutenbergnative-blocks')}
                        value={pLink}
                        onChange={value => setAttributes({ pLink: value })}
                    />
                    <LinkControl
                        label={__('Secondary Button', 'gutenbergnative-blocks')}
                        value={sLink}
                        onChange={value => setAttributes({ sLink: value })}
                    />
                </PanelBody>
                <PanelColorSettings
                    title={__('Heading', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: headingColor,
                            onChange: value => setAttributes({ headingColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Primary Button', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: pbtnColors.nColor,
                            onChange: value => setAttributes({ pbtnColors: { ...pbtnColors, nColor: value } }),
                            label: __('Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: pbtnColors.nBg,
                            onChange: value => setAttributes({ pbtnColors: { ...pbtnColors, nBg: value } }),
                            label: __('Background', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Secondary Button', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: sbtnColors.nColor,
                            onChange: value => setAttributes({ sbtnColors: { ...sbtnColors, nColor: value } }),
                            label: __('Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: sbtnColors.nBg,
                            onChange: value => setAttributes({ sbtnColors: { ...sbtnColors, nBg: value } }),
                            label: __('Background', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
