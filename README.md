# XEMsign
Automated cosignature for XEM Cryptocurrency

# How to

You must have a local NCC running connected to a local or remote NIS.<br>
If you want it to be as light as possible, you can use a local NCC to sign the multisig transactions and a remote NIS to propagate it. The cosignatory account needs to be in a wallet that belongs to your local NCC.<br><br>
To connect your NCC to a remote NIS:<br>
-Run the NCC only<br>
-In settings choose Remote Server and enter the Host (you can choose an host <a href="http://www.nodeexplorer.com/" target="_blank">here</a>)<br>
-Save. Now you can close your browser and let the NCC run in background.

You need NodeJs.<br>
Be sure you have NEM.js from <a href="https://github.com/NewEconomyMovement/nodejs2nem" target="_blank">nodejs2nem</a> inside your folder.

Then you need to insert correct informations inside XEMsign.js:

-Line 17: minutes is the number of minutes between each pull, set by default to 5 (1 seems to cause resignature of the same transaction)

-Line 72: 50 is the maximal XEM amount per tx, in case of a bigger transaction, the program stop.

-Line 83: 100000 is maximal amount per days.

-Line 23: the account you want to watch new unconfirmed transactions for.

-Line 38: your wallet informations and transaction parameters:<br>
{<br>
wallet: "YourWallet",<br>
password: "PasswordForThisWallet",<br>
account: "TheCosignatoryAccount",<br>
multisigAddress: "TheMultisigAccount",<br>
innerHash: {<br>
                data: dataHash (do not change, automatically inserted after the pull)<br>
            },<br>
hoursDue: 24,<br>
fee: 6000000<br>
}

That's it. Run XEMsign.js using:

nodejs pathTo/XEMsign.js

# Warning 

<b>As the wallet password is exposed you shouldn't store any funds on it !</b>

To insure maximum security, you can deploy as many XEMsign as you need cosignatures but preferably on different computers in different locations. And do not use these computers for surfing the net.
