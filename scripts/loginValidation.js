const API_URI = 'https://company-dashboard-api.herokuapp.com'
const STORAGE_LOGIN_STATE_KEY = 'isLogged'

function setLoggedInState(keepConnected) {
    if (keepConnected) {
        localStorage.setItem(STORAGE_LOGIN_STATE_KEY, true)
    } else {
        sessionStorage.setItem(STORAGE_LOGIN_STATE_KEY, true)
    }
}

function setLoggedOutState() {
    localStorage.removeItem(STORAGE_LOGIN_STATE_KEY)
    sessionStorage.removeItem(STORAGE_LOGIN_STATE_KEY)
}

function isLogged () {
    const isLoggedSessionStorage = JSON.parse(sessionStorage.getItem(STORAGE_LOGIN_STATE_KEY))
    const isLoggedLocalStorage = JSON.parse(localStorage.getItem(STORAGE_LOGIN_STATE_KEY))

    if (isLoggedSessionStorage || isLoggedLocalStorage) return true

    return false
}

function redirectLoggedUser() {
    if(isLogged()) location.replace('./dashboard.html')
}

function redirectNotLoggedUser() {
    if(!isLogged()) location.replace('./login.html')
}