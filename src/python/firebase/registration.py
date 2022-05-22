import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from link import link
import sys


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link
})


def register(display_name, password, email):

    try:
        auth.create_user(uid=display_name, password=password, email=email)

    except auth.UidAlreadyExistsError:
        return "Username already taken try another"

    except ValueError:
        if len(password) < 6:
            return "Password must be at least 6 characters long"

        else:
            return "Invalid email address"
            
    except auth.EmailAlreadyExistsError:
        return "An account already exists with that email"
    
    else:
        return "Account Succesfully made"



if __name__ == "__main__":
    username = sys.argv[1]
    password = sys.argv[2]
    email = sys.argv[3]

    if password != "" and email != "" and username != "":
        print(register(username, password, email))
        print("registration.py")