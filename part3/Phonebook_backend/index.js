require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
Person = require('./models/phonebook');

const app = express();



/**app.use(morgan('tiny'));*/

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  } 
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);
/** Create token for logging*/
/**app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'dist')));*/

/**const phonebookEntries = [
        { 
            "id": 1,
            "name": "Arto Hellas", 
            "number": "040-123456"
        },
        { 
            "id": 2,
            "name": "Ada Lovelace", 
            "number": "39-44-5323523"
        },
        { 
            "id": 3,
            "name": "Dan Abramov", 
            "number": "12-43-234345"
        },
        { 
            "id": 4,
            "name": "Mary Poppendieck", 
            "number": "39-23-6423122"
        }
];*/

// Route for /api/persons
/**app.get('/api/persons', (_req, res) => {
    res.json(phonebookEntries);
});*/
app.get('/api/persons', (_req, res) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
/**app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const entry = persons.find(entry => entry.id === id);
    if (entry) {
        res.json(entry);
    } else {
        res.status(404).end();
    }
}
);
*/
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id)
      .then(person => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch(error => next(error))
  });
  

/**app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id);
    persons = persons.filter(entry => entry.id !== id);
    res.status(204).end();
}
);*/
app.delete('/api/persons/:id',(req,res)=>{
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
}
);

/**app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'content missing' });
    }
    if (persons.find(entry => entry.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    const entry ={
        id: Math.floor(Math.random() * 1000)+1 ,
        name: body.name,
        number: body.number
    }
    phonebookEntries = phonebookEntries.concat(entry);
    res.json(entry);
}
);*/ 
/**app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'content missing' });
    }
    const person = new Person({
      content: body.content,
      important: body.important || false,
    })
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
   
}
);*/
app.post('/api/persons', (req, res, next) => {
    const body = req.body;
  
    const person = new Person({
      name: body.name,
      phone: body.phone
    });
  
    
    person.save()
      .then(savedPerson => {
        res.json(savedPerson);
      })
      .catch(error => {
        if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
        }
        next(error);
      });
  });
  
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
    const person = {
      content: body.content,
      important: body.important
    }
    Person.findByIdAndUpdate(req.params.id, person , { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
});
//Route for getting the info of the phonebook
app.get('/info', (req, res) => {
    /**
     * GET request handler for retrieving the info of the phonebook.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    /**const date = new Date();
    res.send(`<p>Phonebook has info for ${phonebookEntries.length} people</p><p>${date}</p>`);*/
    erson.countDocuments({})
        .then(count => {
            const date = new Date();
            res.send(`<p>Phonebook has info for ${count} persons</p><p>${date}</p>`);
        })
        .catch(error => next(error));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(unknownEndpoint)
app.use(errorHandler)
/**const PORT = 3001;*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {

    /**
     * Starts the server and listens on the specified port.
     * @param {number} PORT - The port number to listen on.
     */
    console.log(`Server is running on port ${PORT}`);
});
