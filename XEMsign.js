console.log("\n");
console.log("======== XEMsign - Automated cosignature ========");
console.log("=================================================");
console.log("\n");

var fs = require('fs'); 
//Check access.json
if (fs.existsSync('./access.json')) {
	console.log("Enter a password to encrypt access.json:");
	var SecureConf = require('secure-conf');
	var sconf      = new SecureConf();
	
	//Encryption
	sconf.encryptFile(
	    "./access.json",
	    "./access.json.enc",
	    function(err, f, ef, ec) {
		if (err) {
		    console.log("failed to encrypt %s, error is %s", f, err);
		} else {
		    console.log("\n");
		    console.log("encrypt %s to %s complete.", f, ef);
		    console.log("encrypted contents are %s", ec);
		    console.log("\n");
		    console.log("NOW DELETE access.json, EMPTY YOUR BIN AND RESTART XEMsign");
		    console.log("\n");
		}
	    }
	);
}
	else{
	console.log("Enter your password start XEMsign:");
	var SecureConf = require('secure-conf');
	var sconf      = new SecureConf();
	var ef         = "./access.json.enc";
	var express    = require('express');
	var app        = express();
	
	//Decryption
	sconf.decryptFile(ef, function(err, file, content) {
                if (err) {
		      console.log("Wrong password !"); //Not showing up... But big error log. Program stop.
                   // console.log('Failed to decrypt %s, error is %s', file, err);
                } else {
		    console.log("\n");
                    console.log("decrypt %s complete.", file);
                }

		//Parsing decrypted content
		var auth = JSON.parse(content);
			var _wallet = auth.wallet;
			var _password = auth.walletPassword;
			var _cosignatoryAccount = auth.cosignatoryAccount;
			var _multisigAddress = auth.multisigAddress;
			var _hoursDue = auth.hoursDue;
			var _fee = auth.fee;
			var _timer = auth.timer;
			var _dailyTimer = auth.timer;
			var _maxAmount = auth.maxAmount;
			var _maxDayliAmount = auth.maxDayliAmount;
		   
			//Setting the timer
			var the_interval = _timer * 60 * 1000;
			
			 console.log("Success...");
			 console.log("\n");
			 console.log("Starting first check in", _timer, "minutes");

			// include the required class
			NEM     = require('./NEM.js');

			// create an instance using default configuration options
			var nem = new NEM();

			//Starting with 0
			var dailyAmount = 0;
			var amount = [];
			var time = 0;

			//Every 5 minutes, we check for unconfirmed transactions
			setInterval(function() {

				//If 24h => reset dailyAmount
				if (time == _dailyTimer * 60 * 1000)
				{
					dailyAmount = 0;
				}

			//Now we pull the unconfirmed transactions using local NCC
			var data = {
			    account: _cosignatoryAccount
			};

			//Initiate signature request
			var XEMsign = function(data) {

			//output a pretty formated JSON text
			    var d = JSON.stringify(data,null,4);
			    //console.log(d); //show all the pull 

			//parsing Json
			obj = JSON.parse(d);
			
			//Get total unconfirmed tx number
			totalUnconfirmed = obj.transactions.length;

			if (totalUnconfirmed == 0)
			{
				console.log("\n");
				console.log("No transaction to sign. Waiting...");
			}
			else
			{
			var i;
			var dataHash = [];
			for (i = 0; i < totalUnconfirmed; i++) //We batch tx
			{
			//Get inner hashes
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

			// MultisigSignatureRequest (contain your decrypted informations and transaction parameters)
			var transac = [];
			transac[i] = {
			wallet: _wallet,
			password: _password,
			account: _cosignatoryAccount,
			multisigAddress: _multisigAddress,
			innerHash:  {
					data: dataHash[i]
				    },
			hoursDue: _hoursDue,
			fee: _fee
			};

			//output a pretty formated JSON text
			var toPrettyJson = function(transac) {
			    var e = JSON.stringify(transac,null,4);
			    console.log(e);
			};


			//Maximal Amount is 100 XEM per tx
			if (amount[i] > _maxAmount)
			{
				console.log("There is a problem, only 100 XEMs transaction allowed !");
				console.log("Following Transaction cause problems:");
				console.log(dataHash[i]);
				return; //In this case we stop cosigning
			}
			//Maximum dayliAmount is 100000 XEM
			else if (dailyAmount < _maxDayliAmount)
			{
			//Sign transaction
			nem.nccPost('/wallet/account/signature/send',transac[i]
			    ,function(err) {
				console.log(err);
			    }
			    ,toPrettyJson
			);
				//Batch report
				console.log("Total transactions: ");
				console.log(totalUnconfirmed);
				time =+ _timer * 60 * 1000;
				console.log("Done, waiting...");

			}
				else{
					var bigDay = "MAXIMAL AMOUNT REACHED !";
					console.log(bigDay);
					time =+ _timer * 60 * 1000;
				}

			} //end for

			}

			};

			//Pull unconfirmed transactions from cosignatory account
			nem.nccPost('/account/transactions/unconfirmed',data
			    ,function(err) {
				console.log(err);
			    }
			    ,XEMsign
			);

		}, the_interval);
            
            });
        }
