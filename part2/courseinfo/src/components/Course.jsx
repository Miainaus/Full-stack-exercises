/* eslint-disable react/prop-types */
const Header = ({ title }) => {
  return <h2>{title}</h2>;
};
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
      <h4>total of {total} exercises</h4>
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
