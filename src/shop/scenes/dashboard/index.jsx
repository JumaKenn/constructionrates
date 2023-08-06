import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import MarketPlace from "../../../MarketPlace";
import { API_ENDPOINT_1 } from "../../../apis/api";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../../AuthContext';

import './index.css';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');

  const tokenizer = localStorage.getItem('auth_token');
  const shopname = localStorage.getItem('shopname');
  const handleEdit = async (product, field) => {
    console.log('handleEdit called');
    setProducts(prevProducts =>
      prevProducts.map(prevProduct =>
        prevProduct.id === product.id
          ? { ...prevProduct, editing: prevProduct.editing === field ? false : field }
          : prevProduct
      )
    );

    if (product.editing) {
      // Save changes
      try {
        if (field === 'price') {
          console.log('price changed', product.id);
          const response = await fetch(`${API_ENDPOINT_1}/apis/products/${user}/${product.id}/`, {
            method: 'PUT', // Use the appropriate HTTP method for updating data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              price: product.price, // Assuming you have the updated price in the product object
            }),
          });

          if (response.ok) {
            console.log('Price updated successfully');
            // Update the data source or state if needed
          } else {
            console.error('Error updating price');
          }
        } else if (field === 'quantity') {
          console.log('quantity changed');
          const response = await fetch(`${API_ENDPOINT_1}/apis/products/${user}/${product.id}/`, {
            method: 'PUT', // Use the appropriate HTTP method for updating data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quantity: product.quantity, // Assuming you have the updated quantity in the product object
            }),
          });

          if (response.ok) {
            console.log('Quantity updated successfully');
            // Update the data source or state if needed
          } else {
            console.error('Error updating quantity');
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const handledelete = async (product) => {
    try {
      const response = await fetch(`${API_ENDPOINT_1}/apis/products/${user}/${product.id}/`, {
        method: 'DELETE', // Use the appropriate HTTP method for updating data

      });

      if (response.ok) {
        console.log('Product deleted successfully');
        // Update the data source or state if needed
      } else {
        console.error('Error deleting product');
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }


  }



  const handlePriceChange = (e, product) => {
    const newPrice = e.target.value;
    setProducts(prevProducts =>
      prevProducts.map(prevProduct =>
        prevProduct.id === product.id
          ? { ...prevProduct, price: newPrice }
          : prevProduct
      )
    );
  };

  const handleQuantityChange = (e, product) => {
    const newQuantity = e.target.value;
    setProducts(prevProducts =>
      prevProducts.map(prevProduct =>
        prevProduct.id === product.id
          ? { ...prevProduct, quantity: newQuantity }
          : prevProduct
      )
    );
  };


  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`${API_ENDPOINT_1}/apis/ecommerce/${user}`)
      .then(response => response.json())
      .then(result => {
        // Add the editing property to each product
        const productsWithEditing = result.map(product => ({
          ...product,
          editing: false
        }));
        setData(productsWithEditing);
        setProducts(productsWithEditing);
        setLoading(false); // Set loading to false after data is fetched
      });

    // Create an EventSource to listen for SSE events
    const eventSource = new EventSource(`${API_ENDPOINT_1}/events/`);
    eventSource.onmessage = e => {

      // You can trigger a new fetch or update the UI based on the SSE event
      fetch(`${API_ENDPOINT_1}/apis/ecommerce/${user}`)
        .then(response => response.json())
        .then(result => {
          const productsWithEditing = result.map(product => ({
            ...product,
            editing: false
          }));
          setData(productsWithEditing);
          setProducts(productsWithEditing);
        });
    };

    // Cleanup: Close the EventSource connection when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Box m="30px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your online market" />
        <Box fontstyle="italic" m="20px">
          <p>{shopname}</p>
        </Box>


      </Box>

      {/* GRID & CHARTS */}
      <Box
        className="responsiveBox"
      >
        {/* ROW 1 */}







        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex" /* Set display to flex */
          flexDirection="column"
          minHeight="200%"
        /* Stack child elements vertically */
        >
          <Box
            className="marketplace"
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Your content inside the Box */}
          </Box>
          <Box flex="1" /* Allow this Box to grow with its parent flex container */>
            <MarketPlace />
          </Box>
        </Box>
        <Box

          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Products in Market
            </Typography>
          </Box>

          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid', padding: '8px' }}>Price</th>
                <th style={{ border: '1px solid', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid', padding: '8px' }}>Picture URL</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the data from the endpoint and render each row */}
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>{product.title}

                  </td>

                  <td style={{ borderBottom: '1px solid', padding: '10px' }}>
                    {product.editing === 'price' ? (
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => handlePriceChange(e, product)}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      product.price
                    )}
                    <button onClick={() => handleEdit(product, 'price')}>
                      {product.editing === 'price' ? 'Save' : 'Edit'}
                    </button>
                  </td>
                  <td style={{ borderBottom: '1px solid', padding: '10px' }}>
                    {product.editing === 'quantity' ? (
                      <input
                        type="text"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(e, product)}
                        style={{ width: '60px' }}
                      />
                    ) : (
                      product.quantity
                    )}
                    <button onClick={() => handleEdit(product, 'quantity')}>
                      {product.editing === 'quantity' ? 'Save' : 'Edit'}
                    </button>
                  </td>

                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>
                    <img className='img' src={product.image} alt="Product" />
                  </td>
                  <div className="delete">
                    <button className='deletebtn' onClick={() => handledelete(product)}>
                      Delete from Marketplace
                    </button>
                  </div>

                </tr>
              ))}
            </tbody>
          </table>

        </Box>


        {/* ROW 3 */}



      </Box>
    </Box>
  );
};

export default Dashboard;
