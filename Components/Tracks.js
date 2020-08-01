import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { usePlayer } from '../Hooks/usePlayer'
import { Colors, Corners } from '../layout'

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
            <View style={{ width: width-20, alignItems: 'flex-start', padding: 10, justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: Corners.regular, overflow: 'hidden' }}>
                    <Text style={{ backgroundColor: Colors.gray400, fontWeight: 'bold', padding: 10, paddingHorizontal: 15 }}>
                        {index + 1}
                    </Text>
                    <Text style={{ backgroundColor: Colors.gray900, color: 'white', fontSize: 14, padding: 10, fontWeight: 'bold' }}>
                        {item.title}
                    </Text>
                </View>
            </View>
        )
    }

    // if (!isActive) return null;

    return (
        <>

            {/* <View style={{ flexDirection: 'column', alignSelf: 'flex-start', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}>
                {tracks.map((track, i) => {
                    return (
                        <View style={{ borderRadius: Corners.tight, backgroundColor: currentTrackIndex === i ? 'blueviolet' : undefined, }}>
                            <Text style={{ padding: 5, color: 'white' }}>{track.title}</Text>
                        </View>
                    )
                })}

            </View> */}

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
        </>
    )
}

export { Tracks }
