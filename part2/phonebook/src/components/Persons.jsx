/* eslint-disable react/prop-types */

const Persons = ({list,filter}) => {
  return (
    <div>
      {list
        .filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((item, index) => (
          <p key={index}>
            {item.name} {item.number}
          </p>
        ))}
    </div>
  );
}

export default Persons ;
