import * as React from 'react';
import * as update from 'immutability-helper';
import * as Leaflet from 'leaflet';
import {LatLngLiteral} from 'leaflet';
import StateComponent from './StateComponent';
import {MapComponent, Marker} from 'react-leaflet';
import {Dictionary} from 'lodash';

export interface Poi {
  id: string;
  location: LatLngLiteral;
}

interface PoiListProps {
  pois: Poi[];
  onSelectionChanged: (selection: Dictionary<boolean>) => void;
}

interface PoiListState {
  selection: Dictionary<boolean>;
}

export default class PoiList extends StateComponent<PoiListProps, PoiListState> {
  private markers: Dictionary<MapComponent<any, Leaflet.Marker>> = {};

  constructor(props: PoiListProps) {
    super(props);
    this.state = {selection: {}};
  }

  private onClick(id) {
    const marker: Leaflet.Marker = this.markers[id].leafletElement;
    const newSelected = !this.state.selection[id];
    marker.setOpacity(newSelected ? 1 : 0.5);
    const newState = update(this.state, {selection: {[id]: {$set: newSelected}}});
    this.setState(newState);
    this.props.onSelectionChanged(newState.selection);
  }

  render() {
    const {pois} = this.props;
    // const {selection} = this.state;
    return (
      <div style={{display: 'none'}}>
        {pois.map(poi => <Marker key={poi.id} position={poi.location} clickable={true}
                                 ref={n => {
                                   if (n) {
                                     this.markers[poi.id] = n;
                                   }
                                 }}
                                 opacity={0.5}
                                 onclick={() => this.onClick(poi.id)}/>)}
      </div>
    );
  }
}