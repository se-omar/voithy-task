const pwShowHide = document.querySelectorAll('.eye-icon')

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener('click', () => {
    const pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll('.password')

    pwFields.forEach((password) => {
      if (password.type === 'password') {
        password.type = 'text'
        eyeIcon.classList.replace('bx-hide', 'bx-show')
        return
      }
      password.type = 'password'
      eyeIcon.classList.replace('bx-show', 'bx-hide')
    })
  })
})

function login () {
  const form = document.forms.login
  form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const fd = new FormData(form)
    const obj = {}
    fd.forEach((value, key) => (obj[key] = value))
    const json = JSON.stringify(obj)
    const response = await fetch('http://localhost:3000/api/User/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json
    })

    const data = await response.json()
    if (response.status === 200) {
      localStorage.setItem('accessToken', data.data.accessToken)
      alert('Successful login')
      window.location.href = 'http://localhost:3000/addPatient'
      return
    }

    alert(data.message)
  })
}

login()
