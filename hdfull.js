module.exports = function() {

    var getMediaType = function() {
        //Used to pass tests
        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/.*?(episodio)/)) {
                return 'EPISODE';
            }

        	if (document.location.href.match(/\/pelicula\//)) {
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

            //TITLE
        	if (mediaType === 'SERIE') {
                media.title = $('#rating-number').text().trim();
            }

            if (mediaType === 'MOVIE') {
                media.title = $('#summary-title').text();
            }


        	if (mediaType === 'EPISODE') {
                
                media.title = $('#rating-number').text().trim();

                var episodeAndTitle = $('.subtitle').text().trim();

                var seasonXEpisode = episodeAndTitle.split(' ');
                seasonXEpisode = seasonXEpisode[0];

                var seasonAndEpisode = seasonXEpisode.split('x');
     
                media.season = seasonAndEpisode[0];
                
                media.episode = seasonAndEpisode[1];
        	}
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            '.embed-container iframe': 'watched',
            '.action-buttons a:not(.danger)': 'watched',
            '.rating-star-container' : 'watched',
            '#embed_list' : 'watched'
        };
    };

    return {
        name: 'hdfull',
        url: 'hdfull\.tv\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
