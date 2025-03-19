# Dining Hall Shopper!
COMS4170 Midterm - User Interface Design with Professor Chilton

This is a site for Columbia students that want to get the most out of their tuition, one meal swipe at a time. A single meal swipe at a dining hall is a whopping ~$16!
Might as well shop for groceries and save some food for later while you're at it.

## How to use:
Run `server.py` with Python in the terminal, then go to port 5001 to run the webpage: http://127.0.0.1:5001 <br>

This site has 5 main pages which align with the general functions:

* Homepage (route `/`)
  * Accessed via route or by clicking "Shopper" in the navbar from any page
  * Displays three main entries - the highest-rated dining halls for "grocery shopping" potential

* Dining hall pages (route `/view/<id>`)
  * Accessed via route or by clicking a dining hall from the homepage or search page
  * Individual pages for each dining hall. Displays its overall "shoppability" rating in stars and a brief description of the dining hall's potential for
    taking out food of various kinds. Additionally, provides the building location, food containers that are available (so students know whether or not to bring their
    own personal containers), and categories of food items available for taking.
  * It should be noted that the food items listed here do not encompass the full variety of food offered at each respective dining hall, but rather the items that are
    readily available to be taken out. For instance, many of these foods are self-serve or grab-and-go products, not ready-made meals.
  * Edit button for editing dining hall info

* Editing page (route `/edit/<id>`)
  * Accessed via pages for each individual dining hall
  * Page that allows you to edit the information displayed for a specific dining hall
  * Provides inputs boxes for every field, prepopulated with the current data for that dining hall
  * Upon submission, input boxes display error messages if no input is given for required fields (all except the food items, which may remain empty). Error messages are
    also displayed if a non-numerical input is given for "Rating", and if a non-valid URL is given for "Image". Submission does not proceed until errors are remediated.
    * When all inputs are valid, the "Submit" button takes user to the new, updated page for said dining hall.
  * When "Discard" button is pressed, dialog box opens that prompts user to confirm deletion of edits (yes) or continue editing (no). If user chooses yes, they are
    brought back to the dining hall page prior to editing. If no is chosen, the dialog box disappears and the user may continue to make edits.

* Add dining hall page (route `/add`)
  * Accessed by clicking "New!" button on navbar from any page
  * Very similar to the editing page, except fields are blank and not prepopulated with values. Error messages and required fields remain the same.
  * If fields are filled out correctly, pressing the "Submit" button will clear all input fields and add a new line of text at the top that reads "New item successfully
     created. Check it out!", which contains a link to the newly created dining hall page.
  * Successful submission guarantees the addition of a new dining hall entry to the database. This data is saved on the server and will show up in search results
    like any other entry.

* Search page (route `/search_results?query=<query>`)
  * Accessed via the search box on the navbar (any page)
  * Submission of search only carries through if query contains non-whitespace characters
  * If valid query, performs search on matching text substrings within dining hall titles and the four food categories: fruit, condiments, packaged and unpackaged goods.
    Entries that have matches in any of these categories will show up as a search result, with the matching text displayed in **bold green** font.
  * The search result page displays a list of such entries, along with the query submitted and the number of search results. If there are no search results, the page
    reads "No results found."
    

## Implementation:
This project was implemented using Flask with Python for backend, and HTML / CSS with Bootstrap and JavaScript (JQuery) for frontend.

`server.py` was manually populated with ten entries, one each for dining halls across Columbia and Barnard.

The adding and editing of data entries follows the Model-View-Controller design - data changes are manipulated server-side and then sent back to the client 
to be displayed anew.
