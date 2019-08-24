import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SwapQuoter } from '@0x/asset-swapper';
import { BigNumber } from '0x.js';
const Web3 = require('web3');

declare let window: any;
const web3 = new Web3(Web3.givenProvider);
// api endpoint found at https://developers.radarrelay.com/api/feed-api/changelog
const apiUrl = 'https://api.radarrelay.com/0x/v2/';
const tokenAddresses = {
  DAI: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
}

const App: React.FC = () => {

  async function api(): Promise<void> {
    try {
      //let res = await fetch(`https://api.radarrelay.com/v2/markets/`);
      //let json = await res.json()
      // let sell = json.filter( function(item: ZRXOrderItem){return (item.type==="SELL");} );
      // console.log(json);
      // console.log(sell)
      window.ethereum.enable();

      let wei = web3.utils.fromWei('3', 'ether');

      let makerTokenAddress = tokenAddresses['DAI'];
      let takerTokenAddress = tokenAddresses['WETH'];
      let makerAssetBuyAmount = new BigNumber(200000);

      const quoter = SwapQuoter.getSwapQuoterForStandardRelayerAPIUrl(
        web3.currentProvider,
        apiUrl,
        {
          networkId: 1,
          orderRefreshIntervalMs: 500,
        }
      );

      console.log(quoter);

      // Get a quote to buy three units of DAI
      const quote = await quoter.getMarketBuySwapQuoteAsync(
        makerTokenAddress,
        takerTokenAddress,
        makerAssetBuyAmount,
      );

      console.log(quote);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    // used for fetching data of exchange address and fee address, can be removed
    api()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
