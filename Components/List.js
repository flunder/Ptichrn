import React, { useState, useEffect, useRef } from 'react'
import { Animated, StyleSheet, LayoutAnimation, Dimensions, FlatList, Image, Text, View } from 'react-native'
import { Colors, Corners } from '../layout'
import { usePlayer } from '../Hooks/usePlayer'
import { useGetRecordsFromJuno } from '../Hooks/useGetRecordsFromJuno'

const { width, height } = Dimensions.get('window');
const itemHeight = height * 0.6;

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

    viewabilityConfig = {
        waitForInteraction: true,
        itemVisiblePercentThreshold: 100
    }

    onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (viewableItems[0]) {
            setCurrentItemIndex(viewableItems[0].index);
        }
    }).current;

    renderItem = ({ item, index, separators }) => {
        return (
            <View style={{ width: '100%', backgroundColor: Colors.gray200, borderRadius: 10, height: itemHeight, borderRadius: Corners.regular, overflow: 'hidden' }}>
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute' }}
                    source={{ uri: item.image }}
                />
                <Animated.View
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.gray900, opacity: index === currentItemIndex ? 0 : 0.7 }}
                />
            </View>
        )
    }

    return (
        <FlatList
            data={records}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            style={{ margin: 10 }}

            ListHeaderComponent={<View style={{ height: 10 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListFooterComponent={<View style={{ height: 10 }} />}

            snapToAlignment="center"
            snapToInterval={itemHeight + 10}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}

            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}

        />
    )
}

export { List }
