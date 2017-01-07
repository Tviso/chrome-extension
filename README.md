# Tviso - Chrome extension addons

Public repository for tviso [Chrome extension](https://chrome.google.com/webstore/detail/tviso-extension/lmmeiimpckggkicjmjoldhpifoelbnfl) addons.

Tviso [Chrome extension](https://chrome.google.com/webstore/detail/tviso-extension/lmmeiimpckggkicjmjoldhpifoelbnfl) allows you to check movies, series and episodes from other sites with your [Tviso](https://www.tviso.com)'s user.

To add a new website into the extension, you have to create a new JavaScript file (you've got an example in the bottom of the page) and add a reference in the _sites.js file.

**Features**

* Tviso Chrome Extension injects jQuery to any compatible site, so you can use any selector or function
* If you want the raw code of the extension in order to test your addon, please contact us at [info@tviso.com](mailto://info@tviso.com). Otherwise, you can create a pull request and we'll test and add it for you.


````javascript
module.exports = function() {

    /**
     * Returns the type media type of the current page
     * @return {string} SERIE | MOVIE | EPISODE
     */
    var getMediaType = function() {
        return mediaType;
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
     *      cast: {string optional} a list of comma separated actors (example: "Scarlett Johansson,Morgan Freeman")
     *      director: {string optional} a list of comma separated directors
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
            
            // Optional, used in strange circumstances when we need to iterate and get a specific property to match
            episodeParser: function(media, season, episode) {
            
                // Example of trying to match by title
                
                if (!isNaN(season)) {
                    var i, j;
                
                    // Episode title 
                    var title = $('h1').text().toLowerCase();
    
                    for (i in media.seasons) {
                        for (j in media.seasons[i]) {
                            var episodeTitle = media.seasons[i][j].name.toLowerCase();
    
                            if (media.seasons[i][j].season === parseInt(season) && (episodeTitle === title)) {
                                return media.seasons[i][j];
                            }
                        }
                    }
                }
                

                return false;
            }
        };

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
            // Examples
            
            '#watch-it': 'watched',
            
            '.episodeContainer #watch-later': 'pending',
            
            
            /* Advanced */
            
            '.episode.link': {
                // Default value
                value: 'watched',
                
                // Custom event (will override default one: mousedown)
                on: 'change',
                
                /**
                 * Do some previous manipulation to get the right data (automatically called)
                 *
                 * You can set the params like this:
                 *
                 * data.sendStatus = {
                 *     idm: 00000000, // Set the idm found 
                 *     mediaType: {1-5}, // Set the mediaType
                 *     value: value // Set one of the available statuses
                 * };
                 *
                 * In case you dont know an episode idm (the page shows all in the same view)
                 *
                 * data.findEpisode = {
                 *    parse: 'The Walking Dead 3x2' // It will assume season 3, episode 2
                 * };
                 *
                 * You can be explicit
                 *
                 * data.findEpisode = {
                 *    season: 3,
                 *    episode: 2
                 * };
                 *
                 * @param data
                 * @param $selector
                 * @returns data
                 */
                manipulateData: function (data, $selector) {
                    
                    // If not a serie -> will take default value ('watched')
                    if (data.media.mediaType != 1) {
                        return false;
                    }
    
                    var title = $selector.find('h2').text();
    
                    data.findEpisode = {
                        parse: title
                    };
    
                    return data;
                }
            }
            
            '.movie #watch': {
                /**
                 * Allows an entire override for this selector, any other parameter will be ignored
                 * 
                 * @param data
                 * @param setMediaStatus
                 */
                listener: function(selector, data, setMediaStatus) {
                    
                    $(document).on('click', selector, function() {
                        /* ...
                        * Some logic
                        * ...
                        */
                        
                        // Set Status
                        setMediaStatus(idm, mediaType, value) 
                    }; 
                    
                }
            }
        }
    };

    return {
        name: '',   //A string identifier of the webpage
        url: '',    //A regexp to detect the page with the URL

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
```
