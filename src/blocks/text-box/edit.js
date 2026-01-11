/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';

const Edit = props => {
    const { isSelected, attributes, setAttributes } = props;
    const { text, bgColor, textColor } = attributes;

    const cssCustomProperties = {
        ...(textColor && { '--text-color': textColor }),
        ...(bgColor && { '--bg-color': bgColor })
    };

    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <RichText
                    tagName="p"
                    className="text-box-content"
                    placeholder={__('Enter your text here...', 'gutenbergnative-blocks')}
                    value={text}
                    onChange={text => setAttributes({ text })}
                />
            </div>
        </Fragment>
    );
};

export default Edit;
