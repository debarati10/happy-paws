import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <div>
            <img src="https://images-static.nykaa.com/uploads/76016fec-6880-453c-953e-41ed84d88bc1.jpg?tr=w-2400,cm-pad_resize" alt="Cat food" width="1350px" className="home-banner" />  
            <img src="https://pawrulz.com/wp-content/uploads/2022/08/Sheba_Brand_Banner_2400X800-1.webp" alt="Cat food" width="1350px" className="home-banner" />
            <div className="featured-products-container container mt-4">
                <h2>Last products</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            <div className="sale__banner--container mt-4">
                <img src="https://cdn.shopify.com/s/files/1/0521/5784/1585/collections/pedigree_2bcc1686-d9dd-4af0-b20a-6f9efaf2a628.jpg?v=1639136219" alt=""  />
                <img src="https://m.media-amazon.com/images/S/aplus-media/sota/f5dd3013-e046-4040-bd63-2576f5763ded._CR0,0,970,300_PT0_SX970__.png " alt="" width="1350px"/>
            </div>
            <div className="recent-products-container container mt-4">
                
            </div>
        </div>
    );
}

export default Home;