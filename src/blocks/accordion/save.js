/**
 * WordPress Dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        style: attributes.blockStyle
    });

    return (
        <div {...blockProps}>
            <div className="guten-accordion-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
