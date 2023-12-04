import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => console.log(error));
  }, []);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };
  const addName = (event) => {
    event.preventDefault();
    const repeatPerson = persons.find((person) => person.name === newName);
    if (repeatPerson) {
      if (
        window.confirm(
          `${newName} is already added to phone book,replace the old number with a new one?`
        )
      ) {
        personService
          .update(repeatPerson.id, { name: newName, number: newNumber })
          .then((updatedPerson) => {
            setPersons(persons.map(person=>person.id !==repeatPerson.id ? person : updatedPerson))
          }
          );
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filter={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        submit={addName}
        newName={newName}
        addNewName={handleName}
        newNumber={newNumber}
        addNewNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons list={persons} filterFn={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
