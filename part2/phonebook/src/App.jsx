import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
  const addName = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      window.alert(`${newName} is already added to phone book`);
    } else {
      setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
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
      <Persons list={persons} filter={filter} />
    </div>
  );
};

export default App;
