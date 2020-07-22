import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar'

const Home: React.FC = () => {
    return(
        <div>
            <Navbar/>
            <div>
            <div>
                <Link to="/loading">Deep Connection</Link>
                <button>Difficult Topics</button>
            </div>
            <button>Getting Started</button>
            </div>
        </div>
    )
}

export default Home;