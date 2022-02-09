function router(routes = []) {
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
			if (!this.listender) {
				this.listender = () => void this.route();
				window.addEventListener('popstate', this.listender);
				this.route();
			}
			return this;
		},
		end() {
			if (this.listender) {
				window.removeEventListener('popstate', this.listender);
				this.listender = null;
			}
			return this;
		},
		push(path) {
			window.history.pushState({}, path, `#${path}`);
			this.route();
			return this;
		},
		replace(path) {
			window.history.replaceState({}, path, `#${path}`);
			this.route();
			return this;
		}
	};
}

/* exported router */
