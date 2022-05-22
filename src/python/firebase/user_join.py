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


def user_join(username, timestamp, msg=False):

    if not msg:
        ref.update(
            {
                username:
                {
                    "timestamp" : timestamp,
                    "messages" : 0
                }
                
            }
        )
    
    else:
        update_msg_count(username)


def update_msg_count(username):
    new_ref = db.reference(f"Users/{username}")
    msgs = new_ref.get()["messages"]

    ref.update(
        {
           "messages" : msgs+1
        }
    )


def number_of_user():
    return len(ref.get())


if __name__ == "__main__":
    username = sys.argv[1]
    timestamp = sys.argv[2]
    msg_bool = sys.argv[3]

    if msg_bool == "":
        msg_bool = False
    else:
        msg_bool = True

    if username != ""  and timestamp != "":
        user_join(username, timestamp, msg_bool)
        print(number_of_user())