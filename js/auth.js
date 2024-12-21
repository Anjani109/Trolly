// Auth

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    console.log('Sign Up:', { name, email, password });
    
    // Implement your signup logic here
    // For example, send data to the server and handle response

    // After successful signup, hide the signup button
    document.querySelector('button[type="submit"]').style.display = 'none';

    // Optionally, display a success message
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.createElement('p');
    successMessage.textContent = 'You have successfully signed up!';
    successMessage.style.color = 'green';
    formContainer.appendChild(successMessage);

    // Optionally, redirect to index page
    window.location.href = 'explore.html';
});


