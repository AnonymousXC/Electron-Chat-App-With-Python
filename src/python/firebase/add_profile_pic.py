import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from link import link, storage_bucket
import sys


cred = credentials.Certificate("src\\python\\firebase\\creds.json")

firebase_admin.initialize_app(cred,{
    "databaseURL" : link,
    "storageBucket": storage_bucket
})


def upload_image(username, path):
    ext= extension(path)
    bucket = storage.bucket()
    file = bucket.blob(f"{username}_pfp_img.{ext}")

    try:
        file.upload_from_filename(path)
    
    except FileNotFoundError:
        return "No such file exist. Check the path."
    
    else:
        file.make_public()
        return file.public_url


def extension(path):
    rev_path = path[::-1].split(".")[0]
    return rev_path[::-1]
   

if __name__ == "__main__":
    username = sys.argv[1]
    path = sys.argv[2]
    
    if username != "" and path != "":
        print(upload_image(username, path))
        print("Purpose - Gets the file path from local machine and adds the image to firebase storage")
        print("add_profile_pic.py")