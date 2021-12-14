from .db import db
from sqlalchemy import DateTime
import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    startDate = db.Column()
    endDate = db.Column()
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="bookings")
 
    spotId = db.Column(db.Integer, db.ForeignKey('spots.id'))
    spot = db.relationship("Spot", back_populates="bookings")

    def to_dict(self):
        return {
            "id": self.id,
            "spotId": self.spotId,
            "userId": self.userId,
            "startDate": self.startDate,
            "endDate": self.endDate
            # "comments": [comment.to_dict() for comment in self.comments],
        }