/**
 * WordPress dependencies
 */
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { title, titleColor, svgColor, containerColor, btnColors, authorPhoto, subTitle, dateLabel, authorName, aboutUrl } = attributes;

    return (
        <>
            <InspectorControls group="settings">
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
                    <TextControl
                        label={__('Subtitle', 'gutenbergnative-blocks')}
                        value={subTitle}
                        onChange={v => {
                            setAttributes({
                                subTitle: v
                            });
                        }}
                        placeholder={__('Enter subtitle', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Date Label', 'gutenbergnative-blocks')}
                        value={dateLabel}
                        onChange={v => {
                            setAttributes({
                                dateLabel: v
                            });
                        }}
                        placeholder={__('Enter date label', 'gutenbergnative-blocks')}
                    />
                    {authorPhoto.url ? (
                        <div className="ts-author-image">
                            <img src={authorPhoto.url} alt={authorPhoto.alt} />
                        </div>
                    ) : (
                        <MediaUpload
                            onSelect={media => setAttributes({ authorPhoto: { url: media.url, id: media.id, alt: media.alt } })}
                            allowedTypes={['image']}
                            value={authorPhoto.id}
                            render={({ open }) => (
                                <button onClick={open} className="gtvb-button gtvb-button-secondary">
                                    {__('Upload Author Photo', 'gutenbergnative-blocks')}
                                </button>
                            )}
                        />
                    )}
                    <TextControl
                        label={__('Author Name', 'gutenbergnative-blocks')}
                        value={authorName}
                        onChange={v => {
                            setAttributes({
                                authorName: v
                            });
                        }}
                        placeholder={__('Enter author name', 'gutenbergnative-blocks')}
                        help={__('used for schema.org markup.', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('About URL', 'gutenbergnative-blocks')}
                        value={aboutUrl}
                        onChange={v => {
                            setAttributes({
                                aboutUrl: v
                            });
                        }}
                        placeholder={__('Enter about URL', 'gutenbergnative-blocks')}
                        help={__('used for schema.org markup.', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
                <PanelColorSettings
                    title={__('Core Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: containerColor,
                            onChange: value => setAttributes({ containerColor: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: titleColor,
                            onChange: value => setAttributes({ titleColor: value }),
                            label: __('Title Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: svgColor,
                            onChange: value => setAttributes({ svgColor: value }),
                            label: __('Icon Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Button Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: btnColors.nColor,
                            onChange: value => setAttributes({ btnColors: { ...btnColors, nColor: value } }),
                            label: __('Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: btnColors.nBg,
                            onChange: value => setAttributes({ btnColors: { ...btnColors, nBg: value } }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: btnColors.hColor,
                            onChange: value => setAttributes({ btnColors: { ...btnColors, hColor: value } }),
                            label: __('Hover Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: btnColors.hBg,
                            onChange: value => setAttributes({ btnColors: { ...btnColors, hBg: value } }),
                            label: __('Hover Background', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
