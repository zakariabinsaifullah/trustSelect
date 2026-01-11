const attributes = {
    listStyle: {
        type: 'string',
        default: 'ul'
    },
    headers: {
        type: 'array',
        default: []
    },
    showHeading: {
        type: 'boolean',
        default: true
    },
    headingText: {
        type: 'string',
        default: 'Table of Contents'
    },
    subHeading:{
        type: 'string',
    },
    showicon: {
        type: 'string'
    },
    showCollapsible: {
        type: 'boolean',
        default: true
    },
    isCollapsed: {
        type: 'boolean',
        default: true
    },
    allowedHeading: {
        type: 'object',
        default: {
            h1: true,
            h2: true,
            h3: true,
            h4: true,
            h5: true,
            h6: true
        }
    },
    anchorBtnText: {
        type: 'string',
        default: 'Zum Testsieger'
    },
    anchorId: {
        type: 'string'
    },
    // color
    tableheadingColor: {
        type: 'string'
    },
    tableheadingBg: {
        type: 'string'
    },
    iconColor: {
        type: 'string'
    },
    tablecontentColor: {
        type: 'string'
    },
    containerColor: {
        type: 'string'
    },
    headingColor: {
        type: 'string'
    },
    borderColor: {
        type: 'string'
    },
    separatorColor: {
        type: 'string'
    },
    anchorColor: {
        type: 'string'
    },
    anchorBg: {
        type: 'string'
    },
    anchorBorderColor: {
        type: 'string'
    },
    subHeadingColor:{
        type: 'string'
    }
    
};

export default attributes;
