export const updateUrl = (state, url) => {
  state.url = url
}

export const updatePersonPointer = (state, adress) => {
  state.personPointer = adress
}

export const updateMedicinePointer = (state, adress) => {
  state.medicinePointer = adress
}

export const addPerson = (state, person) => {
  state.people.push(person)
}

export const addMedicine = (state, medAndState) => {
  state.people[medAndState[0]].mediciner.push(medAndState[1])
}

// export const addMedicine = (state, personPointer, medicine) => { // VARFÖR FUNKAR INTE DETTA?
//   console.log(personPointer, medicine)
//   state.people[personPointer].mediciner.push(medicine)
// }
