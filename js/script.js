/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
// There is only one studentlist ul on the page so I emidiately select the first item in the htmlcollection
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
    const lowestRange = (selectedPaginationNumber - 1 ) * showStudentsPerPage;
    // the highest index number need is the selected page multiplied by the amount of students per page
    // e.g: for page 1: 1 * 10 = 10, page page 2: 2 * 10 = 10;
    const highestRange = selectedPaginationNumber * showStudentsPerPage;
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
        //    do nothing actually TODO: refactor into only IF statement
        //    else hide the students not in this range
        } else {
            allStudents[i].style.display = 'none';
        }
    }
}
hideStudentItems();



// Create and append the pagination links - Creating a function that can do this is a good approach
function createPaginationLinks() {
    const numberOfStudents = allStudents.length;
    const numberOfPaginationItems = Math.ceil(numberOfStudents/showStudentsPerPage);
    //I looked in the example html and knew I had to build the following structure
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'pagination';
    const paginationList = document.createElement('ul');

    for(let i = 0; i < numberOfPaginationItems; i += 1) {
        const paginationListItem = document.createElement('li');
        const paginationLinkItem = document.createElement('a');

        paginationLinkItem.setAttribute('href', '#');
        paginationLinkItem.textContent = (i + 1);
        if((i + 1) === selectedPaginationNumber) {
            paginationLinkItem.className = 'active';
        }

        paginationListItem.appendChild(paginationLinkItem);
        paginationList.appendChild(paginationListItem);
    }

    paginationWrapper.appendChild(paginationList);

    console.log(paginationWrapper);

// <div class="pagination">
//         <ul>
//         <li>
//         <a class="active" href="#">1</a>
//         </li>
}

createPaginationLinks();

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here






