module.exports = function() {

    var getMediaType = function() {
        //Used to pass tests
        if (typeof(document) !== 'undefined') {

        	if (document.location.href.match(/\/peli\//)) {
                return 'MOVIE';
        	}

        	if (document.location.href.match(/\/serie\//)) {
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

        	media.title = $('.bottom-right h1:first').text();
            //TITLE
            if (mediaType === 'MOVIE') {
                
            }

        }

        return media;
    };

    var checkSelectors = function() {

        return {
            '.rating-container' : 'watched',
            '.media-status-user > ul > li[color="orange"]' : "pending",
            '.media-status-user > ul > li[color="green"]' : "following",
            '.media-status-user > ul > li[color="blue"]' : "watched",

            '.link-row': {
                //listener: function (data, setMediaStatus) {
                //    Example
                //    $('body').on('click', '[data-action="seen"]', function () {
                //        //setMediaStatus(data.media.idm, data.media.mediaType, action)
                //    });
                //},

                // we get this value just in case it's not a serie
                value: 'watched',
                manipulateData: function (data, $selector) {
                    // If it is NOT a serie, go on
                    if (data.media.mediaType != 1) {
                        return false;    
                    }

                    var title = $selector.closest('.episode-links').siblings('.episode-header').find('h3').text();

                    data.findEpisode = {
                        parse: title
                    };   

                    return data;
                }
            }
        };
	};
    return {
        name: 'seriesmu',
        url: 'series\.mu\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
