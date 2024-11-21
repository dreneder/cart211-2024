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

    const startDate = new Date(50, 0, 1); // January 1, year 1

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


function validatePassword() {
    const password = document.getElementById('password').value;
    const emailUser = document.getElementById('email-user').value;
    const requirements = document.getElementById('password-requirements');
    const nextButton = document.getElementById('next-btn');

    const lengthValid = password.length >= 10;
    const uppercaseValid = /[A-Z]/.test(password);
    const numeralValid = /\d/.test(password);
    const emailLetterValid = emailUser.split('').some(char => password.includes(char));
    const cyrillicValid = /[А-Яа-яЁё]/.test(password); // Optional check

    if (lengthValid && uppercaseValid && numeralValid && emailLetterValid) {
        let message = '';
        if (!cyrillicValid) message += '<br>Password can include at least 1 Cyrillic character.';
        requirements.innerHTML = message;
        requirements.style.color = "#707070";
        nextButton.disabled = false;
    } else {
        let message = '';
        if (!lengthValid) message += '<br>Password must have at least 10 characters.';
        if (!uppercaseValid) message += '<br>Password must include at least 1 uppercase letter.';
        if (!numeralValid) message += '<br>Password must include at least 1 number.';
        if (!emailLetterValid) message += '<br>Password must include at least 1 letter from your email.';
        requirements.innerHTML = message;
        requirements.style.color = '#707070';
        nextButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('password').addEventListener('input', validatePassword);
});

function openForm1() {
    document.getElementById("login_pop_1").style.display = "block";
  }
  
  function closeForm1() {
    document.getElementById("login_pop_1").style.display = "none";
  }
function openForm2() {
    document.getElementById("login_pop_2").style.display = "block";
    document.getElementById("login_pop_1").style.display = "none";
  }
  
  function closeForm2() {
    document.getElementById("login_pop_2").style.display = "none";
  }
function openForm3() {
    document.getElementById("login_pop_3").style.display = "block";
    document.getElementById("login_pop_1").style.display = "none";
    document.getElementById("login_pop_2").style.display = "none";
  }
  
  function closeForm3() {
    document.getElementById("login_pop_3").style.display = "none";
  }
function openForm4() {
    document.getElementById("login_pop_4").style.display = "block";
    document.getElementById("login_pop_1").style.display = "none";
    document.getElementById("login_pop_2").style.display = "none";
    document.getElementById("login_pop_3").style.display = "none";
  }
  
  function closeForm4() {
    document.getElementById("login_pop_4").style.display = "none";
  }
function openForm5() {
    document.getElementById("login_pop_5").style.display = "block";
    document.getElementById("login_pop_2").style.display = "none";
    document.getElementById("login_pop_3").style.display = "none";
    document.getElementById("login_pop_4").style.display = "none";
  }
  
  function closeForm5() {
    document.getElementById("login_pop_5").style.display = "none";
  }