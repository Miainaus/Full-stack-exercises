/* eslint-disable react/prop-types */

const PersonForm = ({ submit, newName, addNewName, newNumber, addNewNumber }) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={newName} onChange={addNewName} required />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={addNewNumber} type='tel' required />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
