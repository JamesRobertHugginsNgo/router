class Router {
	constructor(route) {
		this._listener = () => {
			const [hash, query] = window.location.hash.charAt(0) === '#'
				? decodeURI(window.location.hash.substring(1)).split('?')
				: [''];
			const paths = hash.split('/');
			route({ hash, paths, query, router: this });
		};

		this.started = false;
	}

	start() {
		this.started = true;
		window.addEventListener('popstate', this._listener);
		this._listener();
	}

	push(path) {
		window.history.pushState({}, path, `#${path}`);
		this._listener();
	}

	replace(path) {
		window.history.replaceState({}, path, `#${path}`);
		this._listener();
	}

	stop() {
		window.removeEventListener('popstate', this._listener);
		this.started = false;
	}
}

export default Router;
