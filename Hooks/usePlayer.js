import React, { useContext, useEffect } from 'react'
import { PlayerContext } from "./PlayerContext"
import TrackPlayer from 'react-native-track-player'

const usePlayer = () => {

    const [state, setState] = useContext(PlayerContext);

    useEffect(() => {
        initPlayer();
    }, []);

    initPlayer = async () => {
        TrackPlayer.setupPlayer().then(() => {
            console.log('Player setup!');
        });
    }

    async function addTracks(tracks) {
        await clearQueue();

        TrackPlayer.add([...tracks]).then(function() {
            console.log('Player added tracks', tracks);
            TrackPlayer.play();
        });
    }

    async function clearQueue() {
        TrackPlayer.reset().then(() => {
            console.log('Player reset');
        });
    }

    return {
        addTracks: addTracks
    }
}

export { usePlayer }
