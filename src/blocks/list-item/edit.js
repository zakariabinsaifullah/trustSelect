import './editor.scss';

import { RichText, useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import Inspector from './inspector';

const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const { title, titleTag, headingColor, borderColor, iconColor, listColors, bgColor } = attributes;

    const cssCustomProperties = {
        ...(headingColor && { '--title-color': headingColor }),
        ...(borderColor && { '--border-color': borderColor }),
        ...(iconColor && { '--svg-color': iconColor }),
        ...(listColors?.listColor && { '--list-color': listColors.listColor }),
        ...(listColors?.iconColor && { '--list-icon-color': listColors.iconColor }),
        ...(listColors?.numberColor && { '--number-color': listColors.numberColor }),
        ...(bgColor && { '--bg-color': bgColor })
    };

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: 'guten-list-item'
    });

    // Update block style when colors change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [headingColor, borderColor, iconColor, listColors, bgColor]);

    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            const listBtn = listRef.current.querySelector('.list-button');

            const handleClick = () => {
                const listCollapse = listRef.current.querySelector('.list-collapse');
                listCollapse.classList.toggle('active');
                listBtn.classList.toggle('active');
                listRef.current.classList.toggle('active');
            };

            listBtn.addEventListener('click', handleClick);

            return () => {
                listBtn.removeEventListener('click', handleClick);
            };
        }
    }, []);

    // Add New List Item
    const appendListItem = () => {
        const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId) || [];
        const newBlock = wp.blocks.createBlock('gutenbergnative/list');
        wp.data.dispatch('core/block-editor').insertBlocks([newBlock], childBlocks.length, clientId);
    };

    const innerBlockProps = useInnerBlocksProps(
        {
            className: 'guten-list-inner-blocks'
        },
        {
            allowedBlocks: ['gutenbergnative/list'],
            template: [['gutenbergnative/list']],
            templateLock: false,
            renderAppender: false
        }
    );

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}

            <div {...blockProps}>
                <div className="guten-list-editor-wrapper" ref={listRef}>
                    <div className="list-header">
                        <div className="list-button">
                            <RichText
                                tagName={titleTag}
                                className="list-title"
                                value={title}
                                onChange={v => setAttributes({ title: v })}
                                placeholder={__('Source title...', 'gutennative-blocks')}
                            />

                            <div className="list-icons">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={128}
                                    height={128}
                                    viewBox="0 0 24 24"
                                    style={{ fill: 'none' }}
                                    color="#000000"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.75 10.75V4H13.25V10.75H20V13.25H13.25V20H10.75V13.25H4V10.75H10.75Z"
                                        fill="#000000"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="list-collapse">
                        <div {...innerBlockProps} />
                        <button className="guten-append-btn" onClick={appendListItem} type="button">
                            {__('Add a Source', 'gutennative-blocks')}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
