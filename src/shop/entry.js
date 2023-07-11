import React, { useState, useContext } from 'react';
import { useForm } from "react-cool-form";
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './entry.css';
import { API_ENDPOINT_1 } from '../apis/api';

const Field = ({ label, id, ...rest }) => (
    <div className="form-field">
        <p htmlFor={id}>{label}</p>
        <input id={id} {...rest} />
    </div>
);

const Select = ({ label, id, children, ...rest }) => (
    <div className="form-field">
        <label htmlFor={id}>{label}</label>
        <select id={id} {...rest}>
            {children}
        </select>
    </div>
);

const Textarea = ({ label, id, ...rest }) => (
    <div className="form-field">
        <p htmlFor={id}>{label}</p>
        <textarea id={id} {...rest} />
    </div>
);

const CreateShopPage = () => {
    const [shopName, setShopName] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [shopPhoneNo, setShopPhoneNo] = useState('');
    const [shopEmail, setShopEmail] = useState('');
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateShop = async (values, options, e) => {

        // Perform shop creation logic here
        // You can access the entered shop details using the state variables
        console.log('Shop Name:', shopName);
        console.log('Shop Location:', shopLocation);
        console.log('Shop Phone Number:', shopPhoneNo);
        console.log('Shop Email:', shopEmail);
        console.log('user:', user.username);

        try {
            const shop = {

                shop_owner: user.username,
                shopname: shopName,
                location: shopLocation,
                phone_no: shopPhoneNo,
                email: shopEmail,

            };

            console.log(shop);

            const response = await axios.post(`${API_ENDPOINT_1}/apis/createshop/`, { shop });

            console.log(response.data); // Handle success response
        } catch (error) {
            if (error.response) {
                console.log(error.response.data); // Handle error response
                setErrorMessage(error.response.data.message); // Store error message in state
            } else {
                console.log('An error occurred:', error.message); // Handle generic error
                setErrorMessage('An error occurred. Please try again.'); // Store generic error message in state
            }
        }
    };

    const { form, use } = useForm({
        defaultValues: { shopName: "", shopLocation: "", shopPhoneNo: "", shopEmail: "" },
        onSubmit: handleCreateShop,
        onError: (errors, options, e) => {
            console.log("onError: ", errors);
        }
    });

    const isSubmitting = use("isSubmitting");

    return (
        <div className="create-shop-page">
            <h1>Create Shop</h1>
            <form ref={form} noValidate onSubmit={handleCreateShop}>
                <Field label="Shop Name" id="shop-name" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                <Field label="Shop Location" id="shop-location" name="shopLocation" value={shopLocation} onChange={(e) => setShopLocation(e.target.value)} />
                <Field label="Shop Phone Number" id="shop-phoneno" name="shopPhoneNo" value={shopPhoneNo} onChange={(e) => setShopPhoneNo(e.target.value)} />
                <Field label="Shop Email" id="shop-email" name="shopEmail" value={shopEmail} onChange={(e) => setShopEmail(e.target.value)} />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create Shop"}
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default CreateShopPage;
