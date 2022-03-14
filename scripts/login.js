function configPassVisibilityButton() {
    const passInput = document.querySelector('.pass__input')
    const passVisibilityButton = document.querySelector('.pass-visibility-button')

    passVisibilityButton.addEventListener('click', (event) => {
        event.preventDefault()

        if (passVisibilityButton.classList.contains('pass-visibility-button--hidden')) {
            passInput.type = 'text'
            passVisibilityButton.classList.remove('pass-visibility-button--hidden')
        } else {
            passInput.type = 'password'
            passVisibilityButton.classList.add('pass-visibility-button--hidden')
        }
    })
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

async function loginButtonClicked() {
    const loginButton = document.querySelector('.login-form__button')

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault()

        const keepConnected = document.querySelector('.stay-connected__input').checked
        const email = document.querySelector('.email__input').value
        const pass = document.querySelector('.pass__input').value

        if (!validateEmail(email)) return document.querySelector('.email').classList.add('email--error')

        const rawResponse = await fetch(API_URI + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: pass })
        });
        const isLogged = await rawResponse.json()

        if (isLogged == true) {
            setLoggedInState(keepConnected)
            redirectLoggedUser()
        } else {
            alert('Usuário não encontrado')
        }

    })
}

async function main() {
    redirectLoggedUser()

    configPassVisibilityButton()
    await loginButtonClicked()
}

main()