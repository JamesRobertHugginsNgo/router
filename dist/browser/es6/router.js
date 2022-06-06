const Router = (() => {
	function createArgument(router) {
		const [hash, query] = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''];
		const paths = hash.split('/');
		return { router, hash, paths, query };
	}

	return class {
		constructor(route) {
			this.route = route;
			this.listener = () => void this.route(createArgument(this));
		}

		start() {
			window.addEventListener('popstate', this.listener);
			this.route(createArgument(this));
			return this;
		}

		push(path) {
			window.history.pushState({}, path, `#${path}`);
			this.route(createArgument(this));
			return this;
		}

		replace(path) {
			window.history.replaceState({}, path, `#${path}`);
			this.route(createArgument(this));
			return this;
		}

		stop() {
			window.removeEventListener('popstate', this.listender);
			return this;
		}
	};
})();

/* exported Router */
