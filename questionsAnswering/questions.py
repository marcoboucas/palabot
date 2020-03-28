import transformers
import tensorflow as tf
from transformers import *


class QuestionsPreparation:
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer

    def prepare(self, context, question):
        input_ids = self.tokenizer.encode(question, context)
        tokens = self.tokenizer.convert_ids_to_tokens(
            input_ids)

        input_ids = self.tokenizer.encode(question, context)

        # Search the input_ids for the first instance of the `[SEP]` token.
        sep_index = input_ids.index(self.tokenizer.sep_token_id)

        # Construct the list of 0s and 1s.
        segment_ids = [0]*(sep_index + 1) + [1] * \
            (len(input_ids) - sep_index - 1)
        return tf.constant([input_ids]), tf.constant([segment_ids]), tokens
