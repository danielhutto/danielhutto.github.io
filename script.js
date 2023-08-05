function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear previous error messages
    var errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function(message) {
    message.textContent = "";
    });

    // Validate and sanitize user input
    var nameInput = document.getElementById("entry.1142062888");
    var emailInput = document.getElementById("entry.1075258341");
    var messageInput = document.getElementById("entry.1091277242");

    var name = sanitizeInput(nameInput.value);
    var email = sanitizeInput(emailInput.value);
    var message = sanitizeInput(messageInput.value);

    var isValid = true;

    // Validate name field
    if (name.trim() === "") {
    document.getElementById("name-error").textContent = "Please enter your name";
    isValid = false;
    }

    // Validate email field
    if (!isValidEmail(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address";
    isValid = false;
    }

    // Validate message field
    if (message.trim() === "") {
    document.getElementById("message-error").textContent = "Please enter a message";
    isValid = false;
    }

    if (!isValid) {
    return; // Stop form submission if any field is invalid
    }

    // Prepare the form data
    var formData = new FormData(document.getElementById("gform"));
    //var formData = new FormData();
    //formData.append("entry.1142062888", yourName);
    //formData.append("entry.1075258341", email);
    //formData.append("entry.1091277242", message);

    // Submit the form
    fetch("https://docs.google.com/forms/d/e/1FAIpQLSe8AklSyZodgcTdu2oX_1BbOlUssvt-OZPxoI5vL9rK9DWwHA/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors"
    })
    .then(data => {
        console.log("Form data:", formData); // Log the form data to the console
        console.log("Response data:", data); // Log the response data to the console

        document.getElementById("form-container").style.display = "none";
        document.getElementById("success-message").style.display = "block";
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Add an event listener to the form submit button
document.getElementById("submit").addEventListener("click", submitForm);

// Sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
    // Remove leading and trailing whitespace
    var sanitizedInput = input.trim();

    // Replace certain characters with their HTML entity equivalents
    sanitizedInput = sanitizedInput.replace(/&/g, "&amp;");
    sanitizedInput = sanitizedInput.replace(/</g, "&lt;");
    sanitizedInput = sanitizedInput.replace(/>/g, "&gt;");
    sanitizedInput = sanitizedInput.replace(/"/g, "&quot;");
    sanitizedInput = sanitizedInput.replace(/'/g, "&#x27;");
    sanitizedInput = sanitizedInput.replace(/\//g, "&#x2F;");

    return sanitizedInput;
}

// Check if the email is valid using a regular expression
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Get all the navigation items
const navItems = document.querySelectorAll('.navItem');

// Function to remove the active class from a navigation item
function removeActiveClass(navItem) {
  navItem.classList.remove('active');
}

// Add click event listener to each navigation item
navItems.forEach((navItem) => {
  navItem.addEventListener('click', function() {
    // Remove the active class from all navigation items
    navItems.forEach((item) => {
      item.classList.remove('active');
    });

    // Add the active class to the clicked navigation item
    this.classList.add('active');

    // Remove the active class after 2 seconds (adjust the delay as needed)
    setTimeout(() => {
      removeActiveClass(this);
    }, 1000);
  });
});

