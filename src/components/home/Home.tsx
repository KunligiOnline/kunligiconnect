import React from 'react';
import Navbar from '../navigation/Navbar'

const Home: React.FC = () => {
    return(
        <div>
            <Navbar/>
            <div>
            <div>
                <button>Deep Connection</button>
                <button>Difficult Topics</button>
            </div>
            <button>Getting Started</button>
            </div>
        </div>
    )
}

export default Home;