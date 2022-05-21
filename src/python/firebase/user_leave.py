import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from link import link
import sys


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link
})

ref = db.reference("Users")


def user_leave(email):
    new_ref = db.reference(f"Users/{email}")
    new_ref.delete()


def number_of_user():
    try:
        num_of_entries = len(ref.get())

    except TypeError:
        return 0
    
    else:
        return num_of_entries


if __name__ == "__main__":
    email = sys.argv[1]
    
    if email != "" :
        user_leave(email)
        print(number_of_user())