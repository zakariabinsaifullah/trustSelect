/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import { formatHeaders, parseList } from './helper';

// inspector controls
import Inspector from './inspector';

// Dynamic Style
import useHeader from './use-header';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const {
        anchorBtnText,
        anchorId,
        listStyle,
        headers,
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
        anchorColor,
        anchorBg,
        anchorBorderColor,
        subHeading,
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

    // block props with inline styles for CSS variables
    // Update block style attribute when colors/dimensions change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        tableheadingBg,
        tableheadingColor,
        iconColor,
        tablecontentColor,
        containerColor,
        borderColor,
        separatorColor,
        anchorColor,
        anchorBg,
        anchorBorderColor,
        subHeadingColor
    ]);

    const ListTag = listStyle === 'ol' ? 'ol' : 'ul';

    // Toggle states for nested items
    const [toggleStates, setToggleStates] = useState({});

    // Get headers using the custom hook
    const headerList = useHeader();

    // Update headers when they change
    useEffect(() => {
        if (JSON.stringify(headerList) !== JSON.stringify(headers)) {
            setAttributes({ headers: headerList });
        }
    }, [headerList, headers]);

    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classNames('wp-block-gutenbergnative-table-of-content', {
            'is-collapsed': isCollapsed === false
        })
    });

    /**
     * Toggle Collapse
     */
    const toggleCollapse = () => {
        setAttributes({ isCollapsed: !isCollapsed });
    };

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="sub-heading">
                    <RichText
                        value={subHeading}
                        onChange={subHeading => setAttributes({ subHeading })}
                        placeholder={__('title', 'gutenbergnative-blocks')}
                    />
                </div>
                <div className="wrapper">
                    <div
                        className="native-toc-heading"
                        onClick={showCollapsible ? toggleCollapse : undefined}
                        style={showCollapsible ? { cursor: 'pointer' } : undefined}
                    >
                        <RichText
                            className="title"
                            placeholder={__('Table of content', 'nativeblocks')}
                            value={headingText}
                            onChange={headingText => setAttributes({ headingText })}
                            tagName="div"
                        />
                        {showCollapsible && (
                            <button
                                className="native-toc-toggle-btn"
                                aria-label={isCollapsed ? __('Collapse', 'nativeblocks') : __('Expand', 'nativeblocks')}
                            >
                                {!isCollapsed ? (
                                    <svg
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="e-font-icon-svg"
                                    >
                                        <polygon points="14,7 9,7 9,2 7,2 7,7 2,7 2,9 7,9 7,14 9,14 9,9 14,9" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="e-font-icon-svg"
                                    >
                                        <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"></path>
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>

                    {isCollapsed && (
                        <div className="native-toc-content" style={{ display: 'block' }}>
                            {headers && headers.length > 0 ? (
                                <ListTag className="native-toc-list">
                                    {parseList(formatHeaders(headers, allowedHeading), ListTag, toggleStates, setToggleStates)}
                                </ListTag>
                            ) : (
                                <p className="native-toc-placeholder">{__('Add heading to create table of content', 'nativeblocks')}</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="anchor-btn">
                    <a href={anchorId ? `#${anchorId}` : '#'} className="anchor-btn-text">
                        {anchorBtnText}
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
