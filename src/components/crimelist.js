import React, {useState} from 'react';
import { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const CrimeList = (props) => {
      
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