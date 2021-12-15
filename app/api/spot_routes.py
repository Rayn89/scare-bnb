from flask import Blueprint, request, jsonify
from app.models import Spot, Image, db

spot_routes = Blueprint("spots", __name__)

@spot_routes.route("/")
def view_spots():
    spots = Spot.query.all()
    
    returnList = []
    for spot in spots:
        print("========>", spot)
        newDict = spot.to_dict()
        image = Image.query.filter(Image.spotId == spot.id).all()
        newDict["images"] = [img.to_dict() for img in image]
        returnList.append(newDict)
    return jsonify(returnList)