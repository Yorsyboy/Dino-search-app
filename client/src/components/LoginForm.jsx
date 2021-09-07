import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Services
import { useAuth } from '../services/auth.service';

const LoginForm = () => {
    const [errors, setErrors] = useState(false);
    const { login, isLoading, isAuthenticated } = useAuth();

    const handleFormSubmit = async evt => {
        evt.preventDefault();
        setErrors(false);

        const loginResponse = await login(evt.target[0].value, evt.target[1].value);

        setErrors(loginResponse && loginResponse.error);        
    };

    if(isAuthenticated) {        
        return <Redirect to="/" />;
    }

    return (
        <div className="columns">
            <div className="column is-4 is-offset-4">
                <div className="box">
                    <div className="is-flex is-flex-direction-column is-align-items-center">
                        <figure className="image is-96x96">
                            <img className="is-rounded" src="/cartoon-dino.png" alt="Cute, green cartoon dinosaur" />
                        </figure>
                        <h2 className="title is-size-4">Sign in</h2>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left">
                                <input className={`input ${errors ? 'is-danger' : ''}`} type="text" placeholder="some.user" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>                                
                            </div>                            
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input className={`input ${errors ? 'is-danger' : ''}`} type="password" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>                                
                            </div>                            
                        </div>
                        <button className={`button is-fullwidth is-primary mt-5 ${isLoading ? 'is-loading' : ''}`}>Sign in</button>
                    </form>
                    {
                        errors && <div className="notification is-danger mt-5">Sorry, that username/password combination isn't correct. Please try again.</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginForm;