import React, { useEffect, useState } from 'react';
import './ecommerce.css'


const ItemComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const sections = {
        section1: ['item1', 'item2', 'item3'],
        section2: ['item4', 'item5', 'item6'],
    };

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://127.0.0.1:8000/apis/ecommerce/')
            .then(response => response.json())

            .then(result => {
                setData(result);
                console.log(result);
                setLoading(false); // Set loading to false after data is fetched
            });
    }, []);

    const renderItem = (item) => {
        // Render an individual item
        return (
            <div key={item.itemName}>
                <h2>{item.itemName}</h2>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <img src={item.picture} alt={item.itemName} />
            </div>
        );
    };

    if (loading) {
        // Display loading indicator while data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div>
            {Object.entries(sections).map(([section, items]) => {
                const sectionItems = data.filter(item => items.includes(item.itemName));

                return (
                    <div key={section}>
                        <h2>{section}</h2>
                        <div style={{ display: 'flex' }}>
                            {sectionItems.map(renderItem)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ItemComponent;
