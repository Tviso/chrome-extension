/* global $ */
/* global document */
module.exports = function() {

    var getMediaType = function() {

        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/\/television\/.*temporada-.*\/capitulo-/)) {
                return 'EPISODE';
            } else {
                if (document.location.href.match(/\/series\//) || document.location.href.match(/\/programas\//)) {
                    return 'SERIE';
                }
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
        },
        aux = null,
        i = 0;

        if (typeof($) !== 'undefined') {

            //IF IS EPISODE
            if (mediaType === 'EPISODE') {

                media.title = $('.mar-r_5:first a').text();

                aux = $('.mar-r_5:nth-child(3) a').text().match(/T(\d+)/);
                media.season = aux[1];

                aux = $('.mar-r_5:nth-child(5)').text().match(/C(\d+)/);
                media.episode = aux[1];
            } else {
                //TITLE
                media.title = $('h2[itemprop="name"]').text();
            }

            //CAST
            aux = $('.fn_sinopsis_lay .mar-b_5').text();

            if (aux.match(/Reparto:(.*?)((Director)|(Género)|$|\n)/)) {
                aux = aux.match(/Reparto:(.*?)((Director)|(Género)|$|\n)/);
                if (aux !== null) {
                    aux = aux[1].trim();

                    if (aux.indexOf(',') !== -1) {
                        aux = aux.split(',');
                        for (i = 0; i < aux.length; i++) {
                            media.cast.push(aux[i].trim());
                        }
                    }

                    if (aux.indexOf(' y ') !== -1) {
                        aux = aux.split(' y ');
                        for (i = 0; i < aux.length; i++) {
                            media.cast.push(aux[i].trim());
                        }
                    }
                }
            }

            //DIRECTOR
            aux = $('.fn_sinopsis_lay .mar-b_5').text();

            if (aux.match(/Reparto:(.*?)((Director)|(Género)|$|\n)/)) {
                aux = aux.match(/Director:(.*?)((Reparto)|(Género)|$|\n)/);
                if (aux !== null) {
                    aux = aux[1].trim();

                    if (aux.indexOf(',') !== -1) {
                        aux = aux.split(',');
                        for (i = 0; i < aux.length; i++) {
                            media.directors.push(aux[i].trim());
                        }
                    }

                    if (aux.indexOf(' y ') !== -1) {
                        aux = aux.split(' y ');
                        for (i = 0; i < aux.length; i++) {
                            media.directors.push(aux[i].trim());
                        }
                    }
                }
            }
            
        }

        return media;
    };

    var checkSelectors = {
        '#overview-bottom .wlb_classic_wrapper .btn2_text:first': 'pending',
    };

    return {
        name: 'atresplayer',
        url: 'www\.atresplayer\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};