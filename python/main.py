from tokenization import Tokenizer
from flask import Flask, request
import json
from loadScenarios import load_scenarios
app = Flask(__name__)

tokenizer = Tokenizer()

scenarios = load_scenarios()

threshold = 0.5


@app.route('/', methods=['POST', 'GET'])
def api():
    args = dict(request.form)
    message = args['content']
    message = tokenizer.transform(result)
    response = "I don't understand ..."
    max_similarity = 0
    for scenario in scenarios:
        similarity = compare_tokens(message, scenario['trigger'])
        if similarity > max_similarity and similarity > threshold:
            response = scenario['response']

    return response


if __name__ == '__main__':
    app.run()
