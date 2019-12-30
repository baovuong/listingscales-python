from sqlalchemy import Column, ForeignKey, Integer, String, TypeDecorator
from sqlalchemy.orm import relationship 
from database import Base 

class MusicScale(Base):
    __tablename__ = 'music_scales'
    id = Column(Integer, primary_key = True)
    names = relationship('MusicScaleName', backref = 'music_scales')
    intervals = Column(String)
    tones = Column(Integer)
    root = Column(Integer)

    def __init__(self, names=[], intervals=[], tones=None, root=None):
        self.intervals = ','.join(map(str, intervals))
        self.tones = tones 
        self.root = root 
        for name in names:
            self.names.append(MusicScaleName(name = name))
    
    def serialize(self):
        return {
            'id': self.id,
            'names': [n.name for n in self.names],
            'intervals': [int(i) for i in self.intervals.split(',')],
            'tones': self.tones,
            'root': self.root
        }

class MusicScaleName(Base):
    __tablename__ = 'music_scale_names'
    id = Column(Integer, primary_key = True)
    music_scale_id = Column(Integer, ForeignKey('music_scales.id'))
    name = Column(String)