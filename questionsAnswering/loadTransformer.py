import transformers
import tensorflow as tf
from transformers import *

"""

# All the architectures availables


# Each architecture is provided with several class for fine-tuning on down-stream tasks, e.g.
BERT_MODEL_CLASSES = [
    BertModel, BertForPreTraining, BertForMaskedLM, BertForNextSentencePrediction,
    BertForSequenceClassification, BertForTokenClassification, BertForQuestionAnswering
]
"""


class TransformerModel:

    available_pretrained_weights = {
        'Bert': 'bert-base-uncased',
        'OpenAIGPT': 'openai-gpt',
        'GPT2': 'gpt2',
        'CTRL': "ctrl",
        'XLNet': 'transfo-xl-wt103',
        'XLM': 'xlnet-base-cased',
        'DistilBert': 'distilbert-base-uncased',
        'Roberta': 'roberta-base',
        'XLMRoberta': 'xlm-roberta-base'

    }

    def __init__(self, model_name="DistilBert", model_function="Model", pretrained_weights="distilbert-base-uncased"):
        self.model_name = model_name
        self.model_function = model_function
        self.pretrained_weights = pretrained_weights
        self.getTokenizer()
        self.getModel()
        # self.tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
        # self.model = TFBertForSequenceClassification.from_pretrained('bert-base-cased')

    def checkIfModel(self):
        return self.modelName in self.available_pretrained_weights.keys()

    def getTokenizer(self):
        tokenizer_name = self.model_name + "Tokenizer"
        self.tokenizer = getattr(
            transformers, tokenizer_name).from_pretrained(self.pretrained_weights)

    def getModel(self):
        model_name = "TF"+self.model_name+self.model_function
        self.model = getattr(transformers, model_name).from_pretrained(
            self.pretrained_weights)

    def info(self):
        print(self.model.summary())
