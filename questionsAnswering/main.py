from loadTransformer import TransformerModel


TM = TransformerModel(
    "DistilBert",
    "ForQuestionAnswering",
    "distilbert-base-uncased"
)

TM.info()
