from .db import db
from sqlalchemy import DateTime
import datetime

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)
 
    spotId = db.Column(db.Integer, db.ForeignKey('spots.id'))
    spot = db.relationship("Spot", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "spotId": self.spotId,
            "url": self.url,
            # "comments": [comment.to_dict() for comment in self.comments],
        }