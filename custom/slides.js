			// Full list of configuration options available at:
			// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	width: 1200,
	height: 900,				
    margin: 0,
	transition: 'convex' // none/fade/slide/convex/concave/zoom
});


var state = Reveal.getState();

slideHandler(state.indexh, state.indexv);

Reveal.addEventListener('slidechanged', function(evt) {
	slideHandler(evt.indexh, evt.indexv);
});

var webgl, webgl2;

function slideHandler (h, v) {
	//console.log(h, v);

	if (h === 1 && v > 1 && v < 9) {
		Reveal.configure({ transition: 'none' });
	} else {
		Reveal.configure({ transition: 'convex' });
	}

	if (webgl) {
		webgl.remove();				
	}

	if (webgl2) {
		webgl2.remove();				
	}

	switch ('' + h + v) {
		case '42':
			webgl = THREE.GlobeFrame(document.getElementById('globe-frame'));
			break;
		case '43':
			webgl = THREE.Globe(document.getElementById('globe-world'), 'custom/images/naturalearth.jpg');
			webgl2 = THREE.Globe(document.getElementById('globe-image'), 'custom/images/bergsjostolen.jpg');
			break;
		case '44':
			webgl = THREE.Photosphere(document.getElementById('photosphere-world'), 'custom/images/naturalearth.jpg');
			webgl2 = THREE.Photosphere(document.getElementById('photosphere-image'), 'custom/images/bergsjostolen.jpg');
			break;
	}
}