import "leaflet/dist/leaflet.css";
import { worldData } from "./worldData";

const countries = [
  "Belgium",
  "Netherlands",
  "Luxembourg",
  "France",
  "Spain",
  "Portugal",
  "Switzerland",
  "Austria",
  "Germany",
  // "Sweden",
  // "Czech Republic",
  "Italy",
  "Israel",
  "United Kingdom",
  "Norway",
  "Republic of Serbia",
];

const terraCotta = "#7f351b";
const sand = "#f2e3d6";

export function generateMap() {
  import("leaflet").then((leaflet) => {
    const map = leaflet
      .map("map")
      .setView([46.2950420663186, -1.0049536796199652], 3.5);
    let geojson: any;

    const info = (leaflet as any).control();

    info.onAdd = function (map) {
      this._div = leaflet.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = props
        ? "<b>" + props.name
        : "Hover over a colored country";
    };

    info.addTo(map);

    leaflet
      .tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "boursbenjamin/ckrxikcfd0swp17pe8w1k0772",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.MAPBOX_TOKEN,
        }
      )
      .addTo(map);

    const isInCountriesList = (feature) =>
      countries.includes(feature.properties.name);

    const style = (feature) => {
      return {
        fillColor: isInCountriesList(feature) ? terraCotta : "transparent",
        weight: 2,
        opacity: 1,
        color: "transparent",
        dashArray: "3",
        fillOpacity: 0.5,
      };
    };

    const highlightFeature = (e: any) => {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: sand,
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (
        !leaflet.Browser.ie &&
        !leaflet.Browser.opera &&
        !leaflet.Browser.edge
      ) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    };

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      if (isInCountriesList(feature)) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
      }
    }

    geojson = (leaflet as any)
      .geoJson(worldData, { style, onEachFeature })
      .addTo(map);
  });
}
