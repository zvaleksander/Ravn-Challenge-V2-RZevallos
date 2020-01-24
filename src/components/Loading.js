import React from 'react';

import loading from '../assets/loading.gif'

function Loading() {
    return (
        <div className="cell-loading">
            <img className="mx-0" src={ loading } alt="loading" width="100" height="100"></img>
        </div>
    );
}

export default Loading;
