import React from 'react';

// Components
import Navigation from './Navigation';

const Layout = ({ children }) => (
    <>
        <header>
            <Navigation />
        </header>
        <section className="section">
            <div className="container">
                { children }
            </div>
        </section>
    </>
);

export default Layout;