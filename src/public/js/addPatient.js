console.log('loaded')
function addPatient () {
  const form = document.forms.form
  form.addEventListener('submit', function (e) {
    const fd = new FormData(form)
    const obj = {}
    fd.forEach((value, key) => (obj[key] = value))
    obj.active = obj.active === 'on'
    obj.deceased = obj.deceased === 'on'
    const json = JSON.stringify(obj)
    e.preventDefault()
    console.log(json)
  })
}

addPatient()
