from sqlalchemy import Column, ForeignKey, Integer, String, TypeDecorator
from sqlalchemy.orm import relationship 
from database import Base 

class MusicScale(Base):
    __tablename__ = 'music_scales'
    id = Column(Integer, primary_key = True)
    names = relationship('MusicScaleName', backref = 'music_scales')
    intervals = Column(Integer)
    tones = Column(Integer)
    root = Column(Integer)

    def __init__(self, names=None, intervals=None, tones=None, root=None):
        self.names = names
        self.intervals = intervals 
        self.tones = tones 
        self.root = root 

class MusicScaleName(Base):
    __tablename__ = 'music_scale_names'
    id = Column(Integer, primary_key = True)
    music_scale_id = Column(Integer, ForeignKey('music_scales.id'))
    name = Column(String)