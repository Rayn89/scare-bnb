from app.models import db, Booking


# Adds a demo user, you can add other users here if you want
def seed_bookings():
    demoBooking = Booking(
        startDate="01/01/2022",
        endDate="01/05/2022",
        userId=1,
        spotId=1
        )


    db.session.add(demoBooking)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()