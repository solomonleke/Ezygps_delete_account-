document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const deviceId = 'some-unique-device-id'; // You might want to generate or assign a unique ID here

    try {
        const response = await fetch('https://rocky-island-86629-1a18c775cfde.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, deviceId })
        });

        const data = await response.json();

        console.log('Response:', data);

        if (data.status === 200) {
            localStorage.setItem('authToken', data.accessToken);
            window.location.href = 'delete.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
