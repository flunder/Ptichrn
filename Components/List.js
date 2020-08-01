import React, { useState, useEffect, useRef } from 'react'
import { Animated, StyleSheet, LayoutAnimation, Dimensions, FlatList, Image, Text, View } from 'react-native'
import { Colors, Corners } from '../layout'
import { usePlayer } from '../Hooks/usePlayer'
import { useGetRecordsFromJuno } from '../Hooks/useGetRecordsFromJuno'
import { Tracks } from './Tracks'
import { itemHeight } from '../constants'

const { width, height } = Dimensions.get('window');

function List(props) {

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const currentOpacity = useRef(new Animated.Value(0)).current;
    const prevNextOpacity = useRef(new Animated.Value(1)).current;

    const getRecordsFromJuno = useGetRecordsFromJuno();
    const [records, setRecords] = useState([]);

    // Context
    const { addTracks } = usePlayer();

    useEffect(() => {
        if (!records[currentItemIndex]) return;
        const tracks = records[currentItemIndex].tracks;
        addTracks(tracks)
    }, [currentItemIndex])

    useEffect(() => {
        setRecords(getRecordsFromJuno);
    }, [getRecordsFromJuno])

    viewabilityConfig = useRef({
        waitForInteraction: true,
        itemVisiblePercentThreshold: 75
    }).current;

    onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (viewableItems[0]) {
            setCurrentItemIndex(viewableItems[0].index);
        }
    }).current;

    renderItem = ({ item, index, separators }) => {
        return (
            <View style={{ width: '100%', backgroundColor: Colors.gray200, borderRadius: 10, height: itemHeight, borderRadius: Corners.regular, overflow: 'hidden' }}>

                {/* Display the Cover */}

                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute' }}
                    source={{ uri: item.image }}
                />

                {/* Darken non selected Items */}

                <Animated.View
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.gray900, opacity: index === currentItemIndex ? 0 : 0.8 }}
                />

                {/* Allow for swiping through tracks */}

                <Tracks
                    isActive={currentItemIndex === index}
                    tracks={item.tracks}
                />
            </View>
        )
    }

    return (
        <FlatList
            data={records}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            style={{ margin: 15 }}

            ListHeaderComponent={<View style={{ height: 15 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            ListFooterComponent={<View style={{ height: 15 }} />}

            snapToAlignment="center"
            snapToInterval={itemHeight + 15}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}

            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}

        />
    )
}

export { List }
