import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import MapTable from './MapTable';

class SimpleMap extends Component {
	constructor(props){
		super(props)
		this.state = {
            position: [51.505, -0.09],
            currentSelection: null
		}
    }

    handleSelectionChange = (geoJson) => {
        if (geoJson !== '') {
            const json = JSON.parse(geoJson)
            console.log(json)
            this.setState({
                currentSelection: json,
                position: json.features[0].geometry.coordinates.reverse()
            })

            console.log(json.features[0].geometry.coordinates)
        }
    }

    render() {
        const position = this.state.position;
        return (
            <div>
                <MapTable data ={this.props.data} onSessionSelectionChange={this.handleSelectionChange}/>
                <Map center={position} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                     <GeoJSON data={this.state.currentSelection}  style={this.getStyle}/>
                    <Marker position={position}>
                        <Popup>
                            This is your start point
                        </Popup>
                    </Marker>


                </Map>
            </div>
        );
    }
}

export default SimpleMap;
