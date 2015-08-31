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

        	if (mediaType === 'SERIE') {
                media.title = $('table span[style*="font-size:22px; font-weight:bold; color:#FFCC00"]').text();

            }

            if (mediaType === 'MOVIE') {
                media.title = $('table span[style*="font-size:20px; font-weight:bold;"] span').text();
            }

        	if (mediaType === 'EPISODE') {
                //TITLE
                var auxTitle = $('a[style="font-size:18px; font-weight:bold; color:#FFCC00;"]').text();
                auxTitle = auxTitle.split(' - ');
                media.title = auxTitle[0];

                // SEASON AND EPISODE NUMBERS
                var aux = $('a[style="font-size:16px; font-weight:bold;"]').text();
                aux = aux.split(' - ');
                //Season&Episode in format S01E10
                var seasonxEpisode = aux[0];
                media.season = seasonxEpisode.slice(1,3);
                media.episode = seasonxEpisode.slice(4,6);
                console.log(seasonxEpisode.slice(1,3));
                console.log(seasonxEpisode.slice(4,6));
        	}
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            'td[bgcolor="#444444"] a:contains("Subtítulos")' : 'watched',
            'td[bgcolor="#444444"] a:contains("Descargar")' : 'watched'
            };
    };

    return {
        name: 'mejorenvo',
        url: 'mejorenvo\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
