/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/pelicula\/.*\/\d{7}/)) {
                return 'MOVIE';
            }
            if (document.location.href.match(/\/serie\/.*\/\d{7}/)) {
                return 'SERIE';
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
        };

        if (typeof($) !== 'undefined') {
            //TITLE
            media.title = $('h1[itemprop="name"]').text();

            //YEAR
            media.year = parseInt($('.mod_title_film').find('ul li:first-child a').text());

            //CAST
            $('div[itemprop="actor"] ul li').each(function(k,v) {
                media.cast.push($(v).find('span[itemprop="name"]').text());
            });

            //DIRECTOR
            $('div[itemprop="director"] ul li').each(function(k,v) {
                media.directors.push($(v).find('span[itemprop="name"]').text());
            });
        }
        return media;
    };

    var checkSelectors = {
        false: false
    };

    return {
        name: 'nubeox',
        url: 'nubeox\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};