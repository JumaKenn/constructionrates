import React, { useState, useEffect } from "react";
import "./rates.css";

function ComponentSearch() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [labourCosts, setLabourCosts] = useState(0);
  const [profitOverheads, setProfitOverheads] = useState(0);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
    setSelectedClass("");
    setRate(null);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setRate(null);
  };

  const handleLabourCostsChange = (event) => {
    setLabourCosts(parseFloat(event.target.value));
  };

  const handleProfitOverheadsChange = (event) => {
    setProfitOverheads(parseFloat(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      component: selectedComponent,
      class: selectedClass,
      labourCosts: labourCosts,
      profitOverheads: profitOverheads,
    };
    fetch("https://django-server-production-5811.up.railway.app/apis/rates/", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ratepersm);
        setRate(data.ratepersm);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  // Fetch components from backend endpoint on component mount


  useEffect(() => {
    fetch("https://django-server-production-5811.up.railway.app/apis/components/")
      .then((response) => response.json())
      .then((data) => {
        setComponents(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const classes = selectedComponent
    ? components.find((c) => c.id === selectedComponent)?.classes
    : [];

  const showRate = selectedClass && rate !== null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="component">Component:</label>

        <select
          id="component"
          name="component"
          value={selectedComponent}
          onChange={handleComponentChange}
          required
        >
          <option key="default" value="">Select a component</option>
          {components.length > 0 &&
            components.map((component) => (
              <option key={component.id} value={component.id}>
                {component}
              </option>
            ))}
        </select>





        {selectedComponent === 'Concrete' && (
          <div>
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              name="class"
              value={selectedClass}
              onChange={handleClassChange}
              required
            >
              <option value="">Select a Class</option>
              <option value="15">Class 15</option>
              <option value="20">Class 20</option>
              <option value="25">Class 25</option>
              <option value="30">Class 30</option>
            </select>


            {selectedClass && (
              <div>
                <label htmlFor="labourCosts">Labour Costs:</label>
                <input
                  type="number"
                  id="labourCosts"
                  name="labourCosts"
                  min="0"
                  step="0.01"
                  value={labourCosts}
                  onChange={handleLabourCostsChange}
                  required
                />

                <label htmlFor="profitOverheads">Profit Overheads:</label>
                <input
                  type="number"
                  id="profitOverheads"
                  name="profitOverheads"
                  min="0"
                  step="0.01"
                  value={profitOverheads}
                  onChange={handleProfitOverheadsChange}
                  required
                />
              </div>
            )}
            <button type="submit">Calculate Rate</button>
          </div>
        )}
      </form>

      {loading && <p>Loading...</p>}
      {rate !== null && (
        <p>
          The rate per cubic meter for {selectedComponent} ({selectedClass}) is{" "}
          {rate.toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default ComponentSearch