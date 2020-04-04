## Loading API keys
import json
import tweepy
from tweet import format_status
API_KEYS = json.loads(open('./keys.json').read())

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
class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
      result = format_status(status)
      if result:
        addToJson(result)
    
    def on_error(self, status_code):
        if status_code == 420:
            #returning False in on_error disconnects the stream
            return False

myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)

myStream.filter(track=['#ai','#ArtificialIntelligence'])