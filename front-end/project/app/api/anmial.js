import { create } from 'apisauce'

const animals = create({
    baseURL: 'https://zoo-animal-api.herokuapp.com/animals/rand'
  })

export default animals;