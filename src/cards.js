import { useState, useEffect } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Row,
    Col,
} from "reactstrap";
import "./cards.css";
import Select from 'react-select'




const Cards = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [locationFilter, setLocationFilter] = useState("");
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        // Check if user location exists in local storage
        const storedLocation = localStorage.getItem("userLocation");
        if (storedLocation) {
            setUserLocation(JSON.parse(storedLocation));
        } else {
            // Fetch user's location using Geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        localStorage.setItem("userLocation", JSON.stringify(location));
                        setUserLocation(location);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        }
    }, []);

    useEffect(() => {
        // Fetch data from the API and set the products state
        fetch("https://django-server-production-5811.up.railway.app/apis/ecommerce/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleLocationFilter = (location) => {
        setLocationFilter(location);

        // Filter products based on location
        if (location === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.location.toLowerCase().includes(location.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
        const earthRadius = 6371; // Radius of the earth in kilometers
        const latDifference = (latitude2 - latitude1) * (Math.PI / 180);
        const lonDifference = (longitude2 - longitude1) * (Math.PI / 180);
        const a =
            Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
            Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.sin(lonDifference / 2) *
            Math.sin(lonDifference / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return distance;
    };

    const sortProductsByDistance = () => {
        const sorted = [...filteredProducts].sort((a, b) => {
            const distanceA = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                a.latitude,
                a.longitude
            );
            const distanceB = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                b.latitude,
                b.longitude
            );

            return distanceA - distanceB;
        });

        setFilteredProducts(sorted);
    };

    const categorizeProducts = () => {
        const categorized = {};

        filteredProducts.forEach((product) => {
            if (!categorized[product.category]) {
                categorized[product.category] = [];
            }

            categorized[product.category].push(product);
        });

        return categorized;
    };

    const handleCategoryFilter = (category) => {
        const categorizedProducts = categorizeProducts();

        if (category === "") {
            setFilteredProducts(products);
        } else if (categorizedProducts[category]) {
            setFilteredProducts(categorizedProducts[category]);
        } else {
            setFilteredProducts([]);
        }
    };
    const getUniqueCategories = () => {
        const categories = [...new Set(filteredProducts.map(product => product.category))];
        return categories;
    };

    return (
        <div className="cardsnew">
            <div className="sidebar">
                <div className="top-right">

                    {/* Sort products by distance button */}
                    <Button className="sort-button" onClick={sortProductsByDistance}>Sort by Distance</Button>
                </div>
                <div className="search">
                    <Select
                        isSearchable
                        placeholder='Search'
                    />
                </div>
            </div>
            <div className="categories">
                <ul className="listed">
                    <h3>Categories</h3>
                    {getUniqueCategories().map(category => (
                        <li key={category} onClick={() => handleCategoryFilter(category)}>{category}</li>
                    ))}
                </ul>
            </div>
            {getUniqueCategories().map(category => (
                <div className="products" key={category}>
                    <h1>{category}</h1>
                    {/* Render filtered products of the current category as cards */}
                    <Row>
                        {filteredProducts
                            .filter(product => product.category === category)
                            .map((product, index) => (
                                <Col md="6" lg="3" key={index}>
                                    <div className="card-image-container">
                                        <CardImg className="img" alt="Product Image" src={product.image} top width="200%" />
                                    </div>
                                    <CardBody className="cardfbody">
                                        <CardTitle tag="h5" className="product-title">{product.title}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">{product.subtitle}</CardSubtitle>
                                        <CardText className="product-description">{product.description}</CardText>
                                        <CardText className="product-description">Avg. price: {product.price} KES</CardText>
                                        <div>
                                            <Button className="read-more-button">View Suppliers</Button>
                                        </div>
                                    </CardBody>
                                </Col>
                            ))}
                    </Row>
                </div>
            ))}
        </div>
    );
}


export default Cards;
