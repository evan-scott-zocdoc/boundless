"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){for(var props=["transform","WebkitTransform","MozTransform","OTransform","msTransform","webkit-transform"],i=0,len=props.length;len>i;i++)if(props[i]in document.documentElement.style)return props[i];return!1}();