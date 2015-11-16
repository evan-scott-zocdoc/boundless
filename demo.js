import React from 'react';
import ReactDOM from 'react-dom';

import UIButtonDemo from './UIButton/demo';
const UICheckboxDemo = require('./UICheckbox/demo');
const UICheckboxGroupDemo = require('./UICheckboxGroup/demo');
const UIDialogDemo = require('./UIDialog/demo');
const UIFittedTextDemo = require('./UIFittedText/demo');
const UIImageDemo = require('./UIImage/demo');
const UIListDemo = require('./UIList/demo');
const UIModalDemo = require('./UIModal/demo');
const UINotificationDemo = require('./UINotification/demo');
const UIPopoverDemo = require('./UIPopover/demo');
const UIProgressDemo = require('./UIProgress/demo');
const UIProgressiveDisclosureDemo = require('./UIProgressiveDisclosure/demo');
const UIRadioDemo = require('./UIRadio/demo');
const UITableDemo = require('./UITable/demo');
const UITokenizedInputDemo = require('./UITokenizedInput/demo');
const UITypeaheadInputDemo = require('./UITypeaheadInput/demo');

ReactDOM.render(<UIButtonDemo />, document.getElementById('ui-button'));
ReactDOM.render(<UICheckboxDemo />, document.getElementById('ui-checkbox'));
ReactDOM.render(<UICheckboxGroupDemo />, document.getElementById('ui-checkbox-group'));
ReactDOM.render(<UIDialogDemo />, document.getElementById('ui-dialog'));
ReactDOM.render(<UIFittedTextDemo />, document.getElementById('ui-fitted-text'));
ReactDOM.render(<UIImageDemo />, document.getElementById('ui-image'));
ReactDOM.render(<UIListDemo />, document.getElementById('ui-list'));
ReactDOM.render(<UIModalDemo />, document.getElementById('ui-modal'));
ReactDOM.render(<UINotificationDemo />, document.getElementById('ui-notification'));
ReactDOM.render(<UIPopoverDemo />, document.getElementById('ui-popover'));
ReactDOM.render(<UIProgressDemo />, document.getElementById('ui-progress'));
ReactDOM.render(<UIProgressiveDisclosureDemo />, document.getElementById('ui-disclosure'));
ReactDOM.render(<UIRadioDemo />, document.getElementById('ui-radio'));
ReactDOM.render(<UITableDemo />, document.getElementById('ui-table'));
ReactDOM.render(<UITokenizedInputDemo />, document.getElementById('ui-tokenfield'));
ReactDOM.render(<UITypeaheadInputDemo />, document.getElementById('ui-typeahead'));
