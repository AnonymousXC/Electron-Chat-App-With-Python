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
        return  json.dumps("No user record found for the provided email.")
    
    except ValueError:
        return  json.dumps("Email is malformed")
    
    else:
        if username == username_from_user:
            return json.dumps({"username": username, "pfp_url": pfp_url, "email": email_from_user})
        else:
            return  json.dumps("Invaild Information")


if __name__ == "__main__":
    username = sys.argv[1]
    email = sys.argv[2]

    if username != "" and email != "":
        print(signIn(username, email))
        print(json.dumps("Purpose - Checks user entered information on the sign in page to allow access to application"))
        print(json.dumps("sign_in.py"))
