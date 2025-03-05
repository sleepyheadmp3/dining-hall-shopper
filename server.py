from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

dining_halls = [
    {
        "id": 1,
        "name": "Ferris Booth Commons",
        "rating": "4.5/5",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/FBC%20location%20photos/Ferris%20dessert%20case.jpg?itok=wDKiUcPS",
        "desc": "Ferris is a fantastic option for grocery shopping due to the numerous food items students can " +
            "grab! In addition to being buffet-style, Ferris has paper plates available, so no need to bring your own" +
            " food containers. The only inaccessible items are the salad items and dessert, which are only available" +
            " upon request. Otherwise, the staff is generally pretty lenient on taking out food, so stock up anytime" +
            " from breakfast to dinner!",
        "location": "Lerner Hall",
        "containers":["Disposable plates", "Reusable take-out box"],
        "fruit":["Apples", "Pears", "Bananas"],
        "condiments":["Salt", "Pepper", "Soy sauce", "Ketchup", "Mustard", "Relish"],
        "unpackaged":["Bagels", "Muffins", "Bread", "Vegetables", "Hummus"],
        "packaged":["Milk", "Nutella", "Cream cheese", "Butter", "Syrups"]
    },
    {
        "id": 2,
        "rating": "3/5",
        "name": "John Jay Dining Hall",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/John%20Jay%20Location%20Photos/Campus%20Services%20126.JPG?itok=G9F67nZq",
        "desc": "John Jay offers a good variety of food items and resides at an easily accessibly location. However, " +
            "food is not easily brought outside the dining hall. There are very few packaged items, and most " +
            "unpackaged items are difficult to store (sauces, etc). Since John Jay relies on reusable plates and " +
            "silverware, it may appear rather obvious that you've brought your own container for shopping...",
        "location": "John Jay Hall",
        "containers": ["Reusable plates", "Reusable take-out box"],
        "fruit":["Apples", "Bananas", "Oranges", "Pears", "Assorted"],
        "condiments":["Salt", "Pepper", "Ketchup", "Mustard"],
        "unpackaged":["Bagels", "Muffins", "Pastries", "Cakes", "Vegetables", "Hummus", "Cream cheese"],
        "packaged":["Nutella", "Cookies", "Ice cream", "Syrups"]
    },
    {
        "id": 3,
        "rating": "4/5",
        "name": "JJ's Place",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/JJs%20Location%20Photos/Campus_Services_210.JPG?itok=YkMBrgK_",
        "desc": "Ah yes, my old friend JJ's. Where the food may lack in quality, it definitely makes" +
            " up for in shoppability. All items are easily taken out of the dining hall due to the generous " +
            "availability of disposable plates and containers. That being said, most foods are perishable and not " +
            "packaged, so there is not much long term value. Another half point docked due to a lack of variety.",
        "location": "John Jay Hall",
        "containers": ["Disposable plates", "Disposable bowls", "Disposable take-out box"],
        "fruit":["Apples", "Bananas", "Oranges", "Pears", "Assorted"],
        "condiments":["Salt", "Pepper"],
        "unpackaged":["Celery", "Chips", "Pretzels", "Hummus", "Boiled eggs"],
        "packaged":["Milk", "Ice cream", "Syrups"]
    },
    {
        "id": 4,
        "rating": "2.5/5",
        "name": "Hewitt Dining Hall",
        "image": "https://arc-anglerfish-arc2-prod-spectator.s3.amazonaws.com/public/KUKBVRSO2BB7XG4OGGOMMP7SEI.jpg",
        "desc": "Hewitt arguably one of the best dining halls on campus in terms of food quality and variety. It offers" +
            " many gluten free, kosher, and halal options. However," +
            " it falls rather low on the shoppability scale due to tight restrictions on food storage. No disposable " +
            "containers are provided, not even cups, unless you trade an entire swipe for a small take-out box. The" +
            "packaged food assortment is also very sparse, further reducing shopping potential.",
        "location": "Barnard Hall",
        "containers": ["Reusable plates", "Disposable take-out box"],
        "fruit":["Assorted"],
        "condiments":["Salt", "Pepper"],
        "unpackaged":["Cookies", "Muffins", "Marshmallows", "Candy", "Rice", "Vegetables", "Pasta", "Sliced cheese"],
        "packaged":["Bagels", "Cookies"]
    },
    {
        "id": 5,
        "rating": "1/5",
        "name": "Diana Center Café",
        "image": "https://cloudfront-us-east-1.images.arcpublishing.com/spectator/P2JUV4XKWZD47O6WNCHKHJ6AEY.JPG",
        "desc": "Amazing smoothies and wood-fire pizza. Terrible dining hall policies. A single meal swipe is restricted" +
            " to a meal item, a bottle of water, and a measly fruit or choice of chips. And more than half of the " +
            "other food items in the venue are only available for extra purchase only. The staff is also on rather " +
            "careful observance compared to other dining halls (don't ask how I know). They've even begun to restrict " +
            "using the toppings bar for meal items other than the bowls.",
        "location": "Diana Center",
        "containers": ["Disposable bowls", "Disposable pizza box"],
        "fruit":["Oranges"],
        "condiments":["Salt packets", "Pepper packets"],
        "unpackaged":["Toppings (see above)"],
        "packaged":["Chips", "Water bottle"]
    },
    {
        "id": 6,
        "name": "Chef Mike's Sub Shop",
        "rating": "2/5",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/Chef%20Mike%27s%20Sub%20Shop/Campus_Services_185%20%281%29.JPG?h=f8535d6b&itok=WaSWi7bU",
        "desc": "Chef Mike's makes great sandwiches, with plenty of customization options. However, a meal swipe is " +
            "restricted to one sandwich, a drink, a fruit, and a choice of dessert or chips. There is not great variety" +
            " for any of the choosable sides. That being said... the only reason Chef Mike's receives a higher score" +
            " than say, Diana, is because the staff will mostly look the other way if you take an extra bag of chips" +
            " or two...",
        "location": "Uris Hall",
        "containers": ["Disposable sandwich bag"],
        "fruit":["Apples", "Bananas"],
        "condiments":["N/A"],
        "unpackaged":["Cookies", "Brownies"],
        "packaged":["Chips"]
    },
    {
        "id": 7,
        "name": "Faculty House",
        "rating": "2/5",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/Faculty%20House/IMG_4466.JPG?itok=dRMaCwin",
        "desc": "Faculty House is known for having superb food quality and meals that actually taste like real food. " +
            "However, it seems to be a trend within Columbia Dining that the higher quality food provided, the more " +
            "difficult it becomes to take food out, much less 'grocery shop'. Fac House does have a take-out option, " +
            "but its dine-in uses all reusable plates, so make sure to bring your own. The variety of dine-in options" +
            " is decent, but there are only a few items aside from the meals that can be taken out and realistcally stored.",
        "location": "Faculty House",
        "containers": ["Reusable plates", "Disposable take-out box"],
        "fruit":["Apples"],
        "condiments":["N/A"],
        "unpackaged":["Cookies", "Brownies", "Dessert"],
        "packaged":["Cookies"]
    },
    {
        "id": 8,
        "name": "Grace Dodge Dining Hall",
        "rating": "1/5",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/HeroImages/TC_GDH_hero1.jpg?h=4fe3d9f3&itok=hmEX9sdR",
        "desc": "Grace Dodge is an interesting case of high restrictions on food access AND disappointing food " +
            "quality. The newly implemented system consists of two lines - one for custom salad, one for a ramen bowl. " +
            "Both entail, as part of the meal swipe, an additional small pack of oreos, a fruit, and a cup of water. " +
            "Both are monitored very carefully by the workers in line.",
        "location": "Teacher's College",
        "containers": ["Disposable plates"],
        "fruit":["Apples", "Oranges"],
        "condiments":["N/A"],
        "unpackaged":["Soup," "Cookies"],
        "packaged":["Syrups"]
    },
    {
        "id": 9,
        "name": "Chef Don's Pizza Pi",
        "rating": "1/5",
        "image": "https://dining.columbia.edu/sites/default/files/styles/cu_crop/public/content/Chef%20Don%27s%20Pizza%20Pi/IMG_4547.JPG?h=349ef706&itok=gKLbTdLl",
        "desc": "Chef Don's is similar to the other dining halls that have limited swipes. A single swipe grants you " +
        "one pizza or Cuban sandwich, one fruit, a beverage, and a dessert. The oranges and apples that I've seen at " +
        "Chef Don's are some of the smallest I've seen in my entire life. There is no possibility of 'shopping' beyond" +
        "your meal swipe allotment. The Cuban sandwiches are not bad though.",
        "location": "Mudd",
        "containers": ["Disposable pizza boxes"],
        "fruit":["Apples", "Oranges"],
        "condiments":["N/A"],
        "unpackaged":["Soup," "Pastry", "Milkshake"],
        "packaged":["Drinks", "Salad", "Oatmeal"]
    },
    {
        "id": 10,
        "name": "Café East",
        "rating": "0/5",
        "image": "https://lernerhall.columbia.edu/sites/default/files/content/img/Food/283146754_807181683578722_4471646357625449836_n.jpg",
        "desc": "Cafe East offers delicious Boba tea, smoothies, sushi, and other treats. Though students can use their " +
        "dining dollars and FLEX dollars there, it is very much not a dining hall. Additionally, Barnard students cannot" +
        "use their points at Cafe East. There is zero potential for taking advantage of your meal plan to 'grocery shop' here" +
        "because the cafe is a shop in and of itself - every item is paid for individually.",
        "location": "Lerner Hall",
        "containers": ["N/A"],
        "fruit":["N/A"],
        "condiments":["N/A"],
        "unpackaged":["N/A"],
        "packaged":["Wasabi", "Ginger", "Soy sauce"]

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