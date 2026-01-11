const attributes = {
    blockStyle: {
        type: 'object'
    },
    schemaType: {
        type: 'string',
        default: 'FAQ'
    },
    titleTag: {
        type: 'string',
        default: 'h3'
    },
    titleColor: {
        type: 'string'
    },
    separatorColor: {
        type: 'string'
    },
    iconColor: {
        type: 'string'
    },
    bgColors: {
        type: 'object',
        default: {
            normal: '',
            hover: ''
        }
    },
    hColors: {
        type: 'object',
        default: {
            title: '',
            icon: ''
        }
    }
};

export default attributes;
