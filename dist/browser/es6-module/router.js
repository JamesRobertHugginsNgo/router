const router = (() => {
	const listener = () => {
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
			window.history.pushState({}, path, `#${path}`);
			listener();
			return router;
		},

		replace(path) {
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
