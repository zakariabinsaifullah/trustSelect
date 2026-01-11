const attributes = {
    blockStyle: {
        type: 'object'
    },

    title: {
        type: 'string',
        default: 'Quellenverzeichnis'
    },
    titleTag: {
        type: 'string',
        default: 'div'
    },
    bgColor: {
        type: 'string'
    },
    headingColor: {
        type: 'string'
    },
    borderColor: {
        type: 'string'
    },
    iconColor: {
        type: 'string'
    },
    listColors: {
        type: 'object',
        default: {
            listColor: '',
            iconColor: '',
            numberColor: ''
        }
    }
};

export default attributes;
