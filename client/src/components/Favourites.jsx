import React, { useState, useEffect } from 'react';

// Services
import { useDinos } from '../services/dino.service';
import { withAuthenticationRequired } from '../services/auth.service';

// Components
import DinoCard from './DinoCard';

const Favourites = () => {
    const [dinoData, setDinoData] = useState([]);
    const [errors, setErrors] = useState(false);    
    const { 
        isLoading,   
        favouriteDinoIds, 
        loadDinos
     } = useDinos();

    const fetchDinos = async (term) => {        
        const response = await loadDinos(term);

        if(response && !response.error) {            
            setDinoData(response);
        }
        
        setErrors(response && response.error);
    };

    useEffect(() => {
        fetchDinos(null)
    }, []);

    return (
        <section className="section pt-1">                     
            <h1 className="title is-size-3">
                View your favourite dinosaurs                      
            </h1>            
            <div className="section is-small px-0">                       
                <div className="columns is-multiline">
                    {                                
                        !isLoading && dinoData.length > 0 && 
                            dinoData.filter(dinoItem => favouriteDinoIds.includes(dinoItem._id))
                            .map(dino => (
                                <div className="column is-3">
                                    <DinoCard 
                                        key={dino._id}
                                        dinoInfo={dino}
                                    />
                                </div>
                            ))
                    }
                </div>
                {
                    isLoading && <progress className="progress is-small is-info" max="100">25%</progress>
                }
                {
                    !isLoading && (dinoData.length <= 0 || favouriteDinoIds.length <= 0) && (
                        <div className="content">
                            <p className="subtitle is-size-4 has-text-centered">
                                You haven't favourited any dinos yet. Head over to the search page and find some first :)
                            </p>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default withAuthenticationRequired(Favourites, { location: "/favourites" });