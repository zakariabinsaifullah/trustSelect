/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { text, bgColor, textColor } = attributes;

    const cssCustomProperties = {
        ...(textColor && { '--text-color': textColor }),
        ...(bgColor && { '--bg-color': bgColor })
    };

    const blockProps = useBlockProps.save({
        style: cssCustomProperties
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="p" className="text-box-content" value={text} />
        </div>
    );
};

export default Save;
