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
    medications: [
      // {
      //   name: 'weed',
      //   hasForgot: 1,
      //   isRunningOut: 1
      // },
      // {
      //   name: 'shroom',
      //   hasForgot: 1,
      //   isRunningOut: 1
      // }
    ]
  }
  element.id = nameAndId.id
  state.people.push(element)
}

export const addMedicine = (state, medicineAndState) => {
  var medicine = {
    index: state.people[medicineAndState.state].medications.length,
    name: medicineAndState.name,
    amount: medicineAndState.amount,
    hasForgot: 1,
    isRunningOut: 1
  }
  state.people[medicineAndState.state].medications.push(medicine)
}

export const changePersonPointer = (state, personPointer) => {
  state.personPointer = personPointer
}

export const changeMedicinePointer = (state, medicinePointer) => {
  state.medicinePointer = medicinePointer
}
