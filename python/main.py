from tokenization import Tokenizer
from flask import Flask, request
import json
import numpy as np
from loadScenarios import load_scenarios
from comparaison import compare_tokens
app = Flask(__name__)

tokenizer = Tokenizer(using_stopwords=False)

scenarios = load_scenarios()

threshold = 0.9


@app.route('/', methods=['POST', 'GET'])
def api():
    args = dict(request.form)
    message = args['content']
    message = tokenizer.transform(message)
    print(message)
    response = "I don't understand ..."
    if len(message) == 0:
        return response
    max_similarity = 0
    for scenario in scenarios:
        similarity = compare_tokens(message, scenario['triggers'])
        print(similarity, scenario['responses'])
        if similarity > max_similarity and similarity > threshold:
            response = scenario['responses'][np.random.randint(
                0, len(scenario['responses']))]
            max_similarity = similarity

    return response


if __name__ == '__main__':
    app.run()
