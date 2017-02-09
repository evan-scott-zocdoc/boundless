module.exports=function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=3)}([function(e,n){e.exports=require("boundless-utils-omit-keys")},function(e,n){e.exports=require("classnames")},function(e,n){e.exports=require("react")},function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function i(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var u=t(2),l=t.n(u),s=t(1),c=t.n(s),a=t(0),p=t.n(a),f=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},d=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),h=function(e,n,t){return n.split(".").reduce(function(e,n){return e[n]||t},e)},y=function(e){function n(){var e,t,i,u;r(this,n);for(var l=arguments.length,s=Array(l),c=0;c<l;c++)s[c]=arguments[c];return t=i=o(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(s))),i.mounted=!1,i.promise=null,i.state={},u=t,o(i,u)}return i(n,e),d(n,[{key:"handlePromiseFulfillment",value:function(e,n){this.mounted&&this.setState(function(t){return this.promise===e?(this.promise=null,{component:n}):t},this.fireRenderCallback)}},{key:"handleChildren",value:function(e){var n=e;if(l.a.isValidElement(n))return this.setState({component:n},this.fireRenderCallback);if("function"==typeof n)return this.handleChildren(n(this.props));var t=this.handlePromiseFulfillment.bind(this,n);this.promise=n,this.setState({component:null},function(){return n.then(t,t)})}},{key:"fireRenderCallback",value:function(){this.state.component&&this.props.childrenDidRender()}},{key:"componentWillMount",value:function(){this.handleChildren(this.props.children)}},{key:"componentDidMount",value:function(){this.mounted=!0}},{key:"componentWillReceiveProps",value:function(e){this.handleChildren(e.children)}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"render",value:function(){var e=this.props,t=this.state;return l.a.cloneElement(t.component||e.pendingContent,f({},p()(e,n.internalKeys),{className:c()("b-async",e.className,null===t.component&&h(e,"pendingContent.props.className"),t.component&&h(t,"component.props.className",""),{"b-async-pending":null===t.component})}))}}]),n}(l.a.PureComponent);y.propTypes={"*":u.PropTypes.any,children:u.PropTypes.oneOfType([u.PropTypes.func,u.PropTypes.node,u.PropTypes.instanceOf(Promise)]).isRequired,childrenDidRender:u.PropTypes.func,pendingContent:u.PropTypes.node},y.defaultProps={children:l.a.createElement("div",null),childrenDidRender:function(){},pendingContent:l.a.createElement("div",null)},y.internalKeys=Object.keys(y.defaultProps),n.default=y}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGY1MWYwNTM1MmQwZTg1ZTNhNjk5Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiY2xhc3NuYW1lc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9ib3VuZGxlc3MtYXN5bmMvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpbnN0YWxsZWRNb2R1bGVzIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmVxdWlyZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIndyaXRhYmxlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fIiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfX19kZWZhdWx0IiwiX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCIsIl9leHRlbmRzIiwiYXNzaWduIiwidGFyZ2V0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImJhc2UiLCJwYXRoIiwiZmFsbGJhY2siLCJzcGxpdCIsInJlZHVjZSIsImN1cnJlbnQiLCJmcmFnbWVudCIsIkFzeW5jIiwiX1JlYWN0JFB1cmVDb21wb25lbnQiLCJfcmVmIiwiX3RlbXAiLCJfdGhpcyIsIl9yZXQiLCJ0aGlzIiwiX2xlbiIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJnZXRQcm90b3R5cGVPZiIsImFwcGx5IiwiY29uY2F0IiwibW91bnRlZCIsInByb21pc2UiLCJzdGF0ZSIsImNvbnRleHQiLCJwYXlsb2FkIiwic2V0U3RhdGUiLCJjb21wb25lbnQiLCJmaXJlUmVuZGVyQ2FsbGJhY2siLCJjaGlsZHJlbiIsImNvbnRlbnQiLCJhIiwiaXNWYWxpZEVsZW1lbnQiLCJoYW5kbGVDaGlsZHJlbiIsImJvdW5kSGFuZGxlciIsImhhbmRsZVByb21pc2VGdWxmaWxsbWVudCIsImJpbmQiLCJ0aGVuIiwiY2hpbGRyZW5EaWRSZW5kZXIiLCJuZXh0UHJvcHMiLCJjbG9uZUVsZW1lbnQiLCJwZW5kaW5nQ29udGVudCIsImludGVybmFsS2V5cyIsImNsYXNzTmFtZSIsImItYXN5bmMtcGVuZGluZyIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCIqIiwiYW55Iiwib25lT2ZUeXBlIiwiZnVuYyIsIm5vZGUiLCJpbnN0YW5jZU9mIiwiUHJvbWlzZSIsImlzUmVxdWlyZWQiLCJkZWZhdWx0UHJvcHMiLCJjcmVhdGVFbGVtZW50Iiwia2V5cyJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLFFBQ0UsU0FBVUMsR0NHbkIsUUFBQUMsR0FBQUMsR0FHQSxHQUFBQyxFQUFBRCxHQUNBLE1BQUFDLEdBQUFELEdBQUFILE9BR0EsSUFBQUQsR0FBQUssRUFBQUQsSUFDQUUsRUFBQUYsRUFDQUcsR0FBQSxFQUNBTixXQVVBLE9BTkFDLEdBQUFFLEdBQUFJLEtBQUFSLEVBQUFDLFFBQUFELElBQUFDLFFBQUFFLEdBR0FILEVBQUFPLEdBQUEsRUFHQVAsRUFBQUMsUUF2QkEsR0FBQUksS0ErREEsT0FuQ0FGLEdBQUFNLEVBQUFQLEVBR0FDLEVBQUFPLEVBQUFMLEVBR0FGLEVBQUFHLEVBQUEsU0FBQUssR0FBMkMsTUFBQUEsSUFHM0NSLEVBQUFTLEVBQUEsU0FBQVgsRUFBQVksRUFBQUMsR0FDQVgsRUFBQVksRUFBQWQsRUFBQVksSUFDQUcsT0FBQUMsZUFBQWhCLEVBQUFZLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BWCxFQUFBa0IsRUFBQSxTQUFBckIsR0FDQSxHQUFBYyxHQUFBZCxLQUFBc0IsV0FDQSxXQUEyQixNQUFBdEIsR0FBQSxTQUMzQixXQUFpQyxNQUFBQSxHQUVqQyxPQURBRyxHQUFBUyxFQUFBRSxFQUFBLElBQUFBLEdBQ0FBLEdBSUFYLEVBQUFZLEVBQUEsU0FBQVEsRUFBQUMsR0FBc0QsTUFBQVIsUUFBQVMsVUFBQUMsZUFBQWxCLEtBQUFlLEVBQUFDLElBR3REckIsRUFBQXdCLEVBQUEsR0FHQXhCLElBQUF5QixFQUFBLEtET00sU0FBVTVCLEVBQVFDLEdFdkV4QkQsRUFBQUMsUUFBQTRCLFFBQUEsOEJGNkVNLFNBQVU3QixFQUFRQyxHRzdFeEJELEVBQUFDLFFBQUE0QixRQUFB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QUNBRCxJQUFLVSxFQUFPVyxFQUFNbUMsZUFDckJDLFVBQVczRCxJQUNQLFVBQ0FZLEVBQU0rQyxVQUNjLE9BQXBCcEIsRUFBTUksV0FBc0J4RSxFQUFJeUMsRUFBTyxrQ0FDdkMyQixFQUFNSSxXQUFheEUsRUFBSW9FLEVBQU8sNEJBQTZCLEtBQzFEcUIsa0JBQXVDLE9BQXBCckIsRUFBTUksbUJMaEQ2OEhwQixHS3BGcDlIekIsRUFBQWlELEVBQU1jLGNBQXBCdEMsR0FDVnVDLFdBSUhDLElBQUtsRSxFQUFBLFVBQVVtRSxJQWdEZm5CLFNBQVVoRCxFQUFBLFVBQVVvRSxXQUNoQnBFLEVBQUEsVUFBVXFFLEtBQ1ZyRSxFQUFBLFVBQVVzRSxLQUNWdEUsRUFBQSxVQUFVdUUsV0FBV0MsV0FDdEJDLFdBR0hoQixrQkFBbUJ6RCxFQUFBLFVBQVVxRSxLQUc3QlQsZUFBZ0I1RCxFQUFBLFVBQVVzRSxNQS9EYjVDLEVBa0VWZ0QsY0FDSDFCLFNBQVUvQyxFQUFBaUQsRUFBQXlCLGNBQUEsWUFDVmxCLGtCQUFtQixhQUNuQkcsZUFBZ0IzRCxFQUFBaUQsRUFBQXlCLGNBQUEsYUFyRUhqRCxFQXdFVm1DLGFBQWUzRixPQUFPMEcsS0FBS2xELEVBQU1nRCxjTFl5eUoxRixFQUE2QixRS3BGNzFKMEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4vKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIik7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpO1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0c19fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18ubihfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX2NsYXNzbmFtZXNfX19kZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9jbGFzc25hbWVzX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18ubihfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fKTtcbnZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0YXJnZXQpe2Zvcih2YXIgaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe3ZhciBzb3VyY2U9YXJndW1lbnRzW2ldO2Zvcih2YXIga2V5IGluIHNvdXJjZSl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSxrZXkpKXt0YXJnZXRba2V5XT1zb3VyY2Vba2V5XTt9fX1yZXR1cm4gdGFyZ2V0O307dmFyIF9jcmVhdGVDbGFzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LHByb3BzKXtmb3IodmFyIGk9MDtpPHByb3BzLmxlbmd0aDtpKyspe3ZhciBkZXNjcmlwdG9yPXByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZT1kZXNjcmlwdG9yLmVudW1lcmFibGV8fGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlPXRydWU7aWYoXCJ2YWx1ZVwiaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsQ29uc3RydWN0b3Ipe2lmKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcikpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX1mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLGNhbGwpe2lmKCFzZWxmKXt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7fXJldHVybiBjYWxsJiYodHlwZW9mIGNhbGw9PT1cIm9iamVjdFwifHx0eXBlb2YgY2FsbD09PVwiZnVuY3Rpb25cIik/Y2FsbDpzZWxmO31mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3Msc3VwZXJDbGFzcyl7aWYodHlwZW9mIHN1cGVyQ2xhc3MhPT1cImZ1bmN0aW9uXCImJnN1cGVyQ2xhc3MhPT1udWxsKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIit0eXBlb2Ygc3VwZXJDbGFzcyk7fXN1YkNsYXNzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MmJnN1cGVyQ2xhc3MucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6c3ViQ2xhc3MsZW51bWVyYWJsZTpmYWxzZSx3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlfX0pO2lmKHN1cGVyQ2xhc3MpT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcyxzdXBlckNsYXNzKTpzdWJDbGFzcy5fX3Byb3RvX189c3VwZXJDbGFzczt9dmFyIGdldD1mdW5jdGlvbiBnZXQoYmFzZSxwYXRoLGZhbGxiYWNrKXtyZXR1cm4gcGF0aC5zcGxpdCgnLicpLnJlZHVjZShmdW5jdGlvbihjdXJyZW50LGZyYWdtZW50KXtyZXR1cm4gY3VycmVudFtmcmFnbWVudF18fGZhbGxiYWNrO30sYmFzZSk7fTt2YXIgQXN5bmM9ZnVuY3Rpb24oX1JlYWN0JFB1cmVDb21wb25lbnQpe19pbmhlcml0cyhBc3luYyxfUmVhY3QkUHVyZUNvbXBvbmVudCk7ZnVuY3Rpb24gQXN5bmMoKXt2YXIgX3JlZjt2YXIgX3RlbXAsX3RoaXMsX3JldDtfY2xhc3NDYWxsQ2hlY2sodGhpcyxBc3luYyk7Zm9yKHZhciBfbGVuPWFyZ3VtZW50cy5sZW5ndGgsYXJncz1BcnJheShfbGVuKSxfa2V5PTA7X2tleTxfbGVuO19rZXkrKyl7YXJnc1tfa2V5XT1hcmd1bWVudHNbX2tleV07fXJldHVybiBfcmV0PShfdGVtcD0oX3RoaXM9X3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywoX3JlZj1Bc3luYy5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZihBc3luYykpLmNhbGwuYXBwbHkoX3JlZixbdGhpc10uY29uY2F0KGFyZ3MpKSksX3RoaXMpLF90aGlzLm1vdW50ZWQ9ZmFsc2UsX3RoaXMucHJvbWlzZT1udWxsLF90aGlzLnN0YXRlPXt9LF90ZW1wKSxfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcyxfcmV0KTt9X2NyZWF0ZUNsYXNzKEFzeW5jLFt7a2V5OidoYW5kbGVQcm9taXNlRnVsZmlsbG1lbnQnLHZhbHVlOmZ1bmN0aW9uIGhhbmRsZVByb21pc2VGdWxmaWxsbWVudChjb250ZXh0LHBheWxvYWQpe2lmKCF0aGlzLm1vdW50ZWQpe3JldHVybjt9dGhpcy5zZXRTdGF0ZShmdW5jdGlvbiByZW5kZXJQYXlsb2FkSWZQcm9taXNlTWF0Y2hlcyhzdGF0ZSl7aWYodGhpcy5wcm9taXNlPT09Y29udGV4dCl7dGhpcy5wcm9taXNlPW51bGw7cmV0dXJue2NvbXBvbmVudDpwYXlsb2FkfTt9cmV0dXJuIHN0YXRlO30sdGhpcy5maXJlUmVuZGVyQ2FsbGJhY2spO319LHtrZXk6J2hhbmRsZUNoaWxkcmVuJyx2YWx1ZTpmdW5jdGlvbiBoYW5kbGVDaGlsZHJlbihjaGlsZHJlbil7dmFyIGNvbnRlbnQ9Y2hpbGRyZW47aWYoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLmlzVmFsaWRFbGVtZW50KGNvbnRlbnQpKXtyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OmNvbnRlbnR9LHRoaXMuZmlyZVJlbmRlckNhbGxiYWNrKTt9ZWxzZSBpZih0eXBlb2YgY29udGVudD09PSdmdW5jdGlvbicpe3JldHVybiB0aGlzLmhhbmRsZUNoaWxkcmVuKGNvbnRlbnQodGhpcy5wcm9wcykpO312YXIgYm91bmRIYW5kbGVyPXRoaXMuaGFuZGxlUHJvbWlzZUZ1bGZpbGxtZW50LmJpbmQodGhpcyxjb250ZW50KTt0aGlzLnByb21pc2U9Y29udGVudDt0aGlzLnNldFN0YXRlKHtjb21wb25lbnQ6bnVsbH0sZnVuY3Rpb24oKXtyZXR1cm4gY29udGVudC50aGVuKGJvdW5kSGFuZGxlcixib3VuZEhhbmRsZXIpO30pO319LHtrZXk6J2ZpcmVSZW5kZXJDYWxsYmFjaycsdmFsdWU6ZnVuY3Rpb24gZmlyZVJlbmRlckNhbGxiYWNrKCl7aWYodGhpcy5zdGF0ZS5jb21wb25lbnQpe3RoaXMucHJvcHMuY2hpbGRyZW5EaWRSZW5kZXIoKTt9fX0se2tleTonY29tcG9uZW50V2lsbE1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKXt0aGlzLmhhbmRsZUNoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4pO319LHtrZXk6J2NvbXBvbmVudERpZE1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpe3RoaXMubW91bnRlZD10cnVlO319LHtrZXk6J2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXt0aGlzLmhhbmRsZUNoaWxkcmVuKG5leHRQcm9wcy5jaGlsZHJlbik7fX0se2tleTonY29tcG9uZW50V2lsbFVubW91bnQnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7dGhpcy5tb3VudGVkPWZhbHNlO319LHtrZXk6J3JlbmRlcicsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyKCl7dmFyIHByb3BzPXRoaXMucHJvcHMsc3RhdGU9dGhpcy5zdGF0ZTtyZXR1cm4gX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLmNsb25lRWxlbWVudChzdGF0ZS5jb21wb25lbnR8fHByb3BzLnBlbmRpbmdDb250ZW50LF9leHRlbmRzKHt9LF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCgpKHByb3BzLEFzeW5jLmludGVybmFsS2V5cykse2NsYXNzTmFtZTpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfY2xhc3NuYW1lc19fX2RlZmF1bHQoKSgnYi1hc3luYycscHJvcHMuY2xhc3NOYW1lLHN0YXRlLmNvbXBvbmVudD09PW51bGwmJmdldChwcm9wcywncGVuZGluZ0NvbnRlbnQucHJvcHMuY2xhc3NOYW1lJyksc3RhdGUuY29tcG9uZW50JiZnZXQoc3RhdGUsJ2NvbXBvbmVudC5wcm9wcy5jbGFzc05hbWUnLCcnKSx7J2ItYXN5bmMtcGVuZGluZyc6c3RhdGUuY29tcG9uZW50PT09bnVsbH0pfSkpO319XSk7cmV0dXJuIEFzeW5jO30oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLlB1cmVDb21wb25lbnQpO0FzeW5jLnByb3BUeXBlcz17JyonOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLmFueSxjaGlsZHJlbjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5vbmVPZlR5cGUoW19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLmZ1bmMsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0ubm9kZSxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5pbnN0YW5jZU9mKFByb21pc2UpXSkuaXNSZXF1aXJlZCxjaGlsZHJlbkRpZFJlbmRlcjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5mdW5jLHBlbmRpbmdDb250ZW50Ol9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fW1wiUHJvcFR5cGVzXCJdLm5vZGV9O0FzeW5jLmRlZmF1bHRQcm9wcz17Y2hpbGRyZW46X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLmNyZWF0ZUVsZW1lbnQoJ2RpdicsbnVsbCksY2hpbGRyZW5EaWRSZW5kZXI6ZnVuY3Rpb24gY2hpbGRyZW5EaWRSZW5kZXIoKXt9LHBlbmRpbmdDb250ZW50Ol9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQuYS5jcmVhdGVFbGVtZW50KCdkaXYnLG51bGwpfTtBc3luYy5pbnRlcm5hbEtleXM9T2JqZWN0LmtleXMoQXN5bmMuZGVmYXVsdFByb3BzKTsvKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gQXN5bmM7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaW5kZXguanMiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNTFmMDUzNTJkMGU4NWUzYTY5OSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJib3VuZGxlc3MtdXRpbHMtb21pdC1rZXlzXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanMyXCI6XCJjbGFzc25hbWVzXCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBvbWl0IGZyb20gJ2JvdW5kbGVzcy11dGlscy1vbWl0LWtleXMnO1xuXG5jb25zdCBnZXQgPSAoYmFzZSwgcGF0aCwgZmFsbGJhY2spID0+IHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKGN1cnJlbnQsIGZyYWdtZW50KSA9PiBjdXJyZW50W2ZyYWdtZW50XSB8fCBmYWxsYmFjaywgYmFzZSk7XG5cbi8qKlxuICogX19BIGhpZ2hlci1vcmRlciBjb21wb25lbnQgZm9yIHJlbmRlcmluZyBkYXRhIHRoYXQgaXNuJ3QgcmVhZHkgeWV0Ll9fXG4gKlxuICogVGhlcmUgYXJlIHBsZW50eSBvZiBzaXR1YXRpb25zIHdoZXJlIHlvdSBuZWVkIHRvIGZldGNoIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkLCBidXQgd2FudFxuICogdG8gc2hvdyBzb21lIHNvcnQgb2YgbG9hZGluZyBncmFwaGljIGluIHRoZSBpbnRlcmltLiBUaGlzIGNvbXBvbmVudCBoZWxwcyB0byBzaW1wbGlmeVxuICogdGhhdCBwYXR0ZXJuIGJ5IGhhbmRsaW5nIGNvbW1vbiB0eXBlcyBvZiBwcm9taXNlcyBhbmQgcHJvdmlkaW5nIGEgc2ltcGxlIG1lY2hhbmlzbVxuICogZm9yIG1hdGVyaWFsaXppbmcgdGhlIGZ1bGZpbGxlZCBwYXlsb2FkIGludG8gSlNYLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3luYyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbnkgW1JlYWN0LXN1cHBvcnRlZCBhdHRyaWJ1dGVdKGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdGFncy1hbmQtYXR0cmlidXRlcy5odG1sI2h0bWwtYXR0cmlidXRlcylcbiAgICAgICAgICovXG4gICAgICAgICcqJzogUHJvcFR5cGVzLmFueSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogYSBwcm9taXNlLCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlLCBvciBvdGhlciB0eXBlIG9mIHJlbmRlcmFibGUgY29udGVudDsgaWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQsIGl0IHdpbGxcbiAgICAgICAgICogYmUgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgcHJvcHNcbiAgICAgICAgICpcbiAgICAgICAgICogUHJvbWlzZSBleGFtcGxlOlxuICAgICAgICAgKlxuICAgICAgICAgKiBgYGBqc3hcbiAgICAgICAgICogY29uc3QgbGlzdERhdGFQcm9taXNlID0gZmV0Y2goJy9zb21lL2xpc3QvZGF0YS9lbmRwb2ludCcpLnRoZW4oXG4gICAgICAgICAqICAgICAocmVzcG9uc2UpID0+IHJlc3BvbnNlLm9rID8gcmVzcG9uc2UuanNvbigpIDogJ0ZhaWxlZCB0byByZWNlaXZlIGxpc3QgZGF0YScsXG4gICAgICAgICAqICAgICAoZXJyb3IpID0+IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAqICkudGhlbigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgKiAgICAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgKiAgICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9J2Vycm9yJz57cGF5bG9hZH08L2Rpdj4pO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgcmV0dXJuIChcbiAgICAgICAgICogICAgICAgICA8dWw+XG4gICAgICAgICAqICAgICAgICAgICAgIHtwYXlsb2FkLm1hcCgoaXRlbSkgPT4gKDxsaSBrZXk9e2l0ZW0uaWR9PntpdGVtLmNvbnRlbnR9PC9saT4pKX1cbiAgICAgICAgICogICAgICAgICA8L3VsPlxuICAgICAgICAgKiAgICAgKTtcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqIGBgYFxuICAgICAgICAgKlxuICAgICAgICAgKiA8QXN5bmM+e2xpc3REYXRhUHJvbWlzZX08L0FzeW5jPlxuICAgICAgICAgKlxuICAgICAgICAgKiBGdW5jdGlvbiBleGFtcGxlOlxuICAgICAgICAgKlxuICAgICAgICAgKiBgYGBqc3hcbiAgICAgICAgICogY29uc3QgZmV0Y2hMaXN0RGF0YSA9IChwcm9wcykgPT4gZmV0Y2gocHJvcHNbJ2RhdGEtZW5kcG9pbnQnXSkudGhlbihcbiAgICAgICAgICogICAgIChyZXNwb25zZSkgPT4gcmVzcG9uc2Uub2sgPyByZXNwb25zZS5qc29uKCkgOiAnRmFpbGVkIHRvIHJlY2VpdmUgbGlzdCBkYXRhJyxcbiAgICAgICAgICogICAgIChlcnJvcikgPT4gZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICogKS50aGVuKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAqICAgICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAqICAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT0nZXJyb3InPntwYXlsb2FkfTwvZGl2Pik7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICByZXR1cm4gKFxuICAgICAgICAgKiAgICAgICAgIDx1bD5cbiAgICAgICAgICogICAgICAgICAgICAge3BheWxvYWQubWFwKChpdGVtKSA9PiAoPGxpIGtleT17aXRlbS5pZH0+e2l0ZW0uY29udGVudH08L2xpPikpfVxuICAgICAgICAgKiAgICAgICAgIDwvdWw+XG4gICAgICAgICAqICAgICApO1xuICAgICAgICAgKiB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogPEFzeW5jIGRhdGEtZW5kcG9pbnQ9Jy9zb21lL2xpc3QvZGF0YS9lbmRwb2ludCc+e2ZldGNoTGlzdERhdGF9PC9Bc3luYz5cbiAgICAgICAgICogYGBgXG4gICAgICAgICAqL1xuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoUHJvbWlzZSksXG4gICAgICAgIF0pLmlzUmVxdWlyZWQsXG5cbiAgICAgICAgLyoqIGEgY2FsbGJhY2sgZm9yIHdoZW4gcmVhbCBjb250ZW50IGhhcyBiZWVuIHJlbmRlcmVkOyB0aGlzIHdpbGwgYmUgY2FsbGVkIGltbWVkaWF0ZWx5IGlmIG5vcm1hbCBKU1ggaXMgcGFzc2VkIHRvIEFzeW5jLCBvciwgaW4gdGhlIGNhc2Ugb2YgYSBwcm9taXNlLCB1cG9uIHJlc29sdXRpb24gb3IgcmVqZWN0aW9uICovXG4gICAgICAgIGNoaWxkcmVuRGlkUmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgICAgICAvKiogY29udGVudCB0byBiZSBzaG93biB3aGlsZSB0aGUgcHJvbWlzZSBpcyBpbiBcInBlbmRpbmdcIiBzdGF0ZSAobGlrZSBhIGxvYWRpbmcgZ3JhcGhpYywgcGVyaGFwcykgKi9cbiAgICAgICAgcGVuZGluZ0NvbnRlbnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiA8ZGl2IC8+LFxuICAgICAgICBjaGlsZHJlbkRpZFJlbmRlcjogKCkgPT4ge30sXG4gICAgICAgIHBlbmRpbmdDb250ZW50OiA8ZGl2IC8+LFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhBc3luYy5kZWZhdWx0UHJvcHMpXG5cbiAgICBtb3VudGVkID0gZmFsc2VcbiAgICBwcm9taXNlID0gbnVsbFxuICAgIHN0YXRlID0ge31cblxuICAgIGhhbmRsZVByb21pc2VGdWxmaWxsbWVudChjb250ZXh0LCBwYXlsb2FkKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3VudGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIG9ubHkgc2V0IHRoZSBjb21wb25lbnQgaWYgdGhlIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgbWF0Y2hlc1xuICAgICAgICAvLyB0aGUgb25lIHdlJ3JlIHRyYWNraW5nIGluIHN0YXRlLCBvdGhlcndpc2UgaWdub3JlIGl0IGFuZCByZXRhaW4gdGhlIHByZXZpb3VzIGRhdGFcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiByZW5kZXJQYXlsb2FkSWZQcm9taXNlTWF0Y2hlcyhzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvbWlzZSA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvbWlzZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvbXBvbmVudDogcGF5bG9hZH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSwgdGhpcy5maXJlUmVuZGVyQ2FsbGJhY2spO1xuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gY2hpbGRyZW47XG5cbiAgICAgICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBjb250ZW50fSwgdGhpcy5maXJlUmVuZGVyQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVDaGlsZHJlbihjb250ZW50KHRoaXMucHJvcHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJvdW5kSGFuZGxlciA9IHRoaXMuaGFuZGxlUHJvbWlzZUZ1bGZpbGxtZW50LmJpbmQodGhpcywgY29udGVudCk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBrZXB0IG91dHNpZGUgc3RhdGUgc28gaXQgY2FuIGJlIHNldCBpbW1lZGlhdGVseSBpZiB0aGUgcHJvcHMgY2hhbmdlXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tcG9uZW50OiBudWxsfSwgKCkgPT4gY29udGVudC50aGVuKGJvdW5kSGFuZGxlciwgYm91bmRIYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgZmlyZVJlbmRlckNhbGxiYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5EaWRSZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpICAgICAgICAgICAgICAgICB7IHRoaXMuaGFuZGxlQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbik7IH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpICAgICAgICAgICAgICAgICAgeyB0aGlzLm1vdW50ZWQgPSB0cnVlOyB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHsgdGhpcy5oYW5kbGVDaGlsZHJlbihuZXh0UHJvcHMuY2hpbGRyZW4pOyB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSAgICAgICAgICAgICAgIHsgdGhpcy5tb3VudGVkID0gZmFsc2U7IH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoc3RhdGUuY29tcG9uZW50IHx8IHByb3BzLnBlbmRpbmdDb250ZW50LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHByb3BzLCBBc3luYy5pbnRlcm5hbEtleXMpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBjeChcbiAgICAgICAgICAgICAgICAnYi1hc3luYycsXG4gICAgICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIHN0YXRlLmNvbXBvbmVudCA9PT0gbnVsbCAmJiBnZXQocHJvcHMsICdwZW5kaW5nQ29udGVudC5wcm9wcy5jbGFzc05hbWUnKSxcbiAgICAgICAgICAgICAgICBzdGF0ZS5jb21wb25lbnQgJiYgZ2V0KHN0YXRlLCAnY29tcG9uZW50LnByb3BzLmNsYXNzTmFtZScsICcnKSxcbiAgICAgICAgICAgICAgICB7J2ItYXN5bmMtcGVuZGluZyc6IHN0YXRlLmNvbXBvbmVudCA9PT0gbnVsbH1cbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhY2thZ2VzL2JvdW5kbGVzcy1hc3luYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=