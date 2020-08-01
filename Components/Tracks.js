import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { usePlayer } from '../Hooks/usePlayer'
import { Colors, Corners } from '../layout'
import { itemHeight, itemWidth } from '../constants'

const { width } = Dimensions.get('window');

const pagination = {
    colors: ['gold', '#222'],
    widths: { normal: 10, expanded: 20 },
}

function Tracks({ tracks, isActive, ...props }) {

    // Player Control
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const { playTrack } = usePlayer();

    // Animation
    const scrollOffsetX = useRef(new Animated.Value(0)).current;

    // Lets interpolate!
    const animatedPaginationColors = [
        ...tracks.map((t, i) => ({
            color: scrollOffsetX.interpolate({
                inputRange: [
                    (itemWidth * i) - 350, // 350 makes it more smoothe
                    (itemWidth * i),
                    (itemWidth * (i + 1))
                ],
                outputRange: ['#222', 'gold', '#222'],
                extrapolate: "clamp"
            }),
            width: scrollOffsetX.interpolate({
                inputRange: [
                    (itemWidth * i) - 350, // 350 makes it more smoothe
                    (itemWidth * i),
                    (itemWidth * (i + 1))
                ],
                outputRange: [5, 25, 5],
                extrapolate: "clamp"
            })
        }))
    ]

    // useEffect(() => {
    //     scrollOffsetX.addListener(({value}) => {
    //         console.log(value);
    //     });
    // })

    useEffect(() => {
        if (!isActive) return;
        playTrack(currentTrackIndex);
    }, [currentTrackIndex, isActive]);

    viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 75
    }).current;

    onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (viewableItems[0]) {
            setCurrentTrackIndex(viewableItems[0].index);
        }
    }).current;

    renderItem = ({ item, index, separators }) => {
        return (
            <View style={{ width: width-20, alignItems: 'flex-start', padding: 10, justifyContent: 'flex-end' }} />
        )
    }

    // See if this is cool
    // if (!isActive) return null;

    return (
        <>

            <View style={{ ...StyleSheet.absoluteFillObject, top: itemHeight - 20, left: 10, flexDirection: 'row' }}>
                {tracks.map((track, i) => {
                    const isCurrent = currentTrackIndex === i;
                    return (
                        <Animated.View
                            key={track.id}
                            style={{
                                height: 10,
                                width: animatedPaginationColors[i].width,
                                // width: 10,
                                borderRadius: 100,
                                backgroundColor: animatedPaginationColors[i].color,
                                marginRight: 2
                            }}
                        />
                    )
                })}

            </View>

            <FlatList
                data={tracks}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                horizontal

                snapToAlignment="center"
                snapToInterval={itemWidth}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}

                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}

                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollOffsetX } } }]
                    )
                }
            />
            
        </>
    )
}

export { Tracks }
