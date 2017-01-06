module.exports = function() {

	var getMediaType = function() {

		if (typeof(document) !== 'undefined') {

			if ($('#tab_m_3').text() === 'Capítulos') {

				return $('#popup_m_n_mo').css('display') === 'block' ? 'EPISODE' : 'SERIE';

			} else if ($('#tab_m_3').text() === 'Enlaces') {
				return 'MOVIE';
			}
		}
		return false;
	};

	var getMediaInfo = function(mediaType) {

		var media = {
			mediaType: mediaType,
			title: $('h3[itemprop="name"]').text(),
			imdb: $('div > a:contains("Ficha en IMDb")').prop('href').split('/')[4],
			year: parseInt($('a[itemprop="datePublished"]').text()),
			episode: this.mediaType === 'EPISODE' ? parseInt($('#popup_m_n_t > span').text().split('X')[1]) : null,
			season: this.mediaType === 'EPISODE' ? parseInt($('#popup_m_n_t > span').text().split('X')[0]) : null
		};

		//CAST
		media.cast = [];
		$('div.ic_p0 div.ndlpef')
			.map((i, actor) => actor.textContent)
			//remove duplicates
			.each((i, el) => {
				if ($.inArray(el, media.cast) === -1) media.cast.push(el);
			});
		//.join(','); //comma separated string (documentation) or array (source examples) ???

		//DIRECTORS
		media.directors = [];
		$('div.ic_p1 div.ndlpef')
			.map((i, director) => director.textContent)
			//remove duplicates
			.each((i, el) => {
				if ($.inArray(el, media.directors) === -1) media.directors.push(el);
			});

		return media;
	};

	var checkSelectors = function() {
		return {

			'div.mf.s': 'following',
			'div.mf.v': 'watched',
			'div.mf.f': 'watched',
			'.capitulo': 'watched',
			'div.mf.p': 'pending',
		};
	};

	return {
		name: 'playmax', //A string identifier of the webpage
		url: 'playmax\.mx\/', //A regexp to detect the page with the URL

		getMediaInfo: getMediaInfo,
		getMediaType: getMediaType,
		checkSelectors: checkSelectors
	};
};
