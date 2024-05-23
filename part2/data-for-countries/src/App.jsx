import { useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const getAll = async () => {
    const response = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
    return response.data;
  };
  const onChange = () => { 

  };
  return (
    <div>
      find countries
      <input type="text" value={filter } onChange={onChange}/>
    </div>
  );
}

export default App;
