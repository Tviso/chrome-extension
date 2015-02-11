/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/movies\/details\//)) {
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
            }, 
            aux;

        //Used to pass tests
        if (typeof($) !== 'undefined' && mediaType === 'MOVIE') {

            //Title
            aux = $('.details-info .document-title div').text();

            if (aux.match(/(.*)\(V[EO]\)/)) {
                aux = aux.match(/(.*)\(V[EO]\)/);
                aux = aux[1];
            }

            if (aux.match(/(.*)Edici[oó]n Extendida/)) {
                aux = aux.match(/(.*)Edici[oó]n Extendida/);
                aux = aux[1];
            }

            media.title = aux;

            //Year
            if ($('.document-subtitle:first-child').length > 0) {
                media.year = $('.document-subtitle:first-child').text().match(/(\d\d\d\d)/);
                media.year = parseInt(media.year[1]);
            }

            //Cast
            if ($('span[itemprop="actor"] span').length > 0) {
                $('span[itemprop="actor"] span').each(function(k, v) {
                    media.cast.push($(v).text());
                });
            }

            //Directors 
            if ($('span[itemprop="director"] span').length > 0) {
                $('span[itemprop="director"] span').each(function(k, v) {
                    media.directors.push($(v).text());
                });
            }
        }

        return media;
    };

    var checkSelectors = {

    };

    return {
        name: 'googleplay',
        url: 'play\.google\.com\/store\/movies',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};