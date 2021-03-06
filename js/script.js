/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
// There is only one studentlist ul on the page so I immediately select the first item in the htmlcollection
const mainStudentsList = document.getElementsByClassName('student-list')[0];
// get all student items from the whole student list
const allStudents = mainStudentsList.querySelectorAll('.student-item');
// I set a number for the first page which will be updated when the user clicks an pagination link
let selectedPaginationNumber = 1;
// this is the number of items we want to show per page
const showStudentsPerPage = 10;

// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
// In order to know the range of student items I need to show I created this function
const showStudentRange = () => {
    // the lowest index number needed is the selected page number minus 1
    // then multiplied by the amount of students per gage
    // e.g.: for page 1 this will be (1 -1) * 10 = 0, for page 2 (2 -1) * 10 = 10 etc.
    let lowestRange = (selectedPaginationNumber - 1 ) * showStudentsPerPage;
    // the highest index number need is the selected page multiplied by the amount of students per page
    // e.g: for page 1: 1 * 10 = 10, page page 2: 2 * 10 = 10;
    let highestRange = selectedPaginationNumber * showStudentsPerPage;
    // return these values as an object
    return {
        lowestRange,
        highestRange
    }
};

function hideStudentItems() {
    // get the range we DO need to show
    const range = showStudentRange();

    // loop over all students
    for(let i = 0; i < allStudents.length; i += 1) {
        // if the range loop is between the range do nothing
        if (i >= range.lowestRange && i < range.highestRange) {
            // I should show hidden students when a pagination link is clicked
            allStudents[i].style.display = 'block';
        //    else hide the students not in this range
        } else {
            allStudents[i].style.display = 'none';
        }
    }
}
// call itself to hide items on page load
hideStudentItems();

// I remembered this function from the course
// It is for creating elements
// with an object I can send more values so I send an object instead of strings
function createElement(elementName, attributeObject) {
    const element = document.createElement(elementName);

    if (attributeObject) {
        Object.keys(attributeObject).forEach(function(item) {
            element[item] = attributeObject[item];
        })
    }

    return element;
}

// Create and append the pagination links - Creating a function that can do this is a good approach
function createPaginationLinks() {
    // get the number of students in the list
    const numberOfStudents = allStudents.length;
    // decide how many pages there should be
    // if there are 12 students there should be 2 pages
    // So I looked up the math method that rounds up on mdn, divided the number of students by
    // the number of students per page which rounded up should give the total pages needed
    const numberOfPaginationItems = Math.ceil(numberOfStudents/showStudentsPerPage);

    //I looked in the example html and knew I had to build the following structure
    const paginationWrapper = createElement('div', {className: 'pagination'});

    const paginationList = createElement('ul');
    paginationList.addEventListener('click', changePage);

    // create list items with an anchor tag, with href attribute and an '#' as value
    // set the textContent of the anchor tag with the number of the page
    // if the number of the page equals the number of the selected page set its class to active
    // append the build up anchor tag to the li and append the li to the ul
     for (let i = 0; i < numberOfPaginationItems; i += 1) {
        let pageNumber = i + 1;
        const paginationListItem = createElement('li');

        const paginationLinkItem = createElement('a', {textContent: pageNumber});
        paginationLinkItem.setAttribute('href', '#');

        if (pageNumber === selectedPaginationNumber) {
            paginationLinkItem.className = 'active';
        }

        paginationListItem.appendChild(paginationLinkItem);
        paginationList.appendChild(paginationListItem);
    }

    // When the loop is done append the paginationList (ul), to the paginationWrapper (div)
    paginationWrapper.appendChild(paginationList);

    // I knew I had to use insertBefore() but not how
    // So I used this top answer: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
    mainStudentsList.parentNode.insertBefore(paginationWrapper, mainStudentsList.nextSibling);
}
// call itself to create pagination links on page load
if (allStudents.length > 10) {
    createPaginationLinks();
}

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
// because I need an click event listener I added a event in the createPaginationLinks function
// this event triggers this function
function changePage(e) {
    // on click prevent default behaviour
    e.preventDefault();
    // store the pagination element (there is only 1 so I select it immediately)
    const paginationElement = document.getElementsByClassName('pagination')[0];
    // get all the anchor tags within the paginationElement
    const anchorTagElements = paginationElement.getElementsByTagName('A');

    // loop over all anchor tags to remove the classes
    for(let i = 0; i < anchorTagElements.length; i += 1) {
        anchorTagElements[i].className = '';
    }

    // set selectedPagination number to the textContent of the clicked paginationLink
    selectedPaginationNumber = e.target.textContent;
    // give the clicked item a class of 'active'
    e.target.className = 'active';
    // call hideStudentItems to show the correct students
    hideStudentItems();
}

// MAKE search functionality
function removeError() {
    // check if there is an error element, if so remove it
    const isError = document.getElementById('search-error');
    if (isError) {
        isError.parentNode.removeChild(isError);
    }
}

