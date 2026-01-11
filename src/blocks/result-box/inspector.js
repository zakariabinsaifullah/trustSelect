/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkControl from '../../controls/link-control';
import AddControl from '../../controls/add-control';
import RemoveControl from '../../controls/remove-control';

const HEADING_TAGS = [
    { label: 'H1', value: 'h1' },
    { label: 'H2', value: 'h2' },
    { label: 'H3', value: 'h3' },
    { label: 'H4', value: 'h4' },
    { label: 'H5', value: 'h5' },
    { label: 'H6', value: 'h6' },
    { label: 'Div', value: 'div' },
    { label: 'Span', value: 'span' },
    { label: 'P', value: 'p' }
];

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
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
        // badge
        showBadge,
        badgeText,
        dateText,
        badgeDesc,
        badIn,
        websiteUrl,
        badgeScText,
        badgemarText,
        websiteText,
        // style
        containerBg,
        textColor,
        labelColor,
        labelBg,
        btnColor,
        btnBg,
        barColor,
        separatorColor,
        checkMarkColor,
        crossMarkColor,
        badgeColor,
        badgeBg,
        gradientStart,
        gradientEnd
    } = attributes;

    // get post date
    const currentPostDate = () => {
        const { getEditedPostAttribute } = wp.data.select('core/editor');
        const postDate = getEditedPostAttribute('date');
        return postDate;
    };

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('General', 'gutenbergnative-blocks')} initialOpen={true}>
                    <LinkControl
                        label={__('Product Link', 'gutenbergnative-blocks')}
                        value={productLink}
                        onChange={value => setAttributes({ productLink: value })}
                    />
                    <ToggleControl
                        label={__('Show Conclusion Section', 'gutenbergnative-blocks')}
                        checked={showConclusion}
                        onChange={() =>
                            setAttributes({
                                showConclusion: !showConclusion
                            })
                        }
                        __nextHasNoMarginBottom
                    />
                    {showConclusion && (
                        <>
                            <TextControl
                                label={__('Conclusion Title', 'gutenbergnative-blocks')}
                                value={conclusionTitle}
                                onChange={v => {
                                    setAttributes({
                                        conclusionTitle: v
                                    });
                                }}
                                placeholder={__('Enter conclusion title', 'gutenbergnative-blocks')}
                            />
                            <ToggleControl
                                label={__('Show Secondary Button', 'gutenbergnative-blocks')}
                                checked={showSecondaryBtn}
                                onChange={() =>
                                    setAttributes({
                                        showSecondaryBtn: !showSecondaryBtn
                                    })
                                }
                                __nextHasNoMarginBottom
                            />
                        </>
                    )}
                    <ToggleControl
                        label={__('Show Primary Button', 'gutenbergnative-blocks')}
                        checked={showPrimaryBtn}
                        onChange={() =>
                            setAttributes({
                                showPrimaryBtn: !showPrimaryBtn
                            })
                        }
                        __nextHasNoMarginBottom
                    />

                    {(showPrimaryBtn || showSecondaryBtn) && (
                        <TextControl
                            label={__('Button Text', 'gutenbergnative-blocks')}
                            value={btnText}
                            onChange={v => {
                                setAttributes({
                                    btnText: v
                                });
                            }}
                            placeholder={__('Enter button text', 'gutenbergnative-blocks')}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Badge', 'gutenbergnative-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Badge', 'gutenbergnative-blocks')}
                        checked={showBadge}
                        onChange={() =>
                            setAttributes({
                                showBadge: !showBadge
                            })
                        }
                        __nextHasNoMarginBottom
                    />
                    {showBadge && (
                        <>
                            <TextControl
                                label={__('Title', 'gutenbergnative-blocks')}
                                value={badgeText}
                                onChange={v => {
                                    setAttributes({
                                        badgeText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Subtitle', 'gutenbergnative-blocks')}
                                value={badIn}
                                onChange={v => {
                                    setAttributes({
                                        badIn: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Rating Label', 'gutenbergnative-blocks')}
                                value={badgeScText}
                                onChange={v => {
                                    setAttributes({
                                        badgeScText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Description', 'gutenbergnative-blocks')}
                                value={badgeDesc}
                                onChange={v => {
                                    setAttributes({
                                        badgeDesc: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Output Text', 'gutenbergnative-blocks')}
                                value={dateText}
                                onChange={v => {
                                    setAttributes({
                                        dateText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Checkmark Label', 'gutenbergnative-blocks')}
                                value={badgemarText}
                                onChange={v => {
                                    setAttributes({
                                        badgemarText: v
                                    });
                                }}
                            />
                            <TextControl
                                label={__('Website', 'gutenbergnative-blocks')}
                                value={websiteText}
                                onChange={v => {
                                    setAttributes({
                                        websiteText: v
                                    });
                                }}
                            />
                        </>
                    )}
                </PanelBody>
                <PanelBody title={__('Content', 'gutenbergnative-blocks')} initialOpen={false}>
                    <TextControl
                        label={__('Label', 'gutenbergnative-blocks')}
                        value={label}
                        onChange={v => {
                            setAttributes({
                                label: v
                            });
                        }}
                        placeholder={__('Enter label', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Title', 'gutenbergnative-blocks')}
                        value={title}
                        onChange={v => {
                            setAttributes({
                                title: v
                            });
                        }}
                        placeholder={__('Enter title', 'gutenbergnative-blocks')}
                    />
                    <SelectControl
                        label={__('Title Tag', 'gutenbergnative-blocks')}
                        value={titleTag}
                        onChange={v => {
                            setAttributes({
                                titleTag: v
                            });
                        }}
                        options={HEADING_TAGS}
                    />
                    <TextControl
                        label={__('Subtitle', 'gutenbergnative-blocks')}
                        value={subtitle}
                        onChange={v => {
                            setAttributes({
                                subtitle: v
                            });
                        }}
                        placeholder={__('Enter subtitle', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Description', 'gutenbergnative-blocks')}
                        value={desc}
                        onChange={v => {
                            setAttributes({
                                desc: v
                            });
                        }}
                        placeholder={__('Enter description', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Price Label', 'gutenbergnative-blocks')}
                        value={price?.label}
                        onChange={v => {
                            setAttributes({
                                price: { ...price, label: v }
                            });
                        }}
                        placeholder={__('Price Label', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Price Value', 'gutenbergnative-blocks')}
                        value={price?.value}
                        onChange={v => {
                            setAttributes({
                                price: { ...price, value: v }
                            });
                        }}
                        placeholder={__('Price Value', 'gutenbergnative-blocks')}
                    />
                    <TextControl
                        label={__('Price Currency', 'gutenbergnative-blocks')}
                        value={price?.currency}
                        onChange={v => {
                            setAttributes({
                                price: { ...price, currency: v }
                            });
                        }}
                        placeholder={__('Price Currency', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
                <PanelBody title={__('Score', 'gutenbergnative-blocks')} initialOpen={false}>
                    <RangeControl
                        label={__('Value', 'gutenbergnative-blocks')}
                        value={score}
                        onChange={v => setAttributes({ score: v })}
                        min={1}
                        max={10}
                        step={0.1}
                    />
                    <TextControl
                        label={__('Text', 'gutenbergnative-blocks')}
                        value={scoreText}
                        onChange={v => setAttributes({ scoreText: v })}
                        placeholder={__('Enter score text', 'gutenbergnative-blocks')}
                    />
                </PanelBody>
                <PanelBody title={__('Score Bars', 'gutenbergnative-blocks')} initialOpen={false}>
                    <div className="gntb-repeater-wrapper">
                        {scoreBars &&
                            scoreBars.length > 0 &&
                            scoreBars.map((item, index) => (
                                <div key={index} className="gntb-repeat-item">
                                    <TextControl
                                        label={__('Title', 'gutenbergnative-blocks')}
                                        value={item.title}
                                        onChange={v => {
                                            const newScoreBars = [...scoreBars];
                                            newScoreBars[index].title = v;
                                            setAttributes({ scoreBars: newScoreBars });
                                        }}
                                        placeholder={__('Enter title', 'gutenbergnative-blocks')}
                                    />
                                    <RangeControl
                                        label={__('Value', 'gutenbergnative-blocks')}
                                        value={item.value}
                                        onChange={v => {
                                            const newScoreBars = [...scoreBars];
                                            newScoreBars[index].value = v;
                                            setAttributes({ scoreBars: newScoreBars });
                                        }}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                    <RemoveControl
                                        onClick={() => {
                                            const newScoreBars = scoreBars.filter((_, i) => i !== index);
                                            setAttributes({ scoreBars: newScoreBars });
                                        }}
                                    />
                                </div>
                            ))}
                        <AddControl
                            label={__('Add Score Bar', 'gutenbergnative-blocks')}
                            onClick={() => {
                                const newScoreBars = [...scoreBars, { title: '', value: 10 }];
                                setAttributes({ scoreBars: newScoreBars });
                            }}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings
                    title={__('Global Colors', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: containerBg,
                            onChange: value => setAttributes({ containerBg: value }),
                            label: __('Container Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: textColor,
                            onChange: value => setAttributes({ textColor: value }),
                            label: __('Text Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Badge', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: badgeBg,
                            onChange: value => setAttributes({ badgeBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: badgeColor,
                            onChange: value => setAttributes({ badgeColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Label', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: labelBg,
                            onChange: value => setAttributes({ labelBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: labelColor,
                            onChange: value => setAttributes({ labelColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Rating', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: gradientStart,
                            onChange: value => setAttributes({ gradientStart: value }),
                            label: __('Start Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: gradientEnd,
                            onChange: value => setAttributes({ gradientEnd: value }),
                            label: __('End Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Button', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: btnBg,
                            onChange: value => setAttributes({ btnBg: value }),
                            label: __('Background', 'gutenbergnative-blocks')
                        },
                        {
                            value: btnColor,
                            onChange: value => setAttributes({ btnColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Separator', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: separatorColor,
                            onChange: value => setAttributes({ separatorColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />

                <PanelColorSettings
                    title={__('Progress Bars', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: barColor,
                            onChange: value => setAttributes({ barColor: value }),
                            label: __('Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
                <PanelColorSettings
                    title={__('Pros and Cons', 'gutenbergnative-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: checkMarkColor,
                            onChange: value => setAttributes({ checkMarkColor: value }),
                            label: __('CheckMark Color', 'gutenbergnative-blocks')
                        },
                        {
                            value: crossMarkColor,
                            onChange: value => setAttributes({ crossMarkColor: value }),
                            label: __('CrossMark Color', 'gutenbergnative-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
