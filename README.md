# XEMsign
Automated cosignature for XEM Cryptocurrency

# How to

First you need NodeJs.

Because I wanted it to be as light as possible, I'm using a local NCC to sign the multisig transactions and a remote NIS to propagate it.
So, the cosignatory account need to be in a wallet that belongs to your local NCC.

Then you need to insert correct informations inside XEMsign.js:

On line 17, minutes is the number of minutes between each pull, set by default to 1 for testing but It can be set to 60 for 1 hour...

On line 23 set the account you want to watch new unconfirmed transactions for.

On line 38 we initiate signature process using the view MultisigSignatureRequest:

{
wallet: "YourWallet",
password: "PasswordForThisWallet",
account: "TheCosignatoryAccount",
multisigAddress: "TheMultisigAccount",
innerHash: {
                data: dataHash (automatically inserted after the pull)
            },
hoursDue: 24,
fee: 6000000
}

That's it. Run XEMsign.js using:

nodejs pathTo/XEMsign.js

WARNING: As the wallet password is exposed you shouldn't store any funds on it !

To insure maximum security, you can deploy as many XEMsign as you need cosignatures but preferably on different computers in different locations. And do not use these computers for surfing the net.

WORK IN PROGRESS
- XEMsignMaster.js: Only sign fixed transactions amount and not more the N XEM a day.
