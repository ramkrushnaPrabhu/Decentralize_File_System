import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Display from "./Components/Display";
import FileUpload from "./Components/FileUpload";
import Modal from "./Components/Modal";
require("dotenv").config();

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress =process.env.Contract_Address;

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
      <div className="App">
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <p style={{ color: "white" }}>
          Account :{account ? account : "Not connected"}
        </p>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display account={account} contract={contract} />
      </div>
    </>
  );
}

export default App;
