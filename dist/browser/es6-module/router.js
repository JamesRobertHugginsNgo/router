function router(routes) {
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
			this.listender = () => void this.route();
			window.addEventListener('popstate', this.listender);

			return this.route();
		},
		end() {
			window.removeEventListener('popstate', this.listender);
			delete this.listender;

			return this;
		},
		pushRoute(path) {
			window.history.pushState({}, path, `#${path}`);

			return this.route();
		},
		replaceRoute(path) {
			window.history.replaceState({}, path, `#${path}`);

			return this.route();
		},
		routeBack() {
			window.history.back();

			return this;
		}
	};
}

export default router;
