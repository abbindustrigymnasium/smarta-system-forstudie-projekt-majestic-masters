export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}

export const updateIdToken = (state, idToken) => {
  state.idToken = idToken
}

export const addPerson = (state, nameAndId) => {
  var element = {
    index: state.people.length,
    name: nameAndId.name,
    medications: []
  }
  element.id = nameAndId.id
  state.people.push(element)
}

export const resetPeople = (state) => {
  state.people = []
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

export const changeClientId = (state, clientId) => {
  state.clientId = clientId
}

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
}
