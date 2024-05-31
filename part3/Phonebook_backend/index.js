const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

/**app.use(morgan('tiny'));*/

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });
  
/** Create token for logging*/
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
app.use(express.json());


const phonebookEntries = [
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
];

// Route for /api/persons
app.get('/api/persons', (req, res) => {
    res.json(phonebookEntries);
});
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const entry = phonebookEntries.find(entry => entry.id === id);
    if (entry) {
        res.json(entry);
    } else {
        res.status(404).end();
    }
}
);
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id);
    phonebookEntries = phonebookEntries.filter(entry => entry.id !== id);
    res.status(204).end();
}
)

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'content missing' });
    }
    if (phonebookEntries.find(entry => entry.name === body.name)) {
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
);


//Route for getting the info of the phonebook
app.get('/info', (req, res) => {
    /**
     * GET request handler for retrieving the info of the phonebook.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    const date = new Date();
    res.send(`<p>Phonebook has info for ${phonebookEntries.length} people</p><p>${date}</p>`);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    /**
     * Starts the server and listens on the specified port.
     * @param {number} PORT - The port number to listen on.
     */
    console.log(`Server is running on port ${PORT}`);
});
