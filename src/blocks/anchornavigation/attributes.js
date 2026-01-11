const attributes = {
    blockStyle: {
        type: 'object'
    },
    referenceItems: {
        type: 'array',
        default: []
    },
    anHeading: {
        type: 'string'
    },
    list: {
        type: 'string'
    },
    referenceNumber: {
        type: 'number',
        default: 1
    },
    pLink: {
        type: 'object',
        default: {
            url: '#',
            openInNewTab: false,
            addNoFollow: false,
            addSponsored: false
        }
    },
    sLink: {
        type: 'object',
        default: {
            url: '#',
            openInNewTab: false,
            addNoFollow: false,
            addSponsored: false
        }
    },
    headingColor: {
        type: 'string'
    },
    pbtnColors: {
        type: 'object',
        default: {
            nColor: '',
            nBg: '',
            hColor: '',
            hBg: ''
        }
    },
    sbtnColors: {
        type: 'object',
        default: {
            nColor: '',
            nBg: '',
            hColor: '',
            hBg: ''
        }
    }
};

export default attributes;
