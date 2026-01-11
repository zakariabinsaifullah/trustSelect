import { __ } from '@wordpress/i18n';

const AddControl = ({ onClick, label = __('Add', 'gutenbergnative-blocks') }) => {
    return (
        <button onClick={onClick} className="gutenbergnative-add-btn">
            {/* <span className="dashicons dashicons-insert"></span> */}
            {label}
        </button>
    );
};

export default AddControl;
