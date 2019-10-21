import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import CountriesView from "./components/countriesView";
import IntegrationReactSelect from "./components/materialUI/countrySearch";
import { Route, Link } from "react-router-dom";
import CountryView from "./components/countryView";
import Somehting from "./components/somehting";

function App() {
  const [countries, setCountries] = useState({});
  const [allCountries, setAllCountries] = useState();
  const [page, setPage] = useState({ start: 0, end: 10, number: 1 });
  const [pageChange, setPageChange] = useState(false);
  const [pageButton, setPageButton] = useState({ down: null, up: null });

  useEffect(() => {
    var config = {
      headers: { "X-My-Custom-Header": "Header-Value" }
    };
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data.slice(page.start, page.end));
        setAllCountries(res.data);
        if (res.data.slice(page.start + 10, page.end + 10).length === 0) {
          setPageButton({ down: null, up: false });
          console.log("set");
        } else if (page.start === 0) {
          setPageButton({ down: false, up: true });
        } else {
          setPageButton({ down: null, up: true });
        }
        setPageChange(false);
      })
      .catch(err => {
        // console.log(err);
      });
    // console.log(page);
  }, [page]);

  const pageHandler = (choice, pageNumber) => {
    const newStart = page.start + choice;
    const newEnd = page.end + choice;
    setPageChange(true);
    setPage({ start: newStart, end: newEnd, number: page.number + pageNumber });
  };

const click = () => {
  console.log("something")
}

  const pageControl = () => {
    return (
      <div>
        <button
          onClick={() => {
            pageHandler(-10, -1);
          }}
          disabled={pageButton.down === false ? "true" : ""}
        >
          down
        </button>
        {page.number}
        <button
          onClick={() => {
            pageHandler(10, 1);
          }}
          disabled={pageButton.up === false ? "true" : ""}
        >
          up
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>

        <IntegrationReactSelect allCountries={allCountries} />
        <p className="App-link">Countries</p>
      </header>
      <Somehting click={click}/>
      {/* {console.log(allCountries)} */}
      {/* <CountriesView countries={countries} page={pageChange} /> */}
      <Route
        exact
        path="/"
        component={() => (
          <div>
            {pageControl()}
            <CountriesView countries={countries} page={pageChange} />
            {pageControl()}
          </div>
        )}
      />

      <Route exact path="/country/:countryName" component={CountryView} />
    </div>
  );
}

export default App;
