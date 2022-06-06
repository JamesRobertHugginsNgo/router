const router = (() => {
	const listener = () => {
		/* @if DEBUG */
		if (!(typeof router.route === 'function')) {
			throw 'Method "route" is invalid.';
		}

		/* @endif */
		const [hash, query] = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''];
		const paths = hash.split('/');
		router.route({ hash, paths, query });
	};

	return {
		start() {
			window.addEventListener('popstate', listener);
			listener();
			return router;
		},

		push(path) {
			/* @if DEBUG */
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

			/* @endif */
			window.history.pushState({}, path, `#${path}`);
			listener();
			return router;
		},

		replace(path) {
			/* @if DEBUG */
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

			/* @endif */
			window.history.replaceState({}, path, `#${path}`);
			listener();
			return router;
		},

		stop() {
			window.removeEventListener('popstate', listener);
			return router;
		}
	};
})();

/* @if TARGET="BROWSER_ES6_MODULE" */
export default router;
/* @endif */
/* @if TARGET="BROWSER_ES6" || TARGET="BROWSER_ES5" */

/* exported router */
/* @endif */
