from flask import Blueprint, request, jsonify
from app.models import Spot, Image, User, db

spot_routes = Blueprint("spots", __name__)

# GET ALL SPOTS WITH IMAGES AND USERS
@spot_routes.route("/")
def view_spots():
    spots = (Spot.query.join(User, User.id == Spot.userId)
    .add_columns(User.username).all()
    )
    returnList = []
    for spot in spots:
        print("========>", spot)
        newDict = spot[0].to_dict()
        newDict["User"] = spot[1]
        image = Image.query.filter(Image.spotId == spot[0].id).all()
        newDict["images"] = [img.to_dict() for img in image]
        returnList.append(newDict)
    return jsonify(returnList)


# POST NEW SPOT
@spot_routes.route("/new", methods=["POST"])
def new_spot():
    new_spot = Spot(
        userId=request.json["userId"],
        city=request.json["city"],
        country=request.json["country"],
        name=request.json["name"],
        price=request.json["price"],
        state=request.json["state"],
        haunting=request.json["haunting"],
    )

    new_images = Image(
        image=request.json["image"]
    )
    db.session.add(new_images)
    db.session.add(new_spot)
    db.session.commit()

    return new_spot.to_dict()