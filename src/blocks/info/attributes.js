const attributes = {
    blockStyle: {
        type: 'object'
    },
    authorPhoto: {
        type: 'object',
        default: {
            url: '',
            id: '',
            alt: ''
        }
    },
    subTitle: {
        type: 'string',
        default: 'Tested by'
    },
    dateLabel: {
        type: 'string',
        default: 'Last Update:'
    },
    updateDate: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    titleTag: {
        type: 'string',
        default: 'h2'
    },
    titleColor: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    containerColor: {
        type: 'string'
    },
    svgColor: {
        type: 'string'
    },
    btnColors: {
        type: 'object',
        default: {
            nColor: '',
            nBg: '',
            hColor: '',
            hBg: ''
        }
    },
    overlayBg: {
        type: 'string'
    },
    authorName: {
        type: 'string'
    },
    aboutUrl: {
        type: 'string'
    }
};

export default attributes;
