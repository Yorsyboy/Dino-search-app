import React from 'react';
import { Link } from 'react-router-dom';

// Services
import { useDinos } from '../services/dino.service';

const DinoCard = ({ dinoInfo }) => {
    const imgBaseUrl = "http://localhost:4000/images/";
    const { 
        favouriteDinoIds,
        addFavouriteDino, 
        removeFavouriteDino
    } = useDinos(); 
    const {
        _id,
        name,
        pronunciation,
        time_frame,
        type,
        location,
        image
    } = dinoInfo;
    const isFavourite = favouriteDinoIds.length && favouriteDinoIds.includes(_id);

    const handleOnFavouriteClick = () => {
        if(isFavourite) {
            removeFavouriteDino(_id);
            return;
        }

        addFavouriteDino(_id);
    };

    return (
        <div className={`card dino-card ${isFavourite ? 'is-favourite has-background-primary-light' : ''}`}>
            <button 
                className="button is-ghost is-pulled-right dino-card__favourite" 
                onClick={handleOnFavouriteClick}
            >
                <span className="icon-text has-text-danger">
                    <span className="icon is-medium">
                        <i className={`${isFavourite ? 'fas' : 'far'} fa-lg fa-heart`}></i>
                    </span>
                    <span className="is-hidden">favourite</span>
                </span>    
            </button>
            <div className="card-image">
                <figure className="image is-4by3" style={{backgroundImage: `url(${imgBaseUrl}${image})`}}>
                    <img src={`${imgBaseUrl}${image}`} alt={name} />
                </figure>
            </div> 
            <div className="card-content">                
                <p className="title is-3">
                    <Link to={`/dinos/${_id}`}>
                        {name}
                    </Link>
                </p>
                <p className="subtitle is-6">{pronunciation}</p>

                <div className="content">
                    <span className="icon-text">
                        <span className="icon">
                            <i className="far fa-clock"></i>
                        </span>
                        <span>{time_frame}</span>
                    </span>
                    <br />
                    <span className="icon-text">
                        <span className="icon">
                            <i className="fas fa-address-book"></i>
                        </span>
                        <span>{type}</span>
                    </span>
                    <br />
                    <span className="icon-text">
                        <span className="icon">
                            <i className="fas fa-globe-europe"></i>
                        </span>
                        <span>{location}</span>
                    </span>
                    
                    <Link to={`/dinos/${_id}`} className="button is-info is-outlined is-rounded is-fullwidth mt-4">
                        see details &gt;
                    </Link>
                </div>
            </div>
            </div>
    );
};

export default DinoCard;