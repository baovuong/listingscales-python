from flask import Flask
app = Flask(__name__)



@app.route('/')
def index():
    return 'index'

@app.route('/api/scales')
def all_scales():
    return 'return all scales'