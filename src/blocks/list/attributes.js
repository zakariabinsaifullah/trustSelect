const attributes = {
    referenceItems: {
        type: 'array',
        default: []
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
            openInNewTab: true,
            addNoFollow: false,
            addSponsored: false
        }
    }
};

export default attributes;
