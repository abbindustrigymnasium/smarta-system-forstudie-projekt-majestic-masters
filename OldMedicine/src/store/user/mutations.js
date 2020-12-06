export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
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

export const addMedicine = (state, medicineAndState) => {
  var medicine = {
    personPointer: medicineAndState.personPointer,
    index: state.people[medicineAndState.personPointer].medications.length,
    name: medicineAndState.name,
    amount: parseInt(medicineAndState.amount),
    hasForgot: 0,
    isRunningOut: 0
  }
  state.people[medicineAndState.personPointer].medications.push(medicine)
}

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
}
