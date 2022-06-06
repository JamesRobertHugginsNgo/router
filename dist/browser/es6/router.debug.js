const Router = (() => {
	function createArgument(router) {
		const [hash, query] = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''];
		const paths = hash.split('/');
		return { router, hash, paths, query };
	}

	return class {
		constructor(route) {
			if (!(typeof route === 'function')) {
				throw 'Argument "route" is invalid.';
			}

			this.route = route;
			this.listener = () => void this.route(createArgument(this));
		}

		start() {
			window.addEventListener('popstate', this.listener);
			this.route(createArgument(this));
			return this;
		}

		push(path) {
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

			window.history.pushState({}, path, `#${path}`);
			this.route(createArgument(this));
			return this;
		}

		replace(path) {
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

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
