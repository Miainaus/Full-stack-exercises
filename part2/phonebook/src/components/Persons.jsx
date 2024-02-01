/* eslint-disable react/prop-types */

const Persons = ({ list, filterFn, handleDelete }) => {
  return (
    <div>
      {list
        .filter((item) =>
          item.name.toLowerCase().includes(filterFn.toLowerCase())
        )
        .map((item, index) => (
          <div key={index}>
            <p>
              {item.name} {item.number}
            </p>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${item.name} ?`)) {
                  handleDelete(item.id,item.name);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
