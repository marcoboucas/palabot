from tokenization import Tokenizer
from flask import Flask, request
import json
app = Flask(__name__)

tokenizer = Tokenizer()


@app.route('/', methods=['POST', 'GET'])
def api():
    args = dict(request.form)
    result = args['content']
    result = tokenizer.transform(result)
    result = json.dumps("|".join(result))
    return result


if __name__ == '__main__':
    app.run()
