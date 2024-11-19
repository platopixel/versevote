
const submitForm = async function (formData: FormData) {
    'use server';

    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await fetch('/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redirect to the vote page
            window.location.href = '/vote';
        } else {
            // Handle error
            console.error('Error authenticating');
        }
    } catch (error) {
        console.error('Error authenticating:', error);
    }
}

export default function Authenticate() {
    return (
        <div>
            <h1>Authenticate</h1>
            <form action={submitForm}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Authenticate</button>
            </form>
        </div>
    )
}