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
    console.log(json)
    const token = localStorage.getItem('accessToken')
    const response = await fetch('http://localhost:3000/api/Patient', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: json
    })

    if (response.status === 201) {
      alert('Patient created successfully')
      return
    }

    const data = await response.json()
    alert(data.message)
  })
}

addPatient()
