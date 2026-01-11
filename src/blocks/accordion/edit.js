/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';

// Parent Accordion Block Edit Function
const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const { separatorColor, titleColor, iconColor, hColors, bgColors } = attributes;

    // CSS Custom Properties
    const cssCustomProperties = {
        ...(titleColor && { '--title': titleColor }),
        ...(separatorColor && { '--separator': separatorColor }),
        ...(iconColor && { '--icon': iconColor }),
        ...(bgColors.normal && { '--nbg': bgColors.normal }),
        ...(bgColors.hover && { '--hbg': bgColors.hover }),
        ...(hColors.title && { '--htitle': hColors.title }),
        ...(hColors.icon && { '--hicon': hColors.icon })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [titleColor, separatorColor, iconColor, bgColors, hColors]);

    // Block Props
    const blockProps = useBlockProps({
        className: 'guten-accordion-wrapper',
        style: cssCustomProperties
    });

    // Inner Blocks Props
    const innerBlockProps = useInnerBlocksProps(
        {
            className: 'guten-accordion-container'
        },
        {
            allowedBlocks: ['gutenbergnative/accordion-item'],
            template: [['gutenbergnative/accordion-item'], ['gutenbergnative/accordion-item']],
            renderAppender: false
        }
    );

    // Add New Accordion Item
    const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
    const appendAccordion = () => {
        const newBlock = wp.blocks.createBlock('gutenbergnative/accordion-item');
        wp.data.dispatch('core/block-editor').insertBlocks(newBlock, childBlocks.length, clientId);
    };

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}

            <div {...blockProps}>
                <div {...innerBlockProps} />
                <button className="guten-append-btn" onClick={appendAccordion} type="button">
                    {__('Add Item', 'gutenbergnative-blocks')}
                </button>
            </div>
        </Fragment>
    );
};

export default Edit;
