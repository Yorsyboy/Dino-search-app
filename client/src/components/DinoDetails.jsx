import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { useDinos } from '../services/dino.service';


const DinoDetails = () => {
    const imgBaseUrl = "http://localhost:4000/images/";
    const [dinoData, setDinoData] = useState({});
    const [errors, setErrors] = useState(false);
    const { id } = useParams();
    const { 
        isLoading, 
        favouriteDinoIds,
        addFavouriteDino, 
        removeFavouriteDino, 
        loadSingleDino
    } = useDinos();
    const {
        _id,
        name,
        pronunciation,
        length,
        diet,
        existed_in,
        time_frame,
        type,
        location,
        description,
        image,
    } = dinoData;
    const isFavourite = favouriteDinoIds.length && favouriteDinoIds.includes(id);

    const handleOnFavouriteClick = () => {       
        if(isFavourite) {
            removeFavouriteDino(id);
            return;
        }

        addFavouriteDino(id);
    };

    useEffect(() => {
        async function fetchDino() {
            const response = await loadSingleDino(id);

            if(response && !response.error) {            
                setDinoData(response);
            }
            
            setErrors(response && response.error);
        }
        if(!isLoading) {
            fetchDino();
        }        
    }, []);

    return (
        <section className="section pt-1 dino-info">
            <div className="columns">
                <div className="column">
                    <h1 className="title">{name}</h1>
                    <h2 className="subtitle">{pronunciation}</h2>
                </div>
            </div>
            <div className="columns">
                <div className="column is-5">                    
                    <img src={`${imgBaseUrl}${image}`} alt={name} />
                </div>            
                <div className="column">
                    <div className="box">
                        <button 
                            className="button is-ghost is-pulled-right dino-info__favourite" 
                            onClick={handleOnFavouriteClick}
                        >
                            <span className="icon-text has-text-danger">
                                <span>{isFavourite ? 'remove from' : 'add to'} favourites</span>
                                <span className="icon is-medium">
                                    <i className={`${isFavourite ? 'fas' : 'far'} fa-lg fa-heart`}></i>
                                </span>                                
                            </span>    
                        </button>
                        <div className="content">
                            <h2>Top stats</h2>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="fas fa-ruler"></i>
                                                </span>
                                                <span>Length</span>
                                            </span>
                                        </th>
                                        <td>
                                            {length || "unknown"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="fas fa-utensils"></i>
                                                </span>
                                                <span>Diet</span>
                                            </span>
                                        </th>
                                        <td>
                                            {diet || "unknown"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="fas fa-bone"></i>
                                                </span>
                                                <span>Existed in</span>
                                            </span>
                                        </th>
                                        <td>
                                            {existed_in || "unknown"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="far fa-clock"></i>
                                                </span>
                                                <span>Time frame</span>
                                            </span>
                                        </th>
                                        <td>
                                            {time_frame || "unknown"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="fas fa-address-book"></i>
                                                </span>
                                                <span>Classification</span>
                                            </span>
                                        </th>
                                        <td>
                                            {type || "unknown"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <i className="fas fa-globe-europe"></i>
                                                </span>
                                                <span>Found in</span>
                                            </span>
                                        </th>
                                        <td>
                                            {location || "unknown"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Description</h2>
                            <p>{description || "No description available for this beast"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DinoDetails;