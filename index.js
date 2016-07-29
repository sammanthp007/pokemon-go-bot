var Twitter = require('Twit');
var firebase = require("firebase");
var request = require('request');

firebase.initializeApp({
  serviceAccount: {
    projectId: "pokemon-yo",
    clientEmail: "pokemonyo@pokemon-yo.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuk5MnD4neWmcd\nh+dyg4zFrUJEjgVp19NZPO9KqydJ/A9j9NAG/wxRIywcc24sUv3MCYd6XhJpUXsU\nDjyscKkRSfgZllhQlztcuUvBjt0gqApkJb7Xak7/yNhc7qb/cF8Bvz5V0GEKAZf/\neyM4ig7tCxV/4QJ9soej3u0hzXGMITxD+Xu0EuP60ifUED5+F9t2z+KcNL3BV3g0\nTSLrg5DGWlKErstRhIZnczRmByjeymfD1XMP15zb26rJldX1hD3J0QzrRzqLgdst\nr39gSGGglDVvtSiIRsK0G1Qvt0FKDFJhjbgpRDMBtmqfQEviWsiePheuUq6dx+v/\nEVUMjClvAgMBAAECggEBAKqJxUVyG3dYDsU9Xu5x7dGpmEPKDSXBTVgue4AQxFe0\n4P//RjyfaFPWrR+571VjWUS5xlvWi9vQWhBUfBbkE3StMq0kPm+z3KyO4p9ZxVBC\nd6wvZ0eeNUAP3rSh+gcsqdLWFLnVzwXsWqSbkOOJkl0j58O9diZ+gZymiDXuMM72\nhfeUjAxjkUSqfCca2mlN9rhXDAgwUAyCjcuxDo7HkW1IhSthwh+wVA6jiCQokwAZ\n/bKeZzR6s7C46jT+7aC1/ysKiFl/leWS3J370pC7UyXK/4MtrN5DERiJ4YvQ7VwT\nrcXsA4YfQNKukeoa695d9f6IANpEWMPiyMyMF1ujMbECgYEA5vK7FUuFABlp0mp9\nRAhg6JM+Vz/yRk9vTMzEJoz3VyT4uyThA4gNTgMoIffx6PYlBLJbo6VAARUyIsIE\nD6/xYOxQZIbEyOXeHODPEkNgjubMvpx16Vmggy5KJL8H4MPcPNG0LSwW5AhIBqHh\n32vCI0oybUf3Zr2eOFYZX6pKwRcCgYEAwYNw8/NCHtH6RDg9AScquw7b+HCNNYgC\nXiOItHUjzG5KSgUfMx4zOT5eCeTgjeaF1IQ/8Bsqqd+q6D4LAyEWT+Y7n3SWqel0\nT2a8AxDEF2L+u5kQveu/Y/TTJfj1XYmBr6EDU9KRXzOGzd9NqUpHjQzgfod1/etB\nzqE+WhBZIWkCgYBPGSd2Pa1JwWp7BLnuiSgXwAaD/4TNC/vExAUSZwl3sVP3VMQ0\nX26fH3mpWLBj55n6J9Q3Eiv/svC+8tBNRydW2NkX9QiE/iW6okyJpsX1a5sIVbIU\nv/u3siz2tO7PzoUp13DsX8NfSm7QxrUDvnZ5e7oVr6ZOa/c6uFJsb3i29QKBgBsx\nFhkhcIQWK12UrXXRBB8e2mgRoLYJ85M42QfKggpC4St/hr/PGZGMovgu8iLeZqXT\nI4zgtGEEbeaOeUuqRZFan7wrTNR5Wn+hxv+DRpqmrXa87m5RhyZLi7QFRK0tGk0M\nigQoTYccHXAmVapZJq66RX1iGYFhonCflbxgGbYpAoGASXYJSdjZv1FKoBYd7Pj5\nv9rBsUGr3QopfLtK4eEAptJW8N9oTv4xZ1ju4AazBvEQ8DIh9Pch/iS8QIh/Wg3t\nj3+mLOgeYId/XrhvYSe+MzqQJAeklOHB9IJ+6XufzSA/6IDiOlkfRN588rlmlFUC\n87XU9myah79OppWowsigHwE=\n-----END PRIVATE KEY-----\n"
  },
  databaseURL: "https://pokemon-yo.firebaseio.com/"
});

var sampleResponse = require('./sampleResponse.json');
var allPokemons = require('./listOfPokemons.json');

var pokemons = allPokemons.pokemons;

function checkWordsOfSentenceInArray(sentence, listOfWords) {
	var listSentence = sentence.split(' ');
	for (var i = 0; i < listSentence.length; i++) {
		for (var j = 0; j < listOfWords.length; j++) {
			if (listSentence[i].toLowerCase() == listOfWords[j].toLowerCase()) {
				return listOfWords[j];
			}
		}
	}
	return false
};

var twitter = new Twitter({
	consumer_key: 'RRu0kpaSfhihIJFcRxmso6MWa',
	consumer_secret: 'LctRZxFnicNsMMNAl3t8AXmr3D5DOImya8zwSyo8jYVvf56clB',
	access_token: '2750763448-ib58am6lSr2WEpKTsUf6KGhZ8PQIS4fHmV2CSLD',
	access_token_secret: '6Y35ctiFu5IZIqMcVMi8KnTitNacjK8VHy0kTjy5CBPbe'
});

var stream = twitter.stream('statuses/filter', { track: 'pokemonyo' });

stream.on('tweet', function(tweet) {
	if(tweet && tweet.text) {
		console.log('received the tweet: ', tweet.text)
		var this_pokemon = checkWordsOfSentenceInArray(tweet.text, pokemons);
		if (this_pokemon) {
		// get the locations
		request.post('https://fcm.googleapis.com/fcm/send', {
			'Content-Type': 'application/json',
			'Authorization':'key= AIzaSyAUsF7WAeH_a5fL6YMakauLA4s6-6nKY0I',
			"notification": {
			  "to" : "dnsVvO5pDn8:APA91bH7eFYDNAQbsdkJ1tQC2gxnU5cLoOTZsxk7F07gSsrlGtzF08-M48q58x-1p47ve9mpeevse1m3BZky2Jsg-dsNLhMDZp2EpNt0NHErNDIN85SGYw7r9zQDBNeFJRzGKUxc47sz",
			  "data" : 'man this is it. we happy hour now.'
			}
		}, function(err, response, body) {
			console.log('send notification')
		});
			console.log(tweet.text);

		}
	}
}
);