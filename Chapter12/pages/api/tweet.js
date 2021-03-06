const Twit = require('twit')

function clean_tweet(tweet) {
  tweet = tweet.normalize("NFD")
  tweet = tweet.replace(/(RT\s(@\w+))/g, '')
  tweet = tweet.replace(/(@[A-Za-z0-9]+)(\S+)/g, '')
  tweet = tweet.replace(/((http|https):(\S+))/g, '')
  tweet = tweet.replace(/[!#?:*%$]/g, '')
  tweet = tweet.replace(/[^\s\w+]/g, '')
  tweet = tweet.replace(/[\n]/g, '')
  tweet = tweet.toLowerCase().trim()
  return tweet
}
export default function twitterAPI(req, res) {

  if (req.method === "POST") {
    const { username } = req.body

    const T = new Twit({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    T.get('search/tweets', { q: `@${username}`, tweet_mode: 'extended' }, function (err, data, response) {
      let dfData = {
        text: data.statuses.map(tweet => clean_tweet(tweet.full_text)),
        length: data.statuses.map(tweet => clean_tweet(tweet.full_text).split(" ").length),
        date: data.statuses.map(tweet => tweet.created_at),
        source: data.statuses.map(tweet => tweet.source.replace(/<(?:.|\n)*?>/gm, '')),
        likes: data.statuses.map(tweet => tweet.favorite_count),
        retweet: data.statuses.map(tweet => tweet.retweet_count),
        users: data.statuses.map(tweet => tweet.user.screen_name)
      }

      res.status(200).json(dfData)
    })
  }
}