//XEM automated cosignature with NodeJs :)

// include the required class
NEM     = require('./NEM.js');

/*
define the initial configuration parameters
if not defined the defaults will be used
WARNING use only a local NIS.
*/
//var conf = { 'nis_address': 'go.nem.ninja'};

// create an instance using a user defined configuration options
var nem = new NEM();

//Every 1 minutes, we check for unconfirmed transactions
var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {

//Now we poll the unconfirmed transactions using local NCC
//Below you need to set the cosignatory account
var data = {
    account: "NCSRY3X454ZCT4OQQJZBBCPKFMEMXKXMR4M6Y62N"
};

//Initiate signature request
var XEMsign = function(data) {

//output a pretty formated JSON text
    var d = JSON.stringify(data,null,4);
    console.log(d);

//parsing Json to get the multisig transaction hash
obj = JSON.parse(d);
dataHash = obj.transactions[0].innerHash.data;

// MultisigSignatureRequest model view
var transac = {
wallet: "YourWallet",
password: "PasswordForThisWallet",
account: "TheCosignatoryAccount",
multisigAddress: "TheMultisigAccount",
innerHash:  {
                data: dataHash
            },
hoursDue: 24,
fee: 6000000
};

//output a pretty formated JSON text
var toPrettyJson = function(transac) {
    var e = JSON.stringify(transac,null,4);
    console.log(e);
};

//Sign transaction
nem.nccPost('/wallet/account/signature/send',transac
    ,function(err) {
        console.log(err);
    }
    ,toPrettyJson
);


};

//Pull unconfirmed transactions in cosignatory account
nem.nccPost('/account/transactions/unconfirmed',data
    ,function(err) {
        console.log(err);
    }
    ,XEMsign
);

  console.log("Done");

}, the_interval);
