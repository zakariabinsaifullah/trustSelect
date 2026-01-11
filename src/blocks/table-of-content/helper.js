export const supportedHeaders = [
    'core/heading',
    'native/advanced-heading',
    'essential-blocks/heading',
    'gutenverse/advanced-heading',
    'gutenkit/heading',
    'kadence/advancedheading',
    'qubely/heading',
    'ugb/header',
    'ugb/heading',
    'themeisle-blocks/advanced-heading'
];

export function isnativeBlocksAHeading(block) {
    return block.name === 'native/advanced-heading';
}
export function isCoreHeading(block) {
    return block.name === 'core/heading';
}
export function isEbHeading(block) {
    return block.name === 'essential-blocks/heading';
}
export function isGutenverseHeading(block) {
    return block.name === 'gutenverse/advanced-heading';
}
export function isGutenKitHeading(block) {
    return block.name === 'gutenkit/heading';
}
export function isKadenceHeading(block) {
    return block.name === 'kadence/advancedheading';
}
export function isQubelyHeading(block) {
    return block.name === 'qubely/heading';
}
export function isStackableHeader(block) {
    return block.name === 'ugb/header';
}
export function isStackableHeading(block) {
    return block.name === 'ugb/heading';
}
export function isOtterHeading(block) {
    return block.name === 'themeisle-blocks/advanced-heading';
}

export const createHierarchy = (formattedHeaders, currentHeader) => {
    const lastIndex = formattedHeaders.length - 1;

    if (formattedHeaders.length === 0 || formattedHeaders[0].level === currentHeader.level) {
        formattedHeaders.push({ ...currentHeader });
    } else if (formattedHeaders[lastIndex].level < currentHeader.level) {
        if (!formattedHeaders[lastIndex].children) {
            formattedHeaders[lastIndex].children = [{ ...currentHeader }];
        } else {
            createHierarchy(formattedHeaders[lastIndex].children, currentHeader);
        }
    }
};

export const formatHeaders = (allHeaders, allowedHeading) => {
    const formattedHeaders = [];

    allHeaders
        .filter(header => {
            // Check if header has required properties and is allowed
            const hasContent = header.content || header.text || header.title;
            const hasAnchor = header.link || header.id || header.anchor;
            const isAllowed = allowedHeading && allowedHeading[`h${header.level}`];

            return hasContent && hasAnchor && isAllowed;
        })
        .forEach(header => {
            // Normalize header data
            const normalizedHeader = {
                ...header,
                anchor: header.anchor || header.link || header.id,
                content: header.content || header.text || header.title,
                level: header.level || 2
            };

            createHierarchy(formattedHeaders, normalizedHeader);
        });

    return formattedHeaders;
};

export const parseList = (list, ListTag = 'ul', toggleStates = {}, setToggleStates = null) => {
    if (!list || list.length === 0) return null;

    return list
        .map((item, index) => {
            // Get anchor and content with fallbacks
            const itemAnchor = item.anchor || item.link || item.id || '';
            const itemContent = item.content || item.text || item.title || '';

            // Skip items without content
            if (!itemContent) return null;

            // Clean content from HTML tags
            const cleanContent = itemContent.replace(/(<.+?>)/g, '');

            const hasChildren = item.children && item.children.length > 0;
            const itemKey = `${itemAnchor}-${index}`;
            const isToggled = toggleStates[itemKey] !== false; // Default to true

            return (
                <li key={itemKey} data-level={item.level || 2}>
                    <a href={`#${itemAnchor}`} data-level={item.level || 2}>
                        {cleanContent}
                    </a>
                    {hasChildren && (
                        <ListTag className="child-list">{parseList(item.children, ListTag, toggleStates, setToggleStates)}</ListTag>
                    )}
                </li>
            );
        })
        .filter(Boolean); // Remove null items
};

export function parseTocSlug(slug) {
    if (!slug) return slug;

    return slug
        .toString()
        .toLowerCase()
        .replace(/(<.+?>)/g, '')
        .replace(/&(amp;|mdash;)/g, '')
        .replace(/[\u2013\u2014]/g, '')
        .replace(/&nbsp;/gi, '-')
        .replace(/\s+/g, '-')
        .replace(/[&\/\\#,^!+()$~%.'":*?<>{}@''""]/g, '')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '');
}
