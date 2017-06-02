// Global Variables

var showPerPage = 10;
var pageTracker = [];
var roster = document.querySelectorAll('li.student-item');
	

//functions

//Creates HTML for page links, calls showPage function
function appendPageLinks(studentList) {
	//determines the number of students on the roster
	var numberOfStudents = studentList.length;
	//calculates how many pages are needed by dividing the number of students
	// by the number of students displayed per page and rounds up 
	var numberOfPages = Math.ceil(numberOfStudents / showPerPage);
	//creates an array to keep track of number of pages
	for( let i=0; i < numberOfPages; i+=1) {
	pageTracker.push(i);
}	
	//if number of students is greater than showPerPage then create page links
	if (numberOfStudents > showPerPage) {
		//appends a pagination div to the end of the opening div tag
		$('.page').append("<div class='pagination'><ul></ul></div>");
		//cycles through how many pages are needed and creates a link per page
		for (let i = 0; i < pageTracker.length; i += 1) {
			$('.pagination ul').append("<li><a href='#'>" + (i + 1) + "</a></li>");
		}
		//adds an active class to the first display page
		$('.pagination a:eq(0)').addClass('active');
		//calls the first 10 student profiles to be displayed with the specified roster
		showPage(0, studentList);
		//calls a page of corresponding students to be displayed when the page link is clicked
		$('a').on('click', function () {
			//removes the active class from the currently active page
			$('.active').removeClass();
			//obtains the page number clicked
			var x = $(this).text() - 1;
			//calls showPage with the page number clicked and the specified roster
			showPage( x, studentList);
			//adds an active class to the clicked page number
			$(this).addClass('active');
		});
	}
 }


function showPage(page_number, studentList) {
	$(studentList).css('display', 'none');
	var start = page_number * showPerPage;
	var end = start + showPerPage;
	for( let i = 0; i < studentList.length; i += 1 ) {
		$(studentList).slice(start, end).css('display', 'block');
	}
}

appendPageLinks(roster);


