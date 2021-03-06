# XEMsign
Automated cosignature for XEM Cryptocurrency

# Features
- Password encrypted configuration (aes-128-ecb)
- Batch signatures
- Timer
- Max amount per tx, program stops if amount exceeded (meaning something goes wrong)
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

XEMsign check every n minutes for transactions initiated by <a href="https://github.com/QuantumMechanics/XEMpay" target="_blank"><b>XEMpay</b></a>. The program signs transactions only if they meet requirements set in access.json

You need to insert correct informations inside access.json:<br>
All addresses must be in the "NAMOAVHFVPJ6FP32YP2GCM64WSRMKXA5KKYWWHPY" format. NO "-".
- <b>Wallet & transaction informations</b> (Warning, for "fee" only, value is in the smallest possible NEM fraction, that means that 1000000 means 1.000000 NEM).
- <b>timer</b>: Number of minutes between each pull, set by default to 5 (1 cause the resignature of the same transaction because it has no time to get confirmed).<br>
- <b>dayliTimer</b>: Timer before dayliAmount reset to 0 in minutes<br>
- <b>maxAmount</b>: Maximal XEM amount per tx, in case of a bigger transaction, the program stop.<br>
- <b>maxDayliAmount</b>: Maximal amount per days.<br>

Next, Run XEMsign.js using:

nodejs pathTo/XEMsign.js

Then follow instructions.

# Not working ?

Normally it should work out of the box. If not, you need to check:
- If NEM.js is present in your folder
- If you have deleted access.json after encryption.

If still not working, you need to install Express and Secure-conf:

- Express: npm install express
- Secure-conf: npm install secure-conf

# Warning 

<b>As the wallet is exposed you shouldn't store any funds on it !</b>

To insure maximum security, you can deploy as many XEMsign as you need cosignatures but preferably on different computers in different locations. And do not use those computers for surfing the net.

# Work in progress
- Fill access.json with random datas and auto delete.

<b>BTC</b>: 1BRuxYZ3ohDJkfEWKVMWAiYrAYjwNSaPJs<br>
<b>XEM</b>: NAMOAV-HFVPJ6-FP32YP-2GCM64-WSRMKX-A5KKYW-WHPY
