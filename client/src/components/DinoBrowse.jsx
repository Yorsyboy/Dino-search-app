import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { useDinos } from '../services/dino.service';

// Components
import DinoCard from './DinoCard';

const DinoBrowse = () => {
    const [dinoData, setDinoData] = useState([]);
    const [errors, setErrors] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { name } = useParams();
    const { 
        isLoading,
        loadDinos
     } = useDinos();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const fetchDinos = async (term) => { 
        setSearchTerm(term || '');

        const response = await loadDinos(term);

        if(response && !response.error) {            
            setDinoData(response);
        }
        
        setErrors(response && response.error);
    };

    const handleSearchSubmit = evt => {
        evt.preventDefault();        
        fetchDinos(evt.target[0].value)
    };

    useEffect(() => {
        if(!isLoading) {
            fetchDinos(name || null);
        }        
    }, []);

    return (
        <section className="section pt-1">
            <div className="columns">
                <div className="column is-3">
                    <div className="box">
                        <h2 className="title is-size-4 has-text-centered">Search by letter</h2>
                        <div className="buttons">
                            <button onClick={() => fetchDinos(null)} className="button is-ghost is-fullwidth">View all</button>
                            {
                                [...alphabet].map(letter => (
                                    <button 
                                        key={letter}
                                        className="button is-light mb-3" 
                                        onClick={() => fetchDinos(letter)}
                                    >
                                        {letter.toUpperCase()}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="column">                    
                    <h1 className="title is-size-3">
                        {
                            name ? `Showing results for search "${searchTerm}"...` : `Showing all dinos`
                        }                        
                    </h1>
                    <form onSubmit={handleSearchSubmit} className="mt-5">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Search for a dinosaur by name" />
                            </div>                        
                            <div className="control">                                                                
                                <button className="button is-primary">search again</button>                                
                            </div>
                        </div>
                    </form>
                    <div className="section is-small px-0">                       
                        <div className="columns is-multiline">
                            {                                
                                !isLoading && dinoData.length > 0 && 
                                    dinoData.map(dino => (
                                        <div className="column is-4">
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
                            !isLoading && dinoData.length <= 0 && (
                                <div className="content">
                                    <p className="subtitle is-size-4 has-text-centered">
                                        sorry, looks like there's no dinosaurs to be found
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DinoBrowse;