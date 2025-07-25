document.getElementById('delete-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const confirmationText = document.getElementById('confirmation-text').value;
    if (confirmationText !== 'I want to delete my account') {
        alert('Please type the confirmation phrase correctly.');
        return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('No authentication token found. Please log in again.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('https://rocky-island-86629-1a18c775cfde.herokuapp.com/api/v1/user/delete-account', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Your account has been deleted successfully.');
            localStorage.removeItem('authToken');
            window.location.href = 'index.html'; 
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete account.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
