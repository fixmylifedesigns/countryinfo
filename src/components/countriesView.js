import React from "react";
import CountryCard from "./materialUI/countryCards";

export default function CountriesView(props) {
  let countries = props.countries;

  return (
    <div>
      {console.log(countries)}
      {countries.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          {" "}
          {countries.length > 0 &&
            countries.map(country => {
              return (
                <div style={{}}>
                  <CountryCard country={country} page={props.page}/>
                </div>
              );
            })}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
