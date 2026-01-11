const attributes = {
    title: {
        type: 'string'
    },
    titleTag: {
        type: 'string',
        default: 'h3'
    },
    stepType: {
        type: 'string',
        default: 'number'
    },
    stepNumber: {
        type: 'string',
        default: '1'
    },
    stepIcon: {
        type: 'object',
        default: {
            url: '',
            id: '',
            alt: ''
        }
    }
};

export default attributes;
