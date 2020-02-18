# listingscales-python

# Dependencies

* Python 3+
* Virtualenv
* PIP
* SQLite
* Node
* NPM

# How to Build

1. create virtualenv for our app: `python3 -m venv venv`
1. start virtualenv: `source ./venv/bin/activate`
1. install pip dependencies: `pip install -r requirements.txt`
1. install npm dependencies: `npm update`
1. build frontend: `node run-script build`
1. populate database: `cd app && python gen.py`


# How to Run (Manually)

in root directory: `flask run`

# How to Run (with Docker)

(coming soon)