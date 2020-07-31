import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { usePlayer } from '../Hooks/usePlayer'

const { width } = Dimensions.get('window');

function Tracks({ tracks, isActive, ...props }) {

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // Context
    const { playTrack } = usePlayer();

    useEffect(() => {
        console.log('now', currentTrackIndex);
        playTrack(currentTrackIndex);
    }, [currentTrackIndex]);

    viewabilityConfig = {
        waitForInteraction: true,
        itemVisiblePercentThreshold: 100
    }

    onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (viewableItems[0]) {
            setCurrentTrackIndex(viewableItems[0].index);
        }
    }).current;

    renderItem = ({ item, index, separators }) => {
        return (
            <View style={{ width: width-20, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>
                    {item.title}
                </Text>
            </View>
        )
    }

    if (!isActive) return null;

    return (
        <FlatList
            data={tracks}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            horizontal

            snapToAlignment="center"
            snapToInterval={width - 20}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}

            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
        />
    )
}

export { Tracks }
