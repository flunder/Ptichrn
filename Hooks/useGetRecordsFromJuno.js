import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
var XMLParser = require('react-xml-parser');

/*  Output Example Data:
    [
        {
            id: 1,
            image: 'https://imagescdn.juno.co.uk/full/CS773242-01A-BIG.jpg',
            title: 'Disco Fruit Sampler 01',
            artist: 'HOTMOOD / EVIL SMARTY / MITIKO / LOSHMI',
            label: 'Disco Fruit',
            shop: 'https://www.juno.co.uk/products/hotmood-evil-smarty-disco-fruit-sampler-01/773242-01/',
            tracks: [
                { id: 1, artist: "", title: 'Hotmood - "I Love To Boogie"', url: 'https://www.juno.co.uk/MP3/SF773242-01-01-01.mp3' },
                { id: 2, artist: "", title: 'Evil Smarty - "The Groove To Make You Dance"', url: 'https://www.juno.co.uk/MP3/SF773242-01-01-02.mp3' },
                { id: 3, artist: "", title: 'Mitiko - "What Have You Done For Me"', url: 'https://www.juno.co.uk/MP3/SF773242-01-02-01.mp3' },
                { id: 4, artist: "", title: 'Loshmi - "Soul Food"', url: 'https://www.juno.co.uk/MP3/SF773242-01-02-02.mp3' },
            ]
        }
    ]
*/

function useGetRecordsFromJuno(props) {

    const junoID = 'c9aabb80170fe97cf5b94b717b37b317';
    const [results, setResults] = useState([]);

    useEffect(() => {
        getRecordsFromJuno();
    }, []);

    const getLargeImage = (smallImageUrl) => {
        return smallImageUrl.replace("/150/", "/full/")
                            .replace(".jpg", "-BIG.jpg");
    }

    const getRecordsFromJuno = () => {
        fetch(`https://www.juno.co.uk/playlists/builder/${junoID}.xspf)`)
        .then(response => response.text())
        .then((response) => {
            parseAndPtich(response);
        }).catch((err) => {
            console.log('fetch', err)
        })

    };

    const parseAndPtich = async (response) => {
        var xml = new XMLParser().parseFromString(response);
        const results = await convertXMLtoPtich(xml);
        const onlyDefinedResults = results.filter(item => !!item);
        console.log('hello', onlyDefinedResults);
        setResults(onlyDefinedResults);
    }

    /*
        Converts the xml to somenice more cute.

        - LastShopUrl compares with the currentShopUrl to
        only run finding tracks.push once per record.
    */

    const convertXMLtoPtich = async (xml) => {
        const listOfTracks = xml.children[0].children;

        let lastShopUrl = false;

        const results = listOfTracks.map((item, index) => {

            // Tracks

            const currentShopUrl = item.children[1].value;
            let tracks = [];

            if (currentShopUrl === lastShopUrl) return;

            for (var i = 0; i < 10; i++) { // Max 10 tracks per ep
                const nextItem = listOfTracks[index+i];

                if (!nextItem) { break; } // break, if there's no next item (end),
                if (nextItem && nextItem.children[1].value !== currentShopUrl) { break; } // if the next item has a different url, we're out

                tracks.push(
                    {
                        id: i,
                        artist: "",
                        title: nextItem.children[2].value,
                        url: nextItem.children[0].value
                    }
                )
            }

            lastShopUrl = currentShopUrl;

            return {
                id: index,
                image: getLargeImage(item.children[3].value),
                title: item.children[2].value,
                artist: item.children[5].value,
                label: '',
                shop: item.children[1].value,
                tracks: tracks
            }
        })

        return results;
    }

    return results;
}

export { useGetRecordsFromJuno }
