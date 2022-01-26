from app.models import db, Spot


# Adds a demo user, you can add other users here if you want
def seed_spots():
    demoSpot = Spot(
        name='House on Horror Hill',
        haunting='Demon',
        price=100,
        address='1000 Demon St.',
        city='Dark Town',
        state='Arkansas',
        country='USA',
        userId=1
        )

    demoSpotTwo = Spot(
        name='Ghoul House',
        haunting='Ghoul',
        price=150,
        address='1000 Ghoul St.',
        city='Ghoul Town',
        state='Arkansas',
        country='USA',
        userId=1
        )
    
    demoSpotThree = Spot(
        name='Demon Haunter',
        haunting='Demon',
        price=150,
        address='1000 Ghoul St.',
        city='Ghoul Town',
        state='AR',
        country='USA',
        userId=1
        )

    demoSpotFour = Spot(
        name='Franky Kruger House',
        haunting='Bladefingers',
        price=150,
        address='1000 Ghoul St.',
        city='Ghoul Town',
        state='Illinois',
        country='USA',
        userId=2
        )

    demoSpotFive = Spot(
        name='Franky Kruger House',
        haunting='Spirit',
        price=150,
        address='1000 Ghoul St.',
        city='Ghoul Town',
        state='Illinois',
        country='USA',
        userId=2
        )


    db.session.add(demoSpot)
    db.session.add(demoSpotTwo)
    db.session.add(demoSpotThree)
    db.session.add(demoSpotFour)
    db.session.add(demoSpotFive)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()