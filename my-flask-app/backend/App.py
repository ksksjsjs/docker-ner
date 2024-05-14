from flask import Flask, render_template
import time
from flask import request
import json
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/work')
def index_work():
    return render_template('index.html')


@app.route('/selection', methods=['POST'])
def selection():
    return {
        'Task': 'selection',
        'Frontend': 'React',
        'Backend': 'Flask'
    }


@app.route('/training', methods=['POST'])
def training():
    print("POST请求已发送")
    return {
        'Task': 'training',
        'Frontend': 'React',
        'Backend': 'Flask'
    }


@app.route('/predict', methods=['POST'])
def predict():
    input_str = request.json.get('str')
    print(input_str)
    print("DEBUG: ",type(input_str))
    
    return "render"


@app.route('/evaluation', methods=['GET'])
def evaluation():
    return {
        'Task': 'evaluation',
        'Frontend': 'React',
        'Backend': 'Flask'
    }


@app.route('/work', methods=['POST,GET'])
def work():
    return {
        'Task': 'work',
        'Frontend': 'React',
        'Backend': 'Flask'
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
