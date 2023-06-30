import React, { useState, useEffect } from "react";
import Select from 'react-select'
import "./rates.css";

function ComponentSearch() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedRatetype, setSelectedRateType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [labourCosts, setLabourCosts] = useState(0);
  const [profitOverheads, setProfitOverheads] = useState(0);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleComponentChange = (selectedOption) => {
    setSelectedComponent(selectedOption.value);
    setSelectedClass("");

    if (selectedOption.value === "Concrete") {
      setSelectedRateType('rate per cubic meter');
    } else if (selectedOption.value === "Steel") {
      setSelectedRateType('rate per kg');
    }

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
    const fetchData = async () => {
      try {
        const response = await fetch("https://django-server-production-5811.up.railway.app/apis/components/");
        const data = await response.json();
        setComponents(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const classes = selectedComponent
    ? components.find((c) => c.id === selectedComponent)?.classes
    : [];

  const showRate = selectedClass && rate !== null;

  return (
    <div className="introo">
      <div className="Rates">
        <form onSubmit={handleSubmit} className="rates-form">
          <label htmlFor="component">Component:</label>

          <Select
            id="component"
            name="component"
            value={selectedComponent}
            onChange={handleComponentChange}

            options={components.map(component => ({ value: component, label: component }))}
            placeholder={selectedComponent ? selectedComponent : "Select a component"}
            isSearchable

          />





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
                  <label htmlFor="labourCosts">Labour Costs in %:</label>
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

                  <label htmlFor="profitOverheads">Profit Overheads in %:</label>
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
          {selectedComponent === 'Steel' && (

            <div>

              <div>
                <label htmlFor="labourCosts">Labour Costs in ksh:</label>
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

                <label htmlFor="profitOverheads">Profit Overheads in %:</label>
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

              <button type="submit">Calculate Rate</button>
            </div>
          )}
          {loading && <p>Loading...</p>}
          {
            rate !== null && (
              <p className="ptag">
                The {selectedRatetype} for {selectedComponent} is{" "}
                <span className="underline-text">{rate.toFixed(2)}</span> KES
              </p>
            )
          }
        </form>


      </div >
    </div>
  );
}

export default ComponentSearch