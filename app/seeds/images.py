from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    demoImage = Image(
        url="https://images.unsplash.com/photo-1602769921397-e870d926e1e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",
        spotId=1
        )
    demoImageTwo = Image(
        url="https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF1bnRlZCUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        spotId=1
        )
    demoImageThree = Image(
        url="https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF1bnRlZCUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        spotId=1
        )
    demoImageFour = Image(
        url="https://images.unsplash.com/photo-1588841854694-b9f3fe51e979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        spotId=2
        )
    demoImageFive = Image(
        url="https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        spotId=2
        )
    demoImageSix = Image(
        url="https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        spotId=2
        )
    demoImageSeven = Image(
        url="https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        spotId=3
        )
    demoImageEight = Image(
        url="https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        spotId=3
        )
    demoImageNine = Image(
        url="https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        spotId=3
        )


    db.session.add(demoImage)
    db.session.add(demoImageTwo)
    db.session.add(demoImageThree)
    db.session.add(demoImageFour)
    db.session.add(demoImageFive)
    db.session.add(demoImageSix)
    db.session.add(demoImageSeven)
    db.session.add(demoImageEight)
    db.session.add(demoImageNine)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()