import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { TextareaControl, SelectControl, TextControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './editor.scss';

const ExtraInfoPanel = () => {
    // Get the current post type
    const postType = useSelect(select => {
        return select('core/editor').getCurrentPostType();
    }, []);

    // Get the current post meta value
    const extraInfo = useSelect(select => {
        return select('core/editor').getEditedPostAttribute('meta')?.gtvb_extra_info || '';
    }, []);

    // get current template meta value
    const currentTemplate = useSelect(select => {
        return select('core/editor').getEditedPostAttribute('meta')?.gtvb_template || 'default';
    }, []);

    // get current template key features (gtvb_key_features) meta value
    const keyFeatures = useSelect(select => {
        return select('core/editor').getEditedPostAttribute('meta')?.gtvb_key_features || [];
    }, []);

    // Get the function to update post meta
    const { editPost } = useDispatch('core/editor');

    // Update the meta value
    const updateExtraInfo = value => {
        editPost({
            meta: {
                gtvb_extra_info: value
            }
        });
    };

    if (postType !== 'post') {
        return null;
    }

    return (
        <>
            <PluginDocumentSettingPanel
                name="gtvb-extra-info-panel"
                title={__('Post Template Info', 'gutenbergnative-blocks')}
                className="gtvb-extra-info-panel"
            >
                <SelectControl
                    label={__('Select Template', 'gutenbergnative-blocks')}
                    value={currentTemplate}
                    options={[
                        { label: __('Default', 'gutenbergnative-blocks'), value: 'default' },
                        { label: __('Special Template', 'gutenbergnative-blocks'), value: 'special-template' }
                    ]}
                    onChange={value => {
                        editPost({
                            meta: {
                                gtvb_template: value
                            }
                        });
                    }}
                    help={__('Select a template for this post', 'gutenbergnative-blocks')}
                />
                <TextareaControl
                    label={__('Extra Information', 'gutenbergnative-blocks')}
                    value={extraInfo}
                    onChange={updateExtraInfo}
                    help={__('Add extra information for this post', 'gutenbergnative-blocks')}
                    rows={5}
                />
                <h4 className="title">{__('Key Features', 'gutenbergnative-blocks')}</h4>

                {keyFeatures.map((featureObj, index) => (
                    <div className="gtvb-key-feature-item" key={index}>
                        <TextControl
                            label={__('Feature ' + (index + 1), 'gutenbergnative-blocks')}
                            value={featureObj?.feature || ''}
                            onChange={value => {
                                const newFeatures = [...keyFeatures];
                                newFeatures[index] = {
                                    ...featureObj,
                                    feature: value
                                };
                                editPost({
                                    meta: {
                                        gtvb_key_features: newFeatures
                                    }
                                });
                            }}
                        />
                        <div className="gtvb-preview">
                            {featureObj?.icon ? (
                                <div className="gtvb-preview-image">
                                    <img src={featureObj.icon} alt={__('Feature Icon', 'gutenbergnative-blocks')} />
                                    <MediaUpload
                                        onSelect={media => {
                                            const newFeatures = [...keyFeatures];
                                            newFeatures[index] = {
                                                ...featureObj,
                                                icon: media.url
                                            };
                                            editPost({
                                                meta: {
                                                    gtvb_key_features: newFeatures
                                                }
                                            });
                                        }}
                                        value={featureObj?.icon || ''}
                                        allowedTypes={['image']}
                                        render={({ open }) => (
                                            <button className="button gtvb-change-icon-btn" type="button" onClick={open}>
                                                <span className="dashicons dashicons-edit"></span>
                                            </button>
                                        )}
                                    />
                                </div>
                            ) : (
                                <MediaUpload
                                    onSelect={media => {
                                        const newFeatures = [...keyFeatures];
                                        newFeatures[index] = {
                                            ...featureObj,
                                            icon: media.url
                                        };
                                        editPost({
                                            meta: {
                                                gtvb_key_features: newFeatures
                                            }
                                        });
                                    }}
                                    value={featureObj?.icon || ''}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <button className="button gtvb-upload-icon-btn" type="button" onClick={open}>
                                            {__('Upload', 'gutenbergnative-blocks')}
                                        </button>
                                    )}
                                />
                            )}
                        </div>

                        <button
                            className="button gtvb-remove-feature-btn"
                            type="button"
                            onClick={() => {
                                const newFeatures = keyFeatures.filter((_, i) => i !== index);
                                editPost({
                                    meta: {
                                        gtvb_key_features: newFeatures
                                    }
                                });
                            }}
                        >
                            {__('Remove', 'gutenbergnative-blocks')}
                        </button>
                    </div>
                ))}

                <button
                    className="button gtvb-add-feature-btn"
                    type="button"
                    onClick={() => {
                        const newFeatures = [...keyFeatures, { feature: '', icon: '' }];
                        editPost({
                            meta: {
                                gtvb_key_features: newFeatures
                            }
                        });
                    }}
                >
                    {__('Add Feature', 'gutenbergnative-blocks')}
                </button>
            </PluginDocumentSettingPanel>
        </>
    );
};

registerPlugin('gtvb-extra-info', {
    render: ExtraInfoPanel,
    icon: null
});
