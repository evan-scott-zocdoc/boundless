"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),UITooltip=function(_UIView){function UITooltip(){return _classCallCheck(this,UITooltip),_possibleConstructorReturn(this,Object.getPrototypeOf(UITooltip).apply(this,arguments))}return _inherits(UITooltip,_UIView),_createClass(UITooltip,[{key:"render",value:function(){var position=this.props.position;return _react2.default.createElement("div",_extends({},this.props,{className:(0,_classnames2.default)(_defineProperty({"ui-tooltip":!0,"ui-tooltip-position-above":position===UITooltip.position.ABOVE,"ui-tooltip-position-below":position===UITooltip.position.BELOW,"ui-tooltip-position-before":position===UITooltip.position.BEFORE,"ui-tooltip-position-after":position===UITooltip.position.AFTER},this.props.className,!!this.props.className)),"data-tooltip":this.props.text,"aria-label":this.props["aria-label"]||this.props.text}),this.props.children)}}]),UITooltip}(_UIView3.default);UITooltip.position={ABOVE:"ABOVE",BELOW:"BELOW",BEFORE:"BEFORE",AFTER:"AFTER"},UITooltip.propTypes={position:_react2.default.PropTypes.oneOf(Object.keys(UITooltip.position)),text:_react2.default.PropTypes.string},UITooltip.defaultProps={position:UITooltip.position.ABOVE},exports.default=UITooltip;