function removeNoResult() {
    // check if there is an no-result element, if so remove it
    const isNoresult = document.getElementById('no-search-result');
    if (isNoresult) {
        isNoresult.parentNode.removeChild(isNoresult);
    }
}

function searchStudent(searchValue) {
    // get all h3 elements as that holds the students name
    const allStudentNameElements = document.querySelectorAll('h3');
    // set found student to false
    let foundStudent = false;
    // reset error and no result message
    removeError();
    removeNoResult();

    // loop over all the h3 elements
    for (let i = 0; i < allStudentNameElements.length; i += 1) {
        // I used the match method as I know it will match any text input with the name and return true or false
        if (allStudentNameElements[i].textContent.match(searchValue)) {
            // if the search exists of only 1 letter I made this function show only all the names that begin with that letter
            if (searchValue.length === 1) {
                // the index key of match holds a value, that value is the index on which it found the letter
                let matchIndex = allStudentNameElements[i].textContent.match(searchValue).index;
                // if index is 0 it is the first letter it matched with
                if (matchIndex === 0) {
                    // found a match so found the student > true
                    foundStudent = true;
                    // select the ancestor of this h3
                    const ancestor = allStudentNameElements[i].parentNode.parentNode;
                    // show it
                    ancestor.style.display = 'block';
                } else {
                    // this element should not be shown as it is no match
                    const ancestor = allStudentNameElements[i].parentNode.parentNode;
                    ancestor.style.display = 'none';
                }
            } else {
                // if the searchvalues length is more than 1 it is a match on more letters in the same order
                // found a match so found the student > true
                foundStudent = true;
                // select the ancestor of this h3
                const ancestor = allStudentNameElements[i].parentNode.parentNode;
                // show it
                ancestor.style.display = 'block';
            }
        } else {
            // this element should not be shown as it is no match
            const ancestor = allStudentNameElements[i].parentNode.parentNode;
            ancestor.style.display = 'none';
        }
    }

    // if foundStudent is still false show that there is no student found
    if (!foundStudent) {
        const noSearchResult = createElement('span', {
            textContent: 'No Student found',
            id: 'no-search-result'
        });

        mainStudentsList.appendChild(noSearchResult);
    }
}

// First check if the submitted value is correct else show an error
function submitSearch(e) {
    // I logged the event and saw that I can reach the input element with: e.target[0], as the input element is first in the target array
    const searchValue = e.target[0].value;
    e.target[0].value = '';
    if (searchValue === '' || !isNaN(searchValue)) {
        const errorSpan = createElement('span', {
            textContent: 'You did not give a name',
            id: 'search-error'
        });
        errorSpan.style.color = '#f00';
        errorSpan.style.position = 'absolute';
        errorSpan.style.margin = '-20px -245px';

        e.target.appendChild(errorSpan);
    } else {
        // hide pagination
        document.getElementsByClassName('pagination')[0].style.display = 'none';
        // call the search function with the search value
        searchStudent(searchValue);
    }
}

// When called reset the page to last pagination result
function resetSearch() {
    removeError();
    removeNoResult();

    // call the hideStudentItems function the determine which item has to be displayed
    hideStudentItems();
    // show pagination again
    document.getElementsByClassName('pagination')[0].style.display = 'block';
}

// I looked in the exceeds example and I have to build this:
<!-- student search HTML to add dynamically -->
// <div class="student-search">
//     <input placeholder="Search for students...">
//     <button>Search</button>
// </div>
<!-- end search -->
function createSearch() {
    const pageHeader = document.getElementsByClassName('page-header')[0];
    // Start create elements
    const searchDiv = createElement('div', {className: 'student-search'});

    // I wanted a form element so user can submit on enter and click
    const form = createElement('form', {id: 'search-form'});

    const searchInput = createElement('input', {placeholder: 'Search for students...'});

    const searchBtn = createElement('button', {
        textContent: 'Search',
        type: 'submit'
    });

    // the reset button cannot be of type submit, else it will trigger a form submit
    // so I set it's type specifically to button and gave it it's own eventlistener below
    const resetBtn = createElement('button', {
        textContent: 'Reset',
        id: 'reset-btn',
        type: 'button'
    });
    resetBtn.style.display = 'none';
    // End create elements

    // add eventlistener for form submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        removeError();
        // I pass the event object as I need it in the next function
        submitSearch(event);
        document.getElementById('reset-btn').style.display = 'inline-block';
    });

    // add an eventlistener to the reset button
    resetBtn.addEventListener('click', () => {
        resetSearch();
        document.getElementById('reset-btn').style.display = 'none';
    });

    // append children to build the dom item
    form.appendChild(searchInput);
    form.appendChild(searchBtn);
    form.appendChild(resetBtn);
    searchDiv.appendChild(form);

    // append the build to the dom
    pageHeader.appendChild(searchDiv);
}
// call itself to add search on page load
createSearch();