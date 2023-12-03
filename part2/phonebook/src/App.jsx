import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    
    setPersons((prev) => [...prev, { name: newName }]);
    console.log(persons);
  };

  return (
    <div>
      <h2>Phone book</h2>
      <form  onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
