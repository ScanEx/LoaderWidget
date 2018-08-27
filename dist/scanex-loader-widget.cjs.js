'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var scanexTranslations_cjs = createCommonjsModule(function (module) {

function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var scanexObjectExtensions_cjs = createCommonjsModule$$1(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var copy = function copy(source) {
    switch (typeof source === 'undefined' ? 'undefined' : _typeof(source)) {
        case 'number':
        case 'string':
        case 'function':
        default:
            return source;
        case 'object':
            if (source === null) {
                return null;
            } else if (Array.isArray(source)) {
                return source.map(function (item) {
                    return copy(item);
                });
            } else if (source instanceof Date) {
                return source;
            } else {
                return Object.keys(source).reduce(function (a, k) {
                    a[k] = copy(source[k]);
                    return a;
                }, {});
            }
    }
};

var extend = function extend(target, source) {
    if (target === source) {
        return target;
    } else {
        return Object.keys(source).reduce(function (a, k) {
            var value = source[k];
            if (_typeof(a[k]) === 'object' && k in a) {
                a[k] = extend(a[k], value);
            } else {
                a[k] = copy(value);
            }
            return a;
        }, copy(target));
    }
};

exports.copy = copy;
exports.extend = extend;
});

unwrapExports$$1(scanexObjectExtensions_cjs);
var scanexObjectExtensions_cjs_1 = scanexObjectExtensions_cjs.copy;
var scanexObjectExtensions_cjs_2 = scanexObjectExtensions_cjs.extend;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var DEFAULT_LANGUAGE = 'rus';

var Translations = function () {
    function Translations() {
        classCallCheck(this, Translations);

        this._hash = {};
    }

    createClass(Translations, [{
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this._language = lang;
        }
    }, {
        key: 'getLanguage',
        value: function getLanguage() {
            return window.language || this._language || DEFAULT_LANGUAGE;
        }
    }, {
        key: 'addText',
        value: function addText(lang, tran) {
            this._hash[lang] = scanexObjectExtensions_cjs_2(this._hash[lang] || {}, tran);
            return this;
        }
    }, {
        key: 'getText',
        value: function getText(key) {
            if (key && typeof key === 'string') {
                var locale = this._hash[this.getLanguage()];
                if (locale) {
                    return eval('locale.' + key);
                }
            }
            return null;
        }
    }]);
    return Translations;
}();

window.Scanex = window.Scanex || {};
window.Scanex.Translations = window.Scanex.Translations || {};
window.Scanex.translations = window.Scanex.translations || new Translations();

var index = window.Scanex.translations;

module.exports = index;
});

var Translations = unwrapExports(scanexTranslations_cjs);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var EventTarget = function () {
    function EventTarget() {
        classCallCheck(this, EventTarget);

        this.listeners = {};
    }

    createClass(EventTarget, [{
        key: 'addEventListener',
        value: function addEventListener(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            var stack = this.listeners[type];
            for (var i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return this.removeEventListener(type, callback);
                }
            }
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(event) {
            if (!(event.type in this.listeners)) {
                return;
            }
            var stack = this.listeners[event.type];
            Object.defineProperty(event, 'target', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: this
            });
            for (var i = 0, l = stack.length; i < l; i++) {
                stack[i].call(this, event);
            }
        }
    }]);
    return EventTarget;
}();

var scanexEventTarget_cjs = EventTarget;

var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var T = Translations;

var LoaderWidget = function (_EventTarget) {
    inherits(LoaderWidget, _EventTarget);

    function LoaderWidget() {
        classCallCheck$1(this, LoaderWidget);

        var _this = possibleConstructorReturn(this, (LoaderWidget.__proto__ || Object.getPrototypeOf(LoaderWidget)).call(this));

        _this._container = document.createElement('div');
        document.body.appendChild(_this._container);
        _this._container.classList.add('noselect');
        _this._container.classList.add('loader-widget');
        _this._container.innerHTML = '<div class="loader-icon"></div><div class="loader-button">' + T.getText('alerts.cancel') + '</div>';
        _this._ovl = document.querySelector('.loader-widget-overlay');
        _this._stopPropagation = _this._stopPropagation.bind(_this);
        if (!_this._ovl) {
            _this._ovl = document.createElement('div');
            document.body.appendChild(_this._ovl);
            _this._ovl.className = 'loader-widget-overlay';
            _this._ovl.style.display = 'none';
            _this._ovl.addEventListener('mousemove', _this._stopPropagation);
            _this._ovl.addEventListener('mousewheel', _this._stopPropagation);
            _this._ovl.addEventListener('click', _this._stopPropagation);
        }
        _this._container.querySelector('.loader-button').addEventListener('click', function (e) {
            _this.hide();
            var event = document.createEvent('Event');
            event.initEvent('cancel', false, false);
            _this.dispatchEvent(event);
        });
        _this.show = _this.show.bind(_this);
        _this.hide = _this.hide.bind(_this);
        return _this;
    }

    createClass$1(LoaderWidget, [{
        key: '_stopPropagation',
        value: function _stopPropagation(e) {
            e.stopPropagation();
        }
    }, {
        key: 'show',
        value: function show() {
            this._ovl.style.display = 'block';
            this._container.querySelector('.loader-icon').classList.add('loader-animated');
            this._container.style.visibility = 'visible';
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._ovl.style.display = 'none';
            this._container.querySelector('.loader-icon').classList.remove('loader-animated');
            this._container.style.visibility = 'hidden';
        }
    }]);
    return LoaderWidget;
}(scanexEventTarget_cjs);

module.exports = LoaderWidget;
