/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/movies\//)) {
                return 'MOVIE';
            }
            if (document.location.href.match(/\/tv_shows\//)) {
                return 'SERIE';
            }
            if (document.location.href.match(/\/episodes\//)) {
                return 'EPISODE';
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
        if (typeof($) !== 'undefined') {

            if (mediaType === 'MOVIE') {
                
                //Title
                media.title = $('h1:first-child').text();
/*                
                media.title = $('p[itemprop="alternativeHeadline"]').text();

                if (media.title.length === 0) {
                    media.title = media.title = $('h1:first-child').text();
                }
*/

                //Imdb code
                if ($('ul.ratings a:first-child').length > 0 && $('ul.ratings a:first-child').attr('href').match(/tt\d\d\d\d\d\d\d/)) {
                    media.imdb = $('ul.ratings a:first-child').attr('href').match(/tt\d\d\d\d\d\d\d/);
                    media.imdb = media.imdb[0];
                }

                //Year
                media.year = parseInt($('.heading span:first').text());

                //Cast
                if ($('a[itemprop="actor"]').length > 0) {
                    $('a[itemprop="actor"]').each(function(k, v) {
                        media.cast.push($(v).text());
                    });
                }

                //Directors
                if ($('a[itemprop="director"]').length > 0) {
                    $('a[itemprop="director"]').each(function(k, v) {
                        media.directors.push($(v).text());
                    });
                }
            } else if (mediaType === 'SERIE') {
                //Title
                media.title = $('h1:first-child').text();
                media.year = parseInt($('span[itemprop="datePublished"]:first').text());

            } else if (mediaType === 'EPISODE') {

                var matches;

                //Serie title, episode num and season num.
                if (matches = document.title.match(/Ver\s(.*)\s(\d?\d)x(\d?\d)\s/)) {
                    media.title = matches[1];
                    media.episode = parseInt(matches[3]);
                    media.season = parseInt(matches[2]);
                }
                //Cast
                if ($('a[itemprop="actor"]').length > 0) {
                    $('a[itemprop="actor"]').each(function(k, v) {
                        media.cast.push($(v).text());
                    });
                }
            }
        }

        return media;
    };

    var checkSelectors = {
        '.interactions .favorite': 'pending', //WTF?
        '.interactions .already_seen': 'watched',
        '.snapshot-overlay[data-is-purchased=true] span': 'watched',
    };

    return {

        name: 'wuaki',
        url: '\.wuaki\.tv',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};