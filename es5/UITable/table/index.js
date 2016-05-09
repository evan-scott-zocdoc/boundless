'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transformProperty = require('../../UIUtils/transformProperty');

var _transformProperty2 = _interopRequireDefault(_transformProperty);

var _findWhere = require('../../UIUtils/findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _noop = require('../../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * A high-performance, infinite table view.
                                                                                                                                                           * @class TableView
                                                                                                                                                           */

/*

FOR FUTURE EYES

Scroll performance is a tricky beast -- moreso when trying to maintain 50+ FPS and pumping a lot of data to the DOM. There are a lot of choices in this component that may seem odd at first blush, but let it be known that we tried to do it the React Way™ and it was not performant enough.

The combination that was settled upon is a React shell with native DOM guts. This combination yields the best performance, while still being perfectly interoperable with the rest of UIKit and React use cases.

__Important Note__

Any time you create a document fragment, make sure you release it after by setting its variable to `null`. If you don't, it'll create a memory leak. Also, make sure all generated DOM is removed on componentWillUnmount.


ORDER OF OPERATIONS

1. render one row of cells
2. capture table & cell sizing metrics
3. render column heads and the rest of the cells

If the component updates due to new props, just blow away everything and start over. It's cheaper than trying to diff.

*/

var cellClassRegex = /\s?ui-table-cell\b/g;
var rowClassRegex = /\s?ui-table-row\b/g;

var translate3d = function translate3D() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
}; // z is never used

var reparentCellText = function reparentCellText(node, content) {
    if (node.childNodes.length && node.childNodes[0].nodeType === 3) {
        node.removeChild(node.childNodes[0]);
    }

    var text = document.createElement('div');
    text.className = 'ui-table-cell-inner';

    var textNode = document.createTextNode(content);
    text.appendChild(textNode);

    node.appendChild(text);

    return textNode;
};

var createDOMCell = function createDOMCell(content, mapping, width, index) {
    var cell = document.createElement('div');

    cell.className = 'ui-table-cell ';
    cell.className += index % 2 === 0 ? 'ui-table-cell-even' : 'ui-table-cell-odd';

    cell.setAttribute('data-column', mapping);
    cell.appendChild(document.createTextNode(content));

    if (width) {
        cell.style.width = width + 'px';
        reparentCellText(cell, content);
    }

    return cell;
};

var createDOMHeaderCell = function createDOMHeaderCell(column, width, index) {
    var cell = createDOMCell(column.title, column.mapping, width, index);
    cell.className += ' ui-table-header-cell';

    if (column.resizable) {
        var handle = document.createElement('div');
        handle.className = 'ui-table-header-cell-resize-handle';

        cell.appendChild(handle);
    }

    return cell;
};

var createHeaderCell = function createHeaderCell(metadata, index) {
    var node = createDOMHeaderCell(metadata, metadata.width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_metadata': metadata,
        '_title': metadata.title,
        get title() {
            return this._title;
        },
        set title(val) {
            if (val !== this._title) {
                this._title = val;

                this.node.setAttribute('title', this._title);
                this._textNode.nodeValue = this._title;
            }
        },
        '_width': metadata.width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._title);
                }
            }
        },
        mapping: metadata.mapping,
        node: node
    };
};

var createCell = function createCell(content, mapping, width, index) {
    var node = createDOMCell(content, mapping, width, index);

    return {
        '_textNode': node.childNodes[0].nodeType === 3 ? node.childNodes[0] : node.children[0].childNodes[0],
        '_content': content,
        get content() {
            return this._content;
        },
        set content(val) {
            if (val !== this._content) {
                this._content = val;
                this._textNode.nodeValue = this._content;
            }
        },
        '_width': width,
        get width() {
            return this._width;
        },
        set width(val) {
            if (val !== this._width) {
                this._width = val;
                this.node.style.width = this._width + 'px';

                if (this.node.childNodes[0].nodeType === 3) {
                    this._textNode = reparentCellText(this.node, this._content);
                }
            }
        },
        trueWidth: function trueWidth() {
            var style = this.node.getAttribute('style');
            var childClasses = this.node.children[0].className;

            this.node.setAttribute('style', '');

            // take off the inner class which is what causes the sizing constraint
            this.node.children[0].className = '';

            /* Capture the new adjusted size, have to use the hard way because .clientWidth returns an integer value, rather than the _actual_ width. SMH. */
            var newWidth = this.node.getBoundingClientRect().width;

            // Put everything back
            this.node.setAttribute('style', style);
            this.node.children[0].className = childClasses;

            return newWidth;
        },
        node: node
    };
};

var createDOMRow = function createDOMRow(setIndex, y) {
    var row = document.createElement('div');
    row.className = 'ui-table-row';
    row.style[_transformProperty2.default] = translate3d(0, y);

    return row;
};

var createRow = function createRow(metadata, columns) {
    /* IMPORTANT NOTE: metadata.data might be a promise. Plan accordingly. */

    var row = createDOMRow(metadata.setIndex, metadata.y);
    var cells = [];

    var fragment = document.createDocumentFragment();

    columns.forEach(function (column, index) {
        cells.push(createCell('', column.mapping, column.width, index));
        fragment.appendChild(cells[index].node);
    });

    row.appendChild(fragment);
    fragment = null;

    var rowObj = {
        node: row,
        cells: cells,
        '_iterator': null,
        '_active': false,
        get active() {
            return this._active;
        },
        set active(val) {
            if (val !== this._active) {
                this._active = val;

                if (val && this.node.className.indexOf('ui-table-row-active') === -1) {
                    this.node.className += ' ui-table-row-active';
                } else if (!val && this.node.className.indexOf('ui-table-row-active') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-active', '').trim();
                }
            }
        },
        '_setIndex': null,
        get setIndex() {
            return this._setIndex;
        },
        set setIndex(val) {
            if (val !== this._setIndex) {
                if (val % 2 === 0) {
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-even' : this.node.className.replace('ui-table-row-odd', 'ui-table-row-even');
                } else {
                    this.node.className = this._setIndex === null ? 'ui-table-row ui-table-row-odd' : this.node.className.replace('ui-table-row-even', 'ui-table-row-odd');
                }

                this.node.setAttribute('data-index', val);

                this._setIndex = val;
            }
        },
        '_waitingForResolution': false,
        get waitingForResolution() {
            return this._waitingForResolution;
        },
        set waitingForResolution(val) {
            if (val !== this._waitingForResolution) {
                this._waitingForResolution = val;

                if (val && this.node.className.indexOf('ui-table-row-loading') === -1) {
                    this.node.className += ' ui-table-row-loading';
                } else if (!val && this.node.className.indexOf('ui-table-row-loading') !== -1) {
                    this.node.className = this.node.className.replace('ui-table-row-loading', '').trim();
                }
            }
        },
        '_data': null,
        get data() {
            return this._data;
        },
        set data(val) {
            if (val !== this._data) {
                this._data = val;

                if (this._data === null || this._data instanceof Promise) {
                    for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                        this.cells[this._iterator].content = '';
                    }

                    if (this._data instanceof Promise) {
                        this._data.then(function cautiouslySetRowData(promise, resolvedVal) {
                            if (this._data === promise) {
                                this.data = resolvedVal;
                            }
                        }.bind(this, this._data));
                    }

                    this.waitingForResolution = true;

                    return;
                }

                if (this._data) {
                    if (Array.isArray(this._data)) {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[this._iterator];
                        }
                    } else {
                        for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                            this.cells[this._iterator].content = this._data[columns[this._iterator].mapping];
                        }
                    }

                    this.waitingForResolution = false;

                    return;
                }

                for (this._iterator = 0; this._iterator < this.cells.length; this._iterator += 1) {
                    this.cells[this._iterator].content = '';
                }

                this.waitingForResolution = false;
            }
        },
        '_y': metadata.y,
        get y() {
            return this._y;
        },
        set y(val) {
            if (val !== this._y) {
                this._y = val;
                this.node.style[_transformProperty2.default] = translate3d(0, this._y);
            }
        }
    };

    // Setting it separately to have the classes added automatically
    rowObj.setIndex = metadata.setIndex;
    rowObj.active = metadata.active;

    // Setting it separately so the Promise handling can take place if needed...
    rowObj.data = metadata.data;

    return rowObj;
};

var TableView = function () {
    TableView.prototype.validateColumnShape = function validateColumnShape(column) {
        return typeof column.mapping === 'string' && typeof column.resizable === 'boolean' && typeof column.title === 'string' && (column.width === undefined || typeof column.width === 'number');
    };

    TableView.prototype.validateConfiguration = function validateConfiguration(config) {
        // x-scroll-track, y-scroll-track, x-scroll-handle, y-scroll-handle, and aria are not required in static_mode
        if (config.static_mode !== undefined && typeof config.static_mode !== 'boolean') {
            throw Error('TableView was not passed a valid `static_mode`; it should be a boolean.');
        }

        if (!(config.wrapper instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `wrapper` element.');
        }

        if (!(config.header instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `header` element.');
        }

        if (!(config.body instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `body` element.');
        }

        if (!config.static_mode && !(config['x-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-track` element.');
        }

        if (!config.static_mode && !(config['y-scroll-track'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-track` element.');
        }

        if (!config.static_mode && !(config['x-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `x-scroll-handle` element.');
        }

        if (!config.static_mode && !(config['y-scroll-handle'] instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `y-scroll-handle` element.');
        }

        if (!config.static_mode && !(config.aria instanceof HTMLElement)) {
            throw Error('TableView was not passed a valid `aria` element.');
        }

        if (!Array.isArray(config.columns) || config.columns.length === 0 || !config.columns.every(this.validateColumnShape)) {
            throw Error('TableView was not passed valid `columns`. It should be an array with at least one object conforming to: {\n                mapping: string,\n                resizable: bool,\n                title: string,\n                width: number (optional),\n            }');
        }

        if (typeof config.throttleInterval !== 'number') {
            throw Error('TableView was not passed a valid `throttleInterval`; it should be a Number.');
        }

        if (typeof config.totalRows !== 'number') {
            throw Error('TableView was not passed a valid `totalRows`; it should be a Number.');
        }

        if (typeof config.getRow !== 'function') {
            throw Error('TableView was not passed a valid `getRow`; it should be a function.');
        }

        if (config.rowClickFunc !== undefined && typeof config.rowClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `rowClickFunc`; it should be a function.');
        }

        if (config.cellClickFunc !== undefined && typeof config.cellClickFunc !== 'function') {
            throw Error('TableView was not passed a valid `cellClickFunc`; it should be a function.');
        }

        if (config.columnResizeFunc !== undefined && typeof config.columnResizeFunc !== 'function') {
            throw Error('TableView was not passed a valid `columnResizeFunc`; it should be a function.');
        }

        if (typeof config.preserveScrollState !== 'boolean') {
            throw Error('TableView was not passed a valid `preserveScrollState`; it should be a boolean.');
        }
    };

    TableView.prototype.processConfiguration = function processConfiguration(config) {
        this.c = _extends({}, config);

        // fallback values
        this.c.preserveScrollState = this.c.preserveScrollState === undefined ? true : this.c.preserveScrollState;
        this.c.throttleInterval = this.c.throttleInterval || 300;
        this.c.totalRows = this.c.totalRows || 0;

        this.validateConfiguration(this.c);
    };

    function TableView(config) {
        var _this = this;

        _classCallCheck(this, TableView);

        this.handleWindowResize = function () {
            if (_this.c.wrapper.clientHeight !== _this.container_h) {
                /* more rows may be needed to display the data, so we need to rebuild */
                return _this.regenerate();
            }

            _this.calculateContainerDimensions();
            _this.calculateXBound();
            _this.initializeScrollBars();
        };

        this.handleMoveIntent = function (event) {
            event.preventDefault();

            if (event.deltaX === 0 && event.deltaY === 0) {
                return;
            }
            if (_this.y_scroll_locked && event.deltaY === 0) {
                return;
            }
            if (_this.x_scroll_locked && event.deltaX === 0) {
                return;
            }

            _this.delta_x = event.deltaX;

            // deltaMode 0 === pixels, 1 === lines
            _this.delta_y = event.deltaMode === 1 ? parseInt(event.deltaY, 10) * _this.cell_h : event.deltaY;

            /* lock the translation axis if the user is manipulating the synthetic scrollbars */
            _this.next_x = _this.y_scroll_locked ? _this.x : _this.x - _this.delta_x;
            _this.next_y = _this.x_scroll_locked ? _this.y : _this.y - _this.delta_y;

            if (_this.next_x > 0) {
                _this.next_x = 0;
            } else if (_this.next_x < _this.x_max) {
                _this.next_x = _this.x_max;
            }

            if (_this.n_rows_visible >= _this.c.totalRows) {
                /* negate the vertical movement, not enough rows to fill the body */
                _this.next_y = _this.y;
            } else if (_this.next_y < _this.y) {
                _this.scrollDown();
            } else if (_this.next_y > _this.y) {
                _this.scrollUp();
            }

            if (_this.reset_timer) {
                window.clearTimeout(_this.reset_timer);
            }

            /* reset row & wrapper Y values toward 0 to prevent overflowing */
            _this.reset_timer = window.setTimeout(function resetYAxis(instance) {
                instance.reset_timer = null;

                instance.reset_delta = instance.y_min;

                /* shift all the positioning variables */
                instance.y = instance.applyDelta(instance.reset_delta, instance.y);
                instance.y_min = instance.applyDelta(instance.reset_delta, instance.y_min);
                instance.y_max = instance.applyDelta(instance.reset_delta, instance.y_max);

                /* shift all the rows */
                instance.rows_ordered_by_y.forEach(function (position, index) {
                    instance.rows[position].y = index * instance.cell_h;
                });

                /* shift the wrapper */
                instance.translateBody(instance.x, instance.y);
            }, 100, _this);

            _this.top_visible_row_index = _this.calculateVisibleTopRowIndex();

            /* queue up translations and the browser will execute them as able, need to pass in the values that will change due to more handleMoveIntent invocations before this rAF eventually executes. */
            window.requestAnimationFrame(function rAF(nextX, currX, nextY, visibleTopRowIndex) {
                if (nextX === 0) {
                    this.x_scroll_handle_position = 0;
                } else {
                    this.x_scroll_handle_position += (nextX - currX) / this.x_table_pixel_ratio * -1;

                    if (this.x_scroll_handle_position + this.x_scroll_handle_size > this.x_scroll_track_w) {
                        this.x_scroll_handle_position = this.x_scroll_track_w - this.x_scroll_handle_size;
                    }
                }

                this.y_scroll_handle_position = visibleTopRowIndex * this.y_scrollbar_pixel_ratio;

                if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
                    this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
                }

                // Do all transforms grouped together
                this.performTranslations(nextX, nextY);
            }.bind(_this, _this.next_x, _this.x, _this.next_y, _this.top_visible_row_index));

            _this.x = _this.next_x;
            _this.y = _this.next_y;
        };

        this.handleTouchMove = function (event) {
            event.preventDefault();

            /* we handle touchmove by detecting the delta of pageX/Y and forwarding
            it to handleMoveIntent() */

            _this.touch = event.touches.item(0);

            _this.evt.deltaX = _this.last_touch_pageX - _this.touch.pageX;
            _this.evt.deltaY = _this.last_touch_pageY - _this.touch.pageY;

            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleTouchStart = function (event) {
            _this.touch = event.touches.item(0);
            _this.last_touch_pageX = _this.touch.pageX;
            _this.last_touch_pageY = _this.touch.pageY;
        };

        this.handleAdvanceToXScrollTrackLocation = function (event) {
            if (_this.x_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-x-scroll-track') {
                return;
            }

            _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
            _this.evt.deltaY = 0;

            _this.handleMoveIntent(_this.evt);

            _this.last_pageX = event.pageX;
        };

        this.handleAdvanceToYScrollTrackLocation = function (event) {
            if (_this.y_scroll_locked) {
                return;
            }
            if (event.target.className !== 'ui-table-y-scroll-track') {
                return;
            }

            _this.evt.deltaX = 0;
            _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

            _this.handleMoveIntent(_this.evt);
        };

        this.handleXScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            _this.last_pageX = event.pageX;
            _this.x_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleYScrollHandleDragStart = function (event) {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();

            /* adjusts for the pixel distance between where the handle is clicked and the top edge of it; the handle is positioned according to its top edge */
            _this.y_scroll_offset = event.offsetY;

            _this.y_scroll_locked = true;
            _this.left_button_pressed = true;

            // If the mouseup happens outside the table, it won't be detected without this listener
            window.addEventListener('mouseup', _this.handleDragEnd, true);
        };

        this.handleDragMove = function (event) {
            if (!_this.left_button_pressed) {
                return;
            }

            if (_this.y_scroll_locked) {
                if (_this.drag_timer) {
                    window.clearTimeout(_this.drag_timer);
                }

                /* x-axis doesn't need throttle protection since it doesn't cause a row fetch */
                _this.drag_timer = window.setTimeout(function () {
                    _this.drag_timer = null;

                    /* Now fetch, once drag has ceased for long enough. */
                    _this.rows.forEach(function (row) {
                        if (row.data === null) {
                            row.data = _this.c.getRow(row.setIndex);
                        }
                    });
                }, _this.c.throttleInterval);

                _this.evt.deltaX = 0;
                _this.evt.deltaY = Math.floor(_this.applyDelta(_this.last_y_scroll_handle_y, event.pageY - _this.distance_from_top - _this.y_scroll_offset) / _this.y_scrollbar_pixel_ratio) * _this.cell_h;

                _this.handleMoveIntent(_this.evt);
            } else if (_this.x_scroll_locked) {
                _this.evt.deltaX = (event.pageX - _this.last_pageX) * _this.x_table_pixel_ratio;
                _this.evt.deltaY = 0;

                _this.handleMoveIntent(_this.evt);

                _this.last_pageX = event.pageX;
            } else if (_this.column_is_resizing) {
                _this.handleColumnResize(event.pageX - _this.last_column_x);

                _this.last_column_x = event.pageX;
            }
        };

        this.handleDragEnd = function () {
            window.removeEventListener('mouseup', _this.handleDragEnd, true);

            _this.left_button_pressed = false;

            /* the browser fires the mouseup and click events simultaneously, and we don't want our click handler to be executed, so a zero-delay setTimeout works here to let the stack clear before allowing click events again. */
            window.setTimeout(function () {
                return _this.unlockDragToScroll();
            }, 0);
        };

        this.handleColumnDragStart = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                // Fixes dragStart occasionally happening and breaking the simulated drag
                event.preventDefault();

                _this.left_button_pressed = true;

                _this.last_column_x = event.pageX;

                _this.column_is_resizing = (0, _findWhere2.default)(_this.columns, 'mapping', event.target.parentNode.getAttribute('data-column'));

                // If the mouseup happens outside the table, it won't be detected without this listener
                window.addEventListener('mouseup', _this.handleDragEnd, true);
            }
        };

        this.handleColumnAutoExpand = function (event) {
            if (event.button === 0 && event.target.className === 'ui-table-header-cell-resize-handle') {
                (function () {
                    var mapping = event.target.parentNode.getAttribute('data-column');
                    var column = (0, _findWhere2.default)(_this.columns, 'mapping', mapping);
                    var columnIndex = _this.columns.indexOf(column);

                    var width = column.width;
                    var cellWidth = void 0;

                    _this.rows.forEach(function (row) {
                        if (!(row.data instanceof Promise) && row.data !== null) {
                            cellWidth = row.cells[columnIndex].trueWidth();
                            width = width < cellWidth ? cellWidth : width;
                        }
                    }); /* find the rendered row with the longest content entry */

                    _this.applyNewColumnWidth(columnIndex, width);
                })();
            }
        };

        this.handleKeyDown = function (event) {
            var key = event.key || _this.getKeyFromKeyCode(event.keyCode);

            switch (key) {
                case 'ArrowDown':
                    _this.changeActiveRow(1);
                    event.preventDefault();
                    break;

                case 'ArrowUp':
                    _this.changeActiveRow(-1);
                    event.preventDefault();
                    break;

                case 'Enter':
                    if (_this.active_row !== -1) {
                        (function () {
                            var row = (0, _findWhere2.default)(_this.rows, 'setIndex', _this.active_row).data;

                            _this.setAriaText(_this.columns.map(function (column) {
                                return column.title + ': ' + row[column.mapping];
                            }).join('\n'));
                        })();
                    }

                    event.preventDefault();
                    break;
            }
        };

        this.handleClick = function (event) {
            var map = _this.discoverCellAndRowNodes(event.target);

            if (map.row) {
                var row = (0, _findWhere2.default)(_this.rows, 'node', map.row);

                _this.setActiveRow(row.setIndex);

                if (map.cell && _this.c.cellClickFunc) {
                    _this.c.cellClickFunc(event, row.setIndex, map.cell.getAttribute('data-column'));
                }

                if (_this.c.rowClickFunc) {
                    _this.c.rowClickFunc(event, row.setIndex);
                }
            }
        };

        this.processConfiguration(config);

        this.body = this.c.body;
        this.body_style = this.body.style;
        this.header = this.c.header;
        this.header_style = this.header.style;

        if (!this.c.static_mode) {
            this.x_scroll_handle_style = this.c['x-scroll-handle'].style;
            this.y_scroll_handle_style = this.c['y-scroll-handle'].style;
        }

        this.resetInternals();
        this.resetActiveRow();

        /* used in scroll state preservation calculations */
        this.__x = this.__y = this.__row_start_index = null;

        this.regenerate();

        if (!this.c.static_mode) {
            window.addEventListener('resize', this.handleWindowResize);
            window.addEventListener('mousemove', this.handleDragMove);

            this.c.wrapper.addEventListener('wheel', this.handleMoveIntent);
            this.c.wrapper.addEventListener('touchstart', this.handleTouchStart);
            this.c.wrapper.addEventListener('touchmove', this.handleTouchMove);

            this.c.wrapper.addEventListener('keydown', this.handleKeyDown);

            this.header.addEventListener('mousedown', this.handleColumnDragStart);
            this.header.addEventListener('dblclick', this.handleColumnAutoExpand);

            this.body.addEventListener('click', this.handleClick);

            this.c['x-scroll-handle'].addEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].addEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.c['x-scroll-track'].addEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].addEventListener('click', this.handleAdvanceToYScrollTrackLocation);
        }
    }

    TableView.prototype.destroy = function destroy() {
        var _this2 = this;

        if (!this.c.static_mode) {
            window.removeEventListener('resize', this.handleWindowResize);
            window.removeEventListener('mousemove', this.handleDragMove);

            this.c.wrapper.removeEventListener('wheel', this.handleMoveIntent);
            this.c.wrapper.removeEventListener('touchstart', this.handleTouchStart);
            this.c.wrapper.removeEventListener('touchmove', this.handleTouchMove);

            this.c.wrapper.removeEventListener('keydown', this.handleKeyDown);

            this.header.removeEventListener('mousedown', this.handleColumnDragStart);
            this.header.removeEventListener('dblclick', this.handleColumnAutoExpand);

            this.body.removeEventListener('click', this.handleClick);

            this.c['x-scroll-handle'].removeEventListener('mousedown', this.handleXScrollHandleDragStart);
            this.c['y-scroll-handle'].removeEventListener('mousedown', this.handleYScrollHandleDragStart);

            this.c['x-scroll-track'].removeEventListener('click', this.handleAdvanceToXScrollTrackLocation);
            this.c['y-scroll-track'].removeEventListener('click', this.handleAdvanceToYScrollTrackLocation);
        }

        this.emptyHeader();
        this.emptyBody();

        // release cached DOM nodes
        Object.keys(this.c).forEach(function (key) {
            if (_this2.c[key] instanceof HTMLElement) {
                _this2.c[key] = null;
            }
        });
    };

    TableView.prototype.resetActiveRow = function resetActiveRow() {
        this.active_row = -1;
        this.next_active_row = null;
    };

    TableView.prototype.resetInternals = function resetInternals() {
        this.columns = [];
        this.rows = [];
        this.rows_ordered_by_y = [];
        this.rows_ordered_by_y_length = 0;
        this.n_padding_rows = 3;

        this.x = this.y = 0;
        this.next_x = this.next_y = 0;

        this.distance_from_top = this.c['y-scroll-track'] ? this.c['y-scroll-track'].getBoundingClientRect().top + window.pageYOffset : null;

        this.x_scroll_handle_position = this.y_scroll_handle_position = 0;

        this.top_visible_row_index = 0;

        // temporary variables in various calculations
        this.i = null;
        this.n_rows_to_shift = null;
        this.ordered_y_array_index = null;
        this.ptr = null;
        this.shift_delta = null;
        this.target_index = null;

        // translation caches
        this.last_header_x = null;
        this.last_body_x = null;
        this.last_body_y = null;
        this.last_x_scroll_handle_x = null;
        this.last_y_scroll_handle_y = null;

        this.drag_timer = null;

        this.evt = { preventDefault: _noop2.default };

        this.touch = null;
        this.last_touch_pageX = this.last_touch_pageY = 0;

        this.x_scroll_track_w = this.x_scroll_track_h = this.y_scroll_track_h = null;
        this.x_scroll_handle_size = this.y_scroll_handle_size = null;

        // reset!
        this.performTranslations();
    };

    TableView.prototype.emptyHeader = function emptyHeader() {
        this.columns.length = 0;

        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    };

    TableView.prototype.buildColumns = function buildColumns() {
        var _this3 = this;

        this.emptyHeader();

        this.c.columns.forEach(function (column, index) {
            _this3.columns.push(createHeaderCell(column, index));
        });
    };

    TableView.prototype.computeMinMaxHeaderCellDimensions = function computeMinMaxHeaderCellDimensions() {
        var cs = void 0;

        this.columns.forEach(function (column) {
            cs = window.getComputedStyle(column.node);

            column.minWidth = parseInt(cs['min-width'], 10);
            column.maxWidth = parseInt(cs['max-width'], 10);
        });
    };

    TableView.prototype.injectHeaderCells = function injectHeaderCells() {
        var _this4 = this;

        this.fragment = document.createDocumentFragment();
        this.columns.forEach(function (column) {
            return _this4.fragment.appendChild(column.node);
        });

        this.header.appendChild(this.fragment);

        // must be done after they have been injected into the DOM
        this.computeMinMaxHeaderCellDimensions();

        this.fragment = null; // prevent memleak
    };

    TableView.prototype.emptyBody = function emptyBody() {
        this.rows.length = 0;
        this.rows_ordered_by_y.length = 0;
        this.rows_ordered_by_y_length = 0;

        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    };

    TableView.prototype.injectFirstRow = function injectFirstRow() {
        this.emptyBody();

        this.rows.push(createRow({
            active: this.row_start_index === this.active_row,
            data: this.c.getRow(this.row_start_index),
            setIndex: this.row_start_index,
            y: 0
        }, this.columns));

        this.rows_ordered_by_y.push(0);
        this.rows_ordered_by_y_length += 1;

        this.body.appendChild(this.rows[0].node);
    };

    TableView.prototype.injectRestOfRows = function injectRestOfRows() {
        this.fragment = document.createDocumentFragment();

        for (this.i = 1; this.i < this.n_rows_rendered; this.i += 1) {
            this.rows.push(createRow({
                active: this.i + this.row_start_index === this.active_row,
                data: this.c.getRow(this.i + this.row_start_index),
                setIndex: this.i + this.row_start_index,
                y: this.cell_h * this.i
            }, this.columns));

            this.rows_ordered_by_y.push(this.i);
            this.rows_ordered_by_y_length += 1;

            this.fragment.appendChild(this.rows[this.i].node);
        }

        this.body.appendChild(this.fragment);
        this.fragment = null; // prevent memleak
    };

    TableView.prototype.calculateCellHeight = function calculateCellHeight() {
        this.cell_h = this.rows[0].cells[0].node.clientHeight || 40;
    };

    TableView.prototype.calculateCellWidths = function calculateCellWidths() {
        var _this5 = this;

        this.rows[0].cells.forEach(function (cell, index) {
            _this5.columns[index].width = _this5.columns[index].width || cell.node.getBoundingClientRect().width;
            cell.width = _this5.columns[index].width;
        });
    };

    TableView.prototype.calculateXBound = function calculateXBound() {
        this.row_w = this.rows[0].node.clientWidth || 500;
        this.x_max = this.container_w <= this.row_w ? this.container_w - this.row_w : 0;
    };

    TableView.prototype.calculateYBound = function calculateYBound() {
        this.y_min = 0;
        this.y_max = this.body_h - this.n_rows_rendered * this.cell_h;
    };

    TableView.prototype.calculateXScrollHandleSize = function calculateXScrollHandleSize() {
        this.x_scroll_handle_size = this.container_w - Math.abs(this.x_max);

        if (this.x_scroll_handle_size < 12) {
            this.x_scroll_handle_size = 12;
        }

        return this.x_scroll_handle_size;
    };

    TableView.prototype.calculateYScrollHandleSize = function calculateYScrollHandleSize() {
        this.y_scroll_handle_size = this.n_rows_visible === this.n_rows_rendered ? this.container_h : this.container_h * (this.n_rows_visible / this.c.totalRows);

        if (this.y_scroll_handle_size < 12) {
            this.y_scroll_handle_size = 12;
        }

        return this.y_scroll_handle_size;
    };

    TableView.prototype.initializeScrollBars = function initializeScrollBars() {
        this.x_scroll_track_w = this.c['x-scroll-track'].clientWidth || this.container_w;
        this.x_scroll_track_h = this.c['x-scroll-track'].clientHeight || 8;
        this.y_scroll_track_h = this.c['y-scroll-track'].clientHeight || this.container_h;
        this.x_scroll_handle_style.width = this.calculateXScrollHandleSize() + 'px';
        this.y_scroll_handle_style.height = this.calculateYScrollHandleSize() + 'px';

        /* total translatable space / scrollbar track size = relative value of a scrollbar pixel */
        this.x_table_pixel_ratio = Math.abs(this.x_max) / (this.x_scroll_track_w - this.x_scroll_handle_size);

        /* how many scrollbar pixels === one row? */
        this.y_scrollbar_pixel_ratio = (this.y_scroll_track_h - this.y_scroll_handle_size) / (this.c.totalRows - this.n_rows_visible);

        /* hide the scrollbars if they are not needed */

        if (this.x_scroll_handle_size === this.container_w) {
            this.c['x-scroll-track'].style.display = 'none';
            this.x_scroll_track_hidden = true;
        } else {
            this.c['x-scroll-track'].style.display = '';
            this.x_scroll_track_hidden = false;
        }

        if (this.y_scroll_handle_size === this.container_h) {
            this.c['y-scroll-track'].style.display = 'none';
            this.y_scroll_track_hidden = true;
        } else {
            this.c['y-scroll-track'].style.display = '';
            this.y_scroll_track_hidden = false;
        }
    };

    TableView.prototype.calculateContainerDimensions = function calculateContainerDimensions() {
        /* The fallback amounts are for unit testing, the browser will always have
        an actual number. */
        this.container_h = this.c.wrapper.clientHeight || 150;
        this.container_w = this.c.wrapper.clientWidth || 500;
        this.body_h = this.c.body.clientHeight || 110;
    };

    TableView.prototype.regenerate = function regenerate() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? this.c : arguments[0];

        if (config !== this.c) {
            this.processConfiguration(config);
        }

        /* stores the current state of the union for if we need to rehydrate the previous scroll state */
        this.__x = this.x;
        this.__y = this.y;
        this.__row_start_index = this.row_start_index;

        this.resetInternals();

        if (this.active_row >= this.c.totalRows) {
            this.resetActiveRow();
        }

        this.calculateContainerDimensions();

        this.buildColumns();

        this.row_start_index = this.c.preserveScrollState ? this.__row_start_index || 0 : 0;

        this.injectFirstRow();
        this.calculateCellWidths();
        this.calculateCellHeight();

        this.n_rows_rendered = Math.ceil(this.body_h / this.cell_h) + this.n_padding_rows;

        if (this.n_rows_rendered > this.c.totalRows) {
            this.n_rows_rendered = this.c.totalRows;
        }

        this.n_rows_visible = Math.floor(this.body_h / this.cell_h);

        if (this.n_rows_visible > this.n_rows_rendered) {
            this.n_rows_visible = this.n_rows_rendered;
        }

        this.row_end_index = this.row_start_index + this.n_rows_rendered - 1;

        this.injectHeaderCells();
        this.injectRestOfRows();

        if (!this.c.static_mode) {
            this.calculateXBound();
            this.calculateYBound();

            this.initializeScrollBars();

            if (this.c.preserveScrollState && this.__x !== null && this.__y !== null) {
                /* the cached values are then applied against the table to arrive at the previous state */

                this.handleMoveIntent({
                    deltaX: -this.__x,
                    deltaY: -this.__y,
                    preventDefault: _noop2.default
                });
            }
        }

        this.__x = this.__y = this.__row_start_index = null;
    };

    TableView.prototype.translateHeader = function translateHeader(x) {
        if (x !== this.last_header_x) {
            this.header_style[_transformProperty2.default] = translate3d(x);
            this.last_header_x = x;
        }
    };

    TableView.prototype.translateBody = function translateBody(x, y) {
        if (x !== this.last_body_x || y !== this.last_body_y) {
            this.body_style[_transformProperty2.default] = translate3d(x, y);
            this.last_body_x = x;
            this.last_body_y = y;
        }
    };

    TableView.prototype.translateXScrollHandle = function translateXScrollHandle(x) {
        if (!this.c.static_mode && x !== this.last_x_scroll_handle_x) {
            this.x_scroll_handle_style[_transformProperty2.default] = translate3d(x);
            this.last_x_scroll_handle_x = x;
        }
    };

    TableView.prototype.translateYScrollHandle = function translateYScrollHandle(y) {
        if (!this.c.static_mode && y !== this.last_y_scroll_handle_y) {
            this.y_scroll_handle_style[_transformProperty2.default] = translate3d(0, y);
            this.last_y_scroll_handle_y = y;
        }
    };

    TableView.prototype.performTranslations = function performTranslations(nextX, nextY) {
        this.translateHeader(nextX);
        this.translateBody(nextX, nextY);
        this.translateXScrollHandle(this.x_scroll_handle_position);
        this.translateYScrollHandle(this.y_scroll_handle_position);
    };

    TableView.prototype.scrollUp = function scrollUp() {
        /* at the logical start of the table (row index 0) we truncate upward scroll attempts
           to the upper translation boundary to keep from skipping off into nothingness */

        if (this.row_start_index === 0 && this.next_y > this.y_min) {
            this.next_y = this.y_min;

            return;
        }

        if (this.row_start_index === 0 || this.next_y <= this.y_min) {
            return;
        }

        /* Scrolling up, so we want to move the row in the visual bottom position to the top
           (above the lip of the view) */

        this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_min) / this.cell_h);

        /* prevent under-rotating below index zero, the logical start of a data set */
        if (this.row_start_index - this.n_rows_to_shift < 0) {
            this.next_y -= Math.abs(this.row_start_index - this.n_rows_to_shift) * this.cell_h;
            this.n_rows_to_shift = this.row_start_index;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_rendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely decrement the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                this.row_start_index -= this.shift_delta;
                this.row_end_index -= this.shift_delta;

                /* accomodate for the number of pixels that will not be rendered */
                this.next_y -= this.shift_delta * this.cell_h;

                this.n_rows_to_shift = this.n_rows_rendered;
            }

            /* move the highest Y-value rows to the top of the ordering array */
            this.ordered_y_array_index = this.rows_ordered_by_y.length - 1;

            for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                this.target_index = this.row_start_index - this.iterator;

                this.ptr = this.rows[this.rows_ordered_by_y[this.ordered_y_array_index]];

                this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                this.ptr.setIndex = this.target_index;
                this.ptr.y = this.rows[this.rows_ordered_by_y[0]].y - this.cell_h;
                this.ptr.active = this.target_index === this.active_row;

                this.ptr = null;

                this.rows_ordered_by_y.unshift(this.rows_ordered_by_y.pop());
            }

            this.row_start_index -= this.n_rows_to_shift;
            this.row_end_index -= this.n_rows_to_shift;

            this.y_min += this.n_rows_to_shift * this.cell_h;
            this.y_max += this.n_rows_to_shift * this.cell_h;
        }
    };

    TableView.prototype.scrollDown = function scrollDown() {
        /* at the logical end of the table (row index n) we truncate any scroll attempts  */
        if (this.row_end_index >= this.c.totalRows - 1 && this.next_y <= this.y_max) {
            this.next_y = this.y_max;

            if (this.x_scroll_track_hidden === false) {
                this.next_y -= this.x_scroll_track_h;
            }

            return;
        } else if (this.next_y >= this.y_max) {
            return;
        }

        /* Scrolling down, so we want to move the row in the visual top position to the bottom
           (below the lip of the view) */

        this.n_rows_to_shift = Math.ceil(Math.abs(this.next_y - this.y_max) / this.cell_h);

        if (this.n_rows_to_shift + this.row_end_index + 1 >= this.c.totalRows) {
            /* more rows than there is data available, truncate */
            this.next_y += (this.n_rows_to_shift - (this.c.totalRows - this.row_end_index - (this.top_visible_row_index === 0 ? 0 : 1))) * this.cell_h;

            this.next_y = this.applyDelta(this.applyDelta(this.y_max, this.y) % this.cell_h, this.next_y);

            if (this.x_scroll_track_hidden === false) {
                this.next_y -= this.x_scroll_track_h;
            }

            this.n_rows_to_shift = this.c.totalRows - this.row_end_index - 1;
        }

        if (this.n_rows_to_shift > 0) {
            if (this.n_rows_to_shift > this.n_rows_rendered) {
                /* when the total movement ends up being larger than the set of rows already rendered, we can safely increment the "viewable" row range accordingly and the next step where the content is substituted will automatically insert the next logical row into its place */

                this.shift_delta = this.n_rows_to_shift - this.n_rows_rendered;

                this.row_start_index += this.shift_delta;
                this.row_end_index += this.shift_delta;

                /* accomodate for the number of pixels that will not be rendered */
                this.next_y += this.shift_delta * this.cell_h;

                this.n_rows_to_shift = this.n_rows_rendered;
            }

            for (this.iterator = 1; this.iterator <= this.n_rows_to_shift; this.iterator += 1) {
                this.target_index = this.row_end_index + this.iterator;

                /* the padding rows will exceed the maximum index for a data set once the user has fully translated to the bottom of the screen */
                if (this.target_index >= this.c.totalRows) {
                    this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());

                    continue;
                }

                /* move the lowest Y-value rows to the bottom of the ordering array */
                this.ptr = this.rows[this.rows_ordered_by_y[0]];

                this.ptr.data = this.drag_timer ? null : this.c.getRow(this.target_index);
                this.ptr.setIndex = this.target_index;
                this.ptr.y = this.rows[this.rows_ordered_by_y[this.rows_ordered_by_y_length - 1]].y + this.cell_h;
                this.ptr.active = this.target_index === this.active_row;

                this.ptr = null;

                this.rows_ordered_by_y.push(this.rows_ordered_by_y.shift());
            }

            this.row_start_index += this.n_rows_to_shift;
            this.row_end_index += this.n_rows_to_shift;

            this.y_min -= this.n_rows_to_shift * this.cell_h;
            this.y_max -= this.n_rows_to_shift * this.cell_h;
        }
    };

    TableView.prototype.applyDelta = function applyDelta(delta, num) {
        if (delta < 0) {
            return num < 0 ? num - delta : num + delta;
        }

        return num - delta;
    };

    TableView.prototype.calculateVisibleTopRowIndex = function calculateVisibleTopRowIndex() {
        var targetY = arguments.length <= 0 || arguments[0] === undefined ? this.next_y : arguments[0];

        return this.rows[this.rows_ordered_by_y[Math.ceil(Math.abs(this.applyDelta(this.y_min, targetY) / this.cell_h))]].setIndex;
    };

    TableView.prototype.unlockDragToScroll = function unlockDragToScroll() {
        this.x_scroll_locked = this.y_scroll_locked = this.column_is_resizing = false;
    };

    TableView.prototype.applyNewColumnWidth = function applyNewColumnWidth(index, width) {
        this.c.columns[index].width = width; // the provided config objects
        this.columns[index].width = width; // the column nodes
        this.rows.forEach(function (row) {
            row.cells[index].width = width;
        });

        this.calculateXBound();
        this.initializeScrollBars();

        if (this.c.onColumnResize) {
            this.c.onColumnResize(this.columns[index].mapping, width);
        }
    };

    TableView.prototype.handleColumnResize = function handleColumnResize(delta) {
        if (delta === 0) {
            return;
        }

        var index = this.columns.indexOf(this.column_is_resizing);
        var adjusted_delta = delta;

        if (adjusted_delta < 0 && !isNaN(this.column_is_resizing.minWidth) && this.column_is_resizing.width + adjusted_delta < this.column_is_resizing.minWidth) {
            adjusted_delta = this.column_is_resizing.minWidth - this.column_is_resizing.width;
        } else if (!isNaN(this.column_is_resizing.maxWidth) && this.column_is_resizing.width + adjusted_delta > this.column_is_resizing.maxWidth) {
            adjusted_delta = this.column_is_resizing.maxWidth - this.column_is_resizing.width;
        }

        this.applyNewColumnWidth(index, this.column_is_resizing.width + adjusted_delta);

        /* If a column shrinks, the wrapper X translation needs to be adjusted accordingly or
        we'll see unwanted whitespace on the right side. If the table width becomes smaller than
        the overall container, whitespace will appear regardless. */
        if (adjusted_delta < 0 && this.row_w + this.x + adjusted_delta < this.container_w) {
            this.evt.deltaX = adjusted_delta;
            this.evt.deltaY = 0;

            this.handleMoveIntent(this.evt);
        }
    };

    TableView.prototype.getKeyFromKeyCode = function getKeyFromKeyCode(code) {
        switch (code) {
            case 40:
                return 'ArrowDown';

            case 38:
                return 'ArrowUp';

            case 13:
                return 'Enter';
        }

        return null;
    };

    TableView.prototype.setAriaText = function setAriaText(text) {
        this.c.aria.innerText = text;
    };

    TableView.prototype.setActiveRow = function setActiveRow(setIndex) {
        this.active_row = setIndex;
        this.rows.forEach(function (row) {
            row.active = row.setIndex === setIndex;
        });
    };

    TableView.prototype.changeActiveRow = function changeActiveRow(delta) {
        var _this6 = this;

        if (this.active_row + delta >= this.c.totalRows) {
            return;
        }

        this.next_active_row = (0, _findWhere2.default)(this.rows, 'setIndex', this.active_row + delta);

        if (this.next_active_row) {
            this.setActiveRow(this.next_active_row.setIndex);
            this.setAriaText(this.next_active_row.data[this.columns[0].mapping]);

            if (delta === -1 && this.next_active_row.y * -1 > this.y || delta === 1 && this.next_active_row.y * -1 < this.y - this.body_h + this.cell_h) {
                // Destination row is outside the viewport, so simulate a scroll
                this.evt.deltaX = 0;
                this.evt.deltaY = this.cell_h * delta;

                this.handleMoveIntent(this.evt);
            }
        } else if (delta < 0 && this.active_row > 0 || delta > 0 && this.active_row < this.c.totalRows) {
            /* The destination row isn't rendered, so we need to translate enough rows for it to feasibly be shown in the viewport. */
            this.evt.deltaX = 0;
            this.evt.deltaY = (this.row_start_index > this.active_row && this.active_row - this.row_start_index || (this.row_start_index < this.active_row && this.active_row - this.row_start_index) + delta) * this.cell_h;

            this.handleMoveIntent(this.evt);

            // start the process again, now that the row is available
            window.requestAnimationFrame(function () {
                return _this6.changeActiveRow(delta);
            });
        }

        this.next_active_row = null;
    };

    TableView.prototype.discoverCellAndRowNodes = function discoverCellAndRowNodes(target) {
        var node = target;
        var nodeMap = {};

        if (node.className.match(rowClassRegex)) {
            return { row: node };
        }

        while ((!nodeMap.cell || !nodeMap.row) && node) {
            if (node.className.match(cellClassRegex)) {
                nodeMap.cell = node;
            } else if (node.className.match(rowClassRegex)) {
                nodeMap.row = node;
            }

            node = node.parentNode;
        }

        return nodeMap;
    };

    TableView.prototype.jumpToRowIndex = function jumpToRowIndex(index) {
        this.row_start_index = index;
        this.y = 0;

        this.regenerate();

        this.top_visible_row_index = index;
        this.y_scroll_handle_position = index * this.y_scrollbar_pixel_ratio;

        if (this.y_scroll_handle_position + this.y_scroll_handle_size > this.y_scroll_track_h) {
            this.y_scroll_handle_position = this.y_scroll_track_h - this.y_scroll_handle_size;
        }

        this.translateYScrollHandle(this.y_scroll_handle_position);

        this.setActiveRow(index);
    };

    return TableView;
}();

exports.default = TableView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVGFibGUvdGFibGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU0saUJBQWlCLHFCQUF2QjtBQUNBLElBQU0sZ0JBQWdCLG9CQUF0Qjs7QUFFQSxJQUFNLGNBQWMsU0FBUyxXQUFULEdBQW1DO0FBQUEsUUFBZCxDQUFjLHlEQUFWLENBQVU7QUFBQSxRQUFQLENBQU8seURBQUgsQ0FBRzs7QUFDbkQsV0FBTyxpQkFBaUIsQ0FBakIsR0FBcUIsTUFBckIsR0FBOEIsQ0FBOUIsR0FBa0MsVUFBekM7QUFDSCxDQUZELEM7O0FBSUEsSUFBTSxtQkFBbUIsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQyxPQUFoQyxFQUF5QztBQUM5RCxRQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsS0FBZ0MsQ0FBOUQsRUFBaUU7QUFDN0QsYUFBSyxXQUFMLENBQWlCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQjtBQUNIOztBQUVELFFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNNLFNBQUssU0FBTCxHQUFpQixxQkFBakI7O0FBRU4sUUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFqQjtBQUNNLFNBQUssV0FBTCxDQUFpQixRQUFqQjs7QUFFTixTQUFLLFdBQUwsQ0FBaUIsSUFBakI7O0FBRUEsV0FBTyxRQUFQO0FBQ0gsQ0FkRDs7QUFnQkEsSUFBTSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLE9BQWhDLEVBQXlDLEtBQXpDLEVBQWdELEtBQWhELEVBQXVEO0FBQ3pFLFFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjs7QUFFQSxTQUFLLFNBQUwsR0FBaUIsZ0JB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QVEsSUFBUixHQUFlLElBQWY7QUFDSCxhQUZELE1BRU8sSUFBSSxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLGFBQXJCLENBQUosRUFBeUM7QUFDNUMsd0JBQVEsR0FBUixHQUFjLElBQWQ7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFVBQVo7QUFDSDs7QUFFRCxlQUFPLE9BQVA7QUFDSCxLOztBQXRqQ0MsYSxXQTBrQ0YsYywyQkFBZSxLLEVBQU87QUFDbEIsYUFBSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDs7QUFFQSxhQUFLLFVBQUw7O0FBRUEsYUFBSyxxQkFBTCxHQUE2QixLQUE3QjtBQUNBLGFBQUssd0JBQUwsR0FBZ0MsUUFBUSxLQUFLLHVCQUE3Qzs7QUFFQSxZQUFJLEtBQUssd0JBQUwsR0FBZ0MsS0FBSyxvQkFBckMsR0FBNEQsS0FBSyxnQkFBckUsRUFBdUY7QUFDbkYsaUJBQUssd0JBQUwsR0FBZ0MsS0FBSyxnQkFBTCxHQUF3QixLQUFLLG9CQUE3RDtBQUNIOztBQUVELGFBQUssc0JBQUwsQ0FBNEIsS0FBSyx3QkFBakM7O0FBRUEsYUFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0gsSzs7V0ExbENDLFM7OztrQkE2bENTLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgaGlnaC1wZXJmb3JtYW5jZSwgaW5maW5pdGUgdGFibGUgdmlldy5cbiAqIEBjbGFzcyBUYWJsZVZpZXdcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtUHJvcCBmcm9tICcuLi8uLi9VSVV0aWxzL3RyYW5zZm9ybVByb3BlcnR5JztcbmltcG9ydCBmaW5kV2hlcmUgZnJvbSAnLi4vLi4vVUlVdGlscy9maW5kV2hlcmUnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi4vLi4vVUlVdGlscy9ub29wJztcblxuLypcblxuRk9SIEZVVFVSRSBFWUVTXG5cblNjcm9sbCBwZXJmb3JtYW5jZSBpcyBhIHRyaWNreSBiZWFzdCAtLSBtb3Jlc28gd2hlbiB0cnlpbmcgdG8gbWFpbnRhaW4gNTArIEZQUyBhbmQgcHVtcGluZyBhIGxvdCBvZiBkYXRhIHRvIHRoZSBET00uIFRoZXJlIGFyZSBhIGxvdCBvZiBjaG9pY2VzIGluIHRoaXMgY29tcG9uZW50IHRoYXQgbWF5IHNlZW0gb2RkIGF0IGZpcnN0IGJsdXNoLCBidXQgbGV0IGl0IGJlIGtub3duIHRoYXQgd2UgdHJpZWQgdG8gZG8gaXQgdGhlIFJlYWN0IFdheeKEoiBhbmQgaXQgd2FzIG5vdCBwZXJmb3JtYW50IGVub3VnaC5cblxuVGhlIGNvbWJpbmF0aW9uIHRoYXQgd2FzIHNldHRsZWQgdXBvbiBpcyBhIFJlYWN0IHNoZWxsIHdpdGggbmF0aXZlIERPTSBndXRzLiBUaGlzIGNvbWJpbmF0aW9uIHlpZWxkcyB0aGUgYmVzdCBwZXJmb3JtYW5jZSwgd2hpbGUgc3RpbGwgYmVpbmcgcGVyZmVjdGx5IGludGVyb3BlcmFibGUgd2l0aCB0aGUgcmVzdCBvZiBVSUtpdCBhbmQgUmVhY3QgdXNlIGNhc2VzLlxuXG5fX0ltcG9ydGFudCBOb3RlX19cblxuQW55IHRpbWUgeW91IGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50LCBtYWtlIHN1cmUgeW91IHJlbGVhc2UgaXQgYWZ0ZXIgYnkgc2V0dGluZyBpdHMgdmFyaWFibGUgdG8gYG51bGxgLiBJZiB5b3UgZG9uJ3QsIGl0J2xsIGNyZWF0ZSBhIG1lbW9yeSBsZWFrLiBBbHNvLCBtYWtlIHN1cmUgYWxsIGdlbmVyYXRlZCBET00gaXMgcmVtb3ZlZCBvbiBjb21wb25lbnRXaWxsVW5tb3VudC5cblxuXG5PUkRFUiBPRiBPUEVSQVRJT05TXG5cbjEuIHJlbmRlciBvbmUgcm93IG9mIGNlbGxzXG4yLiBjYXB0dXJlIHRhYmxlICYgY2VsbCBzaXppbmcgbWV0cmljc1xuMy4gcmVuZGVyIGNvbHVtbiBoZWFkcyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGNlbGxzXG5cbklmIHRoZSBjb21wb25lbnQgdXBkYXRlcyBkdWUgdG8gbmV3IHByb3BzLCBqdXN0IGJsb3cgYXdheSBldmVyeXRoaW5nIGFuZCBzdGFydCBvdmVyLiBJdCdzIGNoZWFwZXIgdGhhbiB0cnlpbmcgdG8gZGlmZi5cblxuKi9cblxuY29uc3QgY2VsbENsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLWNlbGxcXGIvZztcbmNvbnN0IHJvd0NsYXNzUmVnZXggPSAvXFxzP3VpLXRhYmxlLXJvd1xcYi9nO1xuXG5jb25zdCB0cmFuc2xhdGUzZCA9IGZ1bmN0aW9uIHRyYW5zbGF0ZTNEKHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwcHgpJztcbn07IC8vIHogaXMgbmV2ZXIgdXNlZFxuXG5jb25zdCByZXBhcmVudENlbGxUZXh0ID0gZnVuY3Rpb24gcmVwYXJlbnRDZWxsVGV4dChub2RlLCBjb250ZW50KSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSAndWktdGFibGUtY2VsbC1pbm5lcic7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpO1xuICAgICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURPTUNlbGwgPSBmdW5jdGlvbiBjcmVhdGVET01DZWxsKGNvbnRlbnQsIG1hcHBpbmcsIHdpZHRoLCBpbmRleCkge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNlbGwuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLWNlbGwgJztcbiAgICBjZWxsLmNsYXNzTmFtZSArPSBpbmRleCAlIDIgPT09IDAgPyAndWktdGFibGUtY2VsbC1ldmVuJyA6ICd1aS10YWJsZS1jZWxsLW9kZCc7XG5cbiAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nLCBtYXBwaW5nKTtcbiAgICBjZWxsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICByZXBhcmVudENlbGxUZXh0KGNlbGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlRE9NSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZURPTUhlYWRlckNlbGwoY29sdW1uLCB3aWR0aCwgaW5kZXgpIHtcbiAgICBjb25zdCBjZWxsID0gY3JlYXRlRE9NQ2VsbChjb2x1bW4udGl0bGUsIGNvbHVtbi5tYXBwaW5nLCB3aWR0aCwgaW5kZXgpO1xuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKGNvbHVtbi5yZXNpemFibGUpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIGhhbmRsZS5jbGFzc05hbWUgPSAndWktdGFibGUtaGVhZGVyLWNlbGwtcmVzaXplLWhhbmRsZSc7XG5cbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjZWxsO1xufTtcblxuY29uc3QgY3JlYXRlSGVhZGVyQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUhlYWRlckNlbGwobWV0YWRhdGEsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUhlYWRlckNlbGwobWV0YWRhdGEsIG1ldGFkYXRhLndpZHRoLCBpbmRleCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnX3RleHROb2RlJzogbm9kZS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzID8gbm9kZS5jaGlsZE5vZGVzWzBdIDogbm9kZS5jaGlsZHJlblswXS5jaGlsZE5vZGVzWzBdLFxuICAgICAgICAnX21ldGFkYXRhJzogbWV0YWRhdGEsXG4gICAgICAgICdfdGl0bGUnOiBtZXRhZGF0YS50aXRsZSxcbiAgICAgICAgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH0sXG4gICAgICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX3RpdGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl90aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193aWR0aCc6IG1ldGFkYXRhLndpZHRoLFxuICAgICAgICBnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLl93aWR0aDsgfSxcbiAgICAgICAgc2V0IHdpZHRoKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dE5vZGUgPSByZXBhcmVudENlbGxUZXh0KHRoaXMubm9kZSwgdGhpcy5fdGl0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFwcGluZzogbWV0YWRhdGEubWFwcGluZyxcbiAgICAgICAgbm9kZTogbm9kZSxcbiAgICB9O1xufTtcblxuY29uc3QgY3JlYXRlQ2VsbCA9IGZ1bmN0aW9uIGNyZWF0ZUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNyZWF0ZURPTUNlbGwoY29udGVudCwgbWFwcGluZywgd2lkdGgsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfdGV4dE5vZGUnOiBub2RlLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMgPyBub2RlLmNoaWxkTm9kZXNbMF0gOiBub2RlLmNoaWxkcmVuWzBdLmNoaWxkTm9kZXNbMF0sXG4gICAgICAgICdfY29udGVudCc6IGNvbnRlbnQsXG4gICAgICAgIGdldCBjb250ZW50KCkgeyByZXR1cm4gdGhpcy5fY29udGVudDsgfSxcbiAgICAgICAgc2V0IGNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0aGlzLl9jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX3dpZHRoJzogd2lkdGgsXG4gICAgICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9LFxuICAgICAgICBzZXQgd2lkdGgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0Tm9kZSA9IHJlcGFyZW50Q2VsbFRleHQodGhpcy5ub2RlLCB0aGlzLl9jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVXaWR0aDogZnVuY3Rpb24gdHJ1ZVdpZHRoKCkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDbGFzc2VzID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugb2ZmIHRoZSBpbm5lciBjbGFzcyB3aGljaCBpcyB3aGF0IGNhdXNlcyB0aGUgc2l6aW5nIGNvbnN0cmFpbnRcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5jbGFzc05hbWUgPSAnJztcblxuICAgICAgICAgICAgLyogQ2FwdHVyZSB0aGUgbmV3IGFkanVzdGVkIHNpemUsIGhhdmUgdG8gdXNlIHRoZSBoYXJkIHdheSBiZWNhdXNlIC5jbGllbnRXaWR0aCByZXR1cm5zIGFuIGludGVnZXIgdmFsdWUsIHJhdGhlciB0aGFuIHRoZSBfYWN0dWFsXyB3aWR0aC4gU01ILiAqL1xuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFB1dCBldmVyeXRoaW5nIGJhY2tcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9IGNoaWxkQ2xhc3NlcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld1dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBub2RlOiBub2RlLFxuICAgIH07XG59O1xuXG5jb25zdCBjcmVhdGVET01Sb3cgPSBmdW5jdGlvbiBjcmVhdGVET01Sb3coc2V0SW5kZXgsIHkpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3VpLXRhYmxlLXJvdyc7XG4gICAgICAgICAgcm93LnN0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG5cbiAgICByZXR1cm4gcm93O1xufTtcblxuY29uc3QgY3JlYXRlUm93ID0gZnVuY3Rpb24gY3JlYXRlUm93KG1ldGFkYXRhLCBjb2x1bW5zKSB7XG4gICAgLyogSU1QT1JUQU5UIE5PVEU6IG1ldGFkYXRhLmRhdGEgbWlnaHQgYmUgYSBwcm9taXNlLiBQbGFuIGFjY29yZGluZ2x5LiAqL1xuXG4gICAgY29uc3Qgcm93ID0gY3JlYXRlRE9NUm93KG1ldGFkYXRhLnNldEluZGV4LCBtZXRhZGF0YS55KTtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGNlbGxzLnB1c2goY3JlYXRlQ2VsbCgnJywgY29sdW1uLm1hcHBpbmcsIGNvbHVtbi53aWR0aCwgaW5kZXgpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbHNbaW5kZXhdLm5vZGUpO1xuICAgIH0pO1xuXG4gICAgcm93LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICBmcmFnbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCByb3dPYmogPSB7XG4gICAgICAgIG5vZGU6IHJvdyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICAnX2l0ZXJhdG9yJzogbnVsbCxcbiAgICAgICAgJ19hY3RpdmUnOiBmYWxzZSxcbiAgICAgICAgZ2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfSxcbiAgICAgICAgc2V0IGFjdGl2ZSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgKz0gJyB1aS10YWJsZS1yb3ctYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctYWN0aXZlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1hY3RpdmUnLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ19zZXRJbmRleCc6IG51bGwsXG4gICAgICAgIGdldCBzZXRJbmRleCgpIHsgcmV0dXJuIHRoaXMuX3NldEluZGV4OyB9LFxuICAgICAgICBzZXQgc2V0SW5kZXgodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zZXRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LWV2ZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZSgndWktdGFibGUtcm93LW9kZCcsICd1aS10YWJsZS1yb3ctZXZlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSAgIHRoaXMuX3NldEluZGV4ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd1aS10YWJsZS1yb3cgdWktdGFibGUtcm93LW9kZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5ub2RlLmNsYXNzTmFtZS5yZXBsYWNlKCd1aS10YWJsZS1yb3ctZXZlbicsICd1aS10YWJsZS1yb3ctb2RkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHZhbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJbmRleCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ193YWl0aW5nRm9yUmVzb2x1dGlvbic6IGZhbHNlLFxuICAgICAgICBnZXQgd2FpdGluZ0ZvclJlc29sdXRpb24oKSB7IHJldHVybiB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbjsgfSxcbiAgICAgICAgc2V0IHdhaXRpbmdGb3JSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fd2FpdGluZ0ZvclJlc29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yUmVzb2x1dGlvbiA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgdGhpcy5ub2RlLmNsYXNzTmFtZS5pbmRleE9mKCd1aS10YWJsZS1yb3ctbG9hZGluZycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9ICcgdWktdGFibGUtcm93LWxvYWRpbmcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbCAmJiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoJ3VpLXRhYmxlLXJvdy1sb2FkaW5nJywgJycpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdfZGF0YSc6IG51bGwsXG4gICAgICAgIGdldCBkYXRhKCkgeyByZXR1cm4gdGhpcy5fZGF0YTsgfSxcbiAgICAgICAgc2V0IGRhdGEodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBudWxsIHx8IHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGhlbihmdW5jdGlvbiBjYXV0aW91c2x5U2V0Um93RGF0YShwcm9taXNlLCByZXNvbHZlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc29sdmVkVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0aGlzLl9kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JSZXNvbHV0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodGhpcy5faXRlcmF0b3IgPSAwOyB0aGlzLl9pdGVyYXRvciA8IHRoaXMuY2VsbHMubGVuZ3RoOyB0aGlzLl9pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9IHRoaXMuX2RhdGFbdGhpcy5faXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3RoaXMuX2l0ZXJhdG9yXS5jb250ZW50ID0gdGhpcy5fZGF0YVtjb2x1bW5zW3RoaXMuX2l0ZXJhdG9yXS5tYXBwaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh0aGlzLl9pdGVyYXRvciA9IDA7IHRoaXMuX2l0ZXJhdG9yIDwgdGhpcy5jZWxscy5sZW5ndGg7IHRoaXMuX2l0ZXJhdG9yICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t0aGlzLl9pdGVyYXRvcl0uY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclJlc29sdXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ195JzogbWV0YWRhdGEueSxcbiAgICAgICAgZ2V0IHkoKSB7IHJldHVybiB0aGlzLl95OyB9LFxuICAgICAgICBzZXQgeSh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKDAsIHRoaXMuX3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBTZXR0aW5nIGl0IHNlcGFyYXRlbHkgdG8gaGF2ZSB0aGUgY2xhc3NlcyBhZGRlZCBhdXRvbWF0aWNhbGx5XG4gICAgcm93T2JqLnNldEluZGV4ID0gbWV0YWRhdGEuc2V0SW5kZXg7XG4gICAgcm93T2JqLmFjdGl2ZSA9IG1ldGFkYXRhLmFjdGl2ZTtcblxuICAgIC8vIFNldHRpbmcgaXQgc2VwYXJhdGVseSBzbyB0aGUgUHJvbWlzZSBoYW5kbGluZyBjYW4gdGFrZSBwbGFjZSBpZiBuZWVkZWQuLi5cbiAgICByb3dPYmouZGF0YSA9IG1ldGFkYXRhLmRhdGE7XG5cbiAgICByZXR1cm4gcm93T2JqO1xufTtcblxuY2xhc3MgVGFibGVWaWV3IHtcbiAgICB2YWxpZGF0ZUNvbHVtblNoYXBlKGNvbHVtbikge1xuICAgICAgICByZXR1cm4gICAgdHlwZW9mIGNvbHVtbi5tYXBwaW5nID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi5yZXNpemFibGUgPT09ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgJiYgdHlwZW9mIGNvbHVtbi50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICYmIChjb2x1bW4ud2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY29sdW1uLndpZHRoID09PSAnbnVtYmVyJyk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgICAgICAvLyB4LXNjcm9sbC10cmFjaywgeS1zY3JvbGwtdHJhY2ssIHgtc2Nyb2xsLWhhbmRsZSwgeS1zY3JvbGwtaGFuZGxlLCBhbmQgYXJpYSBhcmUgbm90IHJlcXVpcmVkIGluIHN0YXRpY19tb2RlXG4gICAgICAgIGlmIChjb25maWcuc3RhdGljX21vZGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLnN0YXRpY19tb2RlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgc3RhdGljX21vZGVgOyBpdCBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLndyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgd3JhcHBlcmAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvbmZpZy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgaGVhZGVyYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoY29uZmlnLmJvZHkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYm9keWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnWyd4LXNjcm9sbC10cmFjayddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHgtc2Nyb2xsLXRyYWNrYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3ktc2Nyb2xsLXRyYWNrJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeS1zY3JvbGwtdHJhY2tgIGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbmZpZy5zdGF0aWNfbW9kZSAmJiAhKGNvbmZpZ1sneC1zY3JvbGwtaGFuZGxlJ10gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgeC1zY3JvbGwtaGFuZGxlYCBlbGVtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcuc3RhdGljX21vZGUgJiYgIShjb25maWdbJ3ktc2Nyb2xsLWhhbmRsZSddIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHktc2Nyb2xsLWhhbmRsZWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29uZmlnLnN0YXRpY19tb2RlICYmICEoY29uZmlnLmFyaWEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgYXJpYWAgZWxlbWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggICAhQXJyYXkuaXNBcnJheShjb25maWcuY29sdW1ucylcbiAgICAgICAgICAgIHx8IGNvbmZpZy5jb2x1bW5zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgfHwgIWNvbmZpZy5jb2x1bW5zLmV2ZXJ5KHRoaXMudmFsaWRhdGVDb2x1bW5TaGFwZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgdmFsaWQgXFxgY29sdW1uc1xcYC4gSXQgc2hvdWxkIGJlIGFuIGFycmF5IHdpdGggYXQgbGVhc3Qgb25lIG9iamVjdCBjb25mb3JtaW5nIHRvOiB7XG4gICAgICAgICAgICAgICAgbWFwcGluZzogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogYm9vbCxcbiAgICAgICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBudW1iZXIgKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRocm90dGxlSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRocm90dGxlSW50ZXJ2YWxgOyBpdCBzaG91bGQgYmUgYSBOdW1iZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50b3RhbFJvd3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYHRvdGFsUm93c2A7IGl0IHNob3VsZCBiZSBhIE51bWJlci4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmdldFJvdyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBnZXRSb3dgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcucm93Q2xpY2tGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5yb3dDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgcm93Q2xpY2tGdW5jYDsgaXQgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnLmNlbGxDbGlja0Z1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUYWJsZVZpZXcgd2FzIG5vdCBwYXNzZWQgYSB2YWxpZCBgY2VsbENsaWNrRnVuY2A7IGl0IHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5jb2x1bW5SZXNpemVGdW5jICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZy5jb2x1bW5SZXNpemVGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGFibGVWaWV3IHdhcyBub3QgcGFzc2VkIGEgdmFsaWQgYGNvbHVtblJlc2l6ZUZ1bmNgOyBpdCBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnByZXNlcnZlU2Nyb2xsU3RhdGUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RhYmxlVmlldyB3YXMgbm90IHBhc3NlZCBhIHZhbGlkIGBwcmVzZXJ2ZVNjcm9sbFN0YXRlYDsgaXQgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgICAgICB0aGlzLmMgPSB7Li4uY29uZmlnfTtcblxuICAgICAgICAvLyBmYWxsYmFjayB2YWx1ZXNcbiAgICAgICAgdGhpcy5jLnByZXNlcnZlU2Nyb2xsU3RhdGUgPSB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMuYy5wcmVzZXJ2ZVNjcm9sbFN0YXRlO1xuICAgICAgICB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCA9IHRoaXMuYy50aHJvdHRsZUludGVydmFsIHx8IDMwMDtcbiAgICAgICAgdGhpcy5jLnRvdGFsUm93cyA9IHRoaXMuYy50b3RhbFJvd3MgfHwgMDtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlQ29uZmlndXJhdGlvbih0aGlzLmMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5jLmJvZHk7XG4gICAgICAgIHRoaXMuYm9keV9zdHlsZSA9IHRoaXMuYm9keS5zdHlsZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmMuaGVhZGVyO1xuICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZSA9IHRoaXMuaGVhZGVyLnN0eWxlO1xuXG4gICAgICAgIGlmICghdGhpcy5jLnN0YXRpY19tb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneC1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zdHlsZSA9IHRoaXMuY1sneS1zY3JvbGwtaGFuZGxlJ10uc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3coKTtcblxuICAgICAgICAvKiB1c2VkIGluIHNjcm9sbCBzdGF0ZSBwcmVzZXJ2YXRpb24gY2FsY3VsYXRpb25zICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlV2luZG93UmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZURyYWdNb3ZlKTtcblxuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU1vdmVJbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmMud3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNvbHVtbkRyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuaGFuZGxlQ29sdW1uQXV0b0V4cGFuZCk7XG5cbiAgICAgICAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmNbJ3ktc2Nyb2xsLWhhbmRsZSddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlWVNjcm9sbEhhbmRsZURyYWdTdGFydCk7XG5cbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQWR2YW5jZVRvWFNjcm9sbFRyYWNrTG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVBZHZhbmNlVG9ZU2Nyb2xsVHJhY2tMb2NhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtcHR5SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgLy8gcmVsZWFzZSBjYWNoZWQgRE9NIG5vZGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY1trZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0QWN0aXZlUm93KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSAtMTtcbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBudWxsO1xuICAgIH1cblxuICAgIHJlc2V0SW50ZXJuYWxzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kgPSBbXTtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm5fcGFkZGluZ19yb3dzID0gMztcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMubmV4dF95ID0gMDtcblxuICAgICAgICB0aGlzLmRpc3RhbmNlX2Zyb21fdG9wID0gICB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4ID0gMDtcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdmFyaWFibGVzIGluIHZhcmlvdXMgY2FsY3VsYXRpb25zXG4gICAgICAgIHRoaXMuaSA9IG51bGw7XG4gICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcmRlcmVkX3lfYXJyYXlfaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hpZnRfZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldF9pbmRleCA9IG51bGw7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRpb24gY2FjaGVzXG4gICAgICAgIHRoaXMubGFzdF9oZWFkZXJfeCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RfYm9keV95ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRyYWdfdGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXZ0ID0ge3ByZXZlbnREZWZhdWx0OiBub29wfTtcblxuICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0X3RvdWNoX3BhZ2VYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZID0gMDtcblxuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSBudWxsO1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQhXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zbGF0aW9ucygpO1xuICAgIH1cblxuICAgIGVtcHR5SGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnMubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIucmVtb3ZlQ2hpbGQodGhpcy5oZWFkZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZENvbHVtbnMoKSB7XG4gICAgICAgIHRoaXMuZW1wdHlIZWFkZXIoKTtcblxuICAgICAgICB0aGlzLmMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjcmVhdGVIZWFkZXJDZWxsKGNvbHVtbiwgaW5kZXgpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKSB7XG4gICAgICAgIGxldCBjcztcblxuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb2x1bW4ubm9kZSk7XG5cbiAgICAgICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHBhcnNlSW50KGNzWydtaW4td2lkdGgnXSwgMTApO1xuICAgICAgICAgICAgY29sdW1uLm1heFdpZHRoID0gcGFyc2VJbnQoY3NbJ21heC13aWR0aCddLCAxMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluamVjdEhlYWRlckNlbGxzKCkge1xuICAgICAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4gdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZChjb2x1bW4ubm9kZSkpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQpO1xuXG4gICAgICAgIC8vIG11c3QgYmUgZG9uZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBpbmplY3RlZCBpbnRvIHRoZSBET01cbiAgICAgICAgdGhpcy5jb21wdXRlTWluTWF4SGVhZGVyQ2VsbERpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDsgLy8gcHJldmVudCBtZW1sZWFrXG4gICAgfVxuXG4gICAgZW1wdHlCb2R5KCkge1xuICAgICAgICB0aGlzLnJvd3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5qZWN0Rmlyc3RSb3coKSB7XG4gICAgICAgIHRoaXMuZW1wdHlCb2R5KCk7XG5cbiAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IHRoaXMuYWN0aXZlX3JvdyxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuYy5nZXRSb3codGhpcy5yb3dfc3RhcnRfaW5kZXgpLFxuICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMucm93X3N0YXJ0X2luZGV4LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wdXNoKDApO1xuICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95X2xlbmd0aCArPSAxO1xuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbMF0ubm9kZSk7XG4gICAgfVxuXG4gICAgaW5qZWN0UmVzdE9mUm93cygpIHtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICBmb3IgKHRoaXMuaSA9IDE7IHRoaXMuaSA8IHRoaXMubl9yb3dzX3JlbmRlcmVkOyB0aGlzLmkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5yb3dzLnB1c2goY3JlYXRlUm93KHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3csXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jLmdldFJvdyh0aGlzLmkgKyB0aGlzLnJvd19zdGFydF9pbmRleCksXG4gICAgICAgICAgICAgICAgc2V0SW5kZXg6IHRoaXMuaSArIHRoaXMucm93X3N0YXJ0X2luZGV4LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuY2VsbF9oICogdGhpcy5pLFxuICAgICAgICAgICAgfSwgdGhpcy5jb2x1bW5zKSk7XG5cbiAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLmkpO1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLnJvd3NbdGhpcy5pXS5ub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7IC8vIHByZXZlbnQgbWVtbGVha1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMuY2VsbF9oID0gdGhpcy5yb3dzWzBdLmNlbGxzWzBdLm5vZGUuY2xpZW50SGVpZ2h0IHx8IDQwO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNlbGxXaWR0aHMoKSB7XG4gICAgICAgIHRoaXMucm93c1swXS5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGggfHwgY2VsbC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IHRoaXMuY29sdW1uc1tpbmRleF0ud2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhCb3VuZCgpIHtcbiAgICAgICAgdGhpcy5yb3dfdyA9IHRoaXMucm93c1swXS5ub2RlLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy54X21heCA9IHRoaXMuY29udGFpbmVyX3cgPD0gdGhpcy5yb3dfdyA/IHRoaXMuY29udGFpbmVyX3cgLSB0aGlzLnJvd193IDogMDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVZQm91bmQoKSB7XG4gICAgICAgIHRoaXMueV9taW4gPSAwO1xuICAgICAgICB0aGlzLnlfbWF4ID0gdGhpcy5ib2R5X2ggLSB0aGlzLm5fcm93c19yZW5kZXJlZCAqIHRoaXMuY2VsbF9oO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVhTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID0gdGhpcy5jb250YWluZXJfdyAtIE1hdGguYWJzKHRoaXMueF9tYXgpO1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVlTY3JvbGxIYW5kbGVTaXplKCkge1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID0gICB0aGlzLm5fcm93c192aXNpYmxlID09PSB0aGlzLm5fcm93c19yZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNvbnRhaW5lcl9oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY29udGFpbmVyX2ggKiAodGhpcy5uX3Jvd3NfdmlzaWJsZSAvIHRoaXMuYy50b3RhbFJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplIDwgMTIpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVTY3JvbGxCYXJzKCkge1xuICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgPSB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uY2xpZW50V2lkdGggfHwgdGhpcy5jb250YWluZXJfdztcbiAgICAgICAgdGhpcy54X3Njcm9sbF90cmFja19oID0gdGhpcy5jWyd4LXNjcm9sbC10cmFjayddLmNsaWVudEhlaWdodCB8fCA4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggPSB0aGlzLmNbJ3ktc2Nyb2xsLXRyYWNrJ10uY2xpZW50SGVpZ2h0IHx8IHRoaXMuY29udGFpbmVyX2g7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3N0eWxlLndpZHRoID0gdGhpcy5jYWxjdWxhdGVYU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcbiAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVZU2Nyb2xsSGFuZGxlU2l6ZSgpICsgJ3B4JztcblxuICAgICAgICAvKiB0b3RhbCB0cmFuc2xhdGFibGUgc3BhY2UgLyBzY3JvbGxiYXIgdHJhY2sgc2l6ZSA9IHJlbGF0aXZlIHZhbHVlIG9mIGEgc2Nyb2xsYmFyIHBpeGVsICovXG4gICAgICAgIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbyA9IE1hdGguYWJzKHRoaXMueF9tYXgpIC8gKHRoaXMueF9zY3JvbGxfdHJhY2tfdyAtIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUpO1xuXG4gICAgICAgIC8qIGhvdyBtYW55IHNjcm9sbGJhciBwaXhlbHMgPT09IG9uZSByb3c/ICovXG4gICAgICAgIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW8gPSAodGhpcy55X3Njcm9sbF90cmFja19oIC0gdGhpcy55X3Njcm9sbF9oYW5kbGVfc2l6ZSkgLyAodGhpcy5jLnRvdGFsUm93cyAtIHRoaXMubl9yb3dzX3Zpc2libGUpO1xuXG4gICAgICAgIC8qIGhpZGUgdGhlIHNjcm9sbGJhcnMgaWYgdGhleSBhcmUgbm90IG5lZWRlZCAqL1xuXG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplID09PSB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmNbJ3gtc2Nyb2xsLXRyYWNrJ10uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfdHJhY2tfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY1sneC1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemUgPT09IHRoaXMuY29udGFpbmVyX2gpIHtcbiAgICAgICAgICAgIHRoaXMuY1sneS1zY3JvbGwtdHJhY2snXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF90cmFja19oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jWyd5LXNjcm9sbC10cmFjayddLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfdHJhY2tfaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJEaW1lbnNpb25zKCkge1xuICAgICAgICAvKiBUaGUgZmFsbGJhY2sgYW1vdW50cyBhcmUgZm9yIHVuaXQgdGVzdGluZywgdGhlIGJyb3dzZXIgd2lsbCBhbHdheXMgaGF2ZVxuICAgICAgICBhbiBhY3R1YWwgbnVtYmVyLiAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lcl9oID0gdGhpcy5jLndyYXBwZXIuY2xpZW50SGVpZ2h0IHx8IDE1MDtcbiAgICAgICAgdGhpcy5jb250YWluZXJfdyA9IHRoaXMuYy53cmFwcGVyLmNsaWVudFdpZHRoIHx8IDUwMDtcbiAgICAgICAgdGhpcy5ib2R5X2ggPSB0aGlzLmMuYm9keS5jbGllbnRIZWlnaHQgfHwgMTEwO1xuICAgIH1cblxuICAgIGhhbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYy53cmFwcGVyLmNsaWVudEhlaWdodCAhPT0gdGhpcy5jb250YWluZXJfaCkge1xuICAgICAgICAgICAgLyogbW9yZSByb3dzIG1heSBiZSBuZWVkZWQgdG8gZGlzcGxheSB0aGUgZGF0YSwgc28gd2UgbmVlZCB0byByZWJ1aWxkICovXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdlbmVyYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuICAgIH1cblxuICAgIHJlZ2VuZXJhdGUoY29uZmlnID0gdGhpcy5jKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IHRoaXMuYykgeyB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uKGNvbmZpZyk7IH1cblxuICAgICAgICAvKiBzdG9yZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHVuaW9uIGZvciBpZiB3ZSBuZWVkIHRvIHJlaHlkcmF0ZSB0aGUgcHJldmlvdXMgc2Nyb2xsIHN0YXRlICovXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy54O1xuICAgICAgICB0aGlzLl9feSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5fX3Jvd19zdGFydF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4O1xuXG4gICAgICAgIHRoaXMucmVzZXRJbnRlcm5hbHMoKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmVSb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMuYnVpbGRDb2x1bW5zKCk7XG5cbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSB0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSA/IHRoaXMuX19yb3dfc3RhcnRfaW5kZXggfHwgMCA6IDA7XG5cbiAgICAgICAgdGhpcy5pbmplY3RGaXJzdFJvdygpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNlbGxXaWR0aHMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDZWxsSGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgPSBNYXRoLmNlaWwodGhpcy5ib2R5X2ggLyB0aGlzLmNlbGxfaCkgKyB0aGlzLm5fcGFkZGluZ19yb3dzO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c19yZW5kZXJlZCA+IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3JlbmRlcmVkID0gdGhpcy5jLnRvdGFsUm93cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSBNYXRoLmZsb29yKHRoaXMuYm9keV9oIC8gdGhpcy5jZWxsX2gpO1xuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubl9yb3dzX3Zpc2libGUgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93X2VuZF9pbmRleCA9IHRoaXMucm93X3N0YXJ0X2luZGV4ICsgdGhpcy5uX3Jvd3NfcmVuZGVyZWQgLSAxO1xuXG4gICAgICAgIHRoaXMuaW5qZWN0SGVhZGVyQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5pbmplY3RSZXN0T2ZSb3dzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlWEJvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVlCb3VuZCgpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTY3JvbGxCYXJzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmMucHJlc2VydmVTY3JvbGxTdGF0ZSAmJiB0aGlzLl9feCAhPT0gbnVsbCAmJiB0aGlzLl9feSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8qIHRoZSBjYWNoZWQgdmFsdWVzIGFyZSB0aGVuIGFwcGxpZWQgYWdhaW5zdCB0aGUgdGFibGUgdG8gYXJyaXZlIGF0IHRoZSBwcmV2aW91cyBzdGF0ZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlSW50ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFYOiAtdGhpcy5fX3gsXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhWTogLXRoaXMuX195LFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogbm9vcCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX194ID0gdGhpcy5fX3kgPSB0aGlzLl9fcm93X3N0YXJ0X2luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVIZWFkZXIoeCkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2hlYWRlcl94KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X2hlYWRlcl94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUJvZHkoeCwgeSkge1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy5sYXN0X2JvZHlfeCB8fCB5ICE9PSB0aGlzLmxhc3RfYm9keV95KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlfc3R5bGVbdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2xhdGUzZCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMubGFzdF9ib2R5X3ggPSB4O1xuICAgICAgICAgICAgdGhpcy5sYXN0X2JvZHlfeSA9IHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMuc3RhdGljX21vZGUgJiYgeCAhPT0gdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94KSB7XG4gICAgICAgICAgICB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zdHlsZVt0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zbGF0ZTNkKHgpO1xuICAgICAgICAgICAgdGhpcy5sYXN0X3hfc2Nyb2xsX2hhbmRsZV94ID0geDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUoeSkge1xuICAgICAgICBpZiAoIXRoaXMuYy5zdGF0aWNfbW9kZSAmJiB5ICE9PSB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kpIHtcbiAgICAgICAgICAgIHRoaXMueV9zY3JvbGxfaGFuZGxlX3N0eWxlW3RyYW5zZm9ybVByb3BdID0gdHJhbnNsYXRlM2QoMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGVyZm9ybVRyYW5zbGF0aW9ucyhuZXh0WCwgbmV4dFkpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVIZWFkZXIobmV4dFgpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZUJvZHkobmV4dFgsIG5leHRZKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVYU2Nyb2xsSGFuZGxlKHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVZU2Nyb2xsSGFuZGxlKHRoaXMueV9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBzY3JvbGxVcCgpIHtcbiAgICAgICAgLyogYXQgdGhlIGxvZ2ljYWwgc3RhcnQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggMCkgd2UgdHJ1bmNhdGUgdXB3YXJkIHNjcm9sbCBhdHRlbXB0c1xuICAgICAgICAgICB0byB0aGUgdXBwZXIgdHJhbnNsYXRpb24gYm91bmRhcnkgdG8ga2VlcCBmcm9tIHNraXBwaW5nIG9mZiBpbnRvIG5vdGhpbmduZXNzICovXG5cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4ID09PSAwICYmIHRoaXMubmV4dF95ID4gdGhpcy55X21pbikge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgPSB0aGlzLnlfbWluO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dfc3RhcnRfaW5kZXggPT09IDAgfHwgdGhpcy5uZXh0X3kgPD0gdGhpcy55X21pbikgeyByZXR1cm47IH1cblxuICAgICAgICAvKiBTY3JvbGxpbmcgdXAsIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgYm90dG9tIHBvc2l0aW9uIHRvIHRoZSB0b3BcbiAgICAgICAgICAgKGFib3ZlIHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLm5leHRfeSAtIHRoaXMueV9taW4pIC8gdGhpcy5jZWxsX2hcbiAgICAgICAgKTtcblxuICAgICAgICAvKiBwcmV2ZW50IHVuZGVyLXJvdGF0aW5nIGJlbG93IGluZGV4IHplcm8sIHRoZSBsb2dpY2FsIHN0YXJ0IG9mIGEgZGF0YSBzZXQgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X3N0YXJ0X2luZGV4IC0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSAtPSBNYXRoLmFicyh0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMubl9yb3dzX3RvX3NoaWZ0KSAqIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLnJvd19zdGFydF9pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5fcm93c190b19zaGlmdCA+IHRoaXMubl9yb3dzX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLyogd2hlbiB0aGUgdG90YWwgbW92ZW1lbnQgZW5kcyB1cCBiZWluZyBsYXJnZXIgdGhhbiB0aGUgc2V0IG9mIHJvd3MgYWxyZWFkeSByZW5kZXJlZCwgd2UgY2FuIHNhZmVseSBkZWNyZW1lbnQgdGhlIFwidmlld2FibGVcIiByb3cgcmFuZ2UgYWNjb3JkaW5nbHkgYW5kIHRoZSBuZXh0IHN0ZXAgd2hlcmUgdGhlIGNvbnRlbnQgaXMgc3Vic3RpdHV0ZWQgd2lsbCBhdXRvbWF0aWNhbGx5IGluc2VydCB0aGUgbmV4dCBsb2dpY2FsIHJvdyBpbnRvIGl0cyBwbGFjZSAqL1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdF9kZWx0YSA9IHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd19zdGFydF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMucm93X2VuZF9pbmRleCAtPSB0aGlzLnNoaWZ0X2RlbHRhO1xuXG4gICAgICAgICAgICAgICAgLyogYWNjb21vZGF0ZSBmb3IgdGhlIG51bWJlciBvZiBwaXhlbHMgdGhhdCB3aWxsIG5vdCBiZSByZW5kZXJlZCAqL1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dF95IC09IHRoaXMuc2hpZnRfZGVsdGEgKiB0aGlzLmNlbGxfaDtcblxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0ID0gdGhpcy5uX3Jvd3NfcmVuZGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIG1vdmUgdGhlIGhpZ2hlc3QgWS12YWx1ZSByb3dzIHRvIHRoZSB0b3Agb2YgdGhlIG9yZGVyaW5nIGFycmF5ICovXG4gICAgICAgICAgICB0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleCA9IHRoaXMucm93c19vcmRlcmVkX2J5X3kubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19zdGFydF9pbmRleCAtIHRoaXMuaXRlcmF0b3I7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVt0aGlzLm9yZGVyZWRfeV9hcnJheV9pbmRleF1cbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuZGF0YSA9IHRoaXMuZHJhZ190aW1lciA/IG51bGwgOiB0aGlzLmMuZ2V0Um93KHRoaXMudGFyZ2V0X2luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci5zZXRJbmRleCA9IHRoaXMudGFyZ2V0X2luZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLnkgPSB0aGlzLnJvd3NbdGhpcy5yb3dzX29yZGVyZWRfYnlfeVswXV0ueSAtIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnVuc2hpZnQodGhpcy5yb3dzX29yZGVyZWRfYnlfeS5wb3AoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4IC09IHRoaXMubl9yb3dzX3RvX3NoaWZ0O1xuXG4gICAgICAgICAgICB0aGlzLnlfbWluICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgICAgICB0aGlzLnlfbWF4ICs9IHRoaXMubl9yb3dzX3RvX3NoaWZ0ICogdGhpcy5jZWxsX2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxEb3duKCkge1xuICAgICAgICAvKiBhdCB0aGUgbG9naWNhbCBlbmQgb2YgdGhlIHRhYmxlIChyb3cgaW5kZXggbikgd2UgdHJ1bmNhdGUgYW55IHNjcm9sbCBhdHRlbXB0cyAgKi9cbiAgICAgICAgaWYgKHRoaXMucm93X2VuZF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzIC0gMSAmJiB0aGlzLm5leHRfeSA8PSB0aGlzLnlfbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueV9tYXg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX3RyYWNrX2hpZGRlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfeSAtPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dF95ID49IHRoaXMueV9tYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLyogU2Nyb2xsaW5nIGRvd24sIHNvIHdlIHdhbnQgdG8gbW92ZSB0aGUgcm93IGluIHRoZSB2aXN1YWwgdG9wIHBvc2l0aW9uIHRvIHRoZSBib3R0b21cbiAgICAgICAgICAgKGJlbG93IHRoZSBsaXAgb2YgdGhlIHZpZXcpICovXG5cbiAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5uZXh0X3kgLSB0aGlzLnlfbWF4KSAvIHRoaXMuY2VsbF9oKTtcblxuICAgICAgICBpZiAodGhpcy5uX3Jvd3NfdG9fc2hpZnQgKyB0aGlzLnJvd19lbmRfaW5kZXggKyAxID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG1vcmUgcm93cyB0aGFuIHRoZXJlIGlzIGRhdGEgYXZhaWxhYmxlLCB0cnVuY2F0ZSAqL1xuICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gKFxuICAgICAgICAgICAgICAgIHRoaXMubl9yb3dzX3RvX3NoaWZ0IC0gKHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAodGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPT09IDAgPyAwIDogMSkpXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMubmV4dF95ID0gdGhpcy5hcHBseURlbHRhKFxuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlEZWx0YSh0aGlzLnlfbWF4LCB0aGlzLnkpICUgdGhpcy5jZWxsX2gsIHRoaXMubmV4dF95XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy54X3Njcm9sbF90cmFja19oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgLT0gdGhpcy54X3Njcm9sbF90cmFja19oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5fcm93c190b19zaGlmdCA9IHRoaXMuYy50b3RhbFJvd3MgLSB0aGlzLnJvd19lbmRfaW5kZXggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubl9yb3dzX3RvX3NoaWZ0ID4gdGhpcy5uX3Jvd3NfcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvKiB3aGVuIHRoZSB0b3RhbCBtb3ZlbWVudCBlbmRzIHVwIGJlaW5nIGxhcmdlciB0aGFuIHRoZSBzZXQgb2Ygcm93cyBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBjYW4gc2FmZWx5IGluY3JlbWVudCB0aGUgXCJ2aWV3YWJsZVwiIHJvdyByYW5nZSBhY2NvcmRpbmdseSBhbmQgdGhlIG5leHQgc3RlcCB3aGVyZSB0aGUgY29udGVudCBpcyBzdWJzdGl0dXRlZCB3aWxsIGF1dG9tYXRpY2FsbHkgaW5zZXJ0IHRoZSBuZXh0IGxvZ2ljYWwgcm93IGludG8gaXRzIHBsYWNlICovXG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0X2RlbHRhID0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgLSB0aGlzLm5fcm93c19yZW5kZXJlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dfZW5kX2luZGV4ICs9IHRoaXMuc2hpZnRfZGVsdGE7XG5cbiAgICAgICAgICAgICAgICAvKiBhY2NvbW9kYXRlIGZvciB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGF0IHdpbGwgbm90IGJlIHJlbmRlcmVkICovXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0X3kgKz0gdGhpcy5zaGlmdF9kZWx0YSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5uX3Jvd3NfdG9fc2hpZnQgPSB0aGlzLm5fcm93c19yZW5kZXJlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh0aGlzLml0ZXJhdG9yID0gMTsgdGhpcy5pdGVyYXRvciA8PSB0aGlzLm5fcm93c190b19zaGlmdDsgdGhpcy5pdGVyYXRvciArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRfaW5kZXggPSB0aGlzLnJvd19lbmRfaW5kZXggKyB0aGlzLml0ZXJhdG9yO1xuXG4gICAgICAgICAgICAgICAgLyogdGhlIHBhZGRpbmcgcm93cyB3aWxsIGV4Y2VlZCB0aGUgbWF4aW11bSBpbmRleCBmb3IgYSBkYXRhIHNldCBvbmNlIHRoZSB1c2VyIGhhcyBmdWxseSB0cmFuc2xhdGVkIHRvIHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbiAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldF9pbmRleCA+PSB0aGlzLmMudG90YWxSb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c19vcmRlcmVkX2J5X3kucHVzaCh0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnNoaWZ0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdGhlIGxvd2VzdCBZLXZhbHVlIHJvd3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgb3JkZXJpbmcgYXJyYXkgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IHRoaXMucm93c1t0aGlzLnJvd3Nfb3JkZXJlZF9ieV95WzBdXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHRyLmRhdGEgPSB0aGlzLmRyYWdfdGltZXIgPyBudWxsIDogdGhpcy5jLmdldFJvdyh0aGlzLnRhcmdldF9pbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdHIuc2V0SW5kZXggPSB0aGlzLnRhcmdldF9pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnB0ci55ID0gdGhpcy5yb3dzW3RoaXMucm93c19vcmRlcmVkX2J5X3lbdGhpcy5yb3dzX29yZGVyZWRfYnlfeV9sZW5ndGggLSAxXV0ueSArIHRoaXMuY2VsbF9oO1xuICAgICAgICAgICAgICAgIHRoaXMucHRyLmFjdGl2ZSA9IHRoaXMudGFyZ2V0X2luZGV4ID09PSB0aGlzLmFjdGl2ZV9yb3c7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3Nfb3JkZXJlZF9ieV95LnB1c2godGhpcy5yb3dzX29yZGVyZWRfYnlfeS5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLnJvd19lbmRfaW5kZXggKz0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQ7XG5cbiAgICAgICAgICAgIHRoaXMueV9taW4gLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgICAgIHRoaXMueV9tYXggLT0gdGhpcy5uX3Jvd3NfdG9fc2hpZnQgKiB0aGlzLmNlbGxfaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5RGVsdGEoZGVsdGEsIG51bSkge1xuICAgICAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtIDwgMCA/IG51bSAtIGRlbHRhIDogbnVtICsgZGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtIC0gZGVsdGE7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlVmlzaWJsZVRvcFJvd0luZGV4KHRhcmdldFkgPSB0aGlzLm5leHRfeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3dzW1xuICAgICAgICAgICAgdGhpcy5yb3dzX29yZGVyZWRfYnlfeVtcbiAgICAgICAgICAgICAgICBNYXRoLmNlaWwoTWF0aC5hYnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlEZWx0YSh0aGlzLnlfbWluLCB0YXJnZXRZKSAvIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgXS5zZXRJbmRleDtcbiAgICB9XG5cbiAgICBoYW5kbGVNb3ZlSW50ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWCA9PT0gMCAgICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMueF9zY3JvbGxfbG9ja2VkICYmIGV2ZW50LmRlbHRhWCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmRlbHRhX3ggPSBldmVudC5kZWx0YVg7XG5cbiAgICAgICAgLy8gZGVsdGFNb2RlIDAgPT09IHBpeGVscywgMSA9PT0gbGluZXNcbiAgICAgICAgdGhpcy5kZWx0YV95ID0gICBldmVudC5kZWx0YU1vZGUgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChldmVudC5kZWx0YVksIDEwKSAqIHRoaXMuY2VsbF9oXG4gICAgICAgICAgICAgICAgICAgICAgIDogZXZlbnQuZGVsdGFZO1xuXG4gICAgICAgIC8qIGxvY2sgdGhlIHRyYW5zbGF0aW9uIGF4aXMgaWYgdGhlIHVzZXIgaXMgbWFuaXB1bGF0aW5nIHRoZSBzeW50aGV0aWMgc2Nyb2xsYmFycyAqL1xuICAgICAgICB0aGlzLm5leHRfeCA9IHRoaXMueV9zY3JvbGxfbG9ja2VkID8gdGhpcy54IDogdGhpcy54IC0gdGhpcy5kZWx0YV94O1xuICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueF9zY3JvbGxfbG9ja2VkID8gdGhpcy55IDogdGhpcy55IC0gdGhpcy5kZWx0YV95O1xuXG4gICAgICAgIGlmICh0aGlzLm5leHRfeCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeCA8IHRoaXMueF9tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dF94ID0gdGhpcy54X21heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5fcm93c192aXNpYmxlID49IHRoaXMuYy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgIC8qIG5lZ2F0ZSB0aGUgdmVydGljYWwgbW92ZW1lbnQsIG5vdCBlbm91Z2ggcm93cyB0byBmaWxsIHRoZSBib2R5ICovXG4gICAgICAgICAgICB0aGlzLm5leHRfeSA9IHRoaXMueTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5leHRfeSA8IHRoaXMueSkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxEb3duKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0X3kgPiB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2V0X3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZXNldF90aW1lcik7IH1cblxuICAgICAgICAvKiByZXNldCByb3cgJiB3cmFwcGVyIFkgdmFsdWVzIHRvd2FyZCAwIHRvIHByZXZlbnQgb3ZlcmZsb3dpbmcgKi9cbiAgICAgICAgdGhpcy5yZXNldF90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uIHJlc2V0WUF4aXMoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2V0X3RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgaW5zdGFuY2UucmVzZXRfZGVsdGEgPSBpbnN0YW5jZS55X21pbjtcblxuICAgICAgICAgICAgLyogc2hpZnQgYWxsIHRoZSBwb3NpdGlvbmluZyB2YXJpYWJsZXMgKi9cbiAgICAgICAgICAgIGluc3RhbmNlLnkgPSBpbnN0YW5jZS5hcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55KTtcbiAgICAgICAgICAgIGluc3RhbmNlLnlfbWluID0gaW5zdGFuY2UuYXBwbHlEZWx0YShpbnN0YW5jZS5yZXNldF9kZWx0YSwgaW5zdGFuY2UueV9taW4pO1xuICAgICAgICAgICAgaW5zdGFuY2UueV9tYXggPSBpbnN0YW5jZS5hcHBseURlbHRhKGluc3RhbmNlLnJlc2V0X2RlbHRhLCBpbnN0YW5jZS55X21heCk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IGFsbCB0aGUgcm93cyAqL1xuICAgICAgICAgICAgaW5zdGFuY2Uucm93c19vcmRlcmVkX2J5X3kuZm9yRWFjaCgocG9zaXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2Uucm93c1twb3NpdGlvbl0ueSA9IGluZGV4ICogaW5zdGFuY2UuY2VsbF9oO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIHNoaWZ0IHRoZSB3cmFwcGVyICovXG4gICAgICAgICAgICBpbnN0YW5jZS50cmFuc2xhdGVCb2R5KGluc3RhbmNlLngsIGluc3RhbmNlLnkpO1xuXG4gICAgICAgIH0sIDEwMCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy50b3BfdmlzaWJsZV9yb3dfaW5kZXggPSB0aGlzLmNhbGN1bGF0ZVZpc2libGVUb3BSb3dJbmRleCgpO1xuXG4gICAgICAgIC8qIHF1ZXVlIHVwIHRyYW5zbGF0aW9ucyBhbmQgdGhlIGJyb3dzZXIgd2lsbCBleGVjdXRlIHRoZW0gYXMgYWJsZSwgbmVlZCB0byBwYXNzIGluIHRoZSB2YWx1ZXMgdGhhdCB3aWxsIGNoYW5nZSBkdWUgdG8gbW9yZSBoYW5kbGVNb3ZlSW50ZW50IGludm9jYXRpb25zIGJlZm9yZSB0aGlzIHJBRiBldmVudHVhbGx5IGV4ZWN1dGVzLiAqL1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIHJBRihuZXh0WCwgY3VyclgsIG5leHRZLCB2aXNpYmxlVG9wUm93SW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChuZXh0WCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMueF9zY3JvbGxfaGFuZGxlX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKz0gKChuZXh0WCAtIGN1cnJYKSAvIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbykgKiAtMTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiArIHRoaXMueF9zY3JvbGxfaGFuZGxlX3NpemUgPiB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnhfc2Nyb2xsX3RyYWNrX3cgLSB0aGlzLnhfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB2aXNpYmxlVG9wUm93SW5kZXggKiB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvO1xuXG4gICAgICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gPSB0aGlzLnlfc2Nyb2xsX3RyYWNrX2ggLSB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEbyBhbGwgdHJhbnNmb3JtcyBncm91cGVkIHRvZ2V0aGVyXG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2xhdGlvbnMobmV4dFgsIG5leHRZKTtcblxuICAgICAgICB9LmJpbmQodGhpcywgdGhpcy5uZXh0X3gsIHRoaXMueCwgdGhpcy5uZXh0X3ksIHRoaXMudG9wX3Zpc2libGVfcm93X2luZGV4KSk7XG5cbiAgICAgICAgdGhpcy54ID0gdGhpcy5uZXh0X3g7XG4gICAgICAgIHRoaXMueSA9IHRoaXMubmV4dF95O1xuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIHdlIGhhbmRsZSB0b3VjaG1vdmUgYnkgZGV0ZWN0aW5nIHRoZSBkZWx0YSBvZiBwYWdlWC9ZIGFuZCBmb3J3YXJkaW5nXG4gICAgICAgIGl0IHRvIGhhbmRsZU1vdmVJbnRlbnQoKSAqL1xuXG4gICAgICAgIHRoaXMudG91Y2ggPSBldmVudC50b3VjaGVzLml0ZW0oMCk7XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VYIC0gdGhpcy50b3VjaC5wYWdlWDtcbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gdGhpcy5sYXN0X3RvdWNoX3BhZ2VZIC0gdGhpcy50b3VjaC5wYWdlWTtcblxuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSB0aGlzLnRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVggPSB0aGlzLnRvdWNoLnBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RfdG91Y2hfcGFnZVkgPSB0aGlzLnRvdWNoLnBhZ2VZO1xuICAgIH1cblxuICAgIGhhbmRsZUFkdmFuY2VUb1hTY3JvbGxUcmFja0xvY2F0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09ICd1aS10YWJsZS14LXNjcm9sbC10cmFjaycpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X3BhZ2VYKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbztcbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gMDtcblxuICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgIH1cblxuICAgIGhhbmRsZUFkdmFuY2VUb1lTY3JvbGxUcmFja0xvY2F0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnlfc2Nyb2xsX2xvY2tlZCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09ICd1aS10YWJsZS15LXNjcm9sbC10cmFjaycpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgdGhpcy5ldnQuZGVsdGFZID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIHRoaXMuYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfeV9zY3JvbGxfaGFuZGxlX3ksIGV2ZW50LnBhZ2VZIC0gdGhpcy5kaXN0YW5jZV9mcm9tX3RvcFxuICAgICAgICAgICAgKSAvIHRoaXMueV9zY3JvbGxiYXJfcGl4ZWxfcmF0aW9cbiAgICAgICAgKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgfVxuXG4gICAgaGFuZGxlWFNjcm9sbEhhbmRsZURyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3BhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZURyYWdFbmQsIHRydWUpO1xuICAgIH1cblxuICAgIGhhbmRsZVlTY3JvbGxIYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8qIGFkanVzdHMgZm9yIHRoZSBwaXhlbCBkaXN0YW5jZSBiZXR3ZWVuIHdoZXJlIHRoZSBoYW5kbGUgaXMgY2xpY2tlZCBhbmQgdGhlIHRvcCBlZGdlIG9mIGl0OyB0aGUgaGFuZGxlIGlzIHBvc2l0aW9uZWQgYWNjb3JkaW5nIHRvIGl0cyB0b3AgZWRnZSAqL1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX29mZnNldCA9IGV2ZW50Lm9mZnNldFk7XG5cbiAgICAgICAgdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZSBtb3VzZXVwIGhhcHBlbnMgb3V0c2lkZSB0aGUgdGFibGUsIGl0IHdvbid0IGJlIGRldGVjdGVkIHdpdGhvdXQgdGhpcyBsaXN0ZW5lclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlRHJhZ0VuZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ01vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMueV9zY3JvbGxfbG9ja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnX3RpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5kcmFnX3RpbWVyKTsgfVxuXG4gICAgICAgICAgICAvKiB4LWF4aXMgZG9lc24ndCBuZWVkIHRocm90dGxlIHByb3RlY3Rpb24gc2luY2UgaXQgZG9lc24ndCBjYXVzZSBhIHJvdyBmZXRjaCAqL1xuICAgICAgICAgICAgdGhpcy5kcmFnX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ190aW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvKiBOb3cgZmV0Y2gsIG9uY2UgZHJhZyBoYXMgY2Vhc2VkIGZvciBsb25nIGVub3VnaC4gKi9cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5kYXRhID0gdGhpcy5jLmdldFJvdyhyb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmMudGhyb3R0bGVJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWCA9IDA7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlEZWx0YShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0X3lfc2Nyb2xsX2hhbmRsZV95LFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWSAtIHRoaXMuZGlzdGFuY2VfZnJvbV90b3AgLSB0aGlzLnlfc2Nyb2xsX29mZnNldFxuICAgICAgICAgICAgICAgICkgLyB0aGlzLnlfc2Nyb2xsYmFyX3BpeGVsX3JhdGlvXG4gICAgICAgICAgICApICogdGhpcy5jZWxsX2g7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnhfc2Nyb2xsX2xvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X3BhZ2VYKSAqIHRoaXMueF90YWJsZV9waXhlbF9yYXRpbztcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdF9wYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5faXNfcmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sdW1uUmVzaXplKGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0X2NvbHVtbl94KTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvY2tEcmFnVG9TY3JvbGwoKSB7XG4gICAgICAgIHRoaXMueF9zY3JvbGxfbG9ja2VkID0gdGhpcy55X3Njcm9sbF9sb2NrZWQgPSB0aGlzLmNvbHVtbl9pc19yZXNpemluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbmQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmxlZnRfYnV0dG9uX3ByZXNzZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiB0aGUgYnJvd3NlciBmaXJlcyB0aGUgbW91c2V1cCBhbmQgY2xpY2sgZXZlbnRzIHNpbXVsdGFuZW91c2x5LCBhbmQgd2UgZG9uJ3Qgd2FudCBvdXIgY2xpY2sgaGFuZGxlciB0byBiZSBleGVjdXRlZCwgc28gYSB6ZXJvLWRlbGF5IHNldFRpbWVvdXQgd29ya3MgaGVyZSB0byBsZXQgdGhlIHN0YWNrIGNsZWFyIGJlZm9yZSBhbGxvd2luZyBjbGljayBldmVudHMgYWdhaW4uICovXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMudW5sb2NrRHJhZ1RvU2Nyb2xsKCksIDApO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtbkRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICd1aS10YWJsZS1oZWFkZXItY2VsbC1yZXNpemUtaGFuZGxlJykge1xuICAgICAgICAgICAgLy8gRml4ZXMgZHJhZ1N0YXJ0IG9jY2FzaW9uYWxseSBoYXBwZW5pbmcgYW5kIGJyZWFraW5nIHRoZSBzaW11bGF0ZWQgZHJhZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5sZWZ0X2J1dHRvbl9wcmVzc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0X2NvbHVtbl94ID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgICAgIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBldmVudC50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2V1cCBoYXBwZW5zIG91dHNpZGUgdGhlIHRhYmxlLCBpdCB3b24ndCBiZSBkZXRlY3RlZCB3aXRob3V0IHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVEcmFnRW5kLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMuYy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAvLyB0aGUgcHJvdmlkZWQgY29uZmlnIG9iamVjdHNcbiAgICAgICAgdGhpcy5jb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoOyAgICAgIC8vIHRoZSBjb2x1bW4gbm9kZXNcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5jZWxsc1tpbmRleF0ud2lkdGggPSB3aWR0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVYQm91bmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplU2Nyb2xsQmFycygpO1xuXG4gICAgICAgIGlmICh0aGlzLmMub25Db2x1bW5SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuYy5vbkNvbHVtblJlc2l6ZSh0aGlzLmNvbHVtbnNbaW5kZXhdLm1hcHBpbmcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNvbHVtblJlc2l6ZShkZWx0YSkge1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZih0aGlzLmNvbHVtbl9pc19yZXNpemluZyk7XG4gICAgICAgIGxldCBhZGp1c3RlZF9kZWx0YSA9IGRlbHRhO1xuXG4gICAgICAgIGlmICggICBhZGp1c3RlZF9kZWx0YSA8IDBcbiAgICAgICAgICAgICYmICFpc05hTih0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aClcbiAgICAgICAgICAgICYmIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbHVtbl9pc19yZXNpemluZy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGFkanVzdGVkX2RlbHRhID0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWluV2lkdGggLSB0aGlzLmNvbHVtbl9pc19yZXNpemluZy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odGhpcy5jb2x1bW5faXNfcmVzaXppbmcubWF4V2lkdGgpXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGggKyBhZGp1c3RlZF9kZWx0YSA+IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoKSB7XG4gICAgICAgICAgICBhZGp1c3RlZF9kZWx0YSA9IHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLm1heFdpZHRoIC0gdGhpcy5jb2x1bW5faXNfcmVzaXppbmcud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoaW5kZXgsIHRoaXMuY29sdW1uX2lzX3Jlc2l6aW5nLndpZHRoICsgYWRqdXN0ZWRfZGVsdGEpO1xuXG4gICAgICAgIC8qIElmIGEgY29sdW1uIHNocmlua3MsIHRoZSB3cmFwcGVyIFggdHJhbnNsYXRpb24gbmVlZHMgdG8gYmUgYWRqdXN0ZWQgYWNjb3JkaW5nbHkgb3JcbiAgICAgICAgd2UnbGwgc2VlIHVud2FudGVkIHdoaXRlc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGUuIElmIHRoZSB0YWJsZSB3aWR0aCBiZWNvbWVzIHNtYWxsZXIgdGhhblxuICAgICAgICB0aGUgb3ZlcmFsbCBjb250YWluZXIsIHdoaXRlc3BhY2Ugd2lsbCBhcHBlYXIgcmVnYXJkbGVzcy4gKi9cbiAgICAgICAgaWYgKGFkanVzdGVkX2RlbHRhIDwgMCAmJiB0aGlzLnJvd193ICsgdGhpcy54ICsgYWRqdXN0ZWRfZGVsdGEgPCB0aGlzLmNvbnRhaW5lcl93KSB7XG4gICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSBhZGp1c3RlZF9kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZUludGVudCh0aGlzLmV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb2x1bW5BdXRvRXhwYW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3VpLXRhYmxlLWhlYWRlci1jZWxsLXJlc2l6ZS1oYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gZmluZFdoZXJlKHRoaXMuY29sdW1ucywgJ21hcHBpbmcnLCBtYXBwaW5nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY29sdW1uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aDtcblxuICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyb3cuZGF0YSBpbnN0YW5jZW9mIFByb21pc2UpICYmIHJvdy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aCA9IHJvdy5jZWxsc1tjb2x1bW5JbmRleF0udHJ1ZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gd2lkdGggPCBjZWxsV2lkdGggPyBjZWxsV2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLyogZmluZCB0aGUgcmVuZGVyZWQgcm93IHdpdGggdGhlIGxvbmdlc3QgY29udGVudCBlbnRyeSAqL1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5TmV3Q29sdW1uV2lkdGgoY29sdW1uSW5kZXgsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleUZyb21LZXlDb2RlKGNvZGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICByZXR1cm4gJ0Fycm93RG93bic7XG5cbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIHJldHVybiAnQXJyb3dVcCc7XG5cbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIHJldHVybiAnRW50ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QXJpYVRleHQodGV4dCkge1xuICAgICAgICB0aGlzLmMuYXJpYS5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVJvdyhzZXRJbmRleCkge1xuICAgICAgICB0aGlzLmFjdGl2ZV9yb3cgPSBzZXRJbmRleDtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHJvdy5hY3RpdmUgPSByb3cuc2V0SW5kZXggPT09IHNldEluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VBY3RpdmVSb3coZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3JvdyArIGRlbHRhID49IHRoaXMuYy50b3RhbFJvd3MpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5uZXh0X2FjdGl2ZV9yb3cgPSBmaW5kV2hlcmUodGhpcy5yb3dzLCAnc2V0SW5kZXgnLCB0aGlzLmFjdGl2ZV9yb3cgKyBkZWx0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMubmV4dF9hY3RpdmVfcm93KSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVJvdyh0aGlzLm5leHRfYWN0aXZlX3Jvdy5zZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNldEFyaWFUZXh0KHRoaXMubmV4dF9hY3RpdmVfcm93LmRhdGFbdGhpcy5jb2x1bW5zWzBdLm1hcHBpbmddKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIChkZWx0YSA9PT0gLTEgJiYgdGhpcy5uZXh0X2FjdGl2ZV9yb3cueSAqIC0xID4gdGhpcy55KVxuICAgICAgICAgICAgICAgIHx8IChkZWx0YSA9PT0gMSAmJiB0aGlzLm5leHRfYWN0aXZlX3Jvdy55ICogLTEgPCB0aGlzLnkgLSB0aGlzLmJvZHlfaCArIHRoaXMuY2VsbF9oKVxuICAgICAgICAgICAgKSB7IC8vIERlc3RpbmF0aW9uIHJvdyBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgc28gc2ltdWxhdGUgYSBzY3JvbGxcbiAgICAgICAgICAgICAgICB0aGlzLmV2dC5kZWx0YVggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9IHRoaXMuY2VsbF9oICogZGVsdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCAgIChkZWx0YSA8IDAgJiYgdGhpcy5hY3RpdmVfcm93ID4gMClcbiAgICAgICAgICAgICAgICAgICB8fCAoZGVsdGEgPiAwICYmIHRoaXMuYWN0aXZlX3JvdyA8IHRoaXMuYy50b3RhbFJvd3MpKSB7XG4gICAgICAgICAgICAvKiBUaGUgZGVzdGluYXRpb24gcm93IGlzbid0IHJlbmRlcmVkLCBzbyB3ZSBuZWVkIHRvIHRyYW5zbGF0ZSBlbm91Z2ggcm93cyBmb3IgaXQgdG8gZmVhc2libHkgYmUgc2hvd24gaW4gdGhlIHZpZXdwb3J0LiAqL1xuICAgICAgICAgICAgdGhpcy5ldnQuZGVsdGFYID0gMDtcbiAgICAgICAgICAgIHRoaXMuZXZ0LmRlbHRhWSA9ICggICAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4ID4gdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoICAgIHRoaXMucm93X3N0YXJ0X2luZGV4IDwgdGhpcy5hY3RpdmVfcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmFjdGl2ZV9yb3cgLSB0aGlzLnJvd19zdGFydF9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGRlbHRhKSAqIHRoaXMuY2VsbF9oO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmVJbnRlbnQodGhpcy5ldnQpO1xuXG4gICAgICAgICAgICAvLyBzdGFydCB0aGUgcHJvY2VzcyBhZ2Fpbiwgbm93IHRoYXQgdGhlIHJvdyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5jaGFuZ2VBY3RpdmVSb3coZGVsdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dF9hY3RpdmVfcm93ID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleSB8fCB0aGlzLmdldEtleUZyb21LZXlDb2RlKGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZVJvdygxKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlUm93KC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVfcm93ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGZpbmRXaGVyZSh0aGlzLnJvd3MsICdzZXRJbmRleCcsIHRoaXMuYWN0aXZlX3JvdykuZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVRleHQodGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29sdW1uLnRpdGxlfTogJHtyb3dbY29sdW1uLm1hcHBpbmddfWA7XG4gICAgICAgICAgICAgICAgfSkuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNjb3ZlckNlbGxBbmRSb3dOb2Rlcyh0YXJnZXQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIGNvbnN0IG5vZGVNYXAgPSB7fTtcblxuICAgICAgICBpZiAobm9kZS5jbGFzc05hbWUubWF0Y2gocm93Q2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7cm93OiBub2RlfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICgoIW5vZGVNYXAuY2VsbCB8fCAhbm9kZU1hcC5yb3cpICYmIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChjZWxsQ2xhc3NSZWdleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFwLmNlbGwgPSBub2RlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTmFtZS5tYXRjaChyb3dDbGFzc1JlZ2V4KSkge1xuICAgICAgICAgICAgICAgIG5vZGVNYXAucm93ID0gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlTWFwO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZGlzY292ZXJDZWxsQW5kUm93Tm9kZXMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICBpZiAobWFwLnJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZmluZFdoZXJlKHRoaXMucm93cywgJ25vZGUnLCBtYXAucm93KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVSb3cocm93LnNldEluZGV4KTtcblxuICAgICAgICAgICAgaWYgKG1hcC5jZWxsICYmIHRoaXMuYy5jZWxsQ2xpY2tGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jLmNlbGxDbGlja0Z1bmMoZXZlbnQsIHJvdy5zZXRJbmRleCwgbWFwLmNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYy5yb3dDbGlja0Z1bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMucm93Q2xpY2tGdW5jKGV2ZW50LCByb3cuc2V0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAganVtcFRvUm93SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yb3dfc3RhcnRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy55ID0gMDtcblxuICAgICAgICB0aGlzLnJlZ2VuZXJhdGUoKTtcblxuICAgICAgICB0aGlzLnRvcF92aXNpYmxlX3Jvd19pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IGluZGV4ICogdGhpcy55X3Njcm9sbGJhcl9waXhlbF9yYXRpbztcblxuICAgICAgICBpZiAodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24gKyB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9zaXplID4gdGhpcy55X3Njcm9sbF90cmFja19oKSB7XG4gICAgICAgICAgICB0aGlzLnlfc2Nyb2xsX2hhbmRsZV9wb3NpdGlvbiA9IHRoaXMueV9zY3JvbGxfdHJhY2tfaCAtIHRoaXMueV9zY3JvbGxfaGFuZGxlX3NpemU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0ZVlTY3JvbGxIYW5kbGUodGhpcy55X3Njcm9sbF9oYW5kbGVfcG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlUm93KGluZGV4KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlVmlldztcbiJdfQ==