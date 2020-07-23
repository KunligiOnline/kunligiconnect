import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="loading">
            <h1>Finding you a match</h1>
             <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
                <div className="bounce4"></div>
                <div className="bounce5"></div>
            </div>
            <p>Please wait while we pair you with someone else interested in a deep connection </p>
        </div>
    )
}

export default Loading;