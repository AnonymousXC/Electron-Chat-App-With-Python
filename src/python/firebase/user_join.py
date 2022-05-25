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


def user_join(username, timestamp):

   
    ref.update(
        {
            username:
            {
                "timestamp" : timestamp,
                "messages" : 0
            }
                
        }
    )
    
    

if __name__ == "__main__":
    username = sys.argv[1]
    timestamp = sys.argv[2]


    if username != ""  and timestamp != "":
        user_join(username, timestamp)
        print("Purpose - Add users username(uid) and time of entry on webiste to db")
        print("user_join.py")
