<?php
// Define your email address
$myemail = "daniel.hutto.tx@gmail.com";

// Initialize an empty array for errors
$errors = array();

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form data
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  // Validate the form data
  if (empty($name)) {
    $errors[] = "Name is required";
  }
  if (empty($email)) {
    $errors[] = "Email is required";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email is invalid";
  }
  if (empty($message)) {
    $errors[] = "Message is required";
  }

  // Check if there are no errors
  if (empty($errors)) {
    // Prepare the email headers and body
    $to = $myemail;
    $subject = "Contact form submission from $name";
    $body = "You have received a new message from $name ($email).\n\n$message";
    $headers = "From: $myemail\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email using mail() function
    if (mail($to, $subject, $body, $headers)) {
      // Redirect to a thank you page or display a success message
      header("Location: thank_you.html");
      exit();
    } else {
      // Display an error message if mail() fails
      echo "Something went wrong. Please try again later.";
    }
  } else {
    // Display the errors if there are any
    foreach ($errors as $error) {
      echo "<p>$error</p>";
    }
  }
}



/*
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form fields and remove whitespace
  $name = trim($_POST["name"]);
  $email = trim($_POST["email"]);
  $message = trim($_POST["message"]);

  // Check for empty fields
  if (empty($name) || empty($email) || empty($message)) {
    echo "Please fill out all the fields.";
    exit;
  }

  // Set the recipient email address
  $to = "daniel.hutto.tx@gmail.com";

  // Set the email subject
  $subject = "New contact form submission from $name";

  // Build the email content
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Message:\n$message\n";

  // Build the email headers
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  if (mail($to, $subject, $email_content, $headers)) {
    echo "Your message has been sent.";
  } else {
    echo "Sorry, something went wrong. Please try again later.";
  }
}
*/



?>
