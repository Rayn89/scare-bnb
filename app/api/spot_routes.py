from flask import Blueprint, request, jsonify
from app.models import Spot, Image, db

spot_routes = Blueprint("spots", __name__)

@spot_routes.route("/")
def view_spots():
    spots = (Spot.query.join(Image, Image.spotId == Spot.id)
    .add_columns(Image.url).all()
    )
    returnList = []
    for spot in spots:
        print("**********************", spot)
        newDict = spot[0].to_dict()
        newDict["url"] = spot[1]
        print("==================>", newDict)
        returnList.append(newDict)
    return jsonify(returnList)