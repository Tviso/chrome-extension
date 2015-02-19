module.exports = function() {
    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {
            if (document.location.href.match(/\/pelicula\//)) {
                return 'MOVIE';
            }
            if (document.location.href.match(/\/temporada-\d\d?\d?\/episodio-\d\d?\d?/)) {
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
            episode: null,
            season: null,
        };

        //Used to pass tests
        if (typeof($) !== 'undefined') {

            if (mediaType === 'MOVIE') {
                
                //Title
                media.title = $('h1.strR').text();

                //Imdb code
                if ($('.main_imdb').attr('href').length > 0 && $('.main_imdb').attr('href').match(/.*(tt\d\d\d\d\d\d\d)/)) {
                    media.imdb = $('.main_imdb').attr('href').match(/.*(tt\d\d\d\d\d\d\d)/);
                    media.imdb = media.imdb[1];
                }

                //Year
                media.year = parseInt($('.main_tech_data_info .ellipsis:nth-child(3)').closest('span').first().text());

                //Cast
                if ($('.main_title_awards').length > 0) {
                    $('.main_title_awards').each(function(k,v){
                       if($(v).text() === 'Actores') {
                           $(v).next().find('a').each(function(k2,v2) {
                              media.cast.push($(v2).text());
                           });
                       }
                    });
                }

                //Directors
                if ($('h2.director a').length > 0) {
                    $('h2.director a').each(function(k, v) {
                        media.directors.push($(v).text());
                    });
                }
            } else if (mediaType === 'SERIE') {

                //Title
                media.title = $('#serieHeaderMain h1').text();

                //Cast
                if ($('#actorsInfo a').length > 0) {
                    $('#actorsInfo a').each(function(k,v){
                        media.cast.push($(v).text());
                    });
                }

                //Director
                if ($('.main_tech_data_large span a').length > 0) {
                    $('.main_tech_data_large span a').each(function(k,v){
                        media.cast.push($(v).text());
                    });
                }
                
            } else if (mediaType === 'EPISODE') {
                var title = $('#episodeImageInfo .title').text();

                // Season
                media.season = parseInt($('#episodeImageInfo .season').text().match(/\d+/)[0]);

                // Get last part (episode N)
                var splitted = title.split('(');

                //Title
                media.title = splitted[0].trim();

                //Episode
                media.episode = parseInt(splitted[splitted.length-1].match(/\d+/)[0]);
            }
        }

        return media;
    };

    var checkSelectors = function() {
        return {
            //Movie
            '.add_like:not(".option-added")': 'pending', //WTF?
            '.add_like.option-added': 'no_status',
            '.add_fav:not(".option-added")': 'watched',
            '.add_fav.option-added': 'no_status',
            '#pay': 'watched',
            
            // Episode
            '.payMethod': 'watched',
            '#episodePromoCode': 'watched',

            //Serie
            '#addToFavourites': 'following',
            // Its a pending for episodes (not supported)
            //'#addToWannaSeeIt': 'pending',

            //'#episodePromoCode a, .payMethod.payCard': 'watched'
        };
    };

    return {

        name: 'filmin',
        url: 'www\.filmin\.es',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
