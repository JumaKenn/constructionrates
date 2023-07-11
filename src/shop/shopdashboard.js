import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import SideBar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Contacts from './scenes/contacts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import CreateShopPage from './entry';
import { API_ENDPOINT_1 } from '../apis/api';

function ShopDashboard() {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [hasShop, setHasShop] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const login = () => {
            navigate('/login');
        };

        const fetchShop = async () => {
            try {
                // Make API call to check if the logged-in user has a shop
                const response = await axios.get(`${API_ENDPOINT_1}/apis/checkshop/${user.username}`);
                setHasShop(response.data.hasShop);
                console.log('done fetching');
                setIsLoading(false);
            } catch (error) {
                console.log('Error checking shop:', error);
                setIsLoading(false);
            }
        };

        const checkShopAndRedirect = async () => {
            if (isLoggedIn) {
                console.log(user.username);
                await fetchShop();
                handleRedirect();
            } else {
                // Redirect user if not logged in
                login();
            }
        };

        const handleRedirect = () => {
            if (!hasShop) {
                // Redirect user if they don't have a shop
                setIsLoading(false);

                navigate('/entry');
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
                    <SideBar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
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
