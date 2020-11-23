const makeID = function (length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const addPerson = function (id) {
  var element = {
    name: id,
    medications: [

    ]
  }
  element.id = id
  this.$store.commit('user/addPerson', element)
}

const goToPerson = function (personPointer) {
  this.$store.commit('user/updatePersonPointer', personPointer)
  this.$router.push('/People/Person')
}

export { goToPerson, addPerson, makeID }
