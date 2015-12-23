"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_noop=require("../UIUtils/noop"),_noop2=_interopRequireDefault(_noop),UIProgressiveDisclosure=function(_UIView){function UIProgressiveDisclosure(){return _classCallCheck(this,UIProgressiveDisclosure),_possibleConstructorReturn(this,Object.getPrototypeOf(UIProgressiveDisclosure).apply(this,arguments))}return _inherits(UIProgressiveDisclosure,_UIView),_createClass(UIProgressiveDisclosure,[{key:"initialState",value:function(){return{expanded:this.props.expanded}}},{key:"dispatchCallback",value:function(){this.props[this.state.expanded?"onExpand":"onHide"]()}},{key:"componentWillReceiveProps",value:function(newProps){var _this2=this;newProps.expanded!==this.props.expanded&&this.setState({expanded:newProps.expanded},function(){return _this2.dispatchCallback()})}},{key:"handleClick",value:function(){var _this3=this;this.setState({expanded:!this.state.expanded},function(){return _this3.dispatchCallback()}),"function"==typeof this.props.toggleProps.onClick&&(event.persist(),this.props.toggleProps.onClick(event))}},{key:"handleKeyDown",value:function(event){var _this4=this;switch(event.key){case"Enter":event.preventDefault(),this.setState({expanded:!this.state.expanded},function(){return _this4.dispatchCallback()})}"function"==typeof this.props.toggleProps.onKeyDown&&(event.persist(),this.props.toggleProps.onKeyDown(event))}},{key:"render",value:function(){return _react2.default.createElement("div",_extends({},this.props,{ref:"wrapper",className:(0,_classnames2.default)(_defineProperty({"ui-disclosure":!0,"ui-disclosure-expanded":this.state.expanded},this.props.className,!!this.props.className))}),_react2.default.createElement("div",_extends({},this.props.toggleProps,{ref:"toggle",className:(0,_classnames2.default)(_defineProperty({"ui-disclosure-toggle":!0},this.props.toggleProps.className,!!this.props.toggleProps.className)),onClick:this.handleClick.bind(this),onKeyDown:this.handleKeyDown.bind(this),tabIndex:"0"}),this.state.expanded?this.props.teaserExpanded||this.props.teaser:this.props.teaser),_react2.default.createElement("div",{ref:"content",className:"ui-disclosure-content"},this.props.children))}}]),UIProgressiveDisclosure}(_UIView3.default);exports.default=UIProgressiveDisclosure,UIProgressiveDisclosure.propTypes={children:_react2.default.PropTypes.node,expanded:_react2.default.PropTypes.bool,onExpand:_react2.default.PropTypes.func,onHide:_react2.default.PropTypes.func,teaser:_react2.default.PropTypes.node,teaserExpanded:_react2.default.PropTypes.node,toggleProps:_react2.default.PropTypes.object},UIProgressiveDisclosure.defaultProps={expanded:!1,onExpand:_noop2.default,onHide:_noop2.default,toggleProps:{}},exports.default=UIProgressiveDisclosure;