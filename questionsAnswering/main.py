from loadTransformer import TransformerModel
from questions import QuestionsPreparation
import tensorflow as tf
import os
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

sns.set(style="white", context="talk")


TM = TransformerModel(
    "DistilBert",
    "ForQuestionAnswering",
    "distilbert-base-uncased"
)
QP = QuestionsPreparation(TM.tokenizer)


def clear(): return os.system('clear')  # on Linux System


clear()
context = "During the Iron Age, what is now metropolitan France was inhabited by the Gauls, a Celtic people. Rome annexed the area in 51 BC, holding it until the arrival of Germanic Franks in 476, who formed the Kingdom of Francia. The Treaty of Verdun of 843 partitioned Francia into East Francia, Middle Francia and West Francia. West Francia, which became the Kingdom of France in 987, emerged as a major European power in the Late Middle Ages, following its victory in the Hundred Years' War (1337–1453). During the Renaissance, French culture flourished and a global colonial empire was established, which by the 20th century would become the second largest in the world.[11] The 16th century was dominated by religious civil wars between Catholics and Protestants (Huguenots). France became Europe's dominant cultural, political, and military power in the 17th century under Louis XIV.[12] In the late 18th century, the French Revolution overthrew the absolute monarchy, establishing one of modern history's earliest republics and drafting the Declaration of the Rights of Man and of the Citizen, which expresses the nation's ideals to this day."
question = "What happend during the 16th century ?"

input_ids, segment_ids, tokens = QP.prepare(
    context,
    question
)

outputs = TM.model({'input_ids': input_ids, 'token_type_ids': segment_ids})
start_scores, end_scores = outputs[:2]

token_labels = []
for (i, token) in enumerate(tokens):
    token_labels.append('{:} - {:>2}'.format(token, i))

start_scores = np.array(start_scores).flatten()
end_scores = np.array(end_scores).flatten()


# Set up the matplotlib figure
f, (ax1, ax2) = plt.subplots(2, 1, figsize=(7, 5), sharex=True)


sns.barplot(x=token_labels, y=start_scores, ci=None, ax=ax1)
ax1.set_xticklabels(ax1.get_xticklabels(), rotation=90, ha="center")
ax1.grid(True)
ax1.set_title('Start score')

sns.barplot(x=token_labels, y=end_scores, ci=None, ax=ax2)
ax2.set_xticklabels(ax2.get_xticklabels(), rotation=90, ha="center")
ax2.grid(True)
ax2.set_title('End score')


plt.show()
