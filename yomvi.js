/* global $ */
module.exports = function() {

    var getMediaType = function() {

        if (typeof($) !== 'undefined') {

            if ($('.episodios').length > 0) {
                return 'SERIE';
            } else {
                if ($('h1[itemprop="name"]').text().match(/Ep\.\d+/) || $('h1[itemprop="name"]').text().match(/Episodio\s\d+/)) {
                    return 'EPISODE';
                } else {
                    return 'MOVIE';
                }
            }
        }        
        return false;
    };

    var getMediaInfo = function(mediaType) {

        var media = {
            mediaType: mediaType,
            title: null,
            imdb: null,
            year: null,
            cast: [],
            directors: [],
            season: null,
            episode: null,
        },
        aux, i;

        if (typeof($) !== 'undefined') {

            //TITLE
            if (mediaType === 'EPISODE') {
                aux = $('span[itemprop="partOfTVSeries"] span[itemprop="name"]').text();
            } else {
                aux = $('h1[itemprop="name"]').text();
            }

            if (mediaType === 'SERIE') {
                if (aux = aux.match(/(.*)\s\(T\d+\)/)) {
                    aux = aux[1];
                }
            }

            media.title = aux;

            //YEAR
            aux = $('.details h2:last').text().split(':');
            if (!isNaN(aux[1])) {
                media.year = parseInt(aux[1]);
            }

            //CAST
            aux = $('span[itemprop="actor"] p').text();
            aux = aux.split(',');
            for (i = 0; i < aux.length; i++) {
                media.cast.push(aux[i]);
            }

            //DIRECTOR
            aux = $('span[itemprop="director"] p').text();
            aux = aux.split(',');
            for (i = 0; i < aux.length; i++) {
                media.directors.push(aux[i]);
            }

            //SEASON NUM AND EPISODE NUM
            if (mediaType === 'EPISODE') {
                aux = $('span[itemprop="seasonNumber"]').text().match(/\(T(\d+)\)/);
                media.season = parseInt(aux[1]);


                aux = $('h1[itemprop="name"]').text();
                if (aux.match(/Ep\.(\d+)/)) {
                    aux = aux.match(/Ep\.(\d+)/);
                } else if (aux.match(/Episodio\s\d+/)) {
                    aux = aux.match(/Episodio\s\d+/);
                }
                media.episode = parseInt(aux[1]);
            }
        }

        return media;
    };

    var checkSelectors = {
        false: false
    };

    return {
        name: 'yomvi',
        url: 'yomvi\.plus\.es\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};