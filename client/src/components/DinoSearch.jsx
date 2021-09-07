import React from 'react';
import { useHistory } from 'react-router-dom';

const DinoSearch = () => {
    const history = useHistory();

    const handleLuckyClick = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';        
        const randChar = alphabet[Math.floor(Math.random() * alphabet.length)];

        history.push(`/browse/${randChar}`);
    };

    const handleSearchSubmit = evt => {
        evt.preventDefault();
        const searchTerm = evt.target[0].value;
        history.push(`/browse/${searchTerm}`);
    };

    return (
        <section className="section is-medium">
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <div className="is-flex is-flex-direction-column is-align-items-center">
                        <figure className="image is-96x96">
                            <img className="is-rounded" src="/cartoon-dino.png" alt="Cute, green cartoon dinosaur" />
                        </figure>
                    </div> 
                    <form onSubmit={handleSearchSubmit} className="mt-5">
                        <div className="field">
                            <div className="control is-expanded">
                                <input className="input is-medium" type="text" placeholder="Search for a dinosaur by name" />
                            </div>
                        </div>
                        <div className="field mt-5 has-addons has-addons-centered">
                            <div className="control">
                                <div className="buttons">                                    
                                    <button className="button is-link is-outlined is-light is-rounded" onClick={handleLuckyClick}>I'm feeling lucky</button>
                                    <button className="button is-primary is-light is-outlined is-rounded">Let's search!</button>
                                </div>
                            </div>
                        </div>
                    </form>             
                </div>
            </div>
        </section>    
    );
};

export default DinoSearch;