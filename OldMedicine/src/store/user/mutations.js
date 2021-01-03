export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}

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
