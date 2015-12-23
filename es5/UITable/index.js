"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_transform=require("../UIUtils/transform"),_transform2=_interopRequireDefault(_transform),_noop=require("../UIUtils/noop"),_noop2=_interopRequireDefault(_noop),cellClassRegex=/\s?ui-table-cell\b/g,rowClassRegex=/\s?ui-table-row\b/g,activeClassRegex=/\s?ui-table-row-active/g,loadingClassRegex=/\s?ui-table-row-loading/g,evenClassRegex=/\s?ui-table-row-even/g,oddClassRegex=/\s?ui-table-row-odd/g,_findWhereIndex=null,findWhere=function(array,property,value){for(_findWhereIndex=array.length-1;_findWhereIndex>-1;){if(array[_findWhereIndex][property]===value)return array[_findWhereIndex];_findWhereIndex-=1}},reparentCellText=function(node,content){node.childNodes.length&&3===node.childNodes[0].nodeType&&node.removeChild(node.childNodes[0]);var text=document.createElement("div");text.className="ui-table-cell-inner";var textNode=document.createTextNode(content);return text.appendChild(textNode),node.appendChild(text),textNode},createDOMCell=function(content,mapping,width){var cell=document.createElement("div");return cell.className="ui-table-cell",cell.setAttribute("title",content),cell.setAttribute("data-column",mapping),cell.appendChild(document.createTextNode(content)),width&&(cell.style.width=width+"px",reparentCellText(cell,content)),cell},createDOMHeaderCell=function(column,width){var cell=createDOMCell(column.title,column.mapping,width);if(cell.className+=" ui-table-header-cell",column.resizable){var handle=document.createElement("div");handle.className="ui-table-header-cell-resize-handle",cell.appendChild(handle)}return cell},createHeaderCell=function(metadata,width){var node=createDOMHeaderCell(metadata,metadata.width||width),cs=window.getComputedStyle(node);return{_textNode:3===node.childNodes[0].nodeType?node.childNodes[0]:node.children[0].childNodes[0],_metadata:metadata,_title:metadata.title,get title(){return this._title},set title(val){val!==this._title&&(this._title=val,this.node.setAttribute("title",this._title),this._textNode.nodeValue=this._title)},_width:metadata.width||width,get width(){return this._width},set width(val){val!==this._width&&(this._width=val,this.node.style.width=this._width+"px",3===this.node.childNodes[0].nodeType&&(this._textNode=reparentCellText(this.node,this._title)))},mapping:metadata.mapping,minWidth:parseInt(cs["min-width"],10),maxWidth:parseInt(cs["max-width"],10),node:node}},createCell=function(content,mapping,width){var node=createDOMCell(content,mapping,width);return{_textNode:3===node.childNodes[0].nodeType?node.childNodes[0]:node.children[0].childNodes[0],_content:content,get content(){return this._content},set content(val){val!==this._content&&(this._content=val,this.node.setAttribute("title",this._content),this._textNode.nodeValue=this._content)},_width:width,get width(){return this._width},set width(val){val!==this._width&&(this._width=val,this.node.style.width=this._width+"px",3===this.node.childNodes[0].nodeType&&(this._textNode=reparentCellText(this.node,this._content)))},node:node}},createDOMRow=function(setIndex,y){var row=document.createElement("div");return row.className="ui-table-row",row.style[_transform2.default]=translate3d(0,y),row},createRow=function(metadata,columns){var row=createDOMRow(metadata.setIndex,metadata.y),cells=[],fragment=document.createDocumentFragment();columns.forEach(function(column,index){cells.push(createCell("",column.mapping,column.width)),fragment.appendChild(cells[index].node)}),row.appendChild(fragment),fragment=null;var rowObj={node:row,cells:cells,_iterator:null,_active:!1,get active(){return this._active},set active(val){val!==this._active&&(this._active=val,val?this.node.className+=" ui-table-row-active":this.node.className=this.node.className.replace(activeClassRegex,""))},_setIndex:null,get setIndex(){return this._setIndex},set setIndex(val){val!==this._setIndex&&(this._setIndex=val,this._setIndex%2===0?(this.node.className=this.node.className.replace(oddClassRegex,""),this.node.className+=" ui-table-row-even"):(this.node.className=this.node.className.replace(evenClassRegex,""),this.node.className+=" ui-table-row-odd"))},_data:null,_waitingForResolution:!1,set _waitingForResolution(val){val!==this._waitingForResolution&&(val?this.node.className+=" ui-table-row-loading":this.node.className=this.node.className.replace(loadingClassRegex,""))},get data(){return this._data},set data(val){if(val!==this._data)if(this._data=val,this._data instanceof Promise){for(this._data.then(function(promise,resolvedVal){this._data===promise&&(this.data=resolvedVal)}.bind(this,this._data)),this._iterator=0;this._iterator<this.cells.length;this._iterator+=1)this.cells[this._iterator].content="";this._waitingForResolution=!0}else if(this._data){for(this._iterator=0;this._iterator<this.cells.length;this._iterator+=1)this.cells[this._iterator].content=this._data[columns[this._iterator].mapping];this._waitingForResolution=!1}else{for(this._iterator=0;this._iterator<this.cells.length;this._iterator+=1)this.cells[this._iterator].content="";this._waitingForResolution=!1}},_y:metadata.y,get y(){return this._y},set y(val){val!==this._y&&(this._y=val,this.node.style[_transform2.default]=translate3d(0,this._y))}};return rowObj.setIndex=metadata.setIndex,rowObj.data=metadata.data,rowObj},translate3d=function(){var x=arguments.length<=0||void 0===arguments[0]?0:arguments[0],y=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return"translate3d("+x+"px, "+y+"px, 0px)"},UITable=function(_UIView){function UITable(){var _Object$getPrototypeO;_classCallCheck(this,UITable);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];var _this=_possibleConstructorReturn(this,(_Object$getPrototypeO=Object.getPrototypeOf(UITable)).call.apply(_Object$getPrototypeO,[this].concat(args)));return _this._columns=[],_this._rows=[],_this._rowsOrderedByY=[],_this.handleClick=_this.handleClick.bind(_this),_this.handleKeyDown=_this.handleKeyDown.bind(_this),_this.handleMoveIntent=_this.handleMoveIntent.bind(_this),_this.handleXScrollHandleDragStart=_this.handleXScrollHandleDragStart.bind(_this),_this.handleYScrollHandleDragStart=_this.handleYScrollHandleDragStart.bind(_this),_this.handleDragMove=_this.handleDragMove.bind(_this),_this.handleDragEnd=_this.handleDragEnd.bind(_this),_this.handleColumnDragStart=_this.handleColumnDragStart.bind(_this),_this}return _inherits(UITable,_UIView),_createClass(UITable,[{key:"componentDidMount",value:function(){this._body=this.refs.body,this._body_s=this._body.style,this._header=this.refs.header,this._header_s=this._header.style,this._xScrollHandle_s=this.refs["x-scroll-handle"].style,this._yScrollHandle_s=this.refs["y-scroll-handle"].style,this.regenerate(),this.refs.wrapper.addEventListener("wheel",this.handleMoveIntent),this.refs.wrapper.addEventListener("mousemove",this.handleDragMove),this.refs.wrapper.addEventListener("keydown",this.handleKeyDown),this._header.addEventListener("mousedown",this.handleColumnDragStart),this._body.addEventListener("click",this.handleClick),this.refs["x-scroll-handle"].addEventListener("mousedown",this.handleXScrollHandleDragStart),this.refs["y-scroll-handle"].addEventListener("mousedown",this.handleYScrollHandleDragStart)}},{key:"componentWillUnmount",value:function(){this.refs.wrapper.removeEventListener("wheel",this.handleMoveIntent),this.refs.wrapper.removeEventListener("mousemove",this.handleDragMove),this.refs.wrapper.removeEventListener("keydown",this.handleKeyDown),this._header.removeEventListener("mousedown",this.handleColumnDragStart),this._body.removeEventListener("click",this.handleClick),this.refs["x-scroll-handle"].removeEventListener("mousedown",this.handleXScrollHandleDragStart),this.refs["y-scroll-handle"].removeEventListener("mousedown",this.handleYScrollHandleDragStart),this.emptyHeader(),this.emptyBody()}},{key:"componentDidUpdate",value:function(){this.regenerate()}},{key:"resetInternals",value:function(){this._x=this._y=0,this._nextX=this._nextY=0,this._xScrollHandlePosition=0,this._yScrollHandlePosition=0,this._activeRow=-1,this._nextActiveRow=null,this._iterator=null,this._nRowsToShift=null,this._orderedYArrayTargetIndex=null,this._rowPointer=null,this._shiftDelta=null,this._targetIndex=null,this._xScrollHandleSize=null,this._yScrollHandleSize=null,this.performTranslations()}},{key:"emptyHeader",value:function(){for(this._columns.length=0;this._header.firstChild;)this._header.removeChild(this._header.firstChild)}},{key:"buildColumns",value:function(){var _this2=this;this.emptyHeader(),this.props.columns.forEach(function(column,index){return _this2._columns.push(createHeaderCell(column))})}},{key:"injectHeaderCells",value:function(){var _this3=this;this._fragment=document.createDocumentFragment(),this._columns.forEach(function(column){return _this3._fragment.appendChild(column.node)}),this._header.appendChild(this._fragment),this._fragment=null}},{key:"emptyBody",value:function(){for(this._rows.length=0,this._rowsOrderedByY.length=0;this._body.firstChild;)this._body.removeChild(this._body.firstChild)}},{key:"injectFirstRow",value:function(){this.emptyBody(),this._rows.push(createRow({data:this.props.getRow(0),setIndex:0,y:0},this._columns)),this._rowsOrderedByY.push(0),this._body.appendChild(this._rows[0].node)}},{key:"injectRestOfRows",value:function(){for(this._fragment=document.createDocumentFragment(),this._iterator=1;this._iterator<this._nRowsToRender;this._iterator+=1)this._rows.push(createRow({data:this.props.getRow(this._iterator),setIndex:this._iterator,y:this._cell_h*this._iterator},this._columns)),this._rowsOrderedByY.push(this._iterator),this._fragment.appendChild(this._rows[this._iterator].node);this._body.appendChild(this._fragment),this._fragment=null}},{key:"calculateCellWidths",value:function(){var _this4=this;this._rows[0].cells.forEach(function(cell,index){_this4._columns[index].width=_this4._columns[index].width||cell.node.getBoundingClientRect().width,cell.width=_this4._columns[index].width})}},{key:"calculateXBound",value:function(){this._row_w=this._rows[0].node.clientWidth||500,this._xMaximum=this._container_w<=this._row_w?this._container_w-this._row_w:0}},{key:"calculateYBound",value:function(){this._yUpperBound=0,this._yLowerBound=this._container_h-this._nRowsToRender*this._cell_h}},{key:"calculateXScrollHandleSize",value:function(){return this._xScrollHandleSize=this._container_w-Math.abs(this._xMaximum),this._xScrollHandleSize<12&&(this._xScrollHandleSize=12),this._xScrollHandleSize}},{key:"calculateYScrollHandleSize",value:function(){return this._yScrollHandleSize=this._container_h*(this._nRowsToRender/this.props.totalRows),this._yScrollHandleSize<12&&(this._yScrollHandleSize=12),this._yScrollHandleSize}},{key:"initializeScrollBars",value:function(){this._xScrollHandle_s.width=this.calculateXScrollHandleSize()+"px",this._yScrollHandle_s.height=this.calculateYScrollHandleSize()+"px"}},{key:"regenerate",value:function(){this.resetInternals(),this.buildColumns(),this.injectFirstRow(),this.calculateCellWidths(),this._cell_h=this._rows[0].cells[0].node.clientHeight||40,this._container_h=this.refs.wrapper.clientHeight||150,this._container_w=this.refs.wrapper.clientWidth||500,this._xScrollTrack_w=this.refs["x-scroll-track"].clientWidth||500,this._yScrollTrack_h=this.refs["y-scroll-track"].clientHeight||150,this._nRowsToRender=Math.ceil(1.3*this._container_h/this._cell_h),this._nRowsToRender>this.props.totalRows&&(this._nRowsToRender=this.props.totalRows),this._rowStartIndex=0,this._rowEndIndex=this._nRowsToRender,this.calculateXBound(),this.calculateYBound(),this.injectHeaderCells(),this.injectRestOfRows(),this.initializeScrollBars()}},{key:"handleScrollDown",value:function(){if(!(this._rowEndIndex===this.props.totalRows||this._nextY>=this._yLowerBound)){if(this._nRowsToShift=Math.ceil(Math.abs(this._nextY-this._yLowerBound)/this._cell_h),this._nRowsToShift+this._rowEndIndex+1>this.props.totalRows&&(this._nRowsToShift=this.props.totalRows-this._rowEndIndex+1),this._nRowsToShift>0&&(this._nRowsToShift>this._nRowsToRender&&(this._shiftDelta=this._nRowsToShift-this._nRowsToRender,this._yUpperBound-=this._shiftDelta*this._cell_h,this._yLowerBound-=this._shiftDelta*this._cell_h,this._rowStartIndex+=this._shiftDelta,this._rowEndIndex+=this._shiftDelta,this._nRowsToShift=this._nRowsToRender),this._nRowsToShift>0)){for(this._iterator=0;this._iterator<this._nRowsToShift;this._iterator+=1)this._targetIndex=this._rowEndIndex+this._iterator,this._rowPointer=this._rows[this._rowsOrderedByY[0]],this._rowPointer.data=this.props.getRow(this._targetIndex),this._rowPointer.setIndex=this._targetIndex,this._rowPointer.y=this._targetIndex*this._cell_h,this._rowPointer.active=this._targetIndex===this._activeRow,this._rowsOrderedByY.push(this._rowsOrderedByY.shift());this._rowStartIndex+=this._nRowsToShift,this._rowEndIndex+=this._nRowsToShift,this._yUpperBound-=this._nRowsToShift*this._cell_h,this._yLowerBound-=this._nRowsToShift*this._cell_h}this._rowPointer=null}}},{key:"handleScrollUp",value:function(){if(!(0===this._rowStartIndex||this._nextY<=this._yUpperBound)){if(this._nRowsToShift=Math.ceil(Math.abs(this._nextY-this._yUpperBound)/this._cell_h),this._rowStartIndex-this._nRowsToShift<0&&(this._nRowsToShift=this._rowStartIndex),this._nRowsToShift>0&&(this._nRowsToShift>this._nRowsToRender&&(this._shiftDelta=this._nRowsToShift-this._nRowsToRender,this._yUpperBound+=this._shiftDelta*this._cell_h,this._yLowerBound+=this._shiftDelta*this._cell_h,this._rowStartIndex-=this._shiftDelta,this._rowEndIndex-=this._shiftDelta,this._nRowsToShift=this._nRowsToRender),this._nRowsToShift>0)){for(this._orderedYArrayTargetIndex=this._rowsOrderedByY.length-1,this._iterator=0;this._iterator<this._nRowsToShift;this._iterator+=1)this._targetIndex=this._rowStartIndex-this._iterator-1,this._rowPointer=this._rows[this._rowsOrderedByY[this._orderedYArrayTargetIndex]],this._rowPointer.data=this.props.getRow(this._targetIndex),this._rowPointer.setIndex=this._targetIndex,this._rowPointer.y=this._targetIndex*this._cell_h,this._rowPointer.active=this._targetIndex===this._activeRow,this._rowsOrderedByY.unshift(this._rowsOrderedByY.pop());this._rowStartIndex-=this._nRowsToShift,this._rowEndIndex-=this._nRowsToShift,this._yUpperBound+=this._nRowsToShift*this._cell_h,this._yLowerBound+=this._nRowsToShift*this._cell_h}this._rowPointer=null}}},{key:"handleMoveIntent",value:function(event){var _this5=this;event.preventDefault(),0===event.deltaX&&0===event.deltaY||this._manuallyScrollingY&&0===event.deltaY||this._manuallyScrollingX&&0===event.deltaX||(this._deltaX=event.deltaX,this._deltaY=1===event.deltaMode?parseInt(event.deltaY)*this._cell_h:event.deltaY,this._nextX=this._manuallyScrollingY?0:this._x-this._deltaX,this._nextX>0?this._nextX=0:this._nextX<this._xMaximum&&(this._nextX=this._xMaximum),this._nextY=this._manuallyScrollingX?0:this._y-this._deltaY,window.requestAnimationFrame(function(){_this5._nextY<_this5._y?_this5.handleScrollDown():_this5._nextY>_this5._y&&_this5.handleScrollUp(),_this5._nextY>0?_this5._nextY=0:_this5._nextY<_this5._yLowerBound&&(_this5._nextY=_this5._yLowerBound),0===_this5._nextX?_this5._xScrollHandlePosition=0:(_this5._xScrollHandlePosition=Math.abs(_this5._nextX)/(_this5._row_w-_this5._container_w)*(_this5._xScrollTrack_w-_this5._xScrollHandleSize),_this5._xScrollHandlePosition+_this5._xScrollHandleSize>_this5._xScrollTrack_w&&(_this5._xScrollHandlePosition=_this5._xScrollTrack_w-_this5._xScrollHandleSize)),0===_this5.nextY?_this5._yScrollHandlePosition=0:(_this5._yScrollHandlePosition=Math.abs(_this5._nextY)/(_this5.props.totalRows*_this5._cell_h-_this5._container_h)*(_this5._yScrollTrack_h-_this5._yScrollHandleSize),_this5._yScrollHandlePosition+_this5._yScrollHandleSize>_this5._yScrollTrack_h&&(_this5._yScrollHandlePosition=_this5._yScrollTrack_h-_this5._yScrollHandleSize)),_this5.performTranslations(),_this5._x=_this5._nextX,_this5._y=_this5._nextY}))}},{key:"performTranslations",value:function(){this._header_s[_transform2.default]=translate3d(this._nextX),this._body_s[_transform2.default]=translate3d(this._nextX,this._nextY),this._xScrollHandle_s[_transform2.default]=translate3d(this._xScrollHandlePosition),this._yScrollHandle_s[_transform2.default]=translate3d(0,this._yScrollHandlePosition)}},{key:"handleXScrollHandleDragStart",value:function(event){0===event.button&&(event.preventDefault(),this._lastXScroll=event.clientX,this._manuallyScrollingX=!0,window.addEventListener("mouseup",this.handleDragEnd,!0))}},{key:"handleYScrollHandleDragStart",value:function(event){0===event.button&&(event.preventDefault(),this._lastYScroll=event.clientY,this._manuallyScrollingY=!0,window.addEventListener("mouseup",this.handleDragEnd,!0))}},{key:"handleDragMove",value:function(event){0===event.button&&(this._manuallyResizingColumn&&(this.handleColumnResize(event.clientX-this._lastColumnX),this._lastColumnX=event.clientX),this._manuallyScrollingX&&(this.handleMoveIntent({deltaX:event.clientX-this._lastXScroll,deltaY:0,preventDefault:_noop2.default}),this._lastXScroll=event.clientX),this._manuallyScrollingY&&(this.handleMoveIntent({deltaX:0,deltaY:(event.clientY-this._lastYScroll)/this._container_h*this.props.totalRows*this._cell_h,preventDefault:_noop2.default}),this._lastYScroll=event.clientY))}},{key:"handleDragEnd",value:function(){window.removeEventListener("mouseup",this.handleDragEnd,!0),this._manuallyScrollingX=this._manuallyScrollingY=this._manuallyResizingColumn=!1}},{key:"handleColumnDragStart",value:function(event){0===event.button&&"ui-table-header-cell-resize-handle"===event.target.className&&(event.preventDefault(),this._lastColumnX=event.clientX,this._manuallyResizingColumn=findWhere(this._columns,"mapping",event.target.parentNode.getAttribute("data-column")),window.addEventListener("mouseup",this.handleDragEnd,!0))}},{key:"handleColumnResize",value:function(delta){var _this6=this;if(0!==delta){var adjustedDelta=delta,index=this._columns.indexOf(this._manuallyResizingColumn);0>adjustedDelta&&!isNaN(this._manuallyResizingColumn.minWidth)&&this._manuallyResizingColumn.width+adjustedDelta<this._manuallyResizingColumn.minWidth?adjustedDelta=this._manuallyResizingColumn.minWidth-this._manuallyResizingColumn.width:!isNaN(this._manuallyResizingColumn.maxWidth)&&this._manuallyResizingColumn.width+adjustedDelta>this._manuallyResizingColumn.maxWidth&&(adjustedDelta=this._manuallyResizingColumn.maxWidth-this._manuallyResizingColumn.width),this._manuallyResizingColumn.width=this._manuallyResizingColumn.width+adjustedDelta,this._rows.forEach(function(row){return row.cells[index].width=_this6._manuallyResizingColumn.width}),this.calculateXBound(),this.initializeScrollBars(),0>adjustedDelta&&this.handleMoveIntent({deltaX:adjustedDelta,deltaY:0,preventDefault:_noop2.default})}}},{key:"getKeyFromKeyCode",value:function(code){switch(event.keyCode){case 40:return"ArrowDown";case 38:return"ArrowUp";case 13:return"Enter"}return null}},{key:"setAriaText",value:function(text){this.refs.aria.innerText=text}},{key:"setActiveRow",value:function(setIndex){this._activeRow=setIndex,this._rows.forEach(function(row){return row.active=row.setIndex===setIndex})}},{key:"changeActiveRow",value:function(delta){var _this7=this;this._nextActiveRow=findWhere(this._rows,"setIndex",this._activeRow+delta),this._nextActiveRow?(this.setActiveRow(this._nextActiveRow.setIndex),this.setAriaText(this._nextActiveRow.data[this._columns[0].mapping]),(-1===delta&&-1*this._nextActiveRow.y>this._y||1===delta&&-1*this._nextActiveRow.y-this._cell_h<this._y-this._container_h+this._cell_h)&&this.handleMoveIntent({deltaX:0,deltaY:this._cell_h*delta,preventDefault:_noop2.default})):(-1===delta&&this._activeRow>0||1===delta&&this._activeRow<this.props.totalRows)&&(this.handleMoveIntent({deltaX:0,deltaY:(this._rowStartIndex>this._activeRow&&this._activeRow-this._rowStartIndex||(this._rowStartIndex<this._activeRow&&this._activeRow-this._rowStartIndex)+delta)*this._cell_h,preventDefault:_noop2.default}),window.requestAnimationFrame(function(){return _this7.changeActiveRow(delta)})),this._nextActiveRow=null}},{key:"handleKeyDown",value:function(event){var _this8=this,key=event.key||this.getKeyFromKeyCode(event.keyCode);switch(key){case"ArrowDown":this.changeActiveRow(1),event.preventDefault();break;case"ArrowUp":this.changeActiveRow(-1),event.preventDefault();break;case"Enter":-1!==this._activeRow&&!function(){var row=findWhere(_this8._rows,"setIndex",_this8._activeRow).data;_this8.setAriaText(_this8._columns.map(function(column){return column.title+": "+row[column.mapping]}).join("\n"))}(),event.preventDefault()}"function"==typeof this.props.onKeyDown&&this.props.onKeyDown(event)}},{key:"discoverCellAndRowNodes",value:function(target){var node=target,nodeMap={};if(node.className.match(rowClassRegex))return{row:node};for(;(!nodeMap.cell||!nodeMap.row)&&node;)node.className.match(cellClassRegex)?nodeMap.cell=node:node.className.match(rowClassRegex)&&(nodeMap.row=node),node=node.parentNode;return nodeMap}},{key:"handleClick",value:function(event){var map=this.discoverCellAndRowNodes(event.target);if(map.row){var row=findWhere(this._rows,"node",map.row);this.setActiveRow(row.setIndex),map.cell&&this.props.onCellInteract(event,row.setIndex,map.cell.getAttribute("data-column")),this.props.onRowInteract(event,row.setIndex)}}},{key:"render",value:function(){return _react2.default.createElement("div",_extends({},this.props,{ref:"wrapper",className:"ui-table-wrapper "+this.props.className,"data-set-identifier":this.props.identifier,tabIndex:"0"}),_react2.default.createElement("div",{ref:"table",className:"ui-table"},_react2.default.createElement("div",{ref:"header",className:"ui-table-header"}),_react2.default.createElement("div",{ref:"body",className:"ui-table-body"})),_react2.default.createElement("div",null,_react2.default.createElement("div",{ref:"x-scroll-track",className:"ui-table-x-scroll-track"},_react2.default.createElement("div",{ref:"x-scroll-handle",className:"ui-table-x-scroll-handle"})),_react2.default.createElement("div",{ref:"y-scroll-track",className:"ui-table-y-scroll-track"},_react2.default.createElement("div",{ref:"y-scroll-handle",className:"ui-table-y-scroll-handle"}))),_react2.default.createElement("div",{ref:"aria",className:this.props.offscreenClass||"ui-offscreen","aria-live":"polite"}))}}]),UITable}(_UIView3.default);UITable.propTypes={columns:_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({mapping:_react2.default.PropTypes.string,resizable:_react2.default.PropTypes.bool,title:_react2.default.PropTypes.string,width:_react2.default.PropTypes.number})),getRow:_react2.default.PropTypes.func,identifier:_react2.default.PropTypes.string,offscreenClass:_react2.default.PropTypes.string,onCellInteract:_react2.default.PropTypes.func,onRowInteract:_react2.default.PropTypes.func,totalRows:_react2.default.PropTypes.number},UITable.defaultProps={className:"",columns:[],getRow:_noop2.default,offscreenClass:"ui-offscreen",onCellInteract:_noop2.default,onRowInteract:_noop2.default,totalRows:0},exports.default=UITable;