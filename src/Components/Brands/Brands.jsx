import React, { useMemo, useState } from 'react';

export default function Brands() {
  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)

  function changeCounter1() {
    setCounter1(counter1 + 1)
    console.log("Hi from changeCounter1");
  }

  function changeCounter2() {
    console.log("Hi from changeCounter2");
    return "changeCounter2"
  }

  let value = useMemo(changeCounter2, [counter2])


  return <>
    <h1>Brands</h1>

    <div className="row text-center">
      <div className="col-md-6">
        <h1>counter1</h1>
        <h2>{counter1}</h2>
        <button className='btn btn-outline-dark' onClick={changeCounter1}>changeCounter1</button>
      </div>
      <div className="col-md-6">
        <h1>counter2</h1>
        <h2>{counter2}</h2>
        <button className='btn btn-outline-dark'>{value}</button>
      </div>
    </div>
  </>
}
