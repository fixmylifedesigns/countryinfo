import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryView(props) {
  const [country, setCountry] = useState({});
  const params = props.match.params.countryName;

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${params}`)
      .then(res => {
        console.log(res.data);
        setCountry(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [params]);

  return (
    <div>
      hello
      {console.log(props.match.params.countryName.split("(")[0])}
    </div>
  );
}

// import React from 'react'

// export default function CaseViewScreen() {
//   return (
//     <View>
//       {console.log(props.caseData)}
//     </View>
//   )
// }

