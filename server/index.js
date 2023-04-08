const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');
const { toHex } = require('ethereum-cryptography/utils');
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
const rt = toHex(root);
const rot = rt.slice(0,2);
const isInTheList = true;

const MERKLE_ROOT = rot ;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = req.body.name;
  const prof = req.body.proof;

  // TODO: prove that a name is in the list 

  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  if(prof === proof)
  {console.log( verifyProof(proof, name, root) );}

  if(verifyProof === true)
  { isInTheList = true;}
  else
  { isInTheList = false;}

  if(isInTheList===true) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list ");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
