module.exports = function() {

    var getMediaType = function() {
        //Used to pass tests
        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/.*?(episodio)/)) {
                return 'EPISODE';
            }

        	if (document.location.href.match(/.*?(peli)/)) {
                return 'MOVIE';
        	}

            if (document.location.href.match(/.*?(serie)/)) {
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
            console.log('3');
            //TITLE
            media.title = $('span[style*="font-size:18px"]').find('b').text();

        	if (mediaType === 'SERIE') {
                
            }

            if (mediaType === 'MOVIE') {

            }

        	if (mediaType === 'EPISODE') {
	        	// SEASON AND EPISODE NUMBERS
        		var auxEpisode = $('table span[style*="font-size:16px"] b');
                var episode = auxEpisode[1].innerHTML;
                var episodeSplit = episode.split(" ");
                var episodeParts = episodeSplit[0].split("x");
                media.episode = episodeParts[1];
                media.season = episodeParts[0];
        	}
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            'a[style="font-size: 12px; cursor: pointer;"]': 'watched'
            };
    };

    return {
        name: 'mejortorrent',
        url: 'mejortorrent\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
