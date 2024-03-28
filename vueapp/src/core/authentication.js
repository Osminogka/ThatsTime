import { user } from '@/core/userInfo';

export async function signIn(username, password ) {
    const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
          }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(response.ok){
        let responseData = await response.json();
        if(responseData.success)
            localStorage.setItem('user', JSON.stringify(responseData.token));
        return {...responseData};
    }

    return {sucess: false, message: 'Server error'};
}

export async function signUp(username, email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(response.ok){
        let responseData = await response.json();
        if(responseData.success)
            localStorage.setItem('user', JSON.stringify(responseData.token));
        return {...responseData};
    }
    return {sucess: false, message: 'Server error'};
}

export function signout() {
    localStorage.removeItem('user');
}

export function getCurrentUser() {
    const token = JSON.parse(localStorage.getItem('user'));
    if (!token) {
        return null;
    }

    // Split the JWT string into three parts: header, payload, signature
    const parts = token.split('.');
    if (parts.length !== 3) {
        return null;
    }

    // Decode the payload
    const decoded = atob(parts[1]);
    const payload = JSON.parse(decoded);

    console.log(payload);

    user.value.name = payload.unique_name;
    user.value.email = payload.email;
    return payload;
}