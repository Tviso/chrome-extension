module.exports = function() {

    /**
     * Returns the type media type of the current page
     * @return {string} SERIE | MOVIE |Â EPISODE
     */
    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/movie\//)) {
                return 'MOVIE';
            }
            if (document.location.href.match(/\/tv-show\//)) {
                return 'SERIE';
            }
            if (document.location.href.match(/\/tv-season\//)) {
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

            // TITLE
            media.title = $('#title').find('h1').text();

            // YEAR
            media.year = parseInt($('.release-date').clone().children().remove().end().text());

            // CAST
            $('div[metrics-loc=Titledbox_Actores]').find('li').each(function(k,v){
                media.cast.push($(v).find('a').text());
            });

            // DIRECTORS
            $('div[metrics-loc=Titledbox_Director]').find('li').each(function(k,v){
                media.directors.push($(v).find('a').text());
            });
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
            '.lockup.product.movie.video .action.view-in-itunes': 'watched',
        };
    };

    return {
        name: 'itunes',   //A string identifier of the webpage
        url: 'itunes\.apple\.com\/',    //A regexp to detect the page with the URL

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
