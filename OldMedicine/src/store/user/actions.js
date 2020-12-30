import axios from 'axios'
const baseURL = 'https://pxe6lsvbkl.execute-api.eu-north-1.amazonaws.com/default/'

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export const getInit = ({ commit }, clientId) => {
  commit('resetPeople')
  var queryParameters = '?client_id=' + clientId
  axios.get(baseURL + 'connections/get' + queryParameters).then(response1 => {
    for (let i = 0; i < response1.data.body.length; i++) {
      commit('pushPerson', {
        index: i,
        name: response1.data.body[i].patient_name,
        medications: [],
        id: response1.data.body[i].patient_id
      })

      axios.get(baseURL + 'medicine/get' + '?patient_id=' + response1.data.body[i].patient_id).then(response2 => {
        for (let q = 0; q < response2.data.body.length; q++) {
          commit('pushMedicine', {
            index: i,
            medicine: {
              personPointer: i,
              index: q,
              name: response2.data.body[q].medicine_name,
              amount: response2.data.body[q].amount,
              hasForgot: 0,
              remind: response2.data.body[q].remind,
              interval: response2.data.body[q].medicine_interval,
              startTime: response2.data.body[q].start_time,
              medicine_id: response2.data.body[q].id
            }
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

export const addPerson = ({ commit }, object) => {
  commit('pushPerson', {
    index: object.index,
    name: object.name,
    medications: [],
    id: object.id
  })

  axios({
    method: 'post',
    url: baseURL + 'connections/post',
    headers: {},
    data: { client_id: object.clientId, patient_id: object.id, patient_name: object.name }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

export const addMedicine = ({ commit }, object) => {
  const uniqueid = guid()
  const time = (new Date()).getTime()

  commit('pushMedicine', {
    index: object.personPointer,
    medicine: {
      personPointer: object.personPointer,
      index: object.index,
      name: object.name,
      amount: object.amount,
      hasForgot: 0,
      remind: object.remind,
      interval: object.medicineInterval,
      startTime: time,
      medicine_id: uniqueid
    }
  })

  axios({
    method: 'post',
    url: baseURL + 'medicine/post',
    headers: {},
    data: {
      client_id: object.clientId,
      patient_id: object.personId,
      patient_name: object.personName,
      amount: object.amount,
      interval: object.interval,
      remind: object.remind,
      start_time: time,
      medicine_name: object.name,
      medicine_id: uniqueid
    }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

export const deletePerson = ({ commit }, object) => {
  commit('popPerson', object.index)

  axios({
    method: 'delete',
    url: baseURL + 'connections/delete',
    headers: {},
    data: { patient_id: object.id, client_id: object.clientId }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

export const deleteMedicine = ({ commit }, object) => {
  commit('popMedicine', object.index)

  axios({
    method: 'delete',
    url: baseURL + 'medicine/delete',
    headers: {},
    data: { medicine_id: object.id }
  }).then(response => {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}
