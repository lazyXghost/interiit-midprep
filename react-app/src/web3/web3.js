const Web3 = require("web3");
const {
  User_ADDRESS,
  User_ABI,
} = require("./contract");

async function connectBlockchain() {
  const web3Port = 7545;
  const web3 = new Web3(`http://localhost:${web3Port}`);
  var web3Accounts = await web3.eth.getAccounts();
  var account = web3Accounts[0];

  const contracts = {
    UserContract: new web3.eth.Contract(User_ABI, User_ADDRESS),
  };

  return { account: account, contracts: contracts };
}

module.exports = { connectBlockchain };
