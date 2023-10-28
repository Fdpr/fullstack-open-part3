const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
let get = true

if (process.argv.length === 4) {
    console.log('Provide a number for the person to add')
    process.exit(1)
} else if (process.argv.length > 4)
    get = false

const url =
    `mongodb+srv://fullstack:${password}@fullstackopen.4pj0ikx.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (get) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
} else {
    
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to the phonebook!`)
        mongoose.connection.close()
    })

}