import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const RemoveControl = ({ onClick }) => {
    return (
        <Tooltip text={__('Remove', 'gutenbergnative-blocks')}>
            <button onClick={onClick} className="gutenbergnative-remove-btn">
                <span className="dashicons dashicons-remove"></span>
            </button>
        </Tooltip>
    );
};

export default RemoveControl;
