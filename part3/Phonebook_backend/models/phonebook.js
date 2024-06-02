const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

  /**const personSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
      },
    important: Boolean,
  })
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v

    }
  })
  
  module.exports = mongoose.model('Person', personSchema)*/
  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3, // Minimum length for the name
      required: true // Name is required
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          // Custom validation for phone number format
          return /^\d{2,3}-\d{7,}$/g.test(v);
        },
        message: props => `${props.value} is not a valid phone number! Please use format xx-xxxxxxx or xxx-xxxxxxx`
      },
      required: true // Phone number is required
    }
  });
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });
  
  module.exports = mongoose.model('Person', personSchema);
  
  