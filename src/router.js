function router(routes) {
	/* @if DEBUG */
	if (!(Array.isArray(routes) &&
		routes.every((route) => route && typeof route === 'object' &&
			(route.regex == null || route.regex instanceof RegExp) &&
			typeof route.callback === 'function'))) {
		throw 'Invalid Argument: routes. Must be an array of { regex, callback } object where regex is an instance of RegEx and callback if of function type.';
	}

	/* @endif */
	return {
		route() {
			for (let index = 0, length = routes.length; index < length; index++) {
				const { regex = /.*/, callback } = routes[index];
				const [hash, query] = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''];
				const result = regex.exec(hash);
				if (result) {
					callback.call(this, ...result, query);
					break;
				}
			}

			return this;
		},
		start() {
			/* @if DEBUG */
			if (this.listender) {
				throw 'Router Already Started.';
			}

			/* @endif */
			this.listender = () => void this.route();
			window.addEventListener('popstate', this.listender);

			return this.route();
		},
		end() {
			/* @if DEBUG */
			if (!this.listender) {
				throw 'Router Not Started.';
			}

			/* @endif */
			window.removeEventListener('popstate', this.listender);
			delete this.listender;

			return this;
		},
		pushRoute(path) {
			/* @if DEBUG */
			if (!(typeof path === 'string')) {
				throw 'Invalid Argument: path. Must be string type.';
			}

			/* @endif */
			window.history.pushState({}, path, `#${path}`);

			return this.route();
		},
		replaceRoute(path) {
			/* @if DEBUG */
			if (!(typeof path === 'string')) {
				throw 'Invalid Argument: path. Must be string type.';
			}

			/* @endif */
			window.history.replaceState({}, path, `#${path}`);

			return this.route();
		}
	};
}

/* @if TARGET="BROWSER_ES6_MODULE" */
export default router;
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" */
/* exported router */
/* @endif */
