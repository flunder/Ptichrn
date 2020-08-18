import React, { useState, useEffect } from 'react'
const cheerio = require('react-native-cheerio')

/*
    a Hook to get the ID of a playlist
*/

function usePlaylistID(props) {

    const [id, setId] = useState();

    useEffect(() => {
        scrapeJunoPage();
    }, []);

    const scrapeJunoPage =  async () => {
        fetch(`https://www.juno.co.uk/electro/eight-weeks/`)
        .then(response => response.text())
        .then(async (html) => {
            const id = await getIdFromHtml({ html });
            console.log('scapeResult', id);
            setId(id);
        })
    }

    // Get the url i.e. "href="/flashplayer/4a028aa6bc0d5e3df58e70b1ed5843ef/"
    // and extract id

    const getIdFromHtml = async ({ html }) => {
        const $ = cheerio.load(html);
        const url = $('.ultraplayer_play').attr('href').split('/');
        const id = url[2];

        return id;
    }

    return id;
}

export { usePlaylistID }
