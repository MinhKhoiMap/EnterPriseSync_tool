import { useEffect, useState } from "react";
import InputGroup from "./components/InputGroup/InputGroup";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleGetProduct = () => {
    fetch(`${url.trim()}/api/products`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);

    console.log(formData.get("product_name"));
    const data = {
      product_name: formData.get("product_name"),
      price: formData.get("price"),
      platform: formData.get("platform"),
    };

    if (data.product_name && !Number.isNaN(data.price) && data.platform) {
      fetch(`${url.trim()}/api/products`, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setName("");
          setPrice("");
          setPlatform("");
          handleGetProduct();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [url]);

  return (
    <div className="App">
      <h1 className="title">Add Product</h1>
      <div
        style={{ margin: "40px 0", display: "flex", justifyContent: "center" }}
      >
        <InputGroup
          label="URL Server"
          name="url"
          value={url}
          setValue={setUrl}
          placeholder="Please enter a URL"
        />
      </div>
      <form onSubmit={handleAddProduct}>
        <div>
          <InputGroup
            label="Product name"
            name="product_name"
            value={name}
            setValue={setName}
            placeholder="Please enter product name..."
          />
          <InputGroup
            label="Price"
            name="price"
            value={price}
            setValue={setPrice}
            placeholder="Please enter product price..."
          />
          <InputGroup
            label="Platform"
            name="platform"
            value={platform}
            setValue={setPlatform}
            placeholder="Please enter platform..."
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <div className="product__title">
        <div>ID Product</div>
        <div>Product name</div>
        <div>Price</div>
        <div>Platform</div>
      </div>
      <div className="list__product">
        {products.map((product) => (
          <div className="product__item" key={product.id_product}>
            <div>{product.id_product}</div>
            <div>{product.product_name}</div>
            <div>{product.price}</div>
            <div>{product.platform}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
