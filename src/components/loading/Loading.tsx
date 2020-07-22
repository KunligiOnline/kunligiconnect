import React from 'react';

const Loading: React.FC = () => {
    return (
        <div  style={{marginTop: '10%'}}>
            <h1 style={{marginLeft: '40%'}}>Finding you a match</h1>
             <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
            <p style={{marginLeft: '30%'}}>Please wait while we pair you with someone else interested in a deep connection </p>
        </div>
    )
}

export default Loading;