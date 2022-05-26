from firebase_admin import auth
import sys
from add_profile_pic import *


def register(display_name, password, email, pfp_path):

    path = False

    try:
        if pfp_path.startswith("https://") or pfp_path.startswith("http://"):
            pfp = pfp_path
        
        else:
            path = True
            pfp = upload_image(display_name, pfp_path)

        auth.create_user(uid=display_name, password=password, email=email, photo_url = pfp)

    except auth.UidAlreadyExistsError:
        if path:
            del_on_error(username, pfp_path)

        return "Username already taken try another"

    except ValueError:

        if path:
            del_on_error(username, pfp_path)

        if len(password) < 6:
            return "Password must be at least 6 characters long"

        else:
            return "Invalid email address"
            
    except auth.EmailAlreadyExistsError:
        
        if path:
            del_on_error(username, pfp_path)

        return "An account already exists with that email"
    
    else:
        return "Account Succesfully made"


def del_on_error(username, pfp_path):
    ext= extension(pfp_path)
    bucket = storage.bucket()
    file = bucket.blob(f"{username}_pfp_img.{ext}")
    file.delete()



if __name__ == "__main__":
    username = sys.argv[1]
    password = sys.argv[2]
    email = sys.argv[3]
    pfp_path = sys.argv[4] # either url or local file path works

    if password != "" and email != "" and username != "":
        print(register(username, password, email, pfp_path))
        print("registration.py")