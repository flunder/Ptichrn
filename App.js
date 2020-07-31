import React from 'react'
import { View, Text, StatusBar,} from 'react-native'
import { List } from './Components/'
import { Colors } from './layout'
import { PlayerProvider } from "./Hooks/PlayerContext";

const App: () => React$Node = () => {
    return (
        <PlayerProvider>
            <View style={{ flex: 1, backgroundColor: Colors.gray900 }}>
                <List />
                <StatusBar hidden={true} />
            </View>
        </PlayerProvider>
    );
};

export default App;
