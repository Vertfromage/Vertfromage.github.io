var CONTRACT_NAME='nft-swag-tag.vertfromage.testnet';

async function connect() {
    let near = await nearApi.connect({
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    networkId: 'testnet',
    keyStore: new window.nearApi.keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'vertfromage2')
    });

    window.walletConnection = new nearApi.WalletConnection(near);
    let account;
    if (window.walletConnection.isSignedIn()) {
        // Logged in account, can write as user signed up through wallet
        account = window.walletConnection.account();
        // connect to a NEAR smart contract
        window.contract = new nearApi.Contract(account, CONTRACT_NAME, {
          changeMethods: ['nft_mint'],
          viewMethods:['nft_supply_for_owner'],
          sender: account // account object to initialize and sign transactions.
        }
        );
    } else {
        // Contract account, normally only gonna work in read only mode
        account = new nearApi.Account(near.connection, CONTRACT_NAME);
    }
}

// Log in user using NEAR Wallet on "Sign In" button click
document.querySelector('.sign-in').addEventListener('click', () => {
  window.walletConnection.requestSignIn(CONTRACT_NAME, 'nft-swag-tag.vertfromage.testnet');
});

//Status of NFT
isNFTMinted = false;
// async function to call contract
async function mintNFT(){
    let tokenNum = Math.random()*1000;
  
          let contract = await window.contract.nft_mint({
            token_id: "token-id-"+tokenNum,
            receiver_id:window.walletConnection.getAccountId(),
            metadata: {title: "Rugged Nova Scotia NFT Retreat",
               description: "Redeemable for admittance to event, swag bag, prize draws and discounts from participating businesses during event. Transportation, accommodations and food not included.",
               media: "https://bafybeigkze73wc27kvt6fddaixyzhf5d6piez2ee3m7fper7sbpinun5aq.ipfs.dweb.link/",
               extra: JSON.stringify({camping:"10% discount",lobster:"10% discount", hike:"Free", rental: "15% discount"})
              }
          },
          '100000000000000',
          '1000000000000000000000000'
        );

    return contract;
}

var howManyNFT = 0;

async function howMany(){
  let result = await window.contract.nft_supply_for_owner({
    account_id: window.walletConnection.getAccountId() 
  });
  return result;
}

// switch between logged in/out
function updateUI() {
  // console.log("Update UI");
    if (!window.walletConnection.getAccountId()) {
    Array.from(document.querySelectorAll('.sign-in')).map(it => it.style = 'display: block;');
    Array.from(document.querySelectorAll('.after-sign-in')).map(it => it.style = 'display: none;');
  }else {
    Array.from(document.querySelectorAll('.after-sign-in')).map(it => it.style = 'display: block;');
    ifLoggedIn();
    }
}

// function afterMint(){
//   Array.from(document.querySelectorAll('.after-sign-in')).map(it => it.style = 'display: none;');
//   Array.from(document.querySelectorAll('.after-nft-minted')).map(it => it.style = 'display: block;');
// }

nearApi.nearInitPromise = connect()
  .then(updateUI)
  .catch(console.error);
 
	// Things I want to do if logged in
	function ifLoggedIn(){
      
      var userName = window.walletConnection.getAccountId();
      userName = userName.slice(0,userName.lastIndexOf('.'));
      document.getElementById('welcome').innerHTML = "Welcome "+userName;
      // Add functionality to say how many swag tags they have minted. 
      howMany().then(function(result){
        howManyNFT = result;
        document.getElementById('welcome').innerHTML = "Welcome "+userName+", You have "+
        howManyNFT+" Swag Tags!";
      });
      console.log(howManyNFT);

      document.getElementById('make-nft').addEventListener('click', () => {
      if (window.walletConnection.isSignedIn()) {
        mintNFT();
      }
    });

//Logout
    document.querySelector('.sign-out').addEventListener('click', () => {
      if (window.walletConnection.isSignedIn()) {
        window.walletConnection.signOut();
      }
      updateUI();
    });

  }