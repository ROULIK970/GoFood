import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [foodCat, setFoodCat] = useState();
  const [foodItem, setFoodItem] = useState();
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(
      "https://go-food-api-ten.vercel.app/api/fooddata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setFoodItem(response[1] || []);
    setFoodCat(response[0] || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "fill !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastry"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/500×500/?barbeque"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container ">
        {foodCat.length ? (
          foodCat.map((data) => (
            <div
              key={data._id}
              className="row mb-3 gap-3 justify-content-center"
            >
              {data.CategoryName.toLowerCase().includes(
                search.toLowerCase()
              ) && (
                <div className="fs-3 m-3 text-center">{data.CategoryName}</div>
              )}
              <hr />
              {foodItem.length &&
                foodItem
                  .filter((item) => {
                    return (
                      item.CategoryName === data.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    );
                  })
                  .map((filteredItems) => (
                    <div
                      key={filteredItems._id}
                      className="col-12 col-md-6 col-lg-3 p-5 "
                    >
                      <Card foodItems={filteredItems} />
                    </div>
                  ))}
            </div>
          ))
        ) : (
          // Optional: You can render a loading indicator or a message here
          <div>Loading...</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
