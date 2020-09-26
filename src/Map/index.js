import React, {PureComponent} from 'react';
import ReactMapGL, {Marker}  from 'react-map-gl'
import { BiMap } from 'react-icons/bi'

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class Markers extends PureComponent {
    render() {
      const {data} = this.props;
      return data.length !== 0 ? data.map(
        city => <Marker key={city.hebrewName} longitude={city.longitude} latitude={city.latitude} > <BiMap/> </Marker>
      ) : null
    }
  }
  
  class Map extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          viewport: {
            latitude: 31.92658,
            longitude: 34.79706,
            zoom: 6.5,
            bearing: 0,
            pitch: 0
          }
        };
      }
    
  
    render() {
        const {data} = this.props;
      return (
        <ReactMapGL mapboxApiAccessToken={accessToken} 
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        height="685px"
        width="1000px"
        mapStyle='mapbox://styles/damrider/ckfiqze0w0n1t19o7vzzbh5gr'
        >
          { <Markers data={data} /> }
        </ReactMapGL>
      );
    }
  }

export default Map