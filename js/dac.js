/*
	Buona parte del codice qui presente e' stato copiato da linuxday.it
*/


function initMap () {
	var MapIcon = L.Icon.extend({
		options:{
			iconSize: [16, 20],
			popupAnchor: [1, -20],
			iconAnchor: [8, 20],
			iconUrl: 'img/icon.png'
		}
	});

	var layerurl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	var attr = 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var tile = new L.TileLayer(layerurl, {maxZoom: 18, attribution: attr});
	var map = new L.Map('map');

	var zoom = 6;
	var lon = 12.483215;
	var lat = 41.979911;
	var campaign = $('#campaign').val();
	var url = encodeURIComponent ('http://dilloalchampion.it/#' + campaign);
	var message = $('#message').val();

	map.setView (new L.LatLng (lat, lon), zoom);
	map.addLayer (tile);

	$.get('data/champions.json', function(data) {
		L.geoJson(data, {
			onEachFeature: function onEachFeature(feature, layer) {
				if (feature.properties && feature.properties.account) {
					var text = '.@' + feature.properties.account + ' ' + message;
					layer.bindPopup ('<h4>' + feature.properties.name + '</h4><a class="btn" href="https://twitter.com/share?url=' + url + '&text=' + text + '" onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600\');return false;" target="_blank">Mandagli un Tweet</a>');
					// layer.bindPopup ('<h4>' + feature.properties.name + '</h4><a class="btn" href="https://twitter.com/share?url=&text=" onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600\');return false;" target="_blank">Mandagli un Tweet</a>');
				}
			},
			pointToLayer: function (feature, latlng) {
				var marker = L.marker (latlng, {icon: new MapIcon()});
				return marker;
			}
		}).addTo(map);
	});
}

$(document).ready(function(){
	$('.trigger').click(function () {
		var name = $(this).attr('href');
		$('#' + name).modal('show');
		window.location.hash = name;
		return false;
	});

	if (window.location.hash != '') {
		$(window.location.hash).modal('show');
	}

	$('.modal').on('hide.bs.modal', function() {
		window.location.hash = '_';
	});

	initMap ();
});
