import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
  const handleDelete = (id, name) => {
    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setSuccessMessage(`${name} was already removed from server`);
      setTimeout(() => setSuccessMessage(null), 2000);
    }) .catch((error) => {
      console.log(error);
      setErrorMessage(
        `Information of ${name} has already been deleted from server`
      );
      setTimeout(() => setSuccessMessage(null), 2000);
      setPersons(persons.filter((person) => person.id !== id));
    });
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
            setSuccessMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => setSuccessMessage(null), 2000);
            setPersons(
              persons.map((person) =>
                person.id !== repeatPerson.id ? person : updatedPerson
              )
            );
          })
         ;
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPersons) => {
          setSuccessMessage(`Added ${returnedPersons.name}`);
          setTimeout(() => setSuccessMessage(null), 2000);
          setPersons(persons.concat(returnedPersons));
        });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phone book</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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
