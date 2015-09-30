/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 * @class UIProgress
 */

import UIButton from '../UIButton';
import UIView from '../UIView';
import React from 'react';

class UIProgress extends UIView {
    getWrapperClasses() {
        return ['ui-progress-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    getProgressClasses() {
        let classes = ['ui-progress'];

        if (typeof this.props.progress === 'undefined') {
            classes.push('ui-progress-indeterminate');
        }

        return classes.concat(this.props.className).join(' ');
    }

    getLabelClasses() {
        return ['ui-progress-label'].concat(this.props.labelAttributes.className || []).join(' ');
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <div {...this.props.labelAttributes}
                     ref='label'
                     className={this.getLabelClasses()}>
                    {this.props.label}
                </div>
            );
        }
    }

    getCancelClasses() {
        return ['ui-progress-cancel'].concat(this.props.cancelAttributes.className || []).join(' ');
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton {...this.props.cancelAttributes}
                          ref='cancel'
                          className={this.getCancelClasses()}
                          onClick={this.props.onCancel} />
            );
        }
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}>
                <div {...this.props}
                     ref='progress'
                     className={this.getProgressClasses()}
                     label={null}
                     role='presentation'
                     style={{[this.props.tweenProperty]: this.props.progress}} />

                {this.renderLabel()}
                {this.renderCancel()}
            </div>
        );
    }
}

UIProgress.defaultProps = {
    cancelAttributes: {},
    className: [],
    labelAttributes: {},
    tweenProperty: 'width',
    wrapperAttributes: {}
};

UIProgress.propTypes = {
    cancelAttributes: React.PropTypes.object,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tweenProperty: React.PropTypes.string,
    wrapperAttributes: React.PropTypes.object
};

export default UIProgress;