import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';


function getLibrary(provider: any) {
  const library = new Web3Provider(provider, "any");
  console.log("library: ", library);
  return library;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
      </Router>
  </React.StrictMode>
);
