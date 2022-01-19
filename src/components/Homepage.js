import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useState, useEffect } from "react";

function Homepage() {
  const [listOfData, setListOfData] = useState([]);
  const [uniqueProductList, setUniqueProductList] = useState([]);
  const [uniqueStateList, setUniqueStateList] = useState([]);
  const [uniqueCityList, setUniqueCityList] = useState([]);
  const [productName, setProductName] = useState("Products Name");
  const [listOfProducts, setListOfProducts] = useState([]);
  const [stateName, setStateName] = useState("State");
  const [cityName, setCityName] = useState("City");

  useEffect(async () => {
    const listOfData = await fetch("https://assessment-edvora.herokuapp.com/");
    console.log(listOfData.response);
    const extractedData = await listOfData.json();
    console.log(extractedData);
    setListOfData(extractedData);
    setListOfProducts(extractedData);

    const productList = extractedData
      .map((item) => item.product_name)
      .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueProductList(productList);

    const stateList = await extractedData
      .map((item) => item.address.state)
      .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueStateList(stateList);

    const cityList = await extractedData
      .map((item) => item.address.city)
      .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueCityList(cityList);
  }, []);

  const leftSlide = () => {
    let element = document.querySelector(".products");
    element.scrollLeft = element.scrollLeft - 700;
  };

  const rightSlide = () => {
    let element = document.querySelector(".products");
    element.scrollLeft = element.scrollLeft + 700;
  };

  const leftSlideBottom = () => {
    let element = document.querySelector("#products");
    element.scrollLeft = element.scrollLeft - 700;
  };

  const rightSlideBottom = () => {
    let element = document.querySelector("#products");
    element.scrollLeft = element.scrollLeft + 700;
  };

  useEffect(() => {
    const filteredProduct = listOfData.filter((item) => {
      return productName === "Products Name" &&
        stateName === "State" &&
        cityName === "City"
        ? true
        : productName !== "Products Name" &&
          stateName !== "State" &&
          cityName !== "City"
        ? item.product_name === productName &&
          item.address.state === stateName &&
          item.address.city === cityName
        : productName === "Products Name" &&
          stateName !== "State" &&
          cityName !== "City"
        ? item.address.state === stateName && item.address.city === cityName
        : productName !== "Products Name" &&
          stateName === "State" &&
          cityName !== "City"
        ? item.product_name === productName && item.address.city === cityName
        : productName !== "Products Name" &&
          stateName !== "State" &&
          cityName === "City"
        ? item.product_name === productName && item.address.state === stateName
        : productName !== "Products Name" &&
          stateName === "State" &&
          cityName === "City"
        ? item.product_name === productName
        : productName === "Products Name" &&
          stateName === "State" &&
          cityName !== "City"
        ? item.address.city === cityName
        : item.address.state === stateName;
    });
    setListOfProducts(filteredProduct);
  }, [productName, stateName, listOfData, cityName]);

  const productChangeHandler = (e) => {
    setProductName(e.target.value);
  };

  const stateChangeHandler = (e) => {
    setStateName(e.target.value);
  };

  const cityChangeHandler = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div className="containers">
      <div className="division-filter">
        <div>
          <h3>Filters</h3>
          <div className="bar" />
        </div>

        <div className="filter-items">
          <select
            name="products"
            className="combobox"
            onChange={productChangeHandler}
          >
            <option value="Products Name">Products</option>
            {uniqueProductList.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
          <select
            name="state"
            className="combobox"
            onChange={stateChangeHandler}
          >
            <option value="State">State</option>
            {uniqueStateList.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
          <select name="city" className="combobox" onChange={cityChangeHandler}>
            <option value="City">City</option>
            {uniqueCityList.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="divison-products">
        <h1>Edvora</h1>
        <h3>Products</h3>
        <p>{productName}</p>
        <div className="bar1" />
        <MdArrowBackIos size={30} className="left-slider" onClick={leftSlide} />
        <div className="products">
          <div className="cards">
            {listOfProducts.map((data, index) => (
              <div key={index} className="product-details">
                <div className="left-side-pd">
                  <img src={data.image} className="image" alt="no img" />
                  <p>
                    {data.address.state}
                    <br />
                    {data.address.city}
                  </p>
                </div>
                <div className="right-side-pd">
                  <p>{data.product_name}</p>
                  <p>{data.brand_name}</p>
                  <p>$ {data.price}</p>
                  <p>
                    Date:{" "}
                    {data.date.slice(0, 10).split("-").reverse().join(":")}
                  </p>
                </div>
                <div className="description">{data.discription}</div>
              </div>
            ))}
          </div>
        </div>
        <MdArrowForwardIos
          size={30}
          className="right-slider"
          onClick={rightSlide}
        />

        <p>{productName}</p>
        <div className="bar2" />
        <MdArrowBackIos
          size={30}
          className="left-slider-bottom"
          onClick={leftSlideBottom}
        />
        <div className="products" id="products">
          <div className="cards">
            {listOfProducts.map((data, index) => {
              return (
                <div key={index} className="product-details">
                  <div className="left-side-pd">
                    <img src={data.image} className="image" alt="no image" />
                    <p>
                      {data.address.state}
                      <br />
                      {data.address.city}
                    </p>
                  </div>
                  <div className="right-side-pd">
                    <p>{data.product_name}</p>
                    <p>{data.brand_name}</p>
                    <p>$ {data.price}</p>
                    <p>
                      Date:{" "}
                      {data.date.slice(0, 10).split("-").reverse().join(":")}
                    </p>
                  </div>
                  <div className="description">{data.discription}</div>
                </div>
              );
            })}
          </div>
        </div>
        <MdArrowForwardIos
          size={30}
          className="right-slider-bottom"
          onClick={rightSlideBottom}
        />
      </div>
    </div>
  );
}

export default Homepage;
