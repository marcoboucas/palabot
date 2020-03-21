import yaml
from yaml import Loader
from tokenization import Tokenizer

tokenizer = Tokenizer(False)


def load_scenarios():
    with open('../config/scenarios.yml', 'r') as f:
        data = yaml.load(f.read(), Loader=Loader)
    scenarios = []
    for scenario in data.values():
        scenario['triggers'] = [tokenizer.transform(
            trig) for trig in scenario['trigger'].split('|')]
        del(scenario['trigger'])
        scenario['responses'] = scenario['response'].split('|')
        del(scenario['response'])
        scenarios.append(scenario)
    return scenarios
