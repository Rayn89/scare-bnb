from app.models import db, Spot


# Adds a demo user, you can add other users here if you want
def seed_spots():
    demoSpot = Spot(
        name='Demo Spot',
        haunting='Demon',
        price=100,
        address='1000 Demon St.',
        city='Dark Town',
        state='AR',
        country='USA',
        userId=1
        )

    demoSpotTwo = Spot(
        name='Demo Spot Two',
        haunting='Ghoul',
        price=150,
        address='1000 Ghoul St.',
        city='Ghoul Town',
        state='AR',
        country='USA',
        userId=1
        )


    db.session.add(demoSpot)
    db.session.add(demoSpotTwo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()