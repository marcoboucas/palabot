from gensim.models.word2vec import Word2Vec
import gensim.downloader as api

from tokenization import Tokenizer

tokenizer = Tokenizer()
# download the model and return as object ready for use
model = api.load("glove-twitter-25")


def compare_tokens(token1, tokens2):
    _token1 = [word for word in token1 if word in model.vocab]
    max_similarity = 0
    for token2 in tokens2:
        _token2 = [word for word in token2 if word in model.vocab]
        similarity = model.n_similarity(_token1, _token2)
        if similarity > max_similarity:
            max_similarity = similarity
    return max_similarity
