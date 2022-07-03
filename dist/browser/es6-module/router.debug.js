class Router {
	constructor(route) {
		if (!(typeof route === 'function')) {
			throw 'Argument "route" is invalid.';
		}

		this._listener = () => {
			if (!(this.started === true)) {
				throw 'Router has not yest started or has been stopped.';
			}

			const [hash, query] = window.location.hash.charAt(0) === '#'
				? decodeURI(window.location.hash.substring(1)).split('?')
				: [''];
			const paths = hash.split('/');
			route({ hash, paths, query, router: this });
		};

		this.started = false;
	}

	start() {
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === false)) {
			throw 'Router has already started.';
		}

		this.started = true;
		window.addEventListener('popstate', this._listener);
		this._listener();
	}

	push(path) {
		if (!(typeof path === 'string')) {
			throw 'Argument "path" is invalid.';
		}
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		window.history.pushState({}, path, `#${path}`);
		this._listener();
	}

	replace(path) {
		if (!(typeof path === 'string')) {
			throw 'Argument "path" is invalid.';
		}
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		window.history.replaceState({}, path, `#${path}`);
		this._listener();
	}

	stop() {
		if (!(typeof this._listener === 'function')) {
			throw 'Property "_listener" is invalid.';
		}
		if (!(this.started === true)) {
			throw 'Router has not yest started or has been stopped.';
		}

		window.removeEventListener('popstate', this._listener);
		this.started = false;
	}
}

export default Router;
