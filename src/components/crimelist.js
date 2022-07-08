import React, {useState} from 'react';
import { Layer, Source } from 'react-map-gl';

const CrimeList = (props) => {

   
    
    // {
    //     'type': 'Feature',
    //     'properties': {
    //     'description':
    //     "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
    //     },
    //     'geometry': {
    //     'type': 'Point',
    //     'coordinates': [-77.052477, 38.943951]
    //     }

    const violentcount = 0;
    const theftcount = 0;
    const robberycount = 0;
    const antisocialcount = 0;
    const arsoncount = 0;
    
    
    
    const violentcrimes =  {
        type: 'FeatureCollection',
        features: [      
            
        ] 
      }; 
   
    
    const crimes = props.crimes.map((crime) => {
        
        
        
        violentcrimes.features.push(
            {type: 'Feature', 
                geometry: 
                    {type: 'Point', 
                        coordinates: [ 
                            crime.location.longitude, 
                            crime.location.latitude
                            ]}, 
                        properties: {'description': crime.category} }
            )


        const violent = {
            id: 'point',
            type: 'circle',
            paint: {
              'circle-radius': 3,
              'circle-color': 'red',
              
            }
        
          };
        
        return(            
            <Source key={crime.id} id="my-data" type="geojson" data={violentcrimes}>
                <Layer {...violent}/> 
            </Source>
        );   
    }       
    )
    return (
        <div>
            {crimes} 
        </div>
    )
} 

export default CrimeList;