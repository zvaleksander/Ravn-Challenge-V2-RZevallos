import React from 'react';

function Message(props) {
    return (
        <div className="cell-notice">
            <p className="text-emphasis">{ props.message }</p>
        </div>
    );
}

export default Message;
