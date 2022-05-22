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


def update_msg_count(username):
    new_ref = db.reference(f"Users/{username}")
    msgs = new_ref.get()["messages"]

    ref.update(
        {
           "messages" : msgs+1
        }
    )



if __name__ == "__main__":
    username = sys.argv[1]

    if username != "":
        update_msg_count(username)
        print("Purpose - Add message count of the user who most recently messaged on global chats.")
        print("update_msg_count.py")