from flask import Blueprint, request, jsonify
from app.models import Review, User, Spot, db

from app.models import Review

review_routes = Blueprint("reviews", __name__)


#CREATE REVIEW
@review_routes.route("/new/", methods=["POST"])
def new_review():
    review = Review(
        userId = request.json["userId"],
        review = request.json["review"],
        spotId = request.json["spotId"]
    )
    db.session.add(review)
    db.session.commit()

    return jsonify(review.to_dict())

#EDIT REVIEW
@review_routes.route("/<int:id>/edit", methods=["GET", "POST"])
def updatedReview(id):
    reviewToUpdate = Review.query.get(id)
    reviewToUpdate.review = request.json["review"]

    db.session.commit()
    updatedReview = Review.query.get(id)
    return jsonify(updatedReview.to_dict())

#DELETE REVIEW
@review_routes.route("/<int:id>", methods=['DELETE'])
def deleteReview(id):
    reviewToDelete = Review.query.get(id)

    db.session.delete(reviewToDelete)
    db.session.commit()
    return jsonify(reviewToDelete.to_dict())