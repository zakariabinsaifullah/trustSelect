/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';

const Edit = props => {
    const { isSelected, attributes } = props;
    const { btnLabel } = attributes;
    const blockProps = useBlockProps();

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <button className="popup-trigger">{btnLabel}</button>
            </div>
        </Fragment>
    );
};

export default Edit;
