
import React, {useState, useEffect} from 'react';
import CrimeList from './crimelist.js';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Source, Layer, Popup } from 'react-map-gl'; 
import axios from 'axios';
import SearchBar from './searchbar.js';
import data from './data.json';







class App extends React.Component {
    
    
    
    
    
    state = { crimes: [],
            lat: 51.5072,
            lng: -0.1275,
            zoom: 13,
            pitch: 60, 
            bearing: 0, 
            city: 'London', 
            violentcount: 0, 
            theftcount: 0, 
            robberycount: 0,
            arsoncount: 0,
            homicidecount: 0,
            vehiclecount: 0,
            shopliftingcount: 0,
            weaponscount: 0,
            drugscount: 0,
            burglarycount: 0,
            othercount: 0,
            publicordercount:0,
            othertheftcount: 0,
            antisocialcount: 0,
            
        
        
            };

   

    onSearchSubmit = (term) => {
        const dest = []
        const cities = data.map((e) => {
            if (term.toLowerCase() === e.city.toLowerCase()) {
                dest.push(e.city, e.lat, e.lng)
                this.setState({ lng: dest[2], lat: dest[1]})
                console.log(`moved to ${dest[0]}`)
            }
            
        });
        
        this.setState({city: dest[0]})
        
        
       
               
        };

    
    

    
   
    moveUp = () => {
        this.setState({ lat: this.state.lat + 0.01 })
        
    }
    moveDown = () => {
        this.setState({ lat: this.state.lat - 0.01 })
        
    }
    moveLeft = () => {
        this.setState({ lng: this.state.lng - 0.01 })
        
    }
    moveRight = () => {
        this.setState({ lng: this.state.lng + 0.01 })
        
    }
    zoomOut = () => {
        this.setState({ zoom: this.state.zoom - 0.5})
    }
    zoomIn = () => {
        this.setState({ zoom: this.state.zoom + 0.5})
    }
    pitchUp = () => {
        this.setState({ pitch: this.state.pitch - 3})
    }
    pitchDown = () => {
        this.setState({ pitch: this.state.pitch + 3})
    }
    turnLeft = () => {
        this.setState({ bearing: this.state.bearing - 3})
    }
    turnRight = () => {
        this.setState({ bearing: this.state.bearing + 3})
    }
    
    

    onClick = async () => {
        const violentcrimes = [];
        const robberies = [];
        const thefts = [];   
        const vehiclecrimes = [];
        const arsons= [];
        const shopliftings= [];
        const drugs= [];
        const burglaries= [];
        const othercrimes = [];
        const publicorders = [];
        const antisocials= [];
        const params = { lat: this.state.lat, lng: this.state.lng }
        
        var callApi =  axios.create({
            baseURL: 'https://ukpolicedata.p.rapidapi.com',
            params: params,
            headers: {
              'X-RapidAPI-Key': 'c838eb78camsh91d46c9d96dac27p192e90jsnc7f5490ea021',
              'X-RapidAPI-Host': 'ukpolicedata.p.rapidapi.com'
            }
          });
        const response = callApi.get('/crimes-street/all-crime');
        const crimes = (await response).data

        const stats = crimes.map((crime) => {
            if (crime.category === 'violent-crime') {
                violentcrimes.push(crime)
                this.setState({violentcount: violentcrimes.length})
            }
            if (crime.category === 'robbery') {
                robberies.push(crime)
                this.setState({robberycount: robberies.length})
            }
            if (crime.category === 'other-theft' || crime.category === "bicycle-theft" || crime.category === "theft-from-the-person") {
                thefts.push(crime)
                this.setState({theftcount: thefts.length})
            }
            if (crime.category === 'criminal-damage-arson') {
                arsons.push(crime)
                this.setState({arsoncount: arsons.length})
            }
            if (crime.category === 'burglary') {
                burglaries.push(crime)
                this.setState({burglarycount: burglaries.length})
            }
            if (crime.category === 'shoplifting') {
                shopliftings.push(crime)
                this.setState({shopliftingcount: shopliftings.length})
            }
            if (crime.category === 'drugs') {
                drugs.push(crime)
                this.setState({drugscount: drugs.length})
            }
            if (crime.category === 'public-order') {
                publicorders.push(crime)
                this.setState({publicordercount: publicorders.length})
            }
            if (crime.category === 'anti-social-behaviour') {
                antisocials.push(crime)
                this.setState({antisocialcount: antisocials.length})
            }
            if (crime.category === 'vehicle-crime') {
                vehiclecrimes.push(crime)
                this.setState({vehiclecount: vehiclecrimes.length})
            }
            if (crime.category === 'other-crime') {
                othercrimes.push(crime)
                this.setState({othercount: othercrimes.length})
            }
        })
        
        this.setState({ crimes: crimes })
        console.log(crimes.length)
        console.log('long ' + this.state.lng)
        console.log('lat ' + this.state.lat)
        console.log()
        
        
        
        
        
       

        
    }

