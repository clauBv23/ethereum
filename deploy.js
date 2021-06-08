const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider('cost awesome plate toast oven destroy test decrease absurd worth before maze', 
    'https://rinkeby.infura.io/v3/6de45858818c4000983a6fe02630f898');

const web3 = new Web3(provider);

const INITIAL_MSG = "Hi there";
const deploy = async ()=>{

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting deploy from account  ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INITIAL_MSG]})
        .send({from: accounts[0], gas:'1000000'});

  console.log("Contract deployed to address ",result.options.address);
};

deploy();