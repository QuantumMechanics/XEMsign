//XEM automated cosignature with NodeJs :)

// include the required class
NEM     = require('./NEM.js');

// create an instance using default configuration options
var nem = new NEM();

var start = "Starting..."
console.log(start);

//Starting with 0
var dailyAmount = 0;
var amount = [];
var time = 0;

//Every 5 minutes, we check for unconfirmed transactions
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {

	//If 24h => reset amount
	if (time == 1440 * 60 * 1000)
	{
		amount = 0;
	}

//Now we pull the unconfirmed transactions using local NCC
//Below you need to set the cosignatory account
var data = {
    account: "TheCosignatoryAccount"
};

//Initiate signature request
var XEMsign = function(data) {

//output a pretty formated JSON text
    var d = JSON.stringify(data,null,4);
    /*console.log(d);*/ //show all the pull

//parsing Json to get the multisig transaction hash
obj = JSON.parse(d);
totalUnconfirmed = obj.transactions.length;
var i;
var dataHash = [];
for (i = 0; i < totalUnconfirmed; i++)
{
dataHash[i] = obj.transactions[i].innerHash.data;
console.log("Transaction hash:");
console.log(dataHash[i]);

//parsing Json to get the amount for daily amount 
obj2 = JSON.parse(d);
dailyAmount += obj.transactions[i].inner.amount/1000000;
console.log("Dayli amount:");
console.log(dailyAmount);

//parsing Json to get the amount
obj3 = JSON.parse(d);
amount[i] = obj.transactions[i].inner.amount/1000000;
console.log("Transaction amount:");
console.log(amount[i]);

// MultisigSignatureRequest model view (put your informations below, dataHash is automatically set from pulling unconfirmed transactions)
var transac = [];
transac[i] = {
wallet: "YourWallet",
password: "PasswordForThisWallet",
account: "TheCosignatoryAccount",
multisigAddress: "TheMultisigAccount",
innerHash: {
data: dataHash[i]
},
hoursDue: 24,
fee: 6000000
};

//output a pretty formated JSON text
var toPrettyJson = function(transac) {
    var e = JSON.stringify(transac,null,4);
    console.log(e);
};


//Maximal Amount is 100 XEM
if (amount[i] > 100)
{
	console.log("There is a problem, only 100 XEMs transaction allowed !");
	console.log("Following Transaction cause problems:");
	console.log(dataHash[i]);
	return; //In this case we stop cosigning
}
//Maximum dayliAmount is 100000 XEM
else if (dailyAmount < 100000)
{
//Sign transaction
nem.nccPost('/wallet/account/signature/send',transac[i]
    ,function(err) {
        console.log(err);
    }
    ,toPrettyJson
);
	console.log("Total transactions: ");
	console.log(totalUnconfirmed);
	time =+ minutes * 60 * 1000;
	console.log("Done");

}
	else{
		var bigDay = "MAXIMAL AMOUNT REACHED !";
		console.log(bigDay);
		time =+ minutes * 60 * 1000;
	}

} //end for

};

//Pull unconfirmed transactions from cosignatory account
nem.nccPost('/account/transactions/unconfirmed',data
    ,function(err) {
        console.log(err);
    }
    ,XEMsign
);

}, the_interval);
