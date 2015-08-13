# XEMsign
Automated cosignature for XEM Cryptocurrency

# Features
- Password encrypted configuration (aes-128-ecb)
- Batch transactions
- Timer
- Max amount per tx, XEMsign stops if amount exceeded (meaning something goes wrong)
- Max dayli amount
- Transaction details

# How to

You must have a local NCC running connected to a local or remote NIS.<br>
If you want it to be as light as possible, you can use a local NCC to sign the multisig transactions and a remote NIS to propagate them. The cosignatory account needs to be in a wallet that belongs to your local NCC.<br><br>
To connect your NCC to a remote NIS:<br>
-Run the NCC only<br>
-In settings choose Remote Server and enter the Host (you can choose an host <a href="http://www.nodeexplorer.com/" target="_blank">here</a>)<br>
-Save. Now you can close your browser and let the NCC run in background.

You need NodeJs.<br>
Be sure you have NEM.js from <a href="https://github.com/NewEconomyMovement/nodejs2nem" target="_blank">nodejs2nem</a> inside your folder.

Then you need to insert correct informations inside access.json:<br>
{<br>
"wallet" : "yourWallet",<br>
"walletPassword" : "yourWalletPassword",<br>
"cosignatoryAccount" : "cosignatoryAccount",<br> //Account you want to watch new unconfirmed transactions for
"multisigAddress" : "multisigAccountAddress",<br>
"hoursDue" : 24,<br>
"fee" : 6000000,<br>
"timer" : 1, //Number of minutes between each pull, set by default to 5 (1 cause the resignature of the same transaction because it has no time to get confirmations and still unconfirmed).<br>
"dayliTimer" : 1440, //Timer before dayliAmount reset to 0<br>
"maxAmount" : 100, //Maximal XEM amount per tx, in case of a bigger transaction, the program stop.<br>
"maxDayliAmount" : 100000 //Maximal amount per days.<br>
}<br>

That's it. Run XEMsign.js using:

nodejs pathTo/XEMsign.js

Enter a password to encrypt access.json, then you MUST delete the old uncrypted access.json and empty your bin.<br>
Start XEMsign again. Enter the password you've chosen and your're good.

# Warning 

<b>As the wallet password is exposed you shouldn't store any funds on it !</b>

To insure maximum security, you can deploy as many XEMsign as you need cosignatures but preferably on different computers in different locations. And do not use those computers for surfing the net.

#To do
- Password encrypted config file
