# XEMsign
Automated cosignature for XEM Cryptocurrency

# How to

First you need NodeJs.

Be sure you have NEM.js from <a href="https://github.com/NewEconomyMovement/nodejs2nem" target="_blank">nodejs2nem</a> inside your folder.

You must have a local NCC running connected to a local or remote NIS.

Because I wanted it to be as light as possible, I'm using a local NCC to sign the multisig transactions and a remote NIS to propagate it.
So, the cosignatory account needs to be in a wallet that belongs to your local NCC.

Then you need to insert correct informations inside XEMsign.js:

On line 17, minutes is the number of minutes between each pull, set by default to 1 for testing but It can be set to 60 for 1 hour...

On line 23, the account you want to watch new unconfirmed transactions for.

On line 38, your wallet informations and transaction parameters:

{
wallet: "YourWallet",
password: "PasswordForThisWallet",
account: "TheCosignatoryAccount",
multisigAddress: "TheMultisigAccount",
innerHash: {
                data: dataHash (do not change, automatically inserted after the pull)
            },
hoursDue: 24,
fee: 6000000
}

That's it. Run XEMsign.js using:

nodejs pathTo/XEMsign.js

# Warning 

<b>As the wallet password is exposed you shouldn't store any funds on it !</b>

To insure maximum security, you can deploy as many XEMsign as you need cosignatures but preferably on different computers in different locations. And do not use these computers for surfing the net.

# Work in progress
- XEMsignMaster.js: Only sign fixed transaction amounts and not more than N XEM a day.
