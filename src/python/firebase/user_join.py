import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from link import link
import sys


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link
})

ref = db.reference("User")


def user_join(username, password, timestamp):

    ref.update(
        {
            
                username:
                {
                    "username" : username,
                    "password": password,
                    "timestamp" : timestamp
                }
            

        }
    )


if __name__ == "__main__":
    username = sys.argv[1]
    password = sys.argv[2]
    timestamp = sys.argv[3]

    if username != "" and password != "" and timestamp != "":
        user_join(username, password, timestamp)