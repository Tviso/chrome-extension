module.exports = function() {

    var getMediaType = function() {

        //Used to pass tests
        if (typeof(document) !== 'undefined') {

            if (document.location.href.match(/\/peli\/.+/)) {
                return 'MOVIE';
            }
            if (document.location.href.match(/\/serie\/.+/) || document.location.href.match(/\/tvshow\/.*/)) {
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

            var regexp = /tt([0-9]{7})/;

            if ($('.moreinfoLink a').attr("href").match(regexp)) {
                media.imdb = $('.moreinfoLink a').attr("href").match(regexp);
                media.imdb = media.imdb[0];
            }
            
            //TITLE
            if (mediaType === "MOVIE") {
                media.title = $('.box h1:first').text();
            } else {
                var currentEpisode = $($('.action:not(.active)[data-action="seen"]')[1]).parent().parent(),
                    title = $('h1').clone();
                    
                title.children('*').remove();
                media.title = title.text();
                
                media.season = parseInt(currentEpisode.parent().find('.checkSeason[data-num]').data('num'));
                media.episode = parseInt(currentEpisode.find("span.title span.number").text());
            }

            //YEAR
            media.year = parseInt($('.profilebox .info:nth-child(5)').text());

            //CAST AND DIRECTOR
            $('.starsList.profileSection .starText').each(function(k,v) {
                if ($(v).find('span').text() === 'Director') {
                    media.directors.push($(v).find('a').text());
                } else {
                    media.cast.push($(v).find('a').text());
                }
            });
        }

        return media;
    };

    var checkSelectors = function() {

        return {
            '.dropdownContainer.arrow.desplegableAbstract li[data-value=1]': 'pending',
            '.dropdownContainer.arrow.desplegableAbstract li[data-value=2]': 'following',
            '.dropdownContainer.arrow.desplegableAbstract li[data-value=3]': 'watched',
            '.dropdownContainer.arrow.desplegableAbstract li[data-value=4]': 'watched',
            '.dropdownContainer.arrow.desplegableAbstract li[data-value=0]': 'no_status',

            '.episodeActions .action': {
                on: 'click',
                manipulateData: function (data, $selector) {
                    // The class on the moment of click is the inverse
                    data.sendStatus.value = ($selector.hasClass('active')) ? 'watched' : 'no_status';

                    var season = $selector.closest('.episodes:visible').children('.checkSeason').attr('data-num');
                    var episode = parseInt($selector.closest('.modelContainer').find('.number').text());

                    data.findEpisode = {
                        season: season,
                        episode: episode
                    };

                    return data;
                }
            },

            'a.aporteLink': {
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

                    var title = $selector.closest('.linksPopup').find('h2').text();

                    data.findEpisode = {
                        parse: title
                    };

                    return data;
                }
            }
        };
    };

    return {
        name: 'pordede',
        url: 'pordede\.com\/',

        getMediaInfo: getMediaInfo,
        getMediaType: getMediaType,
        checkSelectors: checkSelectors
    };
};
