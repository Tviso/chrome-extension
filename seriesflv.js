module.exports = function() {

    var getMediaType = function() {

        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/\/serie\/.+/) || document.location.href.match(/.*-temporada-\d+/)) {
                return 'SERIE';
            } else if (document.location.href.match(/\/ver\/.+/)) {
                return 'EPISODE';
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
        aux, i;

        if (typeof($) !== 'undefined') {

            //TITLE
            media.title = $('.title.over div:first').text();

            if (mediaType === 'EPISODE') {
                if (media.title.match(/(.*)\s(\d?\d?\d)x(\d?\d?\d)/)) {
                    aux = media.title.match(/(.*)\s(\d?\d?\d)x(\d?\d?\d)/);

                    media.title = aux[1];
                    media.season = parseInt(aux[2]);
                    media.episode = parseInt(aux[3]);
                }
            } else {
                var titleSeason = media.title.match(/(.*) Temporada \d+/);

                if (titleSeason != null && titleSeason[1] != null) {
                    media.title = titleSeason[1];
                }
            }

            //CAST
            $('.mainInfoClass tr:nth-child(7) a').each(function(k,v) {
                media.cast.push($(v).text());
            });

            //DIRECTOR 
            aux = $('.mainInfoClass tr:nth-child(4) td:nth-child(2)').text();
            aux = aux.split(",");

            for (i = 0; i < aux.length; i++) {
                if (aux[i].match(/(.*)\(.*\)/)) {
                    aux = aux[i].match(/(.*)\(.*\)/);
                    media.directors.push(aux[1]);
                } else {
                    media.directors.push(aux[i]);
                }
            } 
        }

        return media;
    };

    var checkSelectors = function() {
        return {
            '.enlace_link': 'watched',
            '#seguir': {
                manipulateData: function (data, $selector) {
                    data.sendStatus.value = ($selector.text().trim().toLowerCase() == 'seguir serie') ? 'following' : 'no_status';

                    return data;
                }
            },
            'span.visto': {
                manipulateData: function (data, $selector) {
                    // This site doesnt work well (eye buttons are not shown) so it doesnt work well
                    data.sendStatus.value = ($selector.parent('a').attr('title') == 'Marcar Visto') ? 'watched' : 'no_status';

                    var title = $selector.closest('tr').children('.sape').text();

                    data.findEpisode = {
                        parse: title
                    };

                    return data;
                }
            }
        };
    };

    return {
        name: 'seriesflv',
        url: 'www\.seriesflv\.net\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
