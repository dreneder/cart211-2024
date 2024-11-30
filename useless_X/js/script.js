// This function generates a new colour to be applied in CSS
function getRandomColor() {
    const letters = '0123456789abcdef'; // uses only random characters within the HEX range
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // randomly selects a character from the HEX range
    }
    return color;
 }
 
 // cariables for the menus
 let btnEnable = false; // state of the button
 let btnVolPlay = false; // related to "Volume Play" menu
 let btnTxtRead = false; // related to "Text Reader" menu
 let btnImgCrop = false; // related to "Image Cropper" menu
 
 let expRandomColor; // stores the exported random color for external usage
 
 // Execute the colour change as soon as the page loads
 window.onload = function() {
     // Import the style sheets
     let styleSheets = document.styleSheets; // collects all available stylesheets
 
     const randomColor = getRandomColor(); // constant that activates the function
     
     expRandomColor = randomColor; // assigns the generated random color
 
     // Loops each stylesheet
     for (let i = 0; i < styleSheets.length; i++) {
         let rules = styleSheets[i].cssRules; // use 'cssRules' for modifying CSS dynamically
     
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
                 // Modify button classes for dynamic color
                 if (rules[j].selectorText === '.login_button' ||
                     rules[j].selectorText === '.primary_btn'
                 ) {
                     rules[j].style.backgroundColor = randomColor;
                     rules[j].style.borderColor = randomColor;
                 }
                 // Update hover effects dynamically
                 if (rules[j].selectorText === '.login_button:hover' ||
                     rules[j].selectorText === '.primary_btn:hover') {
                         rules[j].style.backgroundColor = '#ffffff'; // Keeps hover background white
                         rules[j].style.color = randomColor; // Hover text changes to the random color
                         rules[j].style.borderColor = randomColor;
                 }
                 // Update knobCircle background color
                 if (rules[j].selectorText === '.knobCircle') {
                     rules[j].style.backgroundColor = randomColor;
                 }
                 // All this is to modify the "Go" button in the menu
                 setInterval(() => {
                     if (rules[j].selectorText === '.cat_btn') {
                         if (btnEnable) {
                             rules[j].style.backgroundColor = randomColor;
                             rules[j].style.borderColor = randomColor;
                         } else {
                             rules[j].style.backgroundColor = "#707070";
                             rules[j].style.borderColor = "#707070"; 
                         }
                     }
                     if (rules[j].selectorText === '.cat_btn:hover') {
                         if (btnEnable) {
                             rules[j].style.backgroundColor = "#ffffff";
                             rules[j].style.color = randomColor;
                             rules[j].style.borderColor = randomColor;
                         } else {
                             rules[j].style.backgroundColor = "#707070";
                             rules[j].style.borderColor = "#707070"; 
                             rules[j].style.color = "#ffffff"; 
                         }
                     }
                 }, 100); // Updates styles every 100ms
             }
         }
     }
 };
     
 // Preload function to load JSON
 function preloadJSON(url) { // Loads JSON data dynamically from a given URL
     return fetch(url) // Fetch API for asynchronous loading
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok'); // Error handling for network issues
             }
             return response.json(); // Parse the response as JSON
         })
         .catch(error => {
             console.error('Error fetching JSON:', error);
             return []; // Return an empty array on error
         });
 }
 
 // Function to populate the select element
 function populateSelect(names) {
     const select = document.getElementById('name-select'); // Find the select element by ID
     names.forEach(name => {
         const option = document.createElement('option'); // Create a new option element
         option.value = name; // Set its value to the name
         option.textContent = name; // Set the display text to the name
         select.appendChild(option); // Append the option to the select element
     });
 }
 
 // Main function to load data and populate the select
 function init() {
     preloadJSON('assets/data/names.json') // Path to JSON file
         .then(names => {
             populateSelect(names); // Populate select with fetched names
         });
 }
 
 // Initialize the loading process
 init(); // Starts the process of fetching and populating data
 
 function switchDisplay(checkbox) {
     if (checkbox.checked === true) {
         document.getElementById('last-name-switch').style.display = "inline"; // Show the last name switch
     } else {
         document.getElementById('last-name-switch').style.display = "none"; // Hide the last name switch
     }
 }
 
 // uses today's date and the first day of the year one and outputs day month and year
 document.addEventListener("DOMContentLoaded", function() {
     const today = new Date(); // Current date
     const currentYear = today.getFullYear(); // Extracts the current year
     const currentMonth = today.getMonth(); // Extracts the current month
     const currentDay = today.getDate(); // Extracts the current day
 
     const startDate = new Date(50, 0, 1); // January 1, year 1
 
     const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)); // Days since the start date
 
     const dateSlider = document.getElementById("dateSlider"); // Date slider for selecting days
     dateSlider.max = totalDays; // Sets the slider's maximum value
     dateSlider.value = totalDays; // Default slider value set to today's date
 
     function updateDate() {
         const daysFromStart = dateSlider.value; // Get the selected days from slider
 
         const selectedDate = new Date(startDate.getTime() + daysFromStart * (1000 * 60 * 60 * 24)); // Calculate the selected date
 
         // Extract date details
         const year = selectedDate.getFullYear();
         const month = selectedDate.getMonth() + 1; // Months are 0-based, so add 1
         const day = selectedDate.getDate();
 
         // Format the date for display
         const formattedDate = `${String(day).padStart(2, '0')} / ${getMonthName(month)} / ${year}`;
         document.getElementById("dateValue").textContent = formattedDate; // Update date display
 
         // Print the dateValue to the console
         console.log(`Selected Date: ${formattedDate}`);
     }
 
     // Get month name string
     function getMonthName(month) {
         const monthNames = ["January", "February", "March", "April", "May", "June",
                             "July", "August", "September", "October", "November", "December"];
         return monthNames[month - 1];
     }
 
     updateDate(); // Set the initial date display
 
     // Add the input event listener for the slider
     dateSlider.addEventListener("input", updateDate);
 });
 
 // Enables the Go button
 let goBtn = document.getElementById("cat_btn");
 // goBtn.disabled = true; // Uncomment to disable by default
 
 // Validate password input and update requirements display
 function validatePassword() {
     const password = document.getElementById('password').value;
     const emailUser = document.getElementById('email-user').value;
     const requirements = document.getElementById('password-requirements');
     const nextButton = document.getElementById('next-btn');
 
     const lengthValid = password.length >= 10; // Check password length
     const uppercaseValid = /[A-Z]/.test(password); // Check for uppercase letters
     const numeralValid = /\d/.test(password); // Check for numbers
     const emailLetterValid = emailUser.split('').some(char => password.includes(char)); // Check for email letters
     const cyrillicValid = /[А-Яа-яЁё]/.test(password); // Optional Cyrillic character check
 
     if (lengthValid && uppercaseValid && numeralValid && emailLetterValid) {
         let message = '';
         if (!cyrillicValid) message += '<br>Password can include at least 1 Cyrillic character.';
         requirements.innerHTML = message;
         requirements.style.color = "#707070"; // Requirements message in neutral color
         nextButton.disabled = false; // Enable the next button
     } else {
         let message = '';
         if (!lengthValid) message += '<br>Password must have at least 10 characters.';
         if (!uppercaseValid) message += '<br>Password must include at least 1 uppercase letter.';
         if (!numeralValid) message += '<br>Password must include at least 1 number.';
         if (!emailLetterValid) message += '<br>Password must include at least 1 letter from your email.';
         requirements.innerHTML = message;
         requirements.style.color = '#707070'; // Display errors in neutral color
         nextButton.disabled = true; // Disable the next button
     }
 }
 
 // Add event listener for password validation on input
 document.addEventListener('DOMContentLoaded', function () {
     document.getElementById('password').addEventListener('input', validatePassword);
 });
 
 // Functions to toggle visibility of different login forms
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
 