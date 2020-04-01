## Loading API keys
import json
API_KEYS = json.loads(open('./keys.json').read())


import tweepy

def addToJson(element):
  with open('./data.json','r') as f:
    data = json.loads(f.read())
  data.append(element)
  data = json.dumps(data)
  with open('./data.json','w') as f:
    f.write(data)



def create_api(KEY):
  auth = tweepy.OAuthHandler(KEY['consumer_key'], KEY['consumer_secret'])
  auth.set_access_token(KEY['access_token'], KEY['access_token_secret'])
  api = tweepy.API(auth)
  return api

api = create_api(API_KEYS[0])

def format_status(status):
  if status.text[:2]!="RT" and (status.lang in ['fr','en']):
    final_element = status._json
    try:
      final_element['tokens'] = final_element['extended_tweet']['full_text']
    except:
      final_element['tokens'] = final_element['text']
    addToJson(final_element)
    print("=="*10)
    print(status.text)
    print("=="*10)

def tokenize(text):
  return filter(lambda x:x!='',text.lower().replace('(@)\w+', '').replace('[^a-zA-Z ]', ' ').replace('  ', ' ').split(' '))

import tweepy
#override tweepy.StreamListener to add logic to on_status
class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        with open('./test.json',"w") as f:
          f.write(json.dumps(status._json))
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
