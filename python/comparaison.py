from gensim.models.word2vec import Word2Vec
import gensim.downloader as api

from tokenization import Tokenizer

tokenizer = Tokenizer()
# download the model and return as object ready for use
model = api.load("glove-twitter-25")


def compare_tokens(tokens1, tokens2):
    _tokens1 = [word for word in tokens1 if word in model.vocab]
    _tokens2 = [word for word in tokens2 if word in model.vocab]
    return model.n_similarity(_tokens1, _tokens2)


while True:
    tokens1 = tokenizer.transform(input("sentence 1"))
    tokens2 = tokenizer.transform(input("sentence 2"))
    print(compare_tokens(tokens1, tokens2))
    print('\n\n')
