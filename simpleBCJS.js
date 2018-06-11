// JavaScript Document
/*
Simple Blockhcchain: excludes proof of work, consensus, peer to peer, check for sufficient amount
Just to provide an example of data structure and hashing function.

*/

//imports nodeJS module see https://nodejs.org/api/crypto.html
const SHA256 = require('crypto-js/sha256');

//class of the data structure of each block 
//and includes the hashing function
class Block 
{
	constructor(index, timestamp, data, previousHash = ''){
		//arguments for constructor function
	//initialising properties of class
		this.index = index;
		this.timeStamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	
	calculateHash()
	{
		return SHA256(this.index + this.previousHash + this.timeStamp +JSON.stringify(this.data)).toString();
		

	}
	
}

//BLOCKCHAIN Class
class Blockchain
{
	constructor()
	{
		this.chain = [this.createGenesisBlock()];
		
	}
	
	createGenesisBlock(){
		//block data, index, timestamp, data, previousHash
		return new Block(0, "1982/07/17","MashaBlock","includeMaya");
	}
	
	//Retrieves last block 
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
		
	}
	isChainValid(){
		for(let i = 1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			if (currentBlock.previousHash !==previousBlock.hash){
				
				return false;
							}
			
						}
				return true;
				}
		}

let MashaCoin = new Blockchain();
MashaCoin.addBlock(new Block(1,"1986/04/22",{amount:1}));
MashaCoin.addBlock(new Block(1,"1986/06/21",{amount:21}));

console.log(JSON.stringify(MashaCoin,null,4));
console.log("Is MashaCoin Chain valid:" + MashaCoin.isChainValid());



/*
Classes: Block, BlockChain
Functions:
	Block: contructor(genesis), calculate hash
	Blockchain: constructor (chain)
		create BlockGenesisBlock
			This takes the Block class as a parameter
		getLatestBlock get the last block
		addBlock 
			
*/