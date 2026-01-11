/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// block save function
const save = ({ attributes }) => {
    const {
        blockStyle,
        photo,
        label,
        title,
        titleTag,
        subtitle,
        desc,
        price,
        productLink,
        score,
        scoreText,
        scoreBars,
        showPrimaryBtn,
        showSecondaryBtn,
        btnText,
        showConclusion,
        conclusionTitle,
        // Pros and Cons
        pros,
        cons,
        proTitle,
        consTitle,
        // badge
        showBadge,
        badgeText,
        dateText,
        badgeDesc,
        badIn,
        badgeScText,
        websiteText,
        badgemarText
    } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: classNames('wp-block-gutenbergnative-result-box', {})
    });

    return (
        <div {...blockProps}>
            <div className="header-area gn-padding pb-0">
                <div className="label-title-wrapper">
                    <RichText.Content tagName="div" className="label" value={label} />
                    <RichText.Content className="title" tagName={titleTag} value={title} />
                    <RichText.Content tagName="div" className="subtitle" value={subtitle} />
                </div>
                {showBadge && (
                    <div className="TestWinnerBadge">
                        <div className="TestWinnerBadge__OuterBox">
                            <div className="TestWinnerBadge__UpperText">
                                <RichText.Content value={badgeText} />
                            </div>
                            <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--UL">
                                <RichText.Content value={badIn} />
                            </div>
                            <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--UR">
                                <RichText.Content value={badgeScText} />
                                {` (${score}/10)`}
                            </div>
                            <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--DL">
                                <img
                                    src="//gesundheitsvergleich-deutschland.de/cdn/shop/files/mini-logo-white.svg?v=1714598268"
                                    alt="GVD Mini Logo"
                                    className="TestWinnerBadge__GVDLogo"
                                />
                                <div className="TestWinnerBadge__GVDName">
                                    <RichText.Content value={badgemarText} />
                                </div>
                            </div>
                            <div className="TestWinnerBadge__Quarree TestWinnerBadge__Quarree--DR">
                                <div className="TestWinnerBadge__Criteria">
                                    <RichText.Content value={badgeDesc} />
                                </div>
                                <div className="TestWinnerBadge__Edition">{`${dateText} {{current_date}}`}</div>
                                <div className="TestWinnerBadge__Url">
                                    <RichText.Content value={websiteText} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="gn-padding pt-0">
                <RichText.Content className="description" tagName="p" value={desc} />
                <div className="price">
                    <RichText.Content className="price" tagName="strong" value={price?.label} />
                    <RichText.Content className="price" tagName="span" value={price?.value} />
                    <RichText.Content className="price" tagName="span" value={price?.currency} />
                </div>
            </div>
            <div className="separator"></div>
            <div className="product-area gap-2 gn-padding">
                <div className="photo gn-w-full">
                    {photo && photo?.url && (
                        <>
                            <a
                                className="product-wrapper"
                                href={productLink?.url || '#'}
                                {...(productLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <img
                                    src={photo?.url}
                                    alt={photo?.alt || title}
                                    className={classNames('product-photo', `wp-image-${photo?.id}`)}
                                />
                            </a>
                            <div className="circle-score-wrapper">
                                <svg className="ScoreTotal__Circle ScoreTotal__Circle--outer" viewBox="0 0 176 176">
                                    <path d="M32.385 143C18.54 128.89 10 109.536 10 88.182 10 45.004 44.922 10 88 10s78 35.004 78 78.182c0 21.354-8.541 40.708-22.385 54.818" />
                                    <defs>
                                        <linearGradient id="ringGradient" x2={265} y2={153} y1={114} x1={46} gradientUnits="userSpaceOnUse">
                                            <stop offset="0.026" className="ScoreTotal__Gradient ScoreTotal__Gradient--start" />
                                            <stop offset="0.844" className="ScoreTotal__Gradient ScoreTotal__Gradient--end" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg
                                    className="ScoreTotal__Circle ScoreTotal__Circle--inner"
                                    style={{ transform: 'rotate(229.5deg)' }}
                                    viewBox="0 0 176 176"
                                >
                                    <path
                                        d="M88 19c-38.108 0-69 30.892-69 69 0 16.649 5.897 31.921 15.715 43.841l-4.432 11.637c-.615 1.614.967 3.196 2.581 2.58l11.684-4.455C56.411 151.231 71.532 157 88 157c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <div className="circle-score">
                                    <span className="score-value">{score}</span>
                                    <span className="score-text">{scoreText}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="rating-bars gn-w-full">
                    {scoreBars &&
                        scoreBars?.length > 0 &&
                        scoreBars.map((v, index) => {
                            return (
                                <div className="score" key={index}>
                                    <div className="score-title">
                                        <span className="bar-title" id={v?.title.replace(/ /g, '-').toLowerCase()}>
                                            {v?.title}
                                        </span>
                                        <span className="bar-value">{v?.value + '/10'}</span>
                                    </div>
                                    <div
                                        className="score-bar"
                                        style={{
                                            '--percentage': `${v?.value * 10}%`
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="pros-cons-area gn-padding dt-visible">
                <div className="separator"></div>
                <li className="pros-cons-headings list-item">
                    <div className="pc-heading pc-row">
                        <RichText.Content className="pc-heading" value={proTitle} />
                    </div>
                    <div className="pc-heading cons-heading pc-row">
                        <RichText.Content className="pc-heading" value={consTitle} />
                    </div>
                </li>
                {Math.max(pros.length, cons.length) > 0 &&
                    Array.from({ length: Math.max(pros.length, cons.length) }).map((_, index) => (
                        <li className="list-item" key={index}>
                            <div className="pc-row pros">
                                {index < pros.length ? (
                                    <>
                                        <svg className="list-icon checkmark" viewBox="0 0 21 16">
                                            <path
                                                fill="#0D7B28"
                                                d="M83.3,22.675 C82.8,23.175 82,23.175 81.4,22.675 L76.3,17.575 C75.9,17.075 75.9,16.275 76.3,15.675 C76.7,15.175 77.6,15.175 78.2,15.675 L82.3,19.775 L93.8,8.375 C94.3,7.875 95.1,7.875 95.7,8.375 C96.3,8.875 96.2,9.675 95.7,10.275 L83.3,22.675 Z"
                                                transform="translate(-76 -8)"
                                            />
                                        </svg>
                                        <RichText.Content tagName="div" className="list-label-text" value={pros[index]} />
                                    </>
                                ) : null}
                            </div>

                            {/* Cons Column */}
                            <div className="pc-row cons">
                                {index < cons.length ? (
                                    <>
                                        <svg className="list-icon crossmark" viewBox="0 0 15 15">
                                            <path
                                                fill="#D64F4F"
                                                fillRule="evenodd"
                                                d="M93.610675,34.3843761 C93.6117179,34.3854156 93.6127591,34.3864567 93.6137985,34.3874996 C94.1292392,34.9046728 94.1292392,35.7413401 93.6137985,36.2585133 L88.362,41.527 L93.558269,46.7414867 C94.0737096,47.2586599 94.0737096,48.0953272 93.558269,48.6125004 C93.0450587,49.1274357 92.2115821,49.1288341 91.6966467,48.6156239 L91.6935233,48.6125004 L86.497,43.398 L81.3064767,48.6072037 C80.7932665,49.122139 79.9597898,49.1235375 79.4448545,48.6103272 C79.4438116,48.6092878 79.4427704,48.6082466 79.441731,48.6072037 C78.9262904,48.0900305 78.9262904,47.2533632 79.441731,46.73619 L84.632,41.527 L79.3862015,36.26381 C78.8707608,35.7466368 78.8707608,34.9099695 79.3862015,34.3927963 C79.8994117,33.877861 80.7328884,33.8764625 81.2478237,34.3896728 L81.2509472,34.3927963 L86.497,39.656 L91.7490528,34.3874996 C92.262263,33.8725643 93.0957397,33.8711659 93.610675,34.3843761 Z"
                                                transform="translate(-79 -34)"
                                            />
                                        </svg>
                                        <RichText.Content tagName="div" className="list-label-text" value={cons[index]} />
                                    </>
                                ) : null}
                            </div>
                        </li>
                    ))}
            </div>
            <div className="pros-cons-area gn-padding mb-visible">
                <div className="separator"></div>
                <li className="pros-cons-headings list-item">
                    <div className="pc-heading pc-row">
                        <RichText.Content className="pc-heading" value={proTitle} />
                    </div>
                </li>
                {pros.map((v, index) => {
                    return (
                        <li className="list-item" key={index}>
                            <div className="pc-row pros">
                                <svg className="list-icon checkmark" viewBox="0 0 21 16">
                                    <path
                                        fill="#0D7B28"
                                        d="M83.3,22.675 C82.8,23.175 82,23.175 81.4,22.675 L76.3,17.575 C75.9,17.075 75.9,16.275 76.3,15.675 C76.7,15.175 77.6,15.175 78.2,15.675 L82.3,19.775 L93.8,8.375 C94.3,7.875 95.1,7.875 95.7,8.375 C96.3,8.875 96.2,9.675 95.7,10.275 L83.3,22.675 Z"
                                        transform="translate(-76 -8)"
                                    />
                                </svg>
                                <RichText.Content tagName="div" className="list-label-text" value={v} />
                            </div>
                        </li>
                    );
                })}
                <li className="pros-cons-headings list-item">
                    <div className="pc-heading cons-heading pc-row">
                        <RichText.Content className="pc-heading" value={consTitle} />
                    </div>
                </li>
                {cons.map((v, index) => {
                    return (
                        <li className="list-item" key={index}>
                            <div className="pc-row cons">
                                <svg className="list-icon checkmark" viewBox="0 0 21 16">
                                    <path
                                        fill="#0D7B28"
                                        d="M83.3,22.675 C82.8,23.175 82,23.175 81.4,22.675 L76.3,17.575 C75.9,17.075 75.9,16.275 76.3,15.675 C76.7,15.175 77.6,15.175 78.2,15.675 L82.3,19.775 L93.8,8.375 C94.3,7.875 95.1,7.875 95.7,8.375 C96.3,8.875 96.2,9.675 95.7,10.275 L83.3,22.675 Z"
                                        transform="translate(-76 -8)"
                                    />
                                </svg>
                                <RichText.Content tagName="div" className="list-label-text" value={v} />
                            </div>
                        </li>
                    );
                })}
            </div>
            {showPrimaryBtn && (
                <div className="btn-wrapper">
                    <a
                        href={productLink?.url || '#'}
                        className="gn-btn"
                        {...(productLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {btnText}
                    </a>
                </div>
            )}
            {showConclusion && (
                <>
                    <div className="separator"></div>
                    <div className="conclusion-area gn-padding">
                        <RichText.Content className="conclusion-title" tagName="h3" value={conclusionTitle} />
                        <InnerBlocks.Content />
                        {showSecondaryBtn && (
                            <div className="btn-wrapper secondary">
                                <a
                                    href={productLink?.url || '#'}
                                    className="gn-btn"
                                    {...(productLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    {btnText}
                                </a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default save;
