import React from 'react'

export default function Somehting(props) {
  return (
    <div>
      <button onClick={() => {props.click()}}>click</button>
      {props? "yes": "no"}
      {console.log(props)}
    </div>
  )
}
// {caseData.address && caseData.address.formatted ? "caseData.address.formatted": "no address available"}

