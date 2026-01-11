/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// inspector controls
import Inspector from './inspector';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { pLink, anHeading, sLink, pbtnColors, sbtnColors, headingColor } = attributes;
    const cssCustomProperties = {
        ...(pbtnColors.nColor && { '--pri-color': pbtnColors.nColor }),
        ...(pbtnColors.nBg && { '--pri-bg': pbtnColors.nBg }),
        ...(sbtnColors.nColor && { '--scon-color': sbtnColors.nColor }),
        ...(sbtnColors.nBg && { '--scon-bg': sbtnColors.nBg }),
        ...(headingColor && { '--heading-color': headingColor })
    };

    // start
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [pbtnColors, sbtnColors, headingColor]);

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="anchornavigation-button">
                    <div className="anchor-heading">
                        <RichText
                            value={anHeading}
                            onChange={value => setAttributes({ anHeading: value })}
                            placeholder={__('Schnellnavigation...', 'gutenbergnative-blocks')}
                        />
                    </div>
                    <div className="anchor-button">
                        <div className="primary-button Button--small">
                            <a href={pLink?.url || '#'} {...(pLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                Zum Testsieger
                            </a>
                        </div>
                        <div className="secondary-button Button--small">
                            <a href={sLink?.url || '#'} {...(sLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                Qualitätsmerkmale
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
