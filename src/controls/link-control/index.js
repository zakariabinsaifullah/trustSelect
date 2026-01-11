/**
 * WordPress dependencies
 */
import { Button, Flex, FlexBlock, FlexItem, Popover, TextControl, ToggleControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './style.scss';

const LinkControl = ({ instanceId, label, value, onChange, help = '', openInNewTab = true, addNoFollow = false, addSponsored = false }) => {
    const id = `link-control-${instanceId}`;
    const [linkExtra, setLinkExtra] = useState(false);

    return (
        <div className="gutenbergnative-control-container">
            <div className="gutenbergnative-mb-8">
                <label htmlFor={id}>{label}</label>
            </div>
            <div className="gutenbergnative-linked-control" id={id}>
                <Flex>
                    <FlexBlock>
                        <TextControl
                            value={value && value.url}
                            onChange={url => {
                                onChange({
                                    ...value,
                                    url
                                });
                            }}
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                        />
                    </FlexBlock>
                    {(openInNewTab || addNoFollow || addSponsored) && (
                        <FlexItem>
                            <Button
                                icon="admin-generic"
                                onClick={() => {
                                    setLinkExtra(true);
                                }}
                                className={`gutenbergnative-link-extra-btn ${linkExtra && 'gutenbergnative-le-active'}`}
                            />
                        </FlexItem>
                    )}
                </Flex>
                {help && <p className="gutenbergnative_custom__help">{help}</p>}
            </div>
            {linkExtra && (
                <Popover
                    position="bottom left"
                    className="gutenbergnative-link-extra-popover-container"
                    onClose={() => {
                        setLinkExtra(false);
                    }}
                    onFocusOutside={() => setLinkExtra(false)}
                    offset={8}
                >
                    <div className="gutenbergnative-link-extra-popover">
                        {openInNewTab && (
                            <ToggleControl
                                label={__('Open in new tab', 'gutenbergnative-blocks')}
                                checked={value && value.openInNewTab}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        openInNewTab: !value.openInNewTab
                                    });
                                }}
                                __nextHasNoMarginBottom
                            />
                        )}
                        {addNoFollow && (
                            <ToggleControl
                                label={__('Add nofollow rel', 'gutenbergnative-blocks')}
                                checked={value && value.addNoFollow}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        addNoFollow: !value.addNoFollow
                                    });
                                }}
                                __nextHasNoMarginBottom
                            />
                        )}
                        {addSponsored && (
                            <ToggleControl
                                label={__('Add sponsored rel', 'gutenbergnative-blocks')}
                                checked={value && value.addSponsored}
                                onChange={() => {
                                    onChange({
                                        ...value,
                                        addSponsored: !value.addSponsored
                                    });
                                }}
                                __nextHasNoMarginBottom
                            />
                        )}
                    </div>
                </Popover>
            )}
        </div>
    );
};
export default withInstanceId(LinkControl);
