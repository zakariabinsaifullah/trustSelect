/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Accordion Item Block Save Function
const Save = props => {
    const { attributes } = props;
    const { title, titleTag, stepType, stepIcon, stepNumber } = attributes;

    // Block Props
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="step-sign">
                {stepType === 'icon' && stepIcon.url ? (
                    <img src={stepIcon.url} alt={stepIcon.alt} />
                ) : (
                    <RichText.Content tagName="span" className="step-number" value={stepNumber} />
                )}
            </div>
            <div className="step-content">
                <RichText.Content tagName={titleTag} className="step-title" value={title} />
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
