THREE.Globe = function (domEl, image, options) {
	options = options || {};

	var camera, controls, scene, renderer, sphere;

	var webglSupport = (function(){ 
		try { 
			var canvas = document.createElement( 'canvas' ); 
			return !! (window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))); 
		} catch(e) { 
			return false; 
		} 
	})();

	init();
	render();

	function init () {
		// http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
		camera = new THREE.PerspectiveCamera(options.fieldOfView || 46, domEl.offsetWidth / domEl.offsetHeight, 0.01, 1000);
		camera.position.z = 1.8;

		controls = new THREE.TrackballControls(camera);

		controls = new THREE.TrackballControls(camera);

		scene = new THREE.Scene();

		var texture = THREE.ImageUtils.loadTexture(image);
		texture.minFilter = THREE.LinearFilter;

		sphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 32, 32),
			new THREE.MeshBasicMaterial({
				map: texture
			})
		);

		sphere.rotation.y = -1.5; 
		scene.add(sphere);

		renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		renderer.setSize(domEl.offsetWidth, domEl.offsetHeight);		

		domEl.appendChild(renderer.domElement);

		render();
	}

	function render () {
		controls.update();
		sphere.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function resize () {
		camera.aspect = domEl.offsetWidth / domEl.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(domEl.offsetWidth, domEl.offsetHeight);
		render();
	}

	// http://stackoverflow.com/questions/21548247/clean-up-threejs-webgl-contexts
	function remove () {
		scene.remove(sphere);
		while (domEl.firstChild) {
			domEl.removeChild(domEl.firstChild);
		}
	}

	return {
		resize: resize,
		remove: remove
	}
};