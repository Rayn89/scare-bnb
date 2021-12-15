from .db import db
from sqlalchemy import DateTime
import datetime

class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    haunting = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="spots")

    images = db.relationship("Image", back_populates="spots")
    reviews = db.relationship("Review", back_populates="spots")
    bookings = db.relationship("Booking", back_populates="spots")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "haunting": self.haunting,
            "price": self.price,
            "userId": self.userId,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            # "comments": [comment.to_dict() for comment in self.comments],
        }