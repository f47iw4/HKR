const map = new ol.Map({ 
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([0, 0]), // coord iniciales
                zoom: 2
            })
        });

        // obtener la geolocalización
        function geolocalizar() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const coordenadas = ol.proj.fromLonLat([lon, lat]);

                    const marker = new ol.Feature({
                        geometry: new ol.geom.Point(coordenadas),
                    });

                    const vectorSource = new ol.source.Vector({
                        features: [marker]
                    });

                    const vectorLayer = new ol.layer.Vector({
                        source: vectorSource
                    });

                    map.addLayer(vectorLayer);

                    // pone el mapa en la ubicación del usuario
                    map.getView().setCenter(coordenadas);
                    map.getView().setZoom(12);
                }, function(error) {
                    alert("No se pudo obtener la ubicación.");
                });
            } else {
                alert("La geolocalización no está disponible en tu navegador.");
            }
        }
   