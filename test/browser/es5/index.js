/* global Router */

// TITLE

const title = document.createElement('h1');

// LINKS

const link1 = document.createElement('a');
link1.setAttribute('href', '#page1');
link1.textContent = 'Page 1';

const link2 = document.createElement('a');
link2.setAttribute('href', '#page2?test=test');
link2.textContent = 'Page 2';

const link3 = document.createElement('a');
link3.setAttribute('href', '#page3');
link3.textContent = 'Page 3';

const links = document.createElement('p');
links.append(link1, ' ', link2, ' ', link3);

// BUTTONS

const button1 = document.createElement('button');
button1.setAttribute('type', 'button');
button1.textContent = 'Page 1';

const button2 = document.createElement('button');
button2.setAttribute('type', 'button');
button2.textContent = 'Page 2';

const button3 = document.createElement('button');
button3.setAttribute('type', 'button');
button3.textContent = 'Page 3';

const buttons = document.createElement('p');
buttons.append(button1, ' ', button2, ' ', button3);

// CONTENT

const content = document.createElement('div');

// APPEND

document.body.append(title, links, buttons, content);

// ROUTER

const route = ({ hash, paths, query, router }) => {
	while (content.lastChild != null) {
		content.removeChild(content.lastChild);
	}

	const hashP = document.createElement('p');
	hashP.append(`Hash: ${hash}`);
	const queryP = document.createElement('p');
	queryP.append(`Query: ${query}`);
	content.append(hashP, queryP);

	if (paths.length === 1 && paths[0] === 'page1') {
		title.textContent = 'Page 1';
	} else if (paths.length === 1 && paths[0] === 'page2') {
		title.textContent = 'Page 2';
	} else if (paths.length === 1 && paths[0] === 'page3') {
		title.textContent = 'Page 3';
	} else {
		router.replace('page1');
	}
};

const router = new Router(route);

button1.addEventListener('click', () => void router.push('page1'));
button2.addEventListener('click', () => void router.push('page2?test=test'));
button3.addEventListener('click', () => void router.push('page3'));

router.start();
