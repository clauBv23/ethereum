const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_MSG = 'Hello';
const NEW_MSG = 'New Hello';

beforeEach(async () => {

  // get a list of all accounts
  accounts = await web3.eth.getAccounts()
   
  //use one of those accounts to deploy the contract

  inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments: [INITIAL_MSG]})
      .send({from: accounts[0], gas:'1000000'});
});

describe('Inbox', () => {
  it('deploys the contract', () => {
    assert.ok(inbox.options.address);
  });

  it('initial message', async () => {
    const msg = await inbox.methods.message().call();
    assert.equal(msg, INITIAL_MSG);
  });

  it('change message', async () => {
    // have to use send cuz is a transaction have to add sender 
    await inbox.methods.setMessage(NEW_MSG).send({from: accounts[0]});

    //can use call cuz is just an get, do not change the data
    const newMsg = await inbox.methods.message().call();

    assert.equal(newMsg, NEW_MSG);
  });
})