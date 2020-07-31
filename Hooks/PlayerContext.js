import React, { useState, useRef } from 'react';

const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {

    const [state, setState] = useState({
        cameraDirection: 'front',
        cameraRef: useRef()
    });

    return (
        <PlayerContext.Provider value={[state, setState]}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export { PlayerContext, PlayerProvider };
