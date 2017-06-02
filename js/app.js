// Global Variables

var showPerPage = 10;
var roster = $('li.student-item');
	

//functions

//Function creates page links, calls showPage function
function appendPageLinks(studentList) {
	//defines number of students
	var numberOfStudents = studentList.length;
	//calculates how many pages are needed and rounds up 
	var numberOfPages = Math.ceil(numberOfStudents / showPerPage);
	//if number of students is greater than showPerPage then create page links
	if (numberOfStudents > showPerPage) {
		//appends a pagination div to the end of the opening div tag
		$('.page').append("<div class='pagination'><ul></ul></div>");
		//creates a link per page needed
		for (let i = 1; i <= numberOfPages; i += 1) {
			$('.pagination ul').append("<li><a href='#'>" + i + "</a></li>");
		}
		//activates link on first page
		$('.pagination a:eq(0)').addClass('active');
		//dispays the first 10 students
		showPage(0, studentList);
		//calls the list of students associated with each page number
		initPaginationClick(studentList);
	}
 }
//clears page links when not needed
 function removePagination() {
 	$('.pagination').remove();
 }

//Activates page links and displays associated students
 function initPaginationClick(studentList) {
	$('a').on('click', function (event) {
			//prevents default browser click reaction
			event.preventDefault();
			//deselects the currently active page
			$('.active').removeClass();
			//obtains the page number clicked
			var pageNumberClicked = $(this).text() - 1;
			//calls showPage with the chosen page number and the specified roster
			showPage( pageNumberClicked, studentList);
			//activates page link of newly selected page
			$(this).addClass('active');
		});
 }

 //Activates search button
 function initSearch() {
 	//selects button and defines what happens on click
 	$('.student-search').find('button').click(function(e) {
 		//prevents default browser click reaction 
 		e.preventDefault();
 		// clears page links and any previous search results
 		clearMessages();
 		removePagination();
 		//calls search function
 		searchList(roster);
 		//clears any text in input box
 		$('.student-search').find('input').val('');
 	});
 }

//divides student roster onto appropriate pages
function showPage(page_number, studentList) {
	//hides entire roster
	$(studentList).hide();
	//defines start and end values for slice()
	var start = page_number * showPerPage;
	var end = start + showPerPage;
	//cycles through roster and divides students onto assigned pages
	for( let i = 0; i < studentList.length; i ++ ) {
		$(studentList).slice(start, end).show();
	}
}

//Creates a link to display all students after a search is completed
function initShowAll() {
	//creates Show all link
	var html = '<a href="#" class="show-all">Show All</a>';
	//adds it to the top of the student list div
	$('.student-list').prepend(html);
	//calls the page link function and removes the show all link when clicked
	$('.show-all').click(function(e) {
		appendPageLinks(roster);
		removeShowAllLink();	
	});
}
//removes show all button
function removeShowAllLink() {
	$('.show-all').remove();
}

function searchList(studentList) {
	//clears any previous show all buttons
	removeShowAllLink();
	//grabs the value of the input bar
	var searchValue = $('input').val();
	//calls Show all link to see full class roster
	initShowAll();
	// if the user didn't enter a value at all then display message requesting input
	if (searchValue === '' || searchValue === ' ' ) {
		hideRoster();
		$('.page').append('<h3 class="message">You must enter a value into the search field.</h3>');
		return;
	} 	//otherwise
		else {
		//clear pagination links and hide roster
		removePagination();
		hideRoster();
		//filter through student profiles and search for the input value then display info
		$('.student-item').filter( ':contains(' + searchValue + ')').show();

		// if there are results, show pagination
		if ($('li.student-item:visible').length > 0) {
			appendPageLinks($('li.student-item:visible'));
		} // otherwise, we couldn't find anything
		else {
			hideRoster();
			$('.page').append('<h3 class="message">There were no search results found.</h3>');
		}
	}
}
//hides student list
function hideRoster() {
	$('.student-item').hide();
}	

//removes search result messages from display
function clearMessages() {
	$('.message').remove();
}

//Search Bar Input and Button
$('.page-header').append("<div class='student-search'><input type='text' placeholder='Search for Students'></input><button name='button'>Search</button></div>");

//calls Search Button to action
initSearch();
//calls page links and passes in specified class list
appendPageLinks(roster);


