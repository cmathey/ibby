import * as React from 'react';
// import {RouteComponentProps} from 'react-router';
import * as _ from 'lodash';
import {styles} from './LogisticMap.styles';
import './LogisticMap.scss';
import withStyles from 'material-ui/styles/withStyles';
import {WithStyles} from 'material-ui';
// import * as Leaflet from 'leaflet';
import {LatLngLiteral} from 'leaflet';
import {GeoJSON, Map, TileLayer} from 'react-leaflet';
import {ghApi} from '../api/GHApi';
import {DirectGeometryObject, Feature} from 'geojson';
import Paper from 'material-ui/Paper';
import POIList, {Poi} from './PoiList';
import StateComponent from './StateComponent';

// import MenuIcon from 'material-ui-icons/Menu';
// import 'leaflet/dist/leaflet.css';

interface LogisticMapState {
  center: LatLngLiteral;
  markerPosition: LatLngLiteral;
  zoom: number;
  draggable: boolean;
  routeId: string,
  route: Feature<DirectGeometryObject>
}

class LogisticMap extends StateComponent<WithStyles<string> & any, LogisticMapState> {

  private map: any;
  private marker: any;
  private routingLayer: any;

  pois: Poi[] = [
    {id: 'notre-dame', location: {lat: 48.853, lng: 2.35}},
    {id: 'pantheon', location: {lat: 48.8463, lng: 2.3461}},
    {id: 'arc-de-triomphe', location: {lat: 48.8738, lng: 2.295}},
    {id: 'palais-royal', location: {lat: 48.865, lng: 2.3377}},
    {id: 'tour-eiffel', location: {lat: 48.85837, lng: 2.29448}},
  ];

  constructor(props: any) {
    super(props);
    const start = {lat: 48.853, lng: 2.35};
    this.state = {
      center: start,
      markerPosition: start,
      zoom: 14,
      draggable: true,
      routeId: 'route',
      route: {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': []
        },
        'properties': {
          'style': {'color': '#00cc33', 'weight': 5, 'opacity': 0.6},
          'name': 'route',
          'snapped_waypoints': {
            'type': 'MultiPoint',
            'coordinates': []
          }
        }
      }
    };
    this.toggleDraggable = this.toggleDraggable.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onPoiSelectionChanged = this.onPoiSelectionChanged.bind(this);
  }

  private toggleDraggable() {
    this.updateState({draggable: {$set: !this.state.draggable}});
  }

  private async updatePosition() {
    // const {lat, lng} = this.marker.leafletElement.getLatLng();

    const newPosition: LatLngLiteral = this.marker.leafletElement.getLatLng();
    console.log(`New position: ${newPosition.lat}, ${newPosition.lng}`);

    // const defaultRouteStyle = {color: '#00cc33', 'weight': 5, 'opacity': 0.6};
    // const highlightRouteStyle = {color: '#00cc33', 'weight': 6, 'opacity': 0.8};

    const ghRoute = await ghApi.getRoute([this.state.center, newPosition]);
    console.log(JSON.stringify(ghRoute, null, 2));
    let newRoute: Feature<DirectGeometryObject> | null;
    if (ghRoute.paths) {
      const path = ghRoute.paths[0];
      newRoute = {
        type: 'Feature',
        geometry: path.points,
        properties: {
          // style: defaultRouteStyle,
          name: 'route',
          snapped_waypoints: path.snapped_waypoints
        }
      };
      console.log(this.routingLayer);
      // const layer: Leaflet.GeoJSON = this.routingLayer.leafletElement;
      // layer.addData(newRoute);
      // layer.
      this.updateState({
        markerPosition: {$set: newPosition},
        routeId: {$set: _.uniqueId('route')},
        route: {$set: newRoute || null}
      });
    } else {
      newRoute = null;
    }

  };

  private async onPoiSelectionChanged(selection) {
    console.log(selection);
    const points = this.pois.filter(p => selection[p.id]).map(p => p.location);
    let newRoute: Feature<DirectGeometryObject> | null = null;
    if (points.length > 1) {
      const ghRoute = await ghApi.getRoute(points);
      if (ghRoute.paths) {
        const path = ghRoute.paths[0];
        newRoute = {
          type: 'Feature',
          geometry: path.points,
          properties: {
            // style: defaultRouteStyle,
            name: 'route',
            snapped_waypoints: path.snapped_waypoints
          }
        };
        console.log(this.routingLayer);
        // const layer: Leaflet.GeoJSON = this.routingLayer.leafletElement;
        // layer.addData(newRoute);
        // layer.
      }
    }
    this.updateState({
      routeId: {$set: _.uniqueId('route')},
      route: {$set: newRoute || null}
    });
  }

  render() {
    // const toRef = (n) => {
    //   console.log(n);
    //   this.marker = n;
    // };
    const {classes} = this.props;
    // const {center, zoom, draggable, markerPosition, route, routeId} = this.state;
    const {center, zoom, route, routeId} = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4} square>
          <Map center={center} zoom={zoom} className={classes.map} ref={(n) => this.map = n}>>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {/*<Marker*/}
              {/*draggable={draggable}*/}
              {/*position={markerPosition}*/}
              {/*ondragend={this.updatePosition}*/}
              {/*ref={(n) => this.marker = n}>*/}
              {/*<Popup minWidth={90}>*/}
                            {/*<span onClick={this.toggleDraggable}>*/}
                              {/*{this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}*/}
                            {/*</span>*/}
              {/*</Popup>*/}
            {/*</Marker>*/}
            <POIList pois={this.pois} onSelectionChanged={this.onPoiSelectionChanged}/>
            {route && <GeoJSON key={routeId} data={route} style={() => ({'color': '#00cc33', 'weight': 5, 'opacity': 0.6})}
                     ref={(n) => this.routingLayer = n}/>}
          </Map>
        </Paper>
      </div>
    );
  }

}

export default withStyles(styles)(LogisticMap);