/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// block save function
const Save = props => {
    const { attributes } = props;
    const {
        blockStyle,
        rating,
        photo,
        title,
        score,
        showBadge,
        badgeText,
        desc,
        dateText,
        badgeDesc,
        badIn,
        badgeScText,
        websiteText,
        pros,
        badgemarText,
        images,
        btnText,
        btnLink,
        logosTitle
    } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <div className="gn-container gn-padding">
                <div className="header-section">
                    <div className="product-area gap-2">
                        <div className="photo gn-w-full">
                            <div className="image-photo">
                                {photo && photo?.url && (
                                    <div className="product-wrapper">
                                        <img
                                            src={photo?.url}
                                            alt={photo?.alt || title}
                                            className={classNames('product-photo', `wp-image-${photo?.id}`)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rating-numer">
                            <div className="report-rating">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12.0001 1.75C12.3111 1.75 12.5899 1.94201 12.7008 2.23263L15.0588 8.41234L21.5367 8.72913C21.8419 8.74406 22.1075 8.94263 22.2082 9.23111C22.3089 9.5196 22.2245 9.84032 21.9948 10.0419L17.0649 14.3695L18.8768 21.3106C18.9559 21.6135 18.8384 21.9338 18.5822 22.1137C18.3259 22.2937 17.9849 22.2956 17.7267 22.1183L12.0001 18.1875L6.27341 22.1183C6.01525 22.2956 5.67415 22.2937 5.41791 22.1137C5.16166 21.9338 5.04419 21.6135 5.12329 21.3106L6.93523 14.3695L2.00526 10.0419C1.77563 9.84032 1.69124 9.5196 1.79192 9.23111C1.89259 8.94263 2.15821 8.74406 2.4634 8.72913L8.94133 8.41234L11.2993 2.23263C11.4102 1.94201 11.689 1.75 12.0001 1.75Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <div className="rating-number">{rating}</div>
                        </div>
                        <div className="rating-desc">
                            <RichText.Content value={desc} />
                        </div>
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

                <div className="pros-cons-area">
                    {pros &&
                        pros.map((pro, index) => (
                            <li className="list-item" key={`pro-${index}`}>
                                <div className="pc-row pros">
                                    <svg className="list-icon checkmark" viewBox="0 0 21 16">
                                        <path
                                            fill="#0D7B28"
                                            d="M83.3,22.675 C82.8,23.175 82,23.175 81.4,22.675 L76.3,17.575 C75.9,17.075 75.9,16.275 76.3,15.675 C76.7,15.175 77.6,15.175 78.2,15.675 L82.3,19.775 L93.8,8.375 C94.3,7.875 95.1,7.875 95.7,8.375 C96.3,8.875 96.2,9.675 95.7,10.275 L83.3,22.675 Z"
                                            transform="translate(-76 -8)"
                                        />
                                    </svg>
                                    <RichText.Content tagName="div" className="list-label-text" value={pro} />
                                </div>
                            </li>
                        ))}
                </div>

                <div className="report-footer">
                    <div className="footer-button">
                        <a href={btnLink?.url || '#'} {...(btnLink?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                            {btnText}
                        </a>
                    </div>
                    <div className="report-logos-wrapper">
                        {logosTitle && <RichText.Content tagName="div" className="logos-title" value={logosTitle} />}
                        <div className="report-logos">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
