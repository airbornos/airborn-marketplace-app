var apps = document.getElementById('apps');
var search = document.getElementById('search');

function searchApps() {

var req = new XMLHttpRequest();
req.onreadystatechange = function() {
	if(req.readyState === 4 && req.status === 200) {
		var resp = JSON.parse(req.responseText);
		apps.innerHTML = '';
		resp.objects.forEach(function(object) {
			var app = document.createElement('div');
			app.className = 'app';
			var icon = document.createElement('img');
			icon.src = object.icons[64];
			app.appendChild(icon);
			app.appendChild(document.createElement('br'));
			app.appendChild(document.createTextNode(object.name[object.default_locale]));
			app.appendChild(document.createElement('br'));
			var installLink = document.createElement('a');
			installLink.href = '#';
			installLink.addEventListener('click', function(evt) {
				evt.preventDefault();
				var request = navigator.mozApps.installPackage(object.manifest_url, {catagories: object.categories});
				request.onsuccess = function() {
					console.log(request);
					document.body.textContent = 'done!';
				};
				request.onerror = function() {
					console.log(request);
					document.body.textContent = 'err';
				};
			});
			installLink.textContent = 'Install';
			app.appendChild(installLink);
			apps.appendChild(app);
		});
	}
};
req.open('GET', 'http://marketplace-dev.airborn.io/api/v1/apps/search/?q=' + encodeURIComponent(search.value) + '&device=desktop&app_type=packaged');
req.send();

}

searchApps();

document.getElementById('search').addEventListener('change', searchApps);