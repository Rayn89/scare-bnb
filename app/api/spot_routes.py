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
        newDict = spot[0].to_dict()
        newDict["User"] = spot[1]
        image = Image.query.filter(Image.spotId == spot[0].id).all()
        newDict["images"] = [img.to_dict() for img in image]
        returnList.append(newDict)
    return jsonify(returnList)


# POST NEW SPOT
@spot_routes.route("/new/", methods=["POST"])
def new_spot_post():
    new_spot = Spot(
        userId=request.json["userId"],
        city=request.json["city"],
        country=request.json["country"],
        name=request.json["name"],
        price=request.json["price"],
        state=request.json["state"],
        haunting=request.json["haunting"],
        address=request.json["address"]
    )

    db.session.add(new_spot)
    db.session.commit()

    new_images1 = Image(
        url=request.json["url"]["1"],
        spotId=new_spot.to_dict()["id"]
    )
    new_images2 = Image(
        url=request.json["url"]["2"],
        spotId=new_spot.to_dict()["id"]
    )
    new_images3 = Image(
        url=request.json["url"]["3"],
        spotId=new_spot.to_dict()["id"]
    )
    db.session.add(new_images1)
    db.session.add(new_images2)
    db.session.add(new_images3)
    db.session.commit()
    
    return new_spot.to_dict()