/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkControl from '../../controls/link-control';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { pLink } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody>
                    <LinkControl
                        label={__('Source Link', 'gutenbergnative-blocks')}
                        value={pLink}
                        onChange={value => setAttributes({ pLink: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
