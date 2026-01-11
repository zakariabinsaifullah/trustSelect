/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, MediaPlaceholder, BlockControls, MediaUpload, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import AddControl from '../../controls/add-control';

// inspector controls
import Inspector from './inspector';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const {
        rating,
        photo,
        title,
        score,
        badgeText,
        desc,
        showBadge,
        dateText,
        badgeDesc,
        badIn,
        badgeScText,
        websiteText,
        pros,
        badgemarText,
        containerBg,
        textColor,
        labelColor,
        labelBg,
        btnColor,
        btnBg,
        barColor,
        separatorColor,
        checkMarkColor,
        crossMarkColor,
        images,
        btnText,
        logosTitle,
        badgeColor,
        badgeBg
    } = attributes;

    const cssCustomProperties = {
        ...(containerBg && { '--c-bg': containerBg }),
        ...(textColor && { '--c-text': textColor }),
        ...(badgeBg && { '--badge-bg': badgeBg }),
        ...(badgeColor && { '--badge-color': badgeColor }),
        ...(btnBg && { '--btn-bg': btnBg }),
        ...(btnColor && { '--btn-color': btnColor }),
        ...(barColor && { '--c-primary': barColor }),
        ...(checkMarkColor && { '--checkmar-color': checkMarkColor })
    };

    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    // Update block style attribute when colors/dimensions change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [containerBg, textColor, badgeColor, badgeBg, btnColor, btnBg, barColor, separatorColor, checkMarkColor, crossMarkColor]);

    useEffect(() => {
        if (pros.length === 0) {
            setAttributes({
                pros: ['Enthält alle Nährstoffe']
            });
        }
    }, []);

    // Get dispatch functions
    const { replaceInnerBlocks } = useDispatch('core/block-editor');

    // Get current inner blocks
    const currentInnerBlocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

    // Smart update of inner blocks when images change
    useEffect(() => {
        if (images && images.length > 0) {
            const existingBlocksMap = {};
            currentInnerBlocks.forEach(block => {
                if (block.attributes.id && block.attributes.id) {
                    existingBlocksMap[block.attributes.id] = block;
                }
            });

            const newInnerBlocks = images.map(img => {
                if (existingBlocksMap[img.id]) {
                    const existingBlock = existingBlocksMap[img.id];
                    if (JSON.stringify(existingBlock.attributes.id) !== JSON.stringify(img.id)) {
                        return {
                            ...existingBlock,
                            attributes: {
                                ...existingBlock.attributes,
                                id: img.id,
                                url: img.url,
                                alt: img.alt
                            }
                        };
                    }
                    return existingBlock;
                }

                // Otherwise create a new block
                return window.wp.blocks.createBlock('core/image', {
                    id: img.id,
                    url: img.url,
                    alt: img.alt
                });
            });

            // Only replace inner blocks if there are actual changes
            if (
                JSON.stringify(newInnerBlocks.map(block => block.attributes?.id)) !==
                JSON.stringify(currentInnerBlocks.map(block => block.attributes?.id))
            ) {
                replaceInnerBlocks(clientId, newInnerBlocks, false);
            }
        }
    }, [images, currentInnerBlocks]); // Run when images or inner blocks change

    const innerBlocksPros = useInnerBlocksProps(
        {
            className: 'report-logos'
        },
        {
            templateLock: false,
            allowedBlocks: ['core/image']
        }
    );

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({
                                photo: {
                                    id: media.id,
                                    url: media.url,
                                    alt: media.alt,
                                    caption: media.caption,
                                    sizes: media?.sizes
                                }
                            });
                        }}
                        allowedTypes={['image']}
                        value={photo ? photo.id : ''}
                        render={({ open }) => (
                            <ToolbarButton
                                className="components-toolbar__control"
                                label={__('Edit Photo', 'gutenbergnative-blocks')}
                                onClick={open}
                            >
                                {photo && photo?.url
                                    ? __('Change Photo', 'gutenbergnative-blocks')
                                    : __('Add Photo', 'gutenbergnative-blocks')}
                            </ToolbarButton>
                        )}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({ images: media });
                        }}
                        allowedTypes={['image']}
                        multiple={true}
                        gallery={true}
                        value={images ? images.map(img => img.id) : []}
                        render={({ open }) => (
                            <ToolbarButton
                                className="components-toolbar__control"
                                label={__('Edit Logos', 'awesome-logo-carousel-blocks')}
                                onClick={open}
                            >
                                {images && images.length > 0
                                    ? __('Change Logos', 'gutenbergnative-blocks')
                                    : __('Add Logos', 'gutenbergnative-blocks')}
                            </ToolbarButton>
                        )}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div className="gn-container gn-padding">
                    <div className="header-section">
                        <div className="product-area gap-2">
                            <div className="photo gn-w-full">
                                <div className="image-photo">
                                    {photo && photo?.url ? (
                                        <div className="product-wrapper">
                                            <img
                                                src={photo?.url}
                                                alt={photo?.alt || title}
                                                className={classNames('product-photo', `wp-image-${photo?.id}`)}
                                            />
                                        </div>
                                    ) : (
                                        <MediaPlaceholder
                                            onSelect={media => {
                                                setAttributes({
                                                    photo: {
                                                        id: media.id,
                                                        url: media.url,
                                                        alt: media.alt,
                                                        caption: media.caption,
                                                        sizes: media?.sizes
                                                    }
                                                });
                                            }}
                                            onSelectURL={url =>
                                                setAttributes({
                                                    photo: {
                                                        id: null,
                                                        url: url,
                                                        alt: title,
                                                        caption: null,
                                                        sizes: null
                                                    }
                                                })
                                            }
                                            allowedTypes={['image']}
                                            multiple={false}
                                            labels={{
                                                title: __('Upload Product Photo', 'gutenbergnative-blocks'),
                                                instructions: __(
                                                    'Drag and drop a photo, upload a new one or select a file from your media library.',
                                                    'gutenbergnative-blocks'
                                                )
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="rating-numer">
                                <div className="report-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                                <RichText
                                    tagName="div"
                                    className="rating-number"
                                    value={rating}
                                    onChange={v => setAttributes({ rating: v })}
                                    placeholder={__('4,9', 'gutenbergnative-blocks')}
                                />
                            </div>
                            <div className="rating-desc">
                                <RichText
                                    value={desc}
                                    onChange={value => setAttributes({ desc: value })}
                                    placeholder={__('Basierend auf über 47 Tsd. Bewertungen', 'gutenbergnative-blocks')}
                                />
                            </div>
                        </div>
                        {showBadge && (
                            <div className="TestWinnerBadge">
                                <div className="TestWinnerBadge__OuterBox">
                                    <div className="TestWinnerBadge__UpperText">
                                        <RichText
                                            value={badgeText}
                                            onChange={value => setAttributes({ badgeText: value })}
                                            placeholder={__('Testsieger', 'gutenbergnative-blocks')}
                                        />
                                    </div>
                                    <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--UL">
                                        <RichText
                                            value={badIn}
                                            onChange={value => setAttributes({ badIn: value })}
                                            placeholder={__('Der große Warentest', 'gutenbergnative-blocks')}
                                        />
                                    </div>
                                    <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--UR">
                                        <RichText
                                            value={badgeScText}
                                            onChange={value => setAttributes({ badgeScText: value })}
                                            placeholder={__('Sehr gut', 'gutenbergnative-blocks')}
                                        />
                                        {` (${score}/10)`}
                                    </div>
                                    <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--DL">
                                        <img
                                            src="//gesundheitsvergleich-deutschland.de/cdn/shop/files/mini-logo-white.svg?v=1714598268"
                                            alt="GVD Mini Logo"
                                            className="TestWinnerBadge__GVDLogo"
                                        />
                                        <div className="TestWinnerBadge__GVDName">
                                            <RichText
                                                value={badgemarText}
                                                onChange={value => setAttributes({ badgemarText: value })}
                                                placeholder={__('Gesundheits- vergleich', 'gutenbergnative-blocks')}
                                            />
                                        </div>
                                    </div>
                                    <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--DR">
                                        <div className="TestWinnerBadge__Criteria">
                                            <RichText
                                                value={badgeDesc}
                                                onChange={value => setAttributes({ badgeDesc: value })}
                                                placeholder={__('Geprüft anhand von Qualitätsmerkmalen', 'gutenbergnative-blocks')}
                                            />
                                        </div>
                                        <div className="TestWinnerBadge__Edition">{`${dateText} {{current_date}}`}</div>
                                        <div className="TestWinnerBadge__Url">
                                            <RichText
                                                value={websiteText}
                                                onChange={value => setAttributes({ websiteText: value })}
                                                placeholder={__('gesundheitsvergleich-deutschland.de', 'gutenbergnative-blocks')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="pros-cons-area">
                        {pros.map((pro, index) => (
                            <li className="list-item" key={`pro-${index}`}>
                                <div className="pc-row pros">
                                    <svg className="list-icon checkmark" viewBox="0 0 21 16">
                                        <path
                                            fill="#0D7B28"
                                            d="M83.3,22.675 C82.8,23.175 82,23.175 81.4,22.675 L76.3,17.575 C75.9,17.075 75.9,16.275 76.3,15.675 C76.7,15.175 77.6,15.175 78.2,15.675 L82.3,19.775 L93.8,8.375 C94.3,7.875 95.1,7.875 95.7,8.375 C96.3,8.875 96.2,9.675 95.7,10.275 L83.3,22.675 Z"
                                            transform="translate(-76 -8)"
                                        />
                                    </svg>
                                    <RichText
                                        tagName="div"
                                        className="list-label-text"
                                        value={pro}
                                        onChange={v => {
                                            const newPros = [...pros];
                                            newPros[index] = v;
                                            setAttributes({ pros: newPros });
                                        }}
                                        placeholder={__('add item', 'gutenbergnative-blocks')}
                                    />
                                    <button
                                        onClick={() => {
                                            const newPros = [...pros];
                                            newPros.splice(index, 1);
                                            setAttributes({ pros: newPros });
                                        }}
                                        className="remove"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                                            <g fill="none" stroke="#f00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                                                <path d="M8 8L40 40" />
                                                <path d="M8 40L40 8" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}

                        {/* Add Button */}
                        <li className="pros-cons-action list-item">
                            <div className="pros-action pc-row">
                                <AddControl
                                    onClick={() => {
                                        setAttributes({
                                            pros: [...pros, 'new pros']
                                        });
                                    }}
                                />
                            </div>
                        </li>
                    </div>
                    <div className="report-footer">
                        <div className="footer-button">
                            <RichText
                                tagName="a"
                                value={btnText}
                                onChange={v => setAttributes({ btnText: v })}
                                allowedFormats={[]}
                                placeholder={__('Button Text', 'gutenbergnative-blocks')}
                            />
                        </div>
                        <div className="report-logos-wrapper">
                            <RichText
                                tagName="div"
                                className="logos-title"
                                value={logosTitle}
                                onChange={v => setAttributes({ logosTitle: v })}
                                placeholder={__('Zu den Bewertungen', 'gutenbergnative-blocks')}
                            />
                            {images && images.length > 0 ? (
                                <div {...innerBlocksPros} />
                            ) : (
                                <MediaPlaceholder
                                    onSelect={v => {
                                        setAttributes({ images: v });
                                    }}
                                    allowedTypes={['image']}
                                    multiple={true}
                                    labels={{ title: __('Upload Logos', 'gutenbergnative-blocks') }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
