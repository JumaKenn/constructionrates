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
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
            
  const tokenizer = localStorage.getItem('auth_token');
  const shopname  = localStorage.getItem('shopname');
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`${API_ENDPOINT_1}/apis/ecommerce/${user}`)
      .then(response => response.json())

      .then(result => {
        setData(result);
        console.log(result);
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your online market" />
        <Box fontstyle="italic" m="20px">
            <p>{shopname}</p>
          </Box>


      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
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
          gridColumn="span 4"
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
              {data.map((product) => (
                <tr key={product.id}>
                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>{product.title}</td>
                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>{product.price}</td>
                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>{product.quantity}</td>
                  <td style={{ borderBottom: '1px solid', padding: '8px' }}>
                    <img className='img' src={product.image} alt="Product" />
                  </td>
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
