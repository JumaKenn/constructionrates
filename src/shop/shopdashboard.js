import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import SideBar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
// import MarketPlace from '../MarketPlace';
import Team from './scenes/team';
import Contacts from './scenes/contacts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import CreateShopPage from './entry';
import { API_ENDPOINT_1 } from '../apis/api';

function ShopDashboard() {
    const { isLoggedIn, user, token, login } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const login = () => {
            navigate('/login');
        };

        const fetchShop = async (username, tokenizer) => {
            try {
                // Make API call to check if the logged-in user has a shop
                const response = await axios.get(`${API_ENDPOINT_1}/apis/checkshop/${username}`,
                    {
                        headers: {
                            Authorization: `Token ${tokenizer}`, // Include the token in the headers
                        },
                    });


                console.log(response.data);
                console.log('that above is the response');
                const hasShop = response.data.exists; // Assuming the response contains a key 'exists' indicating if the shop exists


                console.log('done fetching');
                console.log(hasShop)

                setIsLoading(false);
                return hasShop;
            } catch (error) {
                console.log('Error checking shop:', error);
                setIsLoading(false);
                return false;
            }

        };

        const checkShopAndRedirect = async () => {
            const username = localStorage.getItem('user');
            if (username != null) {
           
            const username = localStorage.getItem('user');
            console.log(username);
            const tokenizer = localStorage.getItem('auth_token');
            // login(username, tokenizer);
            const hasShop = fetchShop(username, tokenizer);
            handleRedirect(hasShop);
            }

        
            else {
                console.log('tokens what?');
                // Redirect user if not logged in
                login();
            }
        };

        const handleRedirect = (hasShop) => {
            console.log(hasShop);
            if (!hasShop) {
                // Redirect user if they don't have a shop
                setIsLoading(false);
                console.log('why?');

                navigate('/entry');
            }
            else {
                console.log('hashop, passes and executes return below');
            }

        };


        checkShopAndRedirect();

    }, [isLoggedIn, user]);

    if (isLoading) {
        // Show loading state while checking for a shop
        return <p>Loading...</p>;
    }

    // Render the shop dashboard
    return (
        <ColorModeContext.Provider value={colorMode}>


            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="notapp">

                    <main className="content">

                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contacts" element={<Contacts />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ShopDashboard;
