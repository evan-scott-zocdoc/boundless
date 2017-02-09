module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t){e.exports=require("boundless-utils-omit-keys")},function(e,t){e.exports=require("boundless-utils-uuid")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-dom")},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(2),u=n.n(l),p=n(3),s=n.n(p),c=n(0),f=n.n(c),d=n(1),h=n.n(d),y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function(e){function t(){var e,n,r,a;o(this,t);for(var l=arguments.length,u=Array(l),p=0;p<l;p++)u[p]=arguments[p];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.id=h()(),r.$portal=null,r.$passenger=null,a=n,i(r,a)}return a(t,e),b(t,[{key:"componentWillMount",value:function(){this.$portal=document.createElement("div"),this.props.destination.appendChild(this.$portal),this.renderPortalledContent()}},{key:"renderPortalledContent",value:function(){var e=u.a.isValidElement(this.props.children)?this.props.children:u.a.createElement("div",null,this.props.children);this.$portal.id=this.props.portalId||this.id,s.a.unstable_renderSubtreeIntoContainer(this,e,this.$portal),this.$passenger=this.$portal.children[0]}},{key:"componentDidUpdate",value:function(){this.renderPortalledContent()}},{key:"componentWillUnmount",value:function(){s.a.unmountComponentAtNode(this.$portal),this.props.destination.removeChild(this.$portal)}},{key:"render",value:function(){return u.a.createElement("span",y({},f()(this.props,t.internalKeys),r({},t.PORTAL_DATA_ATTRIBUTE,this.props.portalId||this.id)))}}]),t}(u.a.Component);m.propTypes={"*":l.PropTypes.any,children:u.a.PropTypes.node,destination:l.PropTypes.instanceOf(HTMLElement),portalId:l.PropTypes.string},m.defaultProps={children:null,destination:document.body,portalId:null},m.internalKeys=Object.keys(m.defaultProps),m.PORTAL_DATA_ATTRIBUTE="data-portal-id",t.default=m}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGQzZDFhODhjOGQ4YmI0NWZjYzA5Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiYm91bmRsZXNzLXV0aWxzLXV1aWRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3RcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3QtZG9tXCJ9Iiwid2VicGFjazovLy8uL3BhY2thZ2VzL2JvdW5kbGVzcy1wb3J0YWwvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpbnN0YWxsZWRNb2R1bGVzIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmVxdWlyZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ3cml0YWJsZSIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsInNlbGYiLCJSZWZlcmVuY2VFcnJvciIsIl9pbmhlcml0cyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfcmVhY3RfZG9tX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfcmVhY3RfZG9tX19fZGVmYXVsdCIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX18iLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fX2RlZmF1bHQiLCJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfYm91bmRsZXNzX3V0aWxzX3V1aWRfXyIsIl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fX2RlZmF1bHQiLCJfZXh0ZW5kcyIsImFzc2lnbiIsInRhcmdldCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJQb3J0YWwiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3JlZiIsIl90ZW1wIiwiX3RoaXMiLCJfcmV0IiwidGhpcyIsIl9sZW4iLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiZ2V0UHJvdG90eXBlT2YiLCJhcHBseSIsImNvbmNhdCIsImlkIiwiJHBvcnRhbCIsIiRwYXNzZW5nZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJkZXN0aW5hdGlvbiIsImFwcGVuZENoaWxkIiwicmVuZGVyUG9ydGFsbGVkQ29udGVudCIsImNoaWxkIiwiYSIsImlzVmFsaWRFbGVtZW50IiwiY2hpbGRyZW4iLCJwb3J0YWxJZCIsInVuc3RhYmxlX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW50ZXJuYWxLZXlzIiwiUE9SVEFMX0RBVEFfQVRUUklCVVRFIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiKiIsImFueSIsIlByb3BUeXBlcyIsIm5vZGUiLCJpbnN0YW5jZU9mIiwiSFRNTEVsZW1lbnQiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJib2R5Iiwia2V5cyJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLFFBQ0UsU0FBVUMsR0NHbkIsUUFBQUMsR0FBQUMsR0FHQSxHQUFBQyxFQUFBRCxHQUNBLE1BQUFDLEdBQUFELEdBQUFILE9BR0EsSUFBQUQsR0FBQUssRUFBQUQsSUFDQUUsRUFBQUYsRUFDQUcsR0FBQSxFQUNBTixXQVVBLE9BTkFDLEdBQUFFLEdBQUFJLEtBQUFSLEVBQUFDLFFBQUFELElBQUFDLFFBQUFFLEdBR0FILEVBQUFPLEdBQUEsRUFHQVAsRUFBQUMsUUF2QkEsR0FBQUksS0ErREEsT0FuQ0FGLEdBQUFNLEVBQUFQLEVBR0FDLEVBQUFPLEVBQUFMLEVBR0FGLEVBQUFHLEVBQUEsU0FBQUssR0FBMkMsTUFBQUEsSUFHM0NSLEVBQUFTLEVBQUEsU0FBQVgsRUFBQVksRUFBQUMsR0FDQVgsRUFBQVksRUFBQWQsRUFBQVksSUFDQUcsT0FBQUMsZUFBQWhCLEVBQUFZLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BWCxFQUFBa0IsRUFBQSxTQUFBckIsR0FDQSxHQUFBYyxHQUFBZCxLQUFBc0IsV0FDQSxXQUEyQixNQUFBdEIsR0FBQSxTQUMzQixXQUFpQyxNQUFBQSxHQUVqQyxPQURBRyxHQUFBUyxFQUFBRSxFQUFBLElBQUFBLEdBQ0FBLEdBSUFYLEVBQUFZLEVBQUEsU0FBQVEsRUFBQUMsR0FBc0QsTUFBQVIsUUFBQVMsVUFBQUMsZUFBQWxCLEtBQUFlLEVBQUFDLElBR3REckIsRUFBQXdCLEVBQUEsR0FHQXhCLElBQUF5QixFQUFBLEtET00sU0FBVTVCLEVBQVFD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QUF3QnpCLEtBQUtWLE1BQU04QixVQUFZcEIsS0FBS1EsVU5IeTdHZCxHTWhHdCtHbkIsRUFBQTBDLEVBQU1TLFVBQXJCaEMsR0FDVmlDLFdBSUhDLElBQUt0RCxFQUFBLFVBQVV1RCxJQW1DZlYsU0FBVTVDLEVBQUEwQyxFQUFNYSxVQUFVQyxLQUsxQmxCLFlBQWF2QyxFQUFBLFVBQVUwRCxXQUFXQyxhQUtsQ2IsU0FBVTlDLEVBQUEsVUFBVTRELFFBbERQeEMsRUFxRFZ5QyxjQUNIaEIsU0FBVSxLQUNWTixZQUFhRixTQUFTeUIsS0FDdEJoQixTQUFVLE1BeERHMUIsRUEyRFY4QixhQUFlbkYsT0FBT2dHLEtBQUszQyxFQUFPeUMsY0EzRHhCekMsRUE2RFYrQixzQkFBd0IsaUJObUM2aEl0RSxFQUE2QixRTWhHeGtJdUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4vKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvdW5kbGVzcy11dGlscy1vbWl0LWtleXNcIik7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtdXVpZFwiKTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9yZWFjdF9kb21fXyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX3JlYWN0X2RvbV9fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX3JlYWN0X2RvbV9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfYm91bmRsZXNzX3V0aWxzX29taXRfa2V5c19fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX2JvdW5kbGVzc191dGlsc19vbWl0X2tleXNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX2JvdW5kbGVzc191dGlsc191dWlkX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fX2RlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX2JvdW5kbGVzc191dGlsc191dWlkX18pO1xudmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHRhcmdldCl7Zm9yKHZhciBpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7dmFyIHNvdXJjZT1hcmd1bWVudHNbaV07Zm9yKHZhciBrZXkgaW4gc291cmNlKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLGtleSkpe3RhcmdldFtrZXldPXNvdXJjZVtrZXldO319fXJldHVybiB0YXJnZXQ7fTt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQscHJvcHMpe2Zvcih2YXIgaT0wO2k8cHJvcHMubGVuZ3RoO2krKyl7dmFyIGRlc2NyaXB0b3I9cHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlPWRlc2NyaXB0b3IuZW51bWVyYWJsZXx8ZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGU9dHJ1ZTtpZihcInZhbHVlXCJpbiBkZXNjcmlwdG9yKWRlc2NyaXB0b3Iud3JpdGFibGU9dHJ1ZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LGRlc2NyaXB0b3Iua2V5LGRlc2NyaXB0b3IpO319cmV0dXJuIGZ1bmN0aW9uKENvbnN0cnVjdG9yLHByb3RvUHJvcHMsc3RhdGljUHJvcHMpe2lmKHByb3RvUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUscHJvdG9Qcm9wcyk7aWYoc3RhdGljUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3RvcixzdGF0aWNQcm9wcyk7cmV0dXJuIENvbnN0cnVjdG9yO307fSgpO2Z1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtpZihrZXkgaW4gb2JqKXtPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHdyaXRhYmxlOnRydWV9KTt9ZWxzZXtvYmpba2V5XT12YWx1ZTt9cmV0dXJuIG9iajt9ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO319ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZixjYWxsKXtpZighc2VsZil7dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO31yZXR1cm4gY2FsbCYmKHR5cGVvZiBjYWxsPT09XCJvYmplY3RcInx8dHlwZW9mIGNhbGw9PT1cImZ1bmN0aW9uXCIpP2NhbGw6c2VsZjt9ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLHN1cGVyQ2xhc3Mpe2lmKHR5cGVvZiBzdXBlckNsYXNzIT09XCJmdW5jdGlvblwiJiZzdXBlckNsYXNzIT09bnVsbCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrdHlwZW9mIHN1cGVyQ2xhc3MpO31zdWJDbGFzcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzJiZzdXBlckNsYXNzLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnN1YkNsYXNzLGVudW1lcmFibGU6ZmFsc2Usd3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZX19KTtpZihzdXBlckNsYXNzKU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3Msc3VwZXJDbGFzcyk6c3ViQ2xhc3MuX19wcm90b19fPXN1cGVyQ2xhc3M7fXZhciBQb3J0YWw9ZnVuY3Rpb24oX1JlYWN0JENvbXBvbmVudCl7X2luaGVyaXRzKFBvcnRhbCxfUmVhY3QkQ29tcG9uZW50KTtmdW5jdGlvbiBQb3J0YWwoKXt2YXIgX3JlZjt2YXIgX3RlbXAsX3RoaXMsX3JldDtfY2xhc3NDYWxsQ2hlY2sodGhpcyxQb3J0YWwpO2Zvcih2YXIgX2xlbj1hcmd1bWVudHMubGVuZ3RoLGFyZ3M9QXJyYXkoX2xlbiksX2tleT0wO19rZXk8X2xlbjtfa2V5Kyspe2FyZ3NbX2tleV09YXJndW1lbnRzW19rZXldO31yZXR1cm4gX3JldD0oX3RlbXA9KF90aGlzPV9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsKF9yZWY9UG9ydGFsLl9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKFBvcnRhbCkpLmNhbGwuYXBwbHkoX3JlZixbdGhpc10uY29uY2F0KGFyZ3MpKSksX3RoaXMpLF90aGlzLmlkPV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19ib3VuZGxlc3NfdXRpbHNfdXVpZF9fX2RlZmF1bHQoKSgpLF90aGlzLiRwb3J0YWw9bnVsbCxfdGhpcy4kcGFzc2VuZ2VyPW51bGwsX3RlbXApLF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLF9yZXQpO31fY3JlYXRlQ2xhc3MoUG9ydGFsLFt7a2V5Oidjb21wb25lbnRXaWxsTW91bnQnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpe3RoaXMuJHBvcnRhbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTt0aGlzLnByb3BzLmRlc3RpbmF0aW9uLmFwcGVuZENoaWxkKHRoaXMuJHBvcnRhbCk7dGhpcy5yZW5kZXJQb3J0YWxsZWRDb250ZW50KCk7fX0se2tleToncmVuZGVyUG9ydGFsbGVkQ29udGVudCcsdmFsdWU6ZnVuY3Rpb24gcmVuZGVyUG9ydGFsbGVkQ29udGVudCgpe3ZhciBjaGlsZD1fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0LmEuaXNWYWxpZEVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbik/dGhpcy5wcm9wcy5jaGlsZHJlbjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0LmEuY3JlYXRlRWxlbWVudCgnZGl2JyxudWxsLHRoaXMucHJvcHMuY2hpbGRyZW4pO3RoaXMuJHBvcnRhbC5pZD10aGlzLnByb3BzLnBvcnRhbElkfHx0aGlzLmlkO19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9yZWFjdF9kb21fX19kZWZhdWx0LmEudW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXIodGhpcyxjaGlsZCx0aGlzLiRwb3J0YWwpO3RoaXMuJHBhc3Nlbmdlcj10aGlzLiRwb3J0YWwuY2hpbGRyZW5bMF07fX0se2tleTonY29tcG9uZW50RGlkVXBkYXRlJyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKXt0aGlzLnJlbmRlclBvcnRhbGxlZENvbnRlbnQoKTt9fSx7a2V5Oidjb21wb25lbnRXaWxsVW5tb3VudCcsdmFsdWU6ZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKXtfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfcmVhY3RfZG9tX19fZGVmYXVsdC5hLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy4kcG9ydGFsKTt0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7fX0se2tleToncmVuZGVyJyx2YWx1ZTpmdW5jdGlvbiByZW5kZXIoKXtyZXR1cm4gX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19fZGVmYXVsdC5hLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLF9leHRlbmRzKHt9LF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9ib3VuZGxlc3NfdXRpbHNfb21pdF9rZXlzX19fZGVmYXVsdCgpKHRoaXMucHJvcHMsUG9ydGFsLmludGVybmFsS2V5cyksX2RlZmluZVByb3BlcnR5KHt9LFBvcnRhbC5QT1JUQUxfREFUQV9BVFRSSUJVVEUsdGhpcy5wcm9wcy5wb3J0YWxJZHx8dGhpcy5pZCkpKTt9fV0pO3JldHVybiBQb3J0YWw7fShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX19kZWZhdWx0LmEuQ29tcG9uZW50KTtQb3J0YWwucHJvcFR5cGVzPXsnKic6X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX3JlYWN0X19bXCJQcm9wVHlwZXNcIl0uYW55LGNoaWxkcmVuOl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9yZWFjdF9fX2RlZmF1bHQuYS5Qcm9wVHlwZXMubm9kZSxkZXN0aW5hdGlvbjpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KSxwb3J0YWxJZDpfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfcmVhY3RfX1tcIlByb3BUeXBlc1wiXS5zdHJpbmd9O1BvcnRhbC5kZWZhdWx0UHJvcHM9e2NoaWxkcmVuOm51bGwsZGVzdGluYXRpb246ZG9jdW1lbnQuYm9keSxwb3J0YWxJZDpudWxsfTtQb3J0YWwuaW50ZXJuYWxLZXlzPU9iamVjdC5rZXlzKFBvcnRhbC5kZWZhdWx0UHJvcHMpO1BvcnRhbC5QT1JUQUxfREFUQV9BVFRSSUJVVEU9J2RhdGEtcG9ydGFsLWlkJzsvKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gUG9ydGFsO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGluZGV4LmpzIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDNkMWE4OGM4ZDhiYjQ1ZmNjMDkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtb21pdC1rZXlzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwiYm91bmRsZXNzLXV0aWxzLW9taXQta2V5c1wifVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib3VuZGxlc3MtdXRpbHMtdXVpZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qczJcIjpcImJvdW5kbGVzcy11dGlscy11dWlkXCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzMlwiOlwicmVhY3QtZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBvbWl0IGZyb20gJ2JvdW5kbGVzcy11dGlscy1vbWl0LWtleXMnO1xuaW1wb3J0IHV1aWQgZnJvbSAnYm91bmRsZXNzLXV0aWxzLXV1aWQnO1xuXG4vKipcbl9fQSBoaWdoZXItb3JkZXIgY29tcG9uZW50IGZvciB0aGUgcmVuZGVyaW5nIG9mIGNvbXBvbmVudHMgb3V0c2lkZSB0aGUgbm9ybWFsIFJlYWN0IHRyZWUuX19cblxuYFBvcnRhbGAgaXMgdXNlZCBpbiBvdGhlciBjb21wb25lbnRzIHN1Y2ggYXMgYFBvcG92ZXJgIHRvIHJlbmRlciBjb250ZW50IHRvIHBsYWNlcyBsaWtlIHRoZSBIVE1MIGA8Ym9keT5gIHRhZywgYXZvaWRpbmcgc3R5bGUgbGVha2FnZSBhbmQgcGFyZW50IGxheW91dCBjb250ZXh0cy4gT25seSBhY2NlcHRzIGEgc2luZ2xlIHRvcC1sZXZlbCBjaGlsZDsgbmFrZWQgdGV4dCwgZXRjIHdpbGwgYmUgd3JhcHBlZCBpbiBhIGA8ZGl2PmAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFueSBbUmVhY3Qtc3VwcG9ydGVkIGF0dHJpYnV0ZV0oaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90YWdzLWFuZC1hdHRyaWJ1dGVzLmh0bWwjaHRtbC1hdHRyaWJ1dGVzKVxuICAgICAgICAgKi9cbiAgICAgICAgJyonOiBQcm9wVHlwZXMuYW55LFxuXG4gICAgICAgIC8vIHNpbmdsZSBjaGlsZCBvbmx5IC0gYXJyYXlzIG5vdCBhbGxvd2VkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFueSBub3JtYWwgUmVhY3QgY2hpbGQsIGJ1dCBtdXN0IGJlIHNpbmd1bGFyOyBtdWx0aXBsZSBzaWJsaW5nIGNoaWxkcmVuIG11c3QgaGF2ZSBhIGNvbW1vbiB3cmFwcGVyLCBzdWNoIGFzIGEgXCJsYXlvdXRcIiBgPGRpdj5gXG5cbiAgICAgICAgICog4pyFIE9LOlxuXG4gICAgICAgICAqIGBgYGpzeFxuICAgICAgICAgKiA8UG9ydGFsPlxuICAgICAgICAgKiAgIGZvb1xuICAgICAgICAgKiA8L1BvcnRhbD5cblxuICAgICAgICAgKiA8UG9ydGFsPlxuICAgICAgICAgKiAgIDxkaXY+Zm9vPC9kaXY+XG4gICAgICAgICAqIDwvUG9ydGFsPlxuXG4gICAgICAgICAqIDxQb3J0YWw+XG4gICAgICAgICAqICAgPGRpdj5cbiAgICAgICAgICogICAgICAgPGRpdj5mb288L2Rpdj5cbiAgICAgICAgICogICAgICAgPGRpdj5iYXI8L2Rpdj5cbiAgICAgICAgICogICA8L2Rpdj5cbiAgICAgICAgICogPC9Qb3J0YWw+XG4gICAgICAgICAqIGBgYFxuXG4gICAgICAgICAqIOKblO+4jyBOb3QgT0s6XG5cbiAgICAgICAgICogYGBganN4XG4gICAgICAgICAqIDxQb3J0YWw+XG4gICAgICAgICAqICAgPGRpdj5mb288L2Rpdj5cbiAgICAgICAgICogICA8ZGl2PmJhcjwvZGl2PlxuICAgICAgICAgKiA8L1BvcnRhbD5cbiAgICAgICAgICogYGBgXG4gICAgICAgICAqL1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBsb2NhdGlvbiB0byBhcHBlbmQgdGhlIGdlbmVyYXRlZCBwb3J0YWwgYW5kIGNoaWxkIGVsZW1lbnRzXG4gICAgICAgICAqL1xuICAgICAgICBkZXN0aW5hdGlvbjogUHJvcFR5cGVzLmluc3RhbmNlT2YoSFRNTEVsZW1lbnQpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgSUQgdXNlZCB0byBsaW5rIHRoZSBwb3J0YWwgb3JpZ2luIHRvIHRoZSBkZXN0aW5hdGlvbjsgYWRkZWQgdG8gZ2VuZXJhdGVkIGA8ZGl2PmAgYXBwZW5kZWQgdG8gdGhlIGRlc3RpbmF0aW9uIEhUTUwgbm9kZVxuICAgICAgICAgKi9cbiAgICAgICAgcG9ydGFsSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICAgIGRlc3RpbmF0aW9uOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICBwb3J0YWxJZDogbnVsbCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoUG9ydGFsLmRlZmF1bHRQcm9wcylcblxuICAgIHN0YXRpYyBQT1JUQUxfREFUQV9BVFRSSUJVVEUgPSAnZGF0YS1wb3J0YWwtaWQnXG5cbiAgICBpZCA9IHV1aWQoKVxuXG4gICAgLy8gdGhlIDxkaXY+IHRoYXQgdGhlIGNoaWxkcmVuIGFyZSByZW5kZXJlZCBpbnRvXG4gICAgJHBvcnRhbCA9IG51bGxcblxuICAgIC8vIHRoZSB0b3AtbGV2ZWwgY2hpbGQgcmVuZGVyZWQgaW50byB0aGUgJHBvcnRhbFxuICAgICRwYXNzZW5nZXIgPSBudWxsO1xuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLiRwb3J0YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kZXN0aW5hdGlvbi5hcHBlbmRDaGlsZCh0aGlzLiRwb3J0YWwpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpO1xuICAgIH1cblxuICAgIHJlbmRlclBvcnRhbGxlZENvbnRlbnQoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbikgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogKDxkaXY+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvcnRhbCBJRCBsaW5rIGlmIG5lZWRlZFxuICAgICAgICB0aGlzLiRwb3J0YWwuaWQgPSB0aGlzLnByb3BzLnBvcnRhbElkIHx8IHRoaXMuaWQ7XG5cbiAgICAgICAgUmVhY3RET00udW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXIodGhpcywgY2hpbGQsIHRoaXMuJHBvcnRhbCk7XG4gICAgICAgIHRoaXMuJHBhc3NlbmdlciA9IHRoaXMuJHBvcnRhbC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMucmVuZGVyUG9ydGFsbGVkQ29udGVudCgpOyB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLiRwb3J0YWwpO1xuICAgICAgICB0aGlzLnByb3BzLmRlc3RpbmF0aW9uLnJlbW92ZUNoaWxkKHRoaXMuJHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBQb3J0YWwuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICB7Li4ue1tQb3J0YWwuUE9SVEFMX0RBVEFfQVRUUklCVVRFXTogdGhpcy5wcm9wcy5wb3J0YWxJZCB8fCB0aGlzLmlkfX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWNrYWdlcy9ib3VuZGxlc3MtcG9ydGFsL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==