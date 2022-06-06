import Router from '../../../dist/browser/es6-module/router.debug.js';

let header = document.createElement('h1');

const buttons = document.createElement('p');
const button1 = document.createElement('button');
button1.setAttribute('type', 'button');
button1.textContent = 'Page 1';
button1.addEventListener('click', () => void router.push('page-1'));
const button2 = document.createElement('button');
button2.setAttribute('type', 'button');
button2.textContent = 'Page 2';
button2.addEventListener('click', () => void router.push('page-2?type=button'));
const button3 = document.createElement('button');
button3.setAttribute('type', 'button');
button3.textContent = 'Page 3';
button3.addEventListener('click', () => void router.push('page-3'));
const button4 = document.createElement('button');
button4.setAttribute('type', 'button');
button4.textContent = 'Page 4';
button4.addEventListener('click', () => void router.push('page-4'));
buttons.append(button1, ' ', button2, ' ', button3, ' ', button4);

const links = document.createElement('p');
const link1 = document.createElement('a');
link1.setAttribute('href', '#page-1');
link1.textContent = 'Page 1';
const link2 = document.createElement('a');
link2.setAttribute('href', '#page-2?type=link');
link2.textContent = 'Page 2';
const link3 = document.createElement('a');
link3.setAttribute('href', '#page-3');
link3.textContent = 'Page 3';
const link4 = document.createElement('a');
link4.setAttribute('href', '#page-4');
link4.textContent = 'Page 4';
links.append(link1, ' ', link2, ' ', link3, ' ', link4);

let content = document.createElement('div');

document.body.append(header, buttons, links, content);

const router = new Router(function ({ router, hash, paths, query }) {
	if (paths.length === 1 && paths[0] === 'page-1') {
		const newHeader = document.createElement('h1');
		newHeader.textContent = 'PAGE 1';
		header.parentNode.insertBefore(newHeader, header);
		header.remove();
		header = newHeader;

		const newContent = document.createElement('div');
		newContent.textContent = query;
		content.parentNode.insertBefore(newContent, content);
		content.remove();
		content = newContent;

		return;
	}

	if (paths.length === 1 && paths[0] === 'page-2') {
		const newHeader = document.createElement('h1');
		newHeader.textContent = 'PAGE 2';
		header.parentNode.insertBefore(newHeader, header);
		header.remove();
		header = newHeader;

		const newContent = document.createElement('div');
		newContent.textContent = query;
		content.parentNode.insertBefore(newContent, content);
		content.remove();
		content = newContent;

		return;
	}

	if (paths.length === 1 && paths[0] === 'page-3') {
		const newHeader = document.createElement('h1');
		newHeader.textContent = 'PAGE 3';
		header.parentNode.insertBefore(newHeader, header);
		header.remove();
		header = newHeader;

		const newContent = document.createElement('div');
		newContent.textContent = hash;
		content.parentNode.insertBefore(newContent, content);
		content.remove();
		content = newContent;

		return;
	}

	if (paths.length === 1 && paths[0] === 'page-4') {
		const newHeader = document.createElement('h1');
		newHeader.textContent = 'PAGE 4';
		header.parentNode.insertBefore(newHeader, header);
		header.remove();
		header = newHeader;

		const newContent = document.createElement('div');
		newContent.textContent = query;
		content.parentNode.insertBefore(newContent, content);
		content.remove();
		content = newContent;

		return;
	}

	router.replace('page-1');
});

router.start();
