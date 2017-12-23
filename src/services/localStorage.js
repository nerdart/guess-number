const localStorage = window.localStorage;

export const setItem = (token, key) => {
	localStorage.setItem(key, token);
}
export const getItem=() =>{
	localStorage.getItem('token');
}

export const getToken = () => localStorage.getItem('token');

export const removeItem = (item) => {
	localStorage.removeItem(item);
}
export const isAuthenticated = () =>{
	return localStorage.getItem('token') ? true : false;
}
