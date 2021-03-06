import regex as re
import numpy as np
import nltk
from nltk.corpus import stopwords

STOP_WORDS = set(stopwords.words('english'))
pattern = "\W"


class Tokenizer:
    """
    Transform sentences into list of tokens

    """

    def __init__(self, using_stopwords=True):
        self.using_stopwords = using_stopwords

    def transform_one(self, sentence):
        """
        Function that transform one sentence into tokens (with filter)
        """
        tokens = re.split(pattern, sentence.lower())
        tokens_filtered = list(filter(self.token_filter, tokens))
        # print(tokens_filtered)
        return tokens_filtered

    def token_filter(self, token):
        """
        Function that filter if the word is from a STOP_WORLDS and other things
        """
        # Remove tokens if they are stop words
        if token == "":
            return False
        if self.using_stopwords and token in STOP_WORDS:
            return False
        return True

    def transform(self, sentences):
        """
        Function that transform one/many sentences into list of tokens
        """
        if type(sentences) == type([1]):
            L = []
            for sentence in sentences:
                L.append(self.transform_one(sentence))
            return L
        else:
            return self.transform_one(sentences)
