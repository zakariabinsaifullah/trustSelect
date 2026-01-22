import './editor.scss';

import { RichText, useBlockProps, InnerBlocks, MediaUpload, BlockControls } from '@wordpress/block-editor';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { format } from '@wordpress/date';

import Inspector from './inspector';

const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const { title, description, titleColor, svgColor, containerColor, btnColors, authorPhoto, subTitle, dateLabel, updateDate } =
        attributes;

    const cssCustomProperties = {
        ...(titleColor && { '--title-color': titleColor }),
        ...(containerColor && { '--c-bg': containerColor }),
        ...(svgColor && { '--svg-color': svgColor }),
        ...(btnColors.nColor && { '--btn-color': btnColors.nColor }),
        ...(btnColors.nBg && { '--btn-bg': btnColors.nBg }),
        ...(btnColors.hColor && { '--btn-hover-color': btnColors.hColor }),
        ...(btnColors.hBg && { '--btn-hover-bg': btnColors.hBg })
    };

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: 'gtvb-tca-item'
    });

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [titleColor, svgColor, containerColor, btnColors]);

    const tcaRef = useRef(null);

    useEffect(() => {
        if (tcaRef.current) {
            const tcaBtn = tcaRef.current.querySelector('.tca-button');

            const handleClick = () => {
                const tcaCollapse = tcaRef.current.querySelector('.tca-collapse');
                tcaCollapse.classList.toggle('active');
                tcaBtn.classList.toggle('active');
                tcaRef.current.classList.toggle('active');
            };

            tcaBtn.addEventListener('click', handleClick);

            return () => {
                tcaBtn.removeEventListener('click', handleClick);
            };
        }
    }, []);

    const appendListItem = () => {
        const newBlock = wp.blocks.createBlock('gutenbergnative/button');
        const innerBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
        wp.data.dispatch('core/block-editor').insertBlocks([newBlock], innerBlocks.length, clientId);
    };

    // get current post update date
    const postUpdateDate = wp.data.select('core/editor').getCurrentPost().modified;

    useEffect(() => {
        setAttributes({
            updateDate: postUpdateDate
        });
    }, [postUpdateDate]);

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({
                                authorPhoto: {
                                    id: media.id,
                                    url: media.url,
                                    alt: media.alt
                                }
                            });
                        }}
                        allowedTypes={['image']}
                        value={authorPhoto ? authorPhoto.id : ''}
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
                <div className="gtvb-tca-editor-wrapper" ref={tcaRef}>
                    <div className="tca-header">
                        <div className="tca-button">
                            <div className="tca-title-wrapper">
                                <div className="author-photo">{authorPhoto.url && <img src={authorPhoto.url} alt={authorPhoto.alt} />}</div>
                                <div className="title-content">
                                    <div className="tca-subtitle">{subTitle}</div>
                                    <RichText
                                        tagName="p"
                                        className="tca-title"
                                        value={title}
                                        onChange={v => setAttributes({ title: v })}
                                        placeholder={__('Add title here...', 'gtvbnative-blocks')}
                                    />
                                    <div className="tca-date-label">{`${dateLabel} ${format('d M Y', updateDate)}`}</div>
                                </div>
                            </div>

                            <div className="tca-icons">
                                <svg
                                    className="tca-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke="currentColor" stroke-miterlimit="16" stroke-width="1.5" d="m6 9 6 6 6-6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="tca-collapse">
                        <div className="tca-content">
                            <RichText
                                tagName="p"
                                className="tca-description"
                                value={description}
                                onChange={v => setAttributes({ description: v })}
                                placeholder={__('Add description here...', 'gtvbnative-blocks')}
                            />
                            <InnerBlocks
                                allowedBlocks={['gutenbergnative/button']}
                                template={[
                                    [
                                        'gutenbergnative/button',
                                        {
                                            afftra_btnsDirDesk: 'column',
                                            afftra_btnsDirTab: 'column'
                                        }
                                    ]
                                ]}
                                renderAppender={false}
                            />
                            <button className="guten-append-btn" onClick={appendListItem} type="button">
                                {__('Add Button', 'gtvbnative-blocks')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
