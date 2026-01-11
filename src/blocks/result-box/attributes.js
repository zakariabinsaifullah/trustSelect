const attributes = {
    blockStyle: {
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
        default: 'h3'
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
    productLink: {
        type: 'object',
        default: {
            url: '#',
            openInNewTab: false,
            addNoFollow: false,
            addSponsored: false
        }
    },
    score: {
        type: 'number',
        default: 8.5
    },
    scoreText: {
        type: 'string',
        default: 'von 10'
    },
    pros: {
        type: 'array',
        default: []
    },
    cons: {
        type: 'array',
        default: []
    },
    scoreBars: {
        type: 'array',
        default: [{ title: 'Spezifische Qualitätsmerkmale', value: 9 }]
    },
    photoSize: {
        type: 'string',
        default: 'full'
    },
    price: {
        type: 'object',
        default: {
            label: '',
            currency: '',
            value: ''
        }
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
    showBadge: {
        type: 'boolean',
        default: false
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
    badgeScText: {
        type: 'string',
        default: 'Sehr gut'
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
    },
    gradientStart: {
        type: 'string'
    },
    gradientEnd: {
        type: 'string'
    }
};

export default attributes;
