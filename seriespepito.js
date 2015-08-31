module.exports = function() {

    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {

        	if (document.location.href.match(/\/temporada-\d\d?\d?\/capitulo-\d\d?\d?/)) {
        	    return 'EPISODE';
        	}

            if (document.location.href.match(/\/series\//)) {
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
        		//TITLE
        		media.title = $('.dtitulo h1:first').text();
        	}

        	if (mediaType === 'EPISODE') {
        		//TITLE
        		var title = $('.dtitulo h1:first').text();

        		//Remove season and chapter numbers
        		var auxTitle = title.split('-');
        		var titleOnly = auxTitle[0].split(" ");
        		titleOnly[0] = "";
        		media.title = titleOnly.join(" ");


	        	// SEASON AND CHAPTER NUMBERS
        		var split = $('.dtitulo h1:first').text().split(' ');
        		var seasonXepisode = split[0];

        		seasonXepisode = seasonXepisode.split('x');
        		media.season = seasonXepisode[0];
        		media.episode = seasonXepisode[1];
        	}
        }

        return media;
    };


    var checkSelectors = function() {

    return {
        '.enlace_link': 'watched'
        };
    };


    return {
        name: 'seriespepito',
        url: 'seriespepito\.to\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
