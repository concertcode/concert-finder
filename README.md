# codeapp
## **Concert Finder Concept**

Develop a web application for end users to search for a concert of a specific artist and provide directions to concert results.  The application allows for the end user to specify the search radius and display a Google Map with directions using multiple transit options.

### Concert Finder Functionality
* Artist result image to confirm artist search
	* Returns matched band name to confirm artist is intended search parameter
	* Will return no image result if nothing available or misspelled
* Concert results provided in a table up to 15 results and no limit on future date. 
	* Results include artist name, city, venue, date and map button
	* Results limited to radius selected by end user
* The map button will use venue address and end users current location (if accepted by end user) to provide directions
* Map provides transit options- driving, walking, bicycle or transit
* Display number of simultaneous concert searchers (stored in Firebase)
