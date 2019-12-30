from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.ext.declarative import declarative_base
import database 
import models
import json

def main():
    database.init_db()
    DBSession = sessionmaker(bind=database.engine) 
    session = DBSession()

    # populate with data
    with open('data.json') as json_file:
        data = json.load(json_file) 
        for scale in data:
            print(scale)
            session.add(models.MusicScale(names=scale['names'], intervals=scale['intervals'], tones=scale['tones'], root=scale['root']))
        session.commit()
        database.shutdown_session()

if __name__ == '__main__':
    main() 