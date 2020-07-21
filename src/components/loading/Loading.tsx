import React from 'react';
import Navbar from '../navigation/Navbar';

const Loading: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <h3>Finding you a match...</h3>
            <p>Please wait, we're pairing you with someone else interested in a deep connection </p>
        </div>
    )
}

export default Loading;