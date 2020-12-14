import axios from 'axios'
const baseURL = 'https://pxe6lsvbkl.execute-api.eu-north-1.amazonaws.com/default/'

export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}

export const getInit = (state) => {
  var queryParameters = '?client_id=' + state.clientId
  axios.get(baseURL + 'connections/get' + queryParameters).then(response1 => {
    for (let i = 0; i < response1.data.body.length; i++) {
      state.people.push({
        index: i,
        name: response1.data.body[i].patient_name,
        medications: [],
        id: response1.data.body[i].patient_id
      })

      axios.get(baseURL + 'medicine/get' + '?patient_id=' + response1.data.body[i].patient_id).then(response2 => {
        console.log(response2.data.body)
        for (let q = 0; q < response2.data.body.length; q++) {
          state.people[i].medications.push({
            personPointer: i,
            index: q,
            name: response2.data.body[q].medicine_name,
            amount: response2.data.body[q].amount,
            hasForgot: 0,
            remind: response2.data.body[q].remind,
            interval: response2.data.body[q].medicine_interval,
            startTime: response2.data.body[q].start_time
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }).catch(function (error) {
    console.log(error)
  })
}

const addPersonApi = (state, nameAndId) => {
  axios({
    method: 'post',
    url: baseURL + 'connections/post',
    headers: {},
    data: { client_id: state.clientId, patient_id: nameAndId.id, patient_name: nameAndId.name }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

export const addPerson = (state, nameAndId) => { // denna person ska läggas till i state men även skickas till api
  var element = {
    index: state.people.length,
    name: nameAndId.name,
    medications: []
  }
  element.id = nameAndId.id
  state.people.push(element)

  addPersonApi(state, nameAndId)
}

export const addMedicineApi = (state, medicineAndState) => {
  axios({ // add interval to medicineAndState
    method: 'post',
    url: baseURL + 'medicine/post',
    headers: {},
    data: {
      client_id: state.clientId,
      patient_id: state.people[state.personPointer].id,
      patient_name: state.people[state.personPointer].name,
      amount: medicineAndState.amount,
      interval: medicineAndState.interval,
      remind: medicineAndState.remind,
      start_time: (new Date()).getTime(),
      medicine_name: medicineAndState.name
    }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

export const addMedicine = (state, medicineAndState) => { // denna medicin ska läggas till i store men även skickas till api (använd person id för att veta hoss vem medicinen ska läggas till)
  var medicine = {
    personPointer: medicineAndState.personPointer,
    index: state.people[medicineAndState.personPointer].medications.length,
    name: medicineAndState.name,
    amount: parseInt(medicineAndState.amount),
    hasForgot: 0,
    interval: medicineAndState.interval,
    remind: medicineAndState.remind,
    startTime: (new Date()).getTime()
  }
  state.people[medicineAndState.personPointer].medications.push(medicine)

  addMedicineApi(state, medicineAndState)
}

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
}

// export const getStore = (state, body) => {
//   var queryParameters = '?'
//   for (const key in body) {
//     queryParameters += key + '=' + body[key] + '&'
//   }
//   queryParameters = queryParameters.slice(0, -1)

//   axios.get(baseURL + 'connections/get' + queryParameters).then(response => {
//     console.log(response)
//     // state.people.push(response.data.body)
//   }).catch(function (error) {
//     console.log(error)
//   })
// }
// request (endpoint, body, method) { // Exempel: ('connections/get', {'client_id': CLIENT_ID_HERE}, 'get'}
//   if (method === 'get') {
//     var queryParameters = '?'
//     for (const key in body) {
//       queryParameters += key + '=' + body[key] + '&'
//     }
//     queryParameters = queryParameters.slice(0, -1)

//     console.log(this.baseURL + endpoint + queryParameters)
//     axios.get(this.baseURL + endpoint + queryParameters).then(response => {
//       console.log(response.data.body)
//       return response.data.body
//     }).catch(function (error) {
//       console.log(error)
//     })
//   } else {
//     axios({
//       method: method,
//       url: this.baseURL + endpoint,
//       headers: {},
//       data: body
//     }).then(response => {
//       console.log(response)
//       return response.data.body
//     }).catch(function (error) {
//       console.log(error)
//     })
//   }
// }
