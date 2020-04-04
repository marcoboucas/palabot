def tokenize(text):
    return filter(lambda x:x!='',text.lower().replace('(@)\w+', '').replace('[^a-zA-Z ]', ' ').replace('  ', ' ').split(' '))



def format_status(status):
    element = {}
    if status.text[:2] =="RT" or not(status.lang in ['fr','en']):
        return None
    element['created_at'] : status.created_at
    element['id'] = status.id
    final_element = status._json
    if status.truncated:
        element['text'] = status.extended_tweet.full_text
    else:
        element['text'] = status.text
    element['username'] = status.user.name
    element['followers'] = status.user.followers_count
    return element