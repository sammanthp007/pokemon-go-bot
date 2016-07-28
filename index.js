var Twitter = require('Twit');

var twitter = new Twitter ({
  consumer_key : 'RRu0kpaSfhihIJFcRxmso6MWa',
  consumer_secret: 'LctRZxFnicNsMMNAl3t8AXmr3D5DOImya8zwSyo8jYVvf56clB',
  access_token: '2750763448-ib58am6lSr2WEpKTsUf6KGhZ8PQIS4fHmV2CSLD',
  access_token_secret: '6Y35ctiFu5IZIqMcVMi8KnTitNacjK8VHy0kTjy5CBPbe'
});

var stream = twitter.stream('statuses/filter', {track: 'garbagewordzz'});

stream.on('tweet', function(tweet) {
  console.log(tweet);
});


