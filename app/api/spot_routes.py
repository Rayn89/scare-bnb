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

#Get spot by ID
@spot_routes.route("/<int:id>")
def one_spot(id):
    oneSpot = Spot.query.get(id).to_dict()
    user = User.query.filter(User.id == oneSpot["userId"])
    images = Image.query.filter(Image.spotId == id)
    oneSpot["images"] = [image.to_dict() for image in images]
    oneSpot["user"] = [one.to_dict() for one in user]
    return oneSpot

# Update Post
# @post_routes.route("/<int:id>/edit", methods=["GET", "POST"])
# def updatePost(id):
#     postToUpdate = Post.query.get(id)
#     postToUpdate.caption = request.json["caption"]

#     db.session.commit()
#     updatedPost = Post.query.get(id)
#     return jsonify(updatedPost.to_dict())

# DELETE /posts/:id/
# @post_routes.route("/<int:id>", methods=["DELETE"])
# def deletePost(id):
#     postToDelete = Post.query.get(id)

#     db.session.delete(postToDelete)
#     db.session.commit()
#     return jsonify(postToDelete.to_dict())