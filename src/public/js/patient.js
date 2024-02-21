const id = window.location.pathname.split('/')[2]

getPatientById(id)

async function getPatientById (id) {
  const token = localStorage.getItem('accessToken')
  console.log(token)
  const response = await fetch(`http://localhost:3000/api/Patient/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()
  if (response.status === 403) {
    alert(data.message)
    window.location.href = 'http://localhost:3000/login'
  }

  if (response.status !== 200) {
    alert(data.message)
    return
  }

  populatePatientData(data.data)
}

function populatePatientData (patient) {
  const givenName = document.querySelector('#givenName')
  const familyName = document.querySelector('#familyName')
  const mobile = document.querySelector('#mobile')
  const address = document.querySelector('#address')
  const city = document.querySelector('#city')
  const country = document.querySelector('#country')
  const fullName = document.querySelector('#fullName')
  const fullAddress = document.querySelector('#fullAddress')

  givenName.innerHTML = patient.name[0].given[0]
  familyName.innerHTML = patient.name[0].family
  mobile.innerHTML = patient.telecom[0].value
  address.innerHTML = patient.address[0].text
  city.innerHTML = patient.address[0].city
  country.innerHTML = patient.address[0].country
  fullName.innerHTML = `${patient.name[0].given[0]}  ${patient.name[0].family}`
  fullAddress.innerHTML = `${patient.address[0].text}, ${patient.address[0].city}, ${patient.address[0].country}.`
  console.log('patient: ', patient)
}
