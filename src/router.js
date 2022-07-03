class Router {
	constructor(route) {
		/* @if DEBUG */
		if (!(typeof route === 'function')) {
			throw 'Argument "route" is invalid.';
		}

		/* @endif */
		this._listener = () => {
			/* @if DEBUG */
			if (!(this.started === true)) {
				throw 'Router has not yest started or has been stopped.';
			}

			/* @endif */
			const [hash, query] = window.location.hash.charAt(0) === '#'
				? decodeURI(window.location.hash.substring(1)).split('?')
				: [''];
			const paths = hash.split('/');
			route({ hash, paths, query, router: this });
		};

		this.started = false;
	}

	start() {
		/* @if DEBUG */
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === false)) {
			throw 'Router has already started.';
		}

		/* @endif */
		this.started = true;
		window.addEventListener('popstate', this._listener);
		this._listener();
	}

	push(path) {
		/* @if DEBUG */
		if (!(typeof path === 'string')) {
			throw 'Argument "path" is invalid.';
		}
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		/* @endif */
		window.history.pushState({}, path, `#${path}`);
		this._listener();
	}

	replace(path) {
		/* @if DEBUG */
		if (!(typeof path === 'string')) {
			throw 'Argument "path" is invalid.';
		}
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		/* @endif */
		window.history.replaceState({}, path, `#${path}`);
		this._listener();
	}

	stop() {
		/* @if DEBUG */
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		/* @endif */
		window.removeEventListener('popstate', this._listener);
		this.started = false;
	}
}

/* @if TARGET="BROWSER_ES6_MODULE" */
export default Router;
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" */
/* exported Router */
/* @endif */
