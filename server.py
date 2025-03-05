from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

dining_halls = [
    {
        "id": 1,
        "name": "Ferris Booth Commons",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Ferris%20dessert%20case.jpg?itok=wDKiUcPS"
    },
    {
        # CHANGE ALL OF THESE IMAGES!!! TODO
        "id": 2,
        "name": "John Jay Dining Hall",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Ferris%20dessert%20case.jpg?itok=wDKiUcPS"
    },
    {
        "id": 3,
        "name": "JJ's Place",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 4,
        "name": "Hewitt Dining Hall",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 5,
        "name": "Diana Center Café",
        "image": "https://i.pinimg.com/originals/6f/24/e3/6f24e398413843a17cba7f42daccac56.jpg"
    },
    {
        "id": 6,
        "name": "Chef Mike's Sub Shop",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 7,
        "name": "Faculty House",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 8,
        "name": "Grace Dodge Dining Hall",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 9,
        "name": "Chef Don's Pizza Pi",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
    {
        "id": 10,
        "name": "Café East",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Roaree-73v2.jpg?itok=h3-Mw9Zt"
    },
]

@app.route('/')
def home():
    return render_template('index.html', dining_halls=dining_halls)

@app.route('/view/<id>')
def view_id(id=id): # how is id this passed in idk
    return render_template('view_id.html', id=id, dining_halls=dining_halls)

# ajax for layout.js
@app.route('/search_results', methods=['GET'])
def search_results():
    query = request.args.get("query","").strip()
    matches = [dh for dh in dining_halls if query.lower() in dh["name"].lower()]
    return render_template('search_results.html', matches=matches, query=query)

if __name__ == '__main__':
   app.run(debug = True, port=5001)