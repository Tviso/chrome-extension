/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/film/)) {
                if ($('span[itemprop="name"]').text().indexOf('(Serie de TV)') !== -1) {
                    return 'SERIE';
                }
                return 'MOVIE';
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
            episode: null,
            season: null,
        };

        //Used to pass tests
        if (typeof($) !== 'undefined' && mediaType === 'MOVIE' || mediaType === 'SERIE') {

            //Title
            media.title = $('#main-title').text();

            //Year
            $('.movie-info dt').each(function(k, v) {
                if ($(v).text() === 'Año') {
                    media.year = parseInt($(v).next().text());
                }
            });

            //Cast
            $('.movie-info dt').each(function(k, v) {
                if ($(v).text() === 'Reparto') {
                    $(v).next().find('a').each(function(k2, v2) {
                        media.cast.push($(v2).text());
                    });
                }
            });

            //Directors 
            $('.movie-info dt').each(function(k, v) {
                if ($(v).text() === 'Director') {
                    $(v).next().find('a').each(function(k2, v2) {
                        media.directors.push($(v2).text());
                    });
                }
            });
        }

        return media;
    };

    var checkSelectors = {

    };

    return {
        name: 'filmaffinity',
        url: 'filmaffinity\.com\/es\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};