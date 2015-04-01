module.exports = function() {

    var getMediaType = function() {
        //Used to pass tests
        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/.*?(capitulo)/)) {
            	console.log('episode');
                return 'EPISODE';
            }

            if (document.location.href.match(/.*?(serie)/)) {
            	console.log('serie');
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
                var auxEpisode = $('.post-title.entry-title').text();
                auxEpisode = auxEpisode.split(' ');
                //las cabeceras son con este formato
                //Lista de capitulos de The Walking Dead
                //con lo siguiente borro las primeras palabras del 
                //string, para quedarme con el titulo
                auxEpisode.shift();
                auxEpisode.shift();
                auxEpisode.shift();
                auxEpisode.shift();

                media.title = auxEpisode.join(' ');
            }

        	if (mediaType === 'EPISODE') {
                var aux = $('.post-title.entry-title').text();

                aux = aux.split(' ');
                //las cabeceras son con este formato
                //The Walking Dead 5x12 ver online o descargar
                //con lo siguiente borro las ultimas palabras del 
                //string para quedarnos con Titulo + seasonxEpisode
                aux.pop();
                aux.pop();
                aux.pop();
                aux.pop();

                var seasonxEpisode = aux.pop();

                media.title = aux.join(' ');

                seasonxEpisode = seasonxEpisode.split('x');

                media.season = seasonxEpisode[0];
                media.episode = seasonxEpisode[1];
        	}
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            '.capitulo2': 'watched'
        };
    };

    return {
        name: 'seriesdanko',
        url: 'seriesdanko\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
