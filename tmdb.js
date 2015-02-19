module.exports = function() {

    /**
     * Returns the type media type of the current page
     * @return {string} SERIE | MOVIE |Ã‚ EPISODE
     */
    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/movie\//)) {
                return 'MOVIE';
            }
            if (document.location.href.match(document.location.href.match(/\/episode\//))) {
                return 'EPISODE';
            }
            if (document.location.href.match(/\/tv\//)) {
                return 'SERIE';
            }
        }
        return false;
    };

    /**
     * Returns basic information of the current media
     * @param  {string} mediaType : received from "getMediaType" function
     * @return {object} 
     * 
     *  media {
     *      mediaType {string mandatory}: MOVIE | SERIE | EPISODE,
     *      title: {string mandatory} If mediaType is EPISODE, you should return the title of the serie
     *      imdb: {string optional} imdb id if exists (example "tt2389182")
     *      year: {int optional}
     *      cast: {string optional} a list of comma separed actors (example: "Scarlett Johansson,Morgan Freeman")
     *      director: {string optional} a list of comma separed directors
     *
     *      season: {int mandatory for EPISODE}: episode's season number
     *      episode: {int mandatory for EPISODE}: episode number
     *  }
     */
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

        if (typeof($) !== 'undefined') {

            // YEAR
            media.year = $('#year').text().replace(/\(|\)/g, '');

            // DIRECTORS
            $('span[itemprop=director]').each(function(k,v){
                media.directors.push($(v).find('span[itemprop=name]').text());
            });

            if (mediaType == 'EPISODE') {
                media.season = parseInt($('h2#title span[itemprop="seasonNumber"]').text());

                var episode = $('h2#title a').last().attr('href').split('/');
                media.episode = parseInt(episode[episode.length-1]);
                media.title = $('h3.show_title span[itemprop=name]').text().trim();
            } else {
                var $title = $('h2#title span[itemprop=name]');
                // TITLE
                media.title = $title.text();

                // Its a season
                if (document.location.href.match(/\/tv\/.*\/season\//)) {
                    var title = $title.html();
                    var splitted = title.split(':');

                    media.title = splitted[0];
                }
            }
        }

        return media;
    };

    /**
     * The jQuery selectors of the page to interact with tviso
     * @return {object} with the format:
     *  {
     *      'jQuerySelector1': 'status1',
     *      'jQuerySelector2': 'status2'
     *  }
     * Status are: 'watched', 'following', 'pending' or 'no_status'
     */
    var checkSelectors = function() {
        return {
            //Movies and Series
            '#watchlist': 'pending',
            '#favourite': 'watched',

            //Episode
            '#rating_stars': 'watched',
        };
    };

    return {
        name: 'tmdb',   //A string identifier of the webpage
        url: 'themoviedb\.org',    //A regexp to detect the page with the URL

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
