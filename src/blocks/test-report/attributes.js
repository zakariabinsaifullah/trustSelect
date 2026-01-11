const attributes = {
    blockStyle: {
        type: 'object'
    },
    badge: {
        type: 'object'
    },
    label: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    titleTag: {
        type: 'string',
        default: 'h2'
    },
    subtitle: {
        type: 'string',
        default: ''
    },
    desc: {
        type: 'string',
        default: ''
    },
    showConclusion: {
        type: 'boolean',
        default: false
    },
    conclusionTitle: {
        type: 'string',
        default: 'Unser Fazit'
    },
    photo: {
        type: 'object',
        default: {
            url: '',
            id: '',
            alt: '',
            caption: '',
            sizes: {}
        }
    },
    images: {
        type: 'array',
        default: []
    },
    btnLink: {
        type: 'object',
        default: {
            url: '#',
            openInNewTab: false,
            addNoFollow: false,
            addSponsored: false
        }
    },
    pros: {
        type: 'array',
        default: []
    },
    photoSize: {
        type: 'string',
        default: 'full'
    },
    price: {
        type: 'string'
    },
    showPrimaryBtn: {
        type: 'boolean',
        default: true
    },
    showSecondaryBtn: {
        type: 'boolean',
        default: false
    },
    btnText: {
        type: 'string',
        default: 'Zum Produkt'
    },
    proTitle: {
        type: 'string',
        default: 'Vorteile'
    },
    consTitle: {
        type: 'string',
        default: 'Nachteile'
    },
    badgeText: {
        type: 'string',
        default: 'Testsieger'
    },
    dateText: {
        type: 'string',
        default: 'Ausgabe'
    },
    badgeDesc: {
        type: 'string',
        default: 'Geprüft anhand von Qualitätsmerkmalen'
    },
    badIn: {
        type: 'string',
        default: 'Der große Warentest'
    },
    badgemarText: {
        type: 'string',
        default: 'Gesundheits-vergleich'
    },
    websiteText: {
        type: 'string',
        default: 'www.gesundheitsvergleich-deutschland.de'
    },
    showBadge: {
        type: 'boolean',
        default: false
    },
    badgeScText: {
        type: 'string',
        default: 'Sehr gut'
    },
    logosTitle: {
        type: 'string',
        default: 'Zu den Bewertungen'
    },
    rating: {
        type: 'text',
        default: '4,9'
    },
    // color
    containerBg: {
        type: 'string'
    },
    textColor: {
        type: 'string'
    },
    labelColor: {
        type: 'string'
    },
    labelBg: {
        type: 'string'
    },
    btnColor: {
        type: 'string'
    },
    btnBg: {
        type: 'string'
    },
    separatorColor: {
        type: 'string'
    },
    barColor: {
        type: 'string'
    },
    checkMarkColor: {
        type: 'string'
    },
    crossMarkColor: {
        type: 'string'
    },
    badgeBg: {
        type: 'string'
    },
    badgeColor: {
        type: 'string'
    }
};

export default attributes;
