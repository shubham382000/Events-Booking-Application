export const isLoggedIn = () => {
    if (localStorage.getItem('events-token')){
        return true;
    }
    else {
        return false; 
    }
}

export const getToken = () => {
    return localStorage.getItem('events-token'); 
}

