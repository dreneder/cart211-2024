// This function generates a new colour to be applied in CSS
function getRandomColor() {
   const letters = '0123456789abcdef'; // uses only random characters within the HEX range
   let color = '#';
   for (let i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}

//cariables for the menus
let btnEnable = false;
let btnVolPlay = false;
let btnTxtRead = false;
let btnImgCrop = false;

let expRandomColor;

// Execute the colour change as soon as the page loads
window.onload = function() {
    // Import the style sheets
    let styleSheets = document.styleSheets;
    
    const randomColor = getRandomColor(); // constant that activates the function
    
    expRandomColor = randomColor;

    // Loops each stylesheet
    for (let i = 0; i < styleSheets.length; i++) {
        let rules = styleSheets[i].cssRules; // use 'cssRules'
    
        // Check if the stylesheet contains rules
        if (rules) {
            // Loop through each rule within the stylesheet
            for (let j = 0; j < rules.length; j++) {
                // Find the rule for the class '.fun_color'
                if (rules[j].selectorText === '.fun_color' ||
                    rules[j].selectorText === 'a'
                ) {
                    // Modify the color property of that class with a random color
                    rules[j].style.color = randomColor;
                }
                // Find and modify the button1 class
                if (rules[j].selectorText === '.login_button' ||
                    rules[j].selectorText === '.primary_btn'
                ) {
                    rules[j].style.backgroundColor = randomColor;
                    rules[j].style.borderColor = randomColor;
                }
                // Find and modify the button1:hover state
                if (rules[j].selectorText === '.login_button:hover' ||
                    rules[j].selectorText === '.primary_btn:hover') {
                        rules[j].style.backgroundColor = '#ffffff'; // Keeping the hover background color white
                        rules[j].style.color = randomColor; // Change hover text color to random color
                        rules[j].style.borderColor = randomColor; // Change hover border color to random color
                    }
                // Find and modify the knobCircle class
                if (rules[j].selectorText === '.knobCircle') {
                            rules[j].style.backgroundColor = randomColor;
                }
                // all this is to modify the "Go" button in the menu
                setInterval(() => {
                    if (rules[j].selectorText === '.cat_btn') {
                        if (btnEnable) {
                            rules[j].style.backgroundColor = randomColor;
                            rules[j].style.borderColor = randomColor;
                        }
                        else {
                            rules[j].style.backgroundColor = "#707070";
                            rules[j].style.borderColor = "#707070"; 
                        }
                    }
                    if (rules[j].selectorText === '.cat_btn:hover') {
                        if (btnEnable) {
                            rules[j].style.backgroundColor = "#ffffff";
                            rules[j].style.color = randomColor;
                            rules[j].style.borderColor = randomColor;
                        }
                        else {
                            rules[j].style.backgroundColor = "#707070";
                            rules[j].style.borderColor = "#707070"; 
                            rules[j].style.color = "#ffffff"; 
                        }
                    }
                }, 100);

            }
        }
    }
};
    
// Preload function to load JSON
function preloadJSON(url) { // Corrected parameter definition
    return fetch(url) // Use the parameter 'url' here
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            return []; // Return an empty array on error
        });
}

// Function to populate the select element
function populateSelect(names) {
    const select = document.getElementById('name-select');
    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}

// Main function to load data and populate the select
function init() {
    preloadJSON('assets/data/names.json') // Make sure this path is correct
        .then(names => {
            populateSelect(names);
        });
}

// Initialize the loading process
init();


function switchDisplay(checkbox)
{
   if( checkbox.checked === true )
   {
      document.getElementById('last-name-switch').style.display = "inline";
    }
    else
    {
      document.getElementById('last-name-switch').style.display = "none";
      
   }
}

// uses today's date and the first day of the year one and outputs day month and year
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const startDate = new Date(1, 0, 1); // January 1, year 1

    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    const dateSlider = document.getElementById("dateSlider");
    dateSlider.max = totalDays;
    dateSlider.value = totalDays; // Set to today's date

    function updateDate() {
        const daysFromStart = dateSlider.value;

        const selectedDate = new Date(startDate.getTime() + daysFromStart * (1000 * 60 * 60 * 24));

        // updates date display
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // Months are 0-based, so we add 1
        const day = selectedDate.getDate();

        // display
        const formattedDate = `${String(day).padStart(2, '0')} / ${getMonthName(month)} / ${year}`;
        document.getElementById("dateValue").textContent = formattedDate;
        // document.getElementById("selectedDate").textContent = `${getMonthName(month)} ${day}, ${year}`;

        // Print the dateValue to the console
        console.log(`Selected Date: ${formattedDate}`);
    }

    // month name string
    function getMonthName(month) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        return monthNames[month - 1];
    }

    updateDate();

    // Add the input event listener for the slider
    dateSlider.addEventListener("input", updateDate);
});

//enables the Go button


let goBtn = document.getElementById("cat_btn");
// goBtn.disabled = true;
