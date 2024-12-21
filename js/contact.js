// CONTACT

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').textContent = data.message;
    })
    .catch(error => {
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again later.';
    })
    .then(data => {
        document.getElementById('responseMessage').textContent = 'Message Sent Successfully';
    });
    document.getElementById('contactForm').reset();
});