    render() {
        
        return (
            <div>
                
                
                
                {/* <CrimeList crimes={this.state.crimes} /> */}
                <div className="map-container">
                        
                        
                        
                        
                        <div className="navigation"> </div>
                            <div className="nav-buttons">
                            
                                <button onClick={this.zoomIn}>[+ Zoom]</button>
                                <button onClick={this.zoomOut}>[ - Zoom]</button>
                                <button onClick={this.pitchUp}>[+ Pitch]</button>
                                <button onClick={this.pitchDown}>[- Pitch]</button>
                                <button onClick={this.turnLeft}> [Left]</button>
                                <button onClick={this.turnRight}> [Right]</button>
                                <div style={{textAlign: 'center'}}> <button onClick={this.moveUp}> [North] </button> </div>
                                <div style={{textAlign: 'center'}}>
                                <button onClick={this.moveLeft}> [West] </button>
                                <button onClick={this.moveRight}> [East] </button> </div>
                                <div style={{textAlign: 'center'}}><button onClick={this.moveDown}> [South] </button></div>
                                <div> <button onClick={this.onClick}>[  Scan  area  for  crimes  ]</button>   
                                <div className="breakdown"><button> [  Show  Stats  ]  </button>  </div>
                                <button className="details">
                                    
                                    <ul>
                                        <label>{this.state.crimes.length} Results</label>
                                        <li>[Violent crimes----------{this.state.violentcount}]</li>
                                        <li>[Robberies---------------{this.state.robberycount}]</li>
                                        <li>[Thefts------------------{this.state.theftcount}]</li>
                                        <li>[Damage/arson------------{this.state.arsoncount}]</li>
                                        <li>[Burglaries--------------{this.state.burglarycount}]</li>
                                        <li>[Shopliftings------------{this.state.shopliftingcount}]</li>
                                        <li>[Drugs-------------------{this.state.drugscount}]</li>
                                        <li>[Public Order Violations-{this.state.publicordercount}]</li>
                                        <li>[Anti-Social Behaviour---{this.state.antisocialcount}]</li>
                                        <li>[Vehicle Crime-----------{this.state.vehiclecount}]</li>
                                        <li>[Other-------------------{this.state.othercount}]</li>
                                        
                                    </ul>
                                </button>
                                
                                
                                
                                  </div>
                            </div>
                        <div>
                            <div className="spacer">
                                <div className="search"> 
                                    <SearchBar onSubmit={this.onSearchSubmit}></SearchBar> 
                                <div className="current-city"> Current City: {this.state.city} 
                            </div>
                            
                        </div>
                                                                               
                    </div>
                        </div>
                    <Map id="map"
                        initialViewState={{
                        // longitude: this.state.lng,
                        // latitude: this.state.lat,
                        
                        }}
                        viewState={{longitude: this.state.lng, latitude: this.state.lat, zoom: this.state.zoom, pitch: this.state.pitch, bearing: this.state.bearing}}
                        
                        style={{width: '100vw', height: '100vh', fontSize: '0'}}
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        mapboxAccessToken="API KEY HERE"
                    >   
                       
                        <CrimeList crimes={this.state.crimes}/>
                        
                        
                        


                    </Map>
                    
                    
                </div>
                

            </div>
        )
    }
}

export default App;