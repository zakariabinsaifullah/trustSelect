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
    const { separatorColor, titleColor, nbColor, borderColor, bgColor } = attributes;

    // CSS Custom Properties
    const cssCustomProperties = {
        ...(titleColor && { '--titleColor': titleColor }),
        ...(borderColor && { '--borderColor': borderColor }),
        ...(nbColor && { '--nbColor': nbColor }),
        ...(bgColor && { '--bgColor': bgColor })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [titleColor, borderColor, nbColor, bgColor]);

    // Block Props
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    // Inner Blocks Props
    const innerBlockProps = useInnerBlocksProps(
        {
            className: 'guten-steps-wrapper'
        },
        {
            allowedBlocks: ['gutenbergnative/step-item'],
            template: [['gutenbergnative/step-item']],
            renderAppender: false
        }
    );

    // Add New Accordion Item
    const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
    const appendAccordion = () => {
        const newBlock = wp.blocks.createBlock('gutenbergnative/step-item');
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
