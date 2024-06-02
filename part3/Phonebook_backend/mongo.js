const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as argument');
  process.exit(1);
}


const password = process.argv[2];

const url = `mongodb+srv://wassimwmez:${password}@cluster0.m7j4rgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for persons
const personSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

// Create Note model
const Person = mongoose.model('Person', personSchema);

// Create a new note object
const person = new Person({
  content: 'HTML is easy',
  important: true,
});

// Save the new person to the database
/*person.save()
  .then(result => {
    console.log('Person saved!');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error saving person:', error.message);
    mongoose.connection.close();
})*/
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  })

;
