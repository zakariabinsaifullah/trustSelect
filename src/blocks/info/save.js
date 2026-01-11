import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = props => {
    const { attributes } = props;
    const { title, blockStyle, authorPhoto, subTitle, dateLabel, updateDate, description } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: 'gtvb-tca-item'
    });

    return (
        <div {...blockProps}>
            <div className="gtvb-tca-editor-wrapper">
                <div className="tca-header">
                    <div className="tca-button">
                        <div className="tca-title-wrapper">
                            <div className="author-photo">{authorPhoto.url && <img src={authorPhoto.url} alt={authorPhoto.alt} />}</div>
                            <div className="title-content">
                                <div className="tca-subtitle">{subTitle}</div>
                                <RichText.Content tagName="p" className="tca-title" value={title} />

                                <div className="tca-date-label">{`${dateLabel} ${updateDate}`}</div>
                            </div>
                        </div>
                        <div className="tca-icons">
                            <svg
                                className="tca-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" stroke-miterlimit="16" stroke-width="1.5" d="m6 9 6 6 6-6"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="tca-collapse">
                    <div className="tca-content">
                        <RichText.Content tagName="p" className="tca-description" value={description} />
                        <InnerBlocks.Content />
                    </div>
                    <div className="gut-button"></div>
                </div>
            </div>
        </div>
    );
};

export default Save;
