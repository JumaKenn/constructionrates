
import './MarketPlace.css'

import { useState, useEffect } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa';



const MarketPlace = () => {
  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [components, setComponents] = useState([]);
  const [viewingComponent, setViewingComponent] = useState(null);

  useEffect(() => {
    // Retrieve components from local storage on component mount
    const storedComponents = localStorage.getItem('components');
    if (storedComponents) {
      setComponents(JSON.parse(storedComponents));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'itemName') {
      setItemName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  const handleDelete = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));
  };
  const handleView = (index) => {
  // Retrieve the component object using the index
  const viewingComponent = components[index];

  // Perform the desired actions for editing/viewing the component
  // For example, you can set the component as the current editing component in the state
  setViewingComponent(viewingComponent);

  // You can also navigate to a different page or display a modal for editing/viewing the component
  // Modify the code based on your specific requirements
};
    const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
   setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new component object
    const newComponent = {
      itemName,
      description,
      price,
      quantity,
      image: event.target.picture.files[0], // Access the uploaded image file
  };
   

    // Update components state and save to local storage
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    localStorage.setItem('components', JSON.stringify(updatedComponents));

    // Clear form inputs
    setItemName('');
    setDescription('');
    setPrice('');
    setQuantity('');

    // Hide the form after submission
    setShowForm(false);
  };


  const handleAllComponentsSubmitToEndpoint = async () => {
  try {
    // Create an array to store the product data
    const products = [];

    // Create a FormData object to send the product data
    const formData = new FormData();

    // Convert the components data to product format
    components.forEach((component) => {
      // Create a new FormData entry for each product
      const productData = new FormData();
      productData.append('title', component.itemName);
      productData.append('description', component.description);
      productData.append('price', component.price);
      productData.append('quantity', component.quantity);
      productData.append('image', component.picture); // Assuming "component.picture" holds the uploaded image file

      // Add the product FormData to the array
      products.push(productData);
    });

    // Append all product FormData objects to the main FormData
    products.forEach((productData) => {
      formData.append('products', productData);
    });

    // Send the products data to the API endpoint
    const response = await fetch('https://django-server-production-5811.up.railway.app/apis/products/', {
      method: 'POST',
      body: formData,
    });

    // Check if the request was successful
    if (response.ok) {
      // Clear the components data
      setComponents([]);
      localStorage.removeItem('components');

      // Display a success message to the user
      alert('Products added successfully!');
    } else {
      // Display an error message to the user
      alert('Failed to add products.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



  return (
    <div className="marketplace-container">
      {!showForm && (
        <button className="add-component-button" onClick={() => setShowForm(true)}>
          Add Item
        </button>
      )}

      {showForm && (
        <div className="add-component-container">
       

          <form onSubmit={handleSubmit} className="marketplace-form">
          
          
            
            <button className="back-btn" onClick={() => setShowForm(false)}>Close</button>
            <br />

            <label>
              Item Name:
              <input
                type="text"
                name="itemName"
                value={itemName}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                className="form-textarea"
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <br />
            <label>
              Picture:
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <br />
            <button type="submit" className="submit-button">
              Submit
            </button>
            <br />
            <button className="back-btn" onClick={() => setShowForm(false)}>Close</button>
          </form>
        </div>
      )}
      <div className="component-list-container">
  <h2>Added Items:</h2>
  {components.map((component, index) => (
    <div key={index} className="component-entry">
      <span className="counter">{index + 1}. </span>
      <span className="item-name">{component.itemName}</span>
        <span className="price">Price: {component.price}</span>
      <span className="quantity">Quantity: {component.quantity}</span>
      <button className="list-button" onClick={() => handleDelete(index)}>Delete</button>
      <button className="list-button2" onClick={() => handleView(index)}>View</button>
      <button className="list-button3" onClick={handleAllComponentsSubmitToEndpoint}>
  Push to MarketPlace
</button>
    
    </div>
  ))}
 {viewingComponent && (
  <div className="component-details">
    <h3>{viewingComponent.itemName}</h3>
    <p>Description: {viewingComponent.description}</p>
    <p>Price: {viewingComponent.price}</p>
    <p>Quantity: {viewingComponent.quantity}</p>
    {viewingComponent.imageUrl && (
      <img src={viewingComponent.imageUrl} alt="Component Image" />
    )}
    <button className="list-button2" onClick={() => setViewingComponent(null)}>
      Close
    </button>
  </div>
)}
</div>

    </div>
  );
};

export default MarketPlace
