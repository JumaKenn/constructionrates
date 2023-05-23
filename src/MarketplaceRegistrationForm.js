import React, { useState } from 'react';
import './MarketplaceRegistrationForm.css'

const MarketplaceRegistrationForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [operationTime, setOperationTime] = useState('');
  const [otherDetails, setOtherDetails] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'operationTime':
        setOperationTime(value);
        break;
      case 'otherDetails':
        setOtherDetails(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform further actions like submitting data to the server or API
    // You can use the marketplace registration details here

    // Reset the form fields
    setName('');
    setLocation('');
    setOperationTime('');
    setOtherDetails('');
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label>
        Operation Time:
        <input
          type="text"
          name="operationTime"
          value={operationTime}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label>
        Other Details:
        <textarea
          name="otherDetails"
          value={otherDetails}
          onChange={handleInputChange}
          className="form-textarea"
        />
      </label>
      <br />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default MarketplaceRegistrationForm;

