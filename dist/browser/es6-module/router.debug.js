const router = (() => {
	const listener = () => {
		if (!(typeof router.route === 'function')) {
			throw 'Method "route" is invalid.';
		}

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
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

			window.history.pushState({}, path, `#${path}`);
			listener();
			return router;
		},

		replace(path) {
			if (!(typeof path === 'string')) {
				throw 'Argument "path" is invalid.';
			}

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

export default router;
