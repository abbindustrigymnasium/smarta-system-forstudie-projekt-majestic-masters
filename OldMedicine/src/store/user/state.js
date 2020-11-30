export default {
  personPointer: null,
  medicinePointer: null,
  // people: [],
  people: [
    {
      index: 0,
      name: 'Simon Ögaard Jozic',
      id: 'bbkxnzbs',
      medications: [
        {
          index: 0,
          name: 'Weed',
          hasForgot: 1,
          isRunningOut: 0
        }
      ]
    },
    {
      index: 1,
      name: 'Erik Spektor',
      id: 'mzöaldöa',
      medications: [
        {
          index: 0,
          name: 'Lsd',
          hasForgot: 0,
          isRunningOut: 1
        }
      ]
    },
    {
      index: 2,
      name: 'Lindrit Koxha',
      id: 'mxmnzösäa',
      medications: [
        {
          index: 0,
          name: 'Shrooms',
          hasForgot: 0,
          isRunningOut: 0
        }
      ]
    }
  ],
  filterForgotten: false,
  filterRunningOut: false
}
