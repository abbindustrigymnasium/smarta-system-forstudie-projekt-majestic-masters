export const updatePersonPointer = (state, adress) => {
  state.personPointer = adress
}

export const updateMedicinePointer = (state, adress) => {
  state.medicinePointer = adress
}

export const addPerson = (state, person) => {
  state.people.push(person)
}

export const addMedicine = (state, medicineAndState) => {
  state.people[medicineAndState[0]].medications.push(medicineAndState[1])
}

// export const addMedicine = (state, personPointer, medicine) => { // VARFÖR FUNKAR INTE DETTA?
//   console.log(personPointer, medicine)
//   state.people[personPointer].medications.push(medicine)
// }

export const updateFilterForgotten = (state, filterForgotten) => {
  state.filterForgotten = filterForgotten
}

export const updateFilterRunningOut = (state, filterRunningOut) => {
  state.filterRunningOut = filterRunningOut
}
