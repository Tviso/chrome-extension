module.exports = function() {

    var getMediaType = function() {
        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/capitulo\//)) {
                return 'EPISODE';
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

        	if (mediaType === 'SERIE') {
        		//Title
                var titleAndYear = $('#section-header .underline').text();
        		var onlyTitle = titleAndYear.split(' ');
        		//Delete the first and the last element of the array (Year)
        		onlyTitle.shift();
        		onlyTitle.pop();
        		onlyTitle.pop();

        		media.title = onlyTitle.join(' ');
            }

        	if (mediaType === 'EPISODE') {
        		//Title
        		var titleAndYearEpisode =  $('#description h2').text();
        		var onlyTitleEpisode = titleAndYearEpisode.split(' ');
        		onlyTitleEpisode.pop();

        		media.title = onlyTitleEpisode.join(' ');

        		//Season
        		var seasonInfo = $('#description p:first').text();
        		var onlySeason = seasonInfo.split(' ');
        		media.season = onlySeason[1];

        		//Episode
        		var episodeInfo = $('#description p:eq(1)').text();
        		var onlyEpisode = episodeInfo.split(' ');
        		media.episode = onlyEpisode[1];
	        	
        	}
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            '.episodes.series tbody tr': 'watched'
            };
    };


    return {
        name: 'seriesyonkis',
        url: 'seriesyonkis\.sx\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
