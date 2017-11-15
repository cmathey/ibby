import {LatLngLiteral} from 'leaflet';

const GHRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
const GHInput = require('graphhopper-js-api-client/src/GHInput');

// const GHRequest = require('./GHRequest');

export interface ModelApi {
  getRoute(points: LatLngLiteral[]): Promise<any>;
}

class HttpGHApi implements ModelApi {
  private static host = 'http://192.168.1.53:8989';

  async getRoute(points: LatLngLiteral[]): Promise<any> {
    const ghRouting = new GHRouting({key: '', host: HttpGHApi.host, vehicle: 'car', elevation: false});
    points.forEach((p) => {
      ghRouting.addPoint(new GHInput(p.lat, p.lng));
    });
    return ghRouting.doRequest();
  }

}

export const ghApi: ModelApi = new HttpGHApi();
