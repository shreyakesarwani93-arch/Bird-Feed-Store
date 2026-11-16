"use client";

import { useState, useEffect } from "react";



export default function Home() {
  const products = [
  {
    id: 1,
    name: "Bird Seed Blends",
    description:
      "Nutritious fortified seed blends for birds. A healthy food mix for pet birds.",
    category: "Bird Food",
    price: 299,
    image: "/bird-seed.jpg",
    details:
      "Fortified seed blends made for pet birds. Store in a cool and dry place."
  },
  {
    id: 2,
    name: "Timothy Hay",
    description:
      "Fresh green Timothy hay for rabbits and guinea pigs.",
    category: "Rabbit Food",
    price: 399,
    image: "/timothy-hay.webp",
    details:
      "Natural dried Timothy hay. A useful source of fibre for rabbits and guinea pigs."
  },
  {
    id: 3,
    name: "Calcium Blocks",
    description:
      "Compressed mineral calcium blocks for healthy small pets.",
    category: "Rabbit Food",
    price: 199,
    image:"/calcium-blocks.jpg",
    details:
      "Mineral calcium blocks for small pets. Provide according to the product instructions."
  },
  {
    id: 4,
    name: "Aspen Wood Shavings",
    description:
      "Clean aspen wood shavings for small animal bedding.",
    category: "Bedding",
    price: 249,
    image:"/aspen-shavings.jpg",
    details:
      "Clean wood shavings for small animal bedding. Keep bedding dry and replace when needed."
  }
];


useEffect(() => {
  fetch("http://bird-feed-store.onrender.com/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
}, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart,setCart] = useState([]);
  const [showCart,setShowCart] = useState(false);
  const [showCheckout,setShowCheckout] = useState(false);
 
  const addToCart = (product) => {
  setCart((previousCart) => {
    const existingProduct = previousCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return previousCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previousCart, { ...product, quantity: 1 }];
  });

  setSelectedProduct(null);
  alert("Product added to cart!");
};
 
  const changeQuantity = (productId, amount) => {
  setCart((previousCart) =>
    previousCart.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + amount)
          }
        : item
    )
  );
};
  
  const categories = [
    "All",
    "Bird Food",
    "Rabbit Food",
    "Bedding"
  ];

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f5",
        padding: "35px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#176b50",
          fontSize: "36px",
          marginBottom: "8px"
        }}
      >
        Bird Feed Store
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "30px"
        }}
      >
        Healthy Food & Bedding for Your Pets
      </p>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <button
    onClick={() => setShowCart(!showCart)}
    style={{
      background: "#176b50",
      color: "white",
      border: "none",
      padding: "12px 25px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold"
    }}
  >
    🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
  </button>
</div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "block",
          width: "min(100%, 500px)",
          padding: "14px",
          margin: "0 auto 20px",
          border: "1px solid #bbb",
          borderRadius: "10px",
          fontSize: "16px",
          outline: "none"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "35px"
        }}
      >
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            style={{
              padding: "11px 22px",
              borderRadius: "25px",
              border: "1px solid #176b50",
              background: category === item ? "#176b50" : "white",
              color: category === item ? "white" : "#176b50",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "0.2s"
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#222"
        }}
      >
        Our Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "25px",
          maxWidth: "1150px",
          margin: "auto"
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                background: "white",
                padding: "18px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
              }}
            >
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "190px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  backgroundColor: "#eef3ef"
                }}
              />

              <h3 style={{ color: "#176b50", marginTop: "15px" }}>
                {product.name}
              </h3>

              <p
                style={{
                  color: "#555",
                  minHeight: "45px",
                  fontSize: "14px"
                }}
              >
                {product.description}
              </p>

              <p
                style={{
                  color: "#777",
                  fontSize: "13px"
                }}
              >
                {product.category}
              </p>

              <h3 style={{ color: "#176b50" }}>₹{product.price}</h3>

              <button
                onClick={() => setSelectedProduct(product)}
                style={{
                  background: "#238565",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                View Product
              </button>
              <button
  onClick={() => addToCart(product)}
  style={{
    background: "#176b50",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "10px"
  }}
>
  Add to Cart 🛒
</button>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "red",
              fontSize: "18px"
            }}
          >
            Product Not Found!
          </p>
        )}
      </div>

      {showCart && (
  <div
    style={{
      background: "white",
      maxWidth: "800px",
      margin: "30px auto",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
    }}
  >
    <h2 style={{ color: "#176b50", textAlign: "center" }}>
      My Shopping Cart 🛒
    </h2>

    {cart.length === 0 ? (
      <p style={{ textAlign: "center", color: "#777" }}>
        Your Cart is Empty!
      </p>
    ) : (
      <>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              padding: "15px 0",
              borderBottom: "1px solid #ddd"
            }}
          >
            <div>
              <h3 style={{ color: "#176b50" }}>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ₹{item.price * item.quantity}</p>
            </div>

            <div>
              <button onClick={() => changeQuantity(item.id, -1)}>
                -
              </button>

              <span style={{ margin: "0 12px" }}>
                {item.quantity}
              </span>

              <button onClick={() => changeQuantity(item.id, 1)}>
                +
              </button>

              <button
                onClick={() =>
                  setCart((previousCart) =>
                    previousCart.filter((product) => product.id !== item.id)
                  )
                }
                style={{
                  marginLeft: "10px",
                  background: "#d9534f",
                  color: "white",
                  border: "none",
                  padding: "7px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <h2 style={{ textAlign: "right", color: "#176b50" }}>
          Total: ₹
          {cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </h2>
        <button
          onClick={() => setShowCheckout(true)}
          style={{
            background: "#176b50",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "7px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Proceed to Checkout
        </button>
      </>
    )}

    <button
      onClick={() => setShowCart(false)}
      style={{
        background: "#176b50",
        color: "white",
        border: "none",
        padding: "11px 22px",
        borderRadius: "7px",
        cursor: "pointer"
      }}
    >
      Close Cart
    </button>
  </div>
)}
     {showCheckout && (
        <div
          style={{
            background: "white",
            maxWidth: "500px",
            margin: "30px auto",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ color: "#176b50", textAlign: "center" }}>
            Checkout Details
          </h2>

          <input
            type="text"
            placeholder="Enter Your Name"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "7px"
            }}
          />

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "7px"
            }}
          />

          <button
            onClick={() => alert("Order placed successfully!")}
            style={{
              background: "#176b50",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer"
            }}
          >
            Place Order
          </button>

          <button
            onClick={() => setShowCheckout(false)}
            style={{
              marginLeft: "10px",
              padding: "12px 20px",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      )}
    
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              width: "min(100%, 450px)",
              textAlign: "center",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
                borderRadius: "10px",
                backgroundColor: "#eef3ef"
              }}
            />

            <h2 style={{ color: "#176b50", marginTop: "15px" }}>
              {selectedProduct.name}
            </h2>

            <p style={{ color: "#444" }}>{selectedProduct.description}</p>

            <p style={{ color: "#333" }}>
              <strong>Category:</strong> {selectedProduct.category}
            </p>

            <h3 style={{ color: "#176b50" }}>
              Price: ₹{selectedProduct.price}
            </h3>

            <p style={{ color: "#555", fontSize: "14px" }}>
              {selectedProduct.details}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                background: "#176b50",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "7px",
                cursor: "pointer",
                marginTop: "10px",
                fontWeight: "bold"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
