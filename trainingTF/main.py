from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Embedding, LSTM
from tensorflow.keras.optimizers import RMSprop
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split

NUMBER_DATA = 1000

data = pd.read_csv('../datasets/TwitterUSAirline.csv')

data['text'] = data['text'].str.lower()
data['text'] = data['text'].str.replace('(@)\w+', '')
data['text'] = data['text'].str.replace('[^a-zA-Z ]', ' ')
data['text'] = data['text'].str.replace('  ', ' ')

data = pd.get_dummies(data, columns=["airline_sentiment"])

y = data[['airline_sentiment_neutral',
          'airline_sentiment_positive', 'airline_sentiment_negative']].to_numpy()


def tokenize(sentence):
    new_sentence = sentence.split(' ')
    return list(filter(lambda x: x != "", new_sentence))


def same_size(li):
    return li + [0 for i in range(max_size-len(li))]


def to_indexes(word):
    l = text_to_index.get(word)
    if l:
        return l
    return 0


def transform(tokens):
    return [to_indexes(word) for word in tokens]+[0 for i in range(max_len-len(tokens))]


X_before = []
max_len = 0
vocab = set()

for sentence in data['text']:
    sentence = tokenize(sentence)
    if len(sentence) > max_len:
        max_len = len(sentence)
    for word in sentence:
        vocab.add(word)
    X_before.append(sentence)

vocab = list(vocab)
len_vocab = len(list(vocab))+1
text_to_index = {}
for i, word in enumerate(vocab):
    text_to_index[word] = i+1


X = np.array(list(map(transform, X_before)))

X_train, X_test, y_train, y_test = train_test_split(X, y)

print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)


# Creation of the model


input = Input(
    shape=(max_len,)
)

embedding = Embedding(
    input_dim=len_vocab,
    output_dim=10,
    mask_zero=True
)(input)

lstm = LSTM(
    units=50
)(embedding)

hidden = Dense(25)(lstm)
output = Dense(3, activation="sigmoid")(hidden)

model = Model(inputs=input, outputs=output)
model.compile(
    optimizer=RMSprop(learning_rate=0.0001, rho=0.9),
    loss='categorical_crossentropy',
    metrics=['accuracy'],
)


history = model.fit(X_train, y_train, epochs=1, batch_size=32, verbose=10,
                    validation_data=(X_test, y_test), shuffle=True)

# Plot training & validation accuracy values
plt.plot(history.history['acc'])
plt.plot(history.history['val_acc'])
plt.title('Model accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'], loc='upper left')
plt.show()

# Plot training & validation loss values
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'], loc='upper left')
plt.show()
