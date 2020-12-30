export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}

export const resetPeople = (state) => {
  state.people = []
}

export const pushPerson = (state, person) => {
  state.people.push(person)
}

export const pushMedicine = (state, medicine) => {
  state.people[medicine.index].push(medicine.medicine)
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
// export const addPerson = (state, nameAndId) => {
//   var element = {
//     index: state.people.length,
//     name: nameAndId.name,
//     medications: []
//   }
//   element.id = nameAndId.id
//   state.people.push(element)

//   addPersonApi(state, nameAndId)
// }

// export const addMedicine = (state, medicineAndState) => { // denna medicin ska läggas till i store men även skickas till api (använd person id för att veta hoss vem medicinen ska läggas till)
//   const uniqueid = guid()
//   var medicine = {
//     personPointer: medicineAndState.personPointer,
//     index: state.people[medicineAndState.personPointer].medications.length,
//     name: medicineAndState.name,
//     amount: parseInt(medicineAndState.amount),
//     hasForgot: 0,
//     interval: medicineAndState.interval,
//     remind: medicineAndState.remind,
//     startTime: (new Date()).getTime(),
//     medicine_id: uniqueid
//   }
//   state.people[medicineAndState.personPointer].medications.push(medicine)

//   addMedicineApi(state, medicineAndState, uniqueid)
// }

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
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

export const changePerson = (state, indexPerson) => {

}

// ABOVE !!! 123

// deletePerson, index
// changePerson, index

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
