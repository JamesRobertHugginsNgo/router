/* global router */

var r = router([
	{
		regex: /^page-1$/,
		callback() {
			console.log('PAGE 1');
		}
	},
	{
		regex: /^page-2$/,
		callback(match, query) {
			console.log('PAGE 2', match, query);
		}
	},
	{
		regex: /^page-3$/,
		callback() {
			console.log('PAGE 3');
		}
	},
	{
		callback() {
			console.log('FALLBACK');
		}
	}
]);

document.getElementById('page-1').addEventListener('click', function () { r.push('page-1'); });
document.getElementById('page-2').addEventListener('click', function () { r.push('page-2'); });
document.getElementById('page-3').addEventListener('click', function () { r.push('page-3'); });

r.start();
