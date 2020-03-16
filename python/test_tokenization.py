import pytest
from tokenization import Tokenizer


def test_token_filter():
    tokenizer = Tokenizer()
    test_values = [
        ("football", True),
        ("and", False),
        ("or", False),
        ("because", False),
        ("", False)
    ]
    for token, value in test_values:
        assert tokenizer.token_filter(token) == value


def test_transform_one():
    tokenizer = Tokenizer()
    test_values = [
        ("Hi ! My name is Marco", ['hi', 'name', 'marco'])
    ]
    for sentence, value in test_values:
        val1 = tokenizer.transform_one(sentence)
        val2 = value
        assert len(val1) == len(val2)
        results = zip(val1, val2)
        for x, y in results:
            assert x == y
