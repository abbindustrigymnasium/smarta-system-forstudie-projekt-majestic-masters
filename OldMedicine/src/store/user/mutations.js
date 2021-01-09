import axios from 'axios'
// const baseURL = 'https://pxe6lsvbkl.execute-api.eu-north-1.amazonaws.com/default/'
const baseURLAUTH = 'https://2r6362m556.execute-api.eu-north-1.amazonaws.com/default/'

export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}

export const updateIdToken = (state, idToken) => {
  console.log('UPDATING ID TOKEN', idToken)
  state.idToken = idToken
}

export const getIdToken = (state) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAA', state)
  return state.idToken
}

export const getInit = (state, idToken) => {
  console.log('ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ', state)
  var queryParameters = '?client_id=' + state.clientId
  axios.get(baseURLAUTH + 'connections/get' + queryParameters, {
    headers: {
      Authorization: idToken
    }
  }).then(response1 => {
    for (let i = 0; i < response1.data.body.length; i++) {
      state.people.push({
        index: i,
        name: response1.data.body[i].patient_name,
        medications: [],
        id: response1.data.body[i].patient_id
      })

      axios.get(baseURLAUTH + 'medicine/get' + '?patient_id=' + response1.data.body[i].patient_id, {
        headers: {
          Authorization: idToken
        }
      }).then(response2 => {
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
    url: baseURLAUTH + 'connections/post',
    headers: {
      Authorization: nameAndId.token
    },
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
    url: baseURLAUTH + 'medicine/post',
    headers: {
      Authorization: medicineAndState.token
    },
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
  }
)}

export const resetPeople = (state) => {
  state.people = []
  state.clientId = '67890'
}

export const pushPerson = (state, person) => {
  state.people.push(person)
}

export const pushMedicine = (state, medicine) => {
  state.people[medicine.index].medications.push(medicine.medicine)
}

export const popPerson = (state, index) => {
  state.people.splice(index, 1)
  for (let i = 0; i < state.people.length; i++) {
    if (i >= index) {
      state.people[i].index = i
    }
  }
}

export const popMedicine = (state, index) => {
  state.people[state.personPointer].medications.splice(index, 1)
  for (let i = 0; i < state.people[state.personPointer].medications.length; i++) {
    if (i >= index) {
      state.people[state.personPointer].medications[i].index = i
    }
  }
}

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
}

export const changePerson = (state, indexPerson) => {

}

export const changeMedicine = (state, newMeds) => {
  // axios({
  //   method: 'patch',
  //   url: baseURL + 'medicine/patch',
  //   headers: {},
  //   data: { medicine_id: newMeds.id, amount: newMeds.amount, interval: newMeds.interval, start_time: newMeds.startTime, medicine_name: newMeds.medicineName }
  // }).then(response => {
  //   console.log(response)
  // }).catch(function (error) {
  //   console.log(error)
  // })
}
