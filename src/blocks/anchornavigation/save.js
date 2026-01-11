/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// block save function
const Save = props => {
    const { attributes } = props;
    const { pLink, anHeading, sLink, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <div className="anchornavigation-button">
                <div className="anchor-heading">
                    <RichText.Content value={anHeading} />
                </div>
                <div className="anchor-button">
                    <div className="primary-button Button--small">
                        <a
                            className="not-source"
                            href={pLink?.url || '#'}
                            {...(pLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            Zum Testsieger
                        </a>
                    </div>
                    <div className="secondary-button Button--small">
                        <a
                            className="not-source"
                            href={sLink?.url || '#'}
                            {...(sLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            Qualitätsmerkmale
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
