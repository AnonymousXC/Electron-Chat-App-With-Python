import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from link import link


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link
})

ref = db.reference("Users")


def number_of_user():
    try:
        num_of_entries = len(ref.get())

    except TypeError:
        return 0
    
    else:
        return num_of_entries


if __name__ == "__main__":
    print(number_of_user())
    print("Purpose - Gets number of user from realtime database")
    print("num_of_users.py")