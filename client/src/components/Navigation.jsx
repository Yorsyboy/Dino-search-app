import React from 'react';
import { Link } from 'react-router-dom';

// Services
import { useAuth } from '../services/auth.service';

const Navigation = () => {
    const { isAuthenticated, logout } = useAuth();
    
    return (
        <nav className="navbar is-warning">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img src="/cartoon-dino.png" alt="cartoon dino logo" />
                </Link>
                <div className="navbar-burger" data-target="main-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="main-nav" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/search" className="navbar-item">
                        search
                    </Link>   
                    <Link to="/browse" className="navbar-item">
                        browse all
                    </Link>        
                </div>

                <div className="navbar-end">
                    {
                        isAuthenticated && <Link to="/favourites" className="navbar-item">favourites</Link>
                    }                    
                    <div className="navbar-item">
                        {
                            isAuthenticated && <button onClick={() => logout()} className="button is-light">Sign out</button>
                        }
                        {
                            !isAuthenticated && <Link to="/login" className="button is-primary">Sign in</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;