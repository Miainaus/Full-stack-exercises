/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};
const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine
        text='all'
        value={props.good + props.neutral + props.bad}
      />
      <StatisticLine
        text='average'
        value={
          (props.good - props.bad) / (props.good + props.bad + props.neutral)
        }
      />
      <StatisticLine
        text='positive'
        value={`${((props.good / (props.good + props.bad + props.neutral)) * 100).toFixed(2)} %`}
      />
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const goodClick = () => {
    setFeedback(true);
    setGood((currentState) => (currentState += 1));
  };
  const neutralClick = () => {
    setFeedback(true);
    setNeutral((prev) => ++prev);
  };
  const badClick = () => {
    setFeedback(true);
    setBad((prev) => ++prev);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodClick} text='good' />
      <Button onClick={neutralClick} text='neutral' />
      <Button onClick={badClick} text='bad' />
      <h1>statistics</h1>
      {feedback ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
