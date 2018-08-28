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
                return eval(`locale.${key}`);
            }            
        }
        return null;
    }
}

window.Scanex = window.Scanex || {};
window.Scanex.Translations = window.Scanex.Translations || {};
window.Scanex.translations = window.Scanex.translations || new Translations();

var index = window.Scanex.translations;

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

let T = index;

class LoaderWidget extends EventTarget {
    constructor () {
        super();
        this._container = document.createElement('div');
        document.body.appendChild(this._container);
        this._container.classList.add ('noselect');
        this._container.classList.add('loader-widget');
        this._container.innerHTML = `<div class="loader-icon"></div><div class="loader-button">${T.getText('alerts.cancel')}</div>`;
        this._ovl = document.querySelector('.loader-widget-overlay');
        this._stopPropagation = this._stopPropagation.bind(this);
        if(!this._ovl) {
            this._ovl = document.createElement('div');
            document.body.appendChild(this._ovl);
            this._ovl.className = 'loader-widget-overlay';
            this._ovl.style.display = 'none';
            this._ovl.addEventListener('mousemove', this._stopPropagation);
            this._ovl.addEventListener('mousewheel', this._stopPropagation);
            this._ovl.addEventListener('click', this._stopPropagation);
        }
        this._container.querySelector('.loader-button').addEventListener('click', e => {
            this.hide();            
            let event = document.createEvent('Event');
            event.initEvent('cancel', false, false);
            this.dispatchEvent(event);
        });
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    _stopPropagation (e) {
        e.stopPropagation();
    }
    show() {        
        this._ovl.style.display = 'block';
        this._container.querySelector('.loader-icon').classList.add('loader-animated');
        this._container.style.visibility = 'visible';        
    }
    hide() {        
        this._ovl.style.display = 'none';
        this._container.querySelector('.loader-icon').classList.remove('loader-animated');
        this._container.style.visibility = 'hidden';        
    }
}

export default LoaderWidget;
