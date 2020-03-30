## Loading API keys
import json
API_KEYS = json.loads(open('./keys.json').read())


import tweepy,json



def create_api(KEY):
  auth = tweepy.OAuthHandler(KEY['consumer_key'], KEY['consumer_secret'])
  auth.set_access_token(KEY['access_token'], KEY['access_token_secret'])
  api = tweepy.API(auth)
  return api

api = create_api(API_KEYS[0])

def format_status(status):
  if status.text[:2]!="RT":
    element = {}
    try:
      element['text'] = status._json["extended_tweet"]['full_text']
    except:
      element['text'] = status._json['text']
    print("=="*10)
    print(element['text'])
    print("=="*10)

import tweepy
#override tweepy.StreamListener to add logic to on_status
class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        format_status(status)
    
    def on_error(self, status_code):
        if status_code == 420:
            #returning False in on_error disconnects the stream
            return False

myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)

myStream.filter(track=['#ai','#ArtificialIntelligence'])



"""

['author',
    'contributors',
    'coordinates',
    'created_at',
    'destroy',
    'entities',
    'favorite',
    'favorite_count',
    'favorited',
    'geo',
    'id',
    'id_str',
    'in_reply_to_screen_name',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'is_quote_status',
    'lang',
    'parse',
    'parse_list',
    'place',
    'retweet',
    'retweet_count',
    'retweeted',
    'retweets',
    'source',
    'source_url',
    'text',
    'truncated',
    'user']

    """
