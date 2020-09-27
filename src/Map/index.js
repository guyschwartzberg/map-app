import React, {PureComponent} from 'react';
import ReactMapGL, { Popup }  from 'react-map-gl'
import Pins from './pins'

const accessToken = 'pk.eyJ1IjoiZGFtcmlkZXIiLCJhIjoiY2tmMng3ZGt0MDBhODJ5cG1rdzM1b3hvOCJ9.UdmG7TNnsdzMYK_S74GyNQ'

  
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
          },
          popupInfo: null
        };
      }

      _onClickMarker = city => {
        this.setState({popupInfo: city});
      }

      _renderPopup() {
        const {popupInfo} = this.state;
        return (
          popupInfo && (
            <Popup
              tipsize={5}
              anchor="top"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeonClick={false}
              onClose={() => this.setState({popupInfo: null})}
              >
                {popupInfo.hebrewName}
                <br/>
                {"אוכלוסייה - " + popupInfo.population}
              </Popup>
          )
        )
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
          { <Pins data={data} onClick={this._onClickMarker}/> }

          {this._renderPopup()}
        </ReactMapGL>
      );
    }
  }

export default Map