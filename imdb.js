/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        if (typeof($) !== 'undefined') {
            var aux;
            aux = $('.infobar').text();

            if (aux.match(/TV Series/)) {
                return 'SERIE';
            } else if (aux.match(/TV Episode/)) {
                return 'EPISODE';
            } else {
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
            season: null,
            episode: null,
        },
        aux = null;

        if (typeof($) !== 'undefined') {
            //TITLE
            media.title = $('span[itemprop="name"]:first').text();

            //YEAR
            media.year = parseInt($('.header:first').find('span.nobr a').text());

            //CAST
            $('div[itemprop="actors"] span[itemprop="name"]').each(function(k,v) {
                media.cast.push($(v).text());
            });

            //DIRECTOR
            $('div[itemprop="director"] span[itemprop="name"]').each(function(k,v) {
                media.directors.push($(v).text());
            });

            //IMDB
            aux = document.location.href.match(/\/title\/(tt\d{7})/);
            media.imdb = aux[1];

            //IF IS EPISODE
            if (mediaType === 'EPISODE') {
                aux = $('.tv_header').find('.nobr').text().match(/\s(\d+),.*\s(\d+)/); //Example: Season 3, Episode 1
                media.season = parseInt(aux[1]);
                media.episode = parseInt(aux[2]);

                media.title = $('.tv_header a:first').text();
            }
        }

        return media;
    };

    var checkSelectors = {
        '#overview-bottom .wlb_classic_wrapper .btn2_text:first': 'pending',
    };

    return {
        name: 'imdb',
        url: 'imdb\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};