import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

import attributes from './attributes';
import metadata from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

/**
 * Block Registration
 */
registerBlockType(metadata, {
    icon: {
        src: 'admin-links',
        foreground: '#008060',
        background: '#f3f7f5'
    },
    attributes,
    edit: Edit,
    save: Save
});
