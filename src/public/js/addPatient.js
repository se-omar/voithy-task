function addPatient () {
  const form = document.forms.form
  form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const fd = new FormData(form)
    const obj = {}
    fd.forEach((value, key) => (obj[key] = value))
    obj.active = obj.active === 'on'
    obj.deceased = obj.deceased === 'on'
    const json = JSON.stringify(obj)
    const token = localStorage.getItem('accessToken')
    const response = await fetch('http://localhost:3000/api/Patient', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: json
    })

    const data = await response.json()
    if (response.status === 200) {
      alert('Patient created successfully')
      window.location.href = `http://localhost:3000/patient/${data.data._id}`
      return
    }

    alert(data.message)
    if (response.status === 403) {
      window.location.href = 'http://localhost:3000/login'
    }
  })
}

addPatient()
