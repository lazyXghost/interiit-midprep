import React, { useRef } from "react";
import { connectBlockchain } from "./web3/web3";

var web3;
async function setup() {
  web3 = await connectBlockchain();
}
setup();

var users_count = 0;

function App() {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const userNoRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    users_count++;
    await web3.contracts.UserContract.methods
      .storeUser(users_count, nameRef.current.value, ageRef.current.value)
      .send({ from: web3.account })
      .once("receipt", (receipt) => {
        console.log("Transaction Number:", receipt.transactionIndex);
        console.log("Block Number:", receipt.blockNumber);
        console.log("Block Hash:", receipt.blockHash);
        console.log("Transaction Hash:", receipt.transactionHash);
      });
    formRef.current.reset();
  }

  async function fetchUser(e) {
    e.preventDefault();

    var user = await web3.contracts.UserContract.methods
      .users(userNoRef.current.value)
      .call();
    if (user.Name !== "") {
      document.getElementById("user").innerHTML = `${user.Name}, ${user.Age}`;
    } else {
      document.getElementById("user").innerHTML = ``;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" ref={nameRef} />
        <br />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" ref={ageRef} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      <form onSubmit={fetchUser}>
        <label htmlFor="serialNo">SerialNo:</label>
        <input type="number" name="serialNo" id="serialNo" ref={userNoRef} />
        <button type="submit">Submit</button>
      </form>
      <div id="user"></div>
    </>
  );
}

export default App;
