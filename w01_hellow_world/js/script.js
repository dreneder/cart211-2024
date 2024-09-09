    
     document.addEventListener('DOMContentLoaded', function() {
        const mainHeading = document.getElementById("heading01");
    
            let str = mainHeading.textContent;
            let chars = str.split ("");
            let result = '';
            for (let i = 0; i < chars.length; i++) {
                if (i % 2 === 0) {
                    result += '<span class="colr1">' + chars[i] + '</span>';
                } else {
                    result += '<span class="colr2">' + chars[i] + '</span>';
                }
            }

            mainHeading.innerHTML = result;
        });