'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

const copy = source => {
    switch(typeof source) {
        case 'number':
        case 'string':
        case 'function':
        default:
            return source;
        case 'object':
            if (source === null) {
                return null;
            }
            else if (Array.isArray(source)) {
                return source.map (item => copy (item));
            }
            else if (source instanceof Date) {
                return source;
            }
            else {                
                return Object.keys(source).reduce((a, k) => {                    
                    a[k] = copy(source[k]);
                    return a;
                }, {});
            }
    }
};

const extend = (target, source) => {
    if (target === source) {
	    return target;
    }
    else {
        return Object.keys(source).reduce((a, k) => {
            let value = source[k];
            if(typeof a[k] === 'object' && (k in a)){
                a[k] = extend (a[k], value);
            }
            else {
               a[k] = copy(value);
            }
            return a;
        }, copy (target));
    }    
};

const DEFAULT_LANGUAGE = 'rus';

class Translations {
    constructor(){
        this._hash = {};
    }    
    setLanguage (lang) {
        this._language = lang;
    }
    getLanguage () {
        return window.language || this._language || DEFAULT_LANGUAGE;
    }
    addText (lang, tran) {        
        this._hash[lang]= extend(this._hash[lang] || {}, tran);
        return this;
    }
    getText (key) {
        if(key && typeof key === 'string') {
            let locale = this._hash[this.getLanguage()];
            if (locale) {
                return key
                    .split('.')
                    .reduce((a, k) => a[k], locale);
            }         
        }
        return null;
    }
}

window.Scanex = window.Scanex || {};
window.Scanex.Translations = window.Scanex.Translations || {};
window.Scanex.translations = window.Scanex.translations || new Translations();

var Translations$1 = window.Scanex.translations;

class EventTarget {    
    constructor() {
        this.listeners = {};
    }
    addEventListener(type, callback) {
        if(!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    on(type, callback) {
        this.addEventListener(type, callback);
        return this;
    }
    removeEventListener (type, callback) {
        if(!(type in this.listeners)) {
            return;
        }
        let stack = this.listeners[type];
        for(let i = 0, l = stack.length; i < l; i++) {
            if(stack[i] === callback){
                stack.splice(i, 1);
                return this.removeEventListener(type, callback);
            }
        }
    }
    off(type, callback) {
        this.removeEventListener(type, callback);
        return this;
    }
    dispatchEvent(event) {
        if(!(event.type in this.listeners)) {
            return;
        }
        let stack = this.listeners[event.type];
	    Object.defineProperty(event, 'target', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: this
        });
        for(let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
    }
    
}

var T = Translations$1;

var LoaderWidget = /*#__PURE__*/function (_EventTarget) {
  _inherits(LoaderWidget, _EventTarget);

  var _super = _createSuper(LoaderWidget);

  function LoaderWidget() {
    var _this;

    _classCallCheck(this, LoaderWidget);

    _this = _super.call(this);
    _this._container = document.createElement('div');
    document.body.appendChild(_this._container);

    _this._container.classList.add('noselect');

    _this._container.classList.add('loader-widget');

    _this._container.innerHTML = "<div class=\"loader-icon\"></div><div class=\"loader-button\">".concat(T.getText('alerts.cancel'), "</div>");
    _this._ovl = document.querySelector('.loader-widget-overlay');
    _this._stopPropagation = _this._stopPropagation.bind(_assertThisInitialized(_this));

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

    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoaderWidget, [{
    key: "_stopPropagation",
    value: function _stopPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: "show",
    value: function show() {
      this._ovl.style.display = 'block';

      this._container.querySelector('.loader-icon').classList.add('loader-animated');

      this._container.style.visibility = 'visible';
    }
  }, {
    key: "hide",
    value: function hide() {
      this._ovl.style.display = 'none';

      this._container.querySelector('.loader-icon').classList.remove('loader-animated');

      this._container.style.visibility = 'hidden';
    }
  }]);

  return LoaderWidget;
}(EventTarget);

module.exports = LoaderWidget;
//# sourceMappingURL=scanex-loader-widget.js.map
