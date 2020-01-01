from flask import Flask, render_template 
from database import db_session
from models import MusicScale, MusicScaleName
from sqlalchemy.orm import joinedload, Load 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scales')
def all_scales():

    scales = db_session.query(MusicScale).options(
        joinedload(MusicScale.names, innerjoin=True),
        Load(MusicScale).raiseload('*')
    ).filter(MusicScale.tones == 12)

    return {
        'scales': [s.serialize() for s in scales]
    } 

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
 app.run()