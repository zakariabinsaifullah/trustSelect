/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import { formatHeaders } from './helper';

const Save = ({ attributes }) => {
    const {
        listStyle,
        headers,
        subHeading,
        showCollapsible,
        isCollapsed,
        allowedHeading,
        tablecontentColor,
        tableheadingBg,
        iconColor,
        tableheadingColor,
        containerColor,
        headingText,
        borderColor,
        separatorColor,
        anchorBtnText,
        anchorId,
        anchorColor,
        anchorBg,
        anchorBorderColor,
        subHeadingColor  
    } = attributes;

    const cssCustomProperties = {
        ...(tableheadingBg && { '--heading-bg': tableheadingBg }),
        ...(tableheadingColor && { '--heading-color': tableheadingColor }),
        ...(iconColor && { '--icon-color': iconColor }),
        ...(tablecontentColor && { '--list-color': tablecontentColor }),
        ...(containerColor && { '--container-bg': containerColor }),
        ...(borderColor && { '--border-color': borderColor }),
        ...(separatorColor && { '--separator-color': separatorColor }),
        ...(anchorColor && { '--anchor-color': anchorColor }),
        ...(anchorBg && { '--anchor-bg': anchorBg }),
        ...(anchorBorderColor && { '--anchor-border-color': anchorBorderColor }),
        ...(subHeadingColor && { '--sub-color': subHeadingColor })
         
    };

    const ListTag = listStyle === 'ol' ? 'ol' : 'ul';

    const blockProps = useBlockProps.save({
        style: cssCustomProperties,
        className: classNames('wp-block-gutenbergnative-table-of-content', {
            'is-collapsed': isCollapsed === false
        })
    });

    // Generate list items recursively - matching parseList helper
    const generateListItems = list => {
        if (!list || list.length === 0) return null;

        return list
            .map((item, index) => {
                // Get anchor and content with fallbacks (matching helper.js)
                const itemAnchor = item.anchor || item.link || item.id || '';
                const itemContent = item.content || item.text || item.title || '';

                // Skip items without content
                if (!itemContent) return null;

                // Clean content from HTML tags (matching parseList logic)
                const cleanContent = itemContent.replace(/(<.+?>)/g, '');

                const hasChildren = item.children && item.children.length > 0;
                const itemKey = `${itemAnchor}-${index}`;
                const itemLevel = item.level || 2;

                return (
                    <li key={itemKey} data-level={itemLevel}>
                        <a href={`#${itemAnchor}`} data-level={itemLevel}>
                            {cleanContent}
                        </a>
                        {hasChildren && <ListTag className="child-list">{generateListItems(item.children)}</ListTag>}
                    </li>
                );
            })
            .filter(Boolean); // Remove null items
    };

    // Format headers safely
    const formattedHeaders = headers && headers.length > 0 ? formatHeaders(headers, allowedHeading) : [];

    return (
        <div {...blockProps} data-headers={JSON.stringify(headers)}>
              <div  className="sub-heading"> 
                <RichText.Content 
                        className="sub-heading"
                        value={subHeading}
                />
                </div>
            <div className="wrapper">
                <div
                    className={classNames('native-toc-heading', {
                        'is-clickable': showCollapsible
                    })}
                    data-collapsible={showCollapsible ? 'true' : 'false'}
                >
                    <RichText.Content tagName="div" className="title" value={headingText} />
                    {showCollapsible && (
                        <button
                            className="native-toc-toggle-btn"
                            aria-label={isCollapsed ? 'Collapse' : 'Expand'}
                            aria-expanded={isCollapsed ? 'true' : 'false'}
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="plus"
                            >
                                <polygon points="14,7 9,7 9,2 7,2 7,7 2,7 2,9 7,9 7,14 9,14 9,9 14,9" />
                            </svg>
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="minus"
                            >
                                <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"></path>
                            </svg>
                        </button>
                    )}
                </div>
                <div className="native-toc-content">
                    {formattedHeaders.length > 0 ? (
                        <ListTag className="native-toc-list">{generateListItems(formattedHeaders)}</ListTag>
                    ) : (
                        <p className="native-toc-placeholder">Add heading to create table of content</p>
                    )}
                </div>
            </div>
            <div className="anchor-btn">
                <a href={anchorId ? `#${anchorId}` : '#'} className="anchor-btn-text">
                    {anchorBtnText}
                </a>
            </div>
        </div>
    );
};

export default Save;
