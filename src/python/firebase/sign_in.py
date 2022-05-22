import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from link import link
import sys
import json


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link
})


def signIn(username_from_user, email_from_user):
    try:
        user = auth.get_user_by_email(email_from_user)
        username = user.uid
        pfp_url = user.photo_url
    
    except auth.UserNotFoundError:
        return "No user record found for the provided email."
    
    except ValueError:
        return "Email is malformed"
    
    else:
        if username == username_from_user:
            return json.dumps({"username": username, "pfp_url": pfp_url})
        else:
            return "Invaild Information"


if __name__ == "__main__":
    email = sys.argv[1]
    username = sys.argv[2]

    if email != "" and username != "":
        print(signIn(email, username))
        print("Purpose - Checks user entered information on the sign in page to allow access to application")
        print("sign_in.py")
