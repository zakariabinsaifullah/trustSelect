/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, InnerBlocks, MediaUpload, BlockControls } from '@wordpress/block-editor';
import { Button, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Accordion Item Block Edit Function
const Edit = props => {
    const { attributes, setAttributes, context } = props;
    const { title, titleTag, stepType, stepIcon, stepNumber } = attributes;

    // Block Props
    const blockProps = useBlockProps();

    useEffect(() => {
        setAttributes({ titleTag: context['gtvb/titleTag'] });
        setAttributes({ stepType: context['gtvb/stepType'] });
    }, [context['gtvb/titleTag'], context['gtvb/stepType']]);

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({
                                stepIcon: {
                                    id: media.id,
                                    url: media.url,
                                    alt: media.alt
                                }
                            });
                        }}
                        allowedTypes={['image']}
                        value={stepIcon ? stepIcon.id : ''}
                        render={({ open }) => (
                            <ToolbarButton
                                className="components-toolbar__control"
                                label={__('Edit Photo', 'gutenbergnative-blocks')}
                                icon="edit"
                                onClick={open}
                            />
                        )}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div className="step-sign">
                    {stepType === 'icon' ? (
                        <>
                            {stepIcon?.url ? (
                                <img src={stepIcon.url} alt={stepIcon.alt} />
                            ) : (
                                <MediaUpload
                                    onSelect={media =>
                                        setAttributes({
                                            stepIcon: {
                                                url: media.url,
                                                alt: media.alt,
                                                id: media.id
                                            }
                                        })
                                    }
                                    value={stepIcon?.id || ''}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <Button
                                            className="button button-large"
                                            onClick={open}
                                            icon="upload"
                                            label={__('Upload Step Icon', 'gutenbergnative-blocks')}
                                        />
                                    )}
                                />
                            )}
                        </>
                    ) : (
                        <RichText
                            tagName="span"
                            className="step-number"
                            value={stepNumber}
                            onChange={v =>
                                setAttributes({
                                    stepNumber: v
                                })
                            }
                            placeholder={__('1', 'gutenbergnative-blocks')}
                        />
                    )}
                </div>
                <div className="step-content">
                    <RichText
                        tagName={titleTag}
                        className="step-title"
                        value={title}
                        onChange={v =>
                            setAttributes({
                                title: v
                            })
                        }
                        placeholder={__('Step title', 'gutenbergnative-blocks')}
                    />
                    <InnerBlocks template={['core/paragraph', { placeholder: __('Step description...', 'gutenbergnative-blocks') }]} />
                </div>
            </div>
        </>
    );
};

export default Edit;
