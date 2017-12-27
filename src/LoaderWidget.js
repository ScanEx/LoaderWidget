import './LoaderWidget.css';

class LoaderWidget {
    constructor () {
        this._container = document.createElement('div');
        document.body.appendChild(this._container);
        this._container.classList.add ('noselect');
        this._container.classList.add('loader-widget');
        this._container.innerHTML = '<div class="loader-icon"></div>';
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

export { LoaderWidget };