import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Persons from './Persons.jsx';

import personService from './services/persons';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log('effect')
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      console.log('promise fulfilled')
    })
    .catch(error => {
      console.log('failed to fetch data')
    })
      
      
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.find(person => person.name === newName);
    

    if (nameExists) {
      const confirmUpdate = window.confirm( `${newName} is already added to the phonebook, replace the old number with a new one?`);
      alert(`${newName} is already added to the phonebook`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== returnedPerson.id ? person : returnedPerson
          ));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error updating person:', error);
        });
    }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      
    };
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
      
    
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
