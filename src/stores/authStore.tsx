import create from "zustand";
import { provider, signer } from "../initializers/ethers";
import { SiweMessage } from "siwe";
import _axios from "../utils/axios";

type TAuthStore = {
  address: string;
  ready: boolean;
  loggedIn: boolean;
  connectWallet(): void;
  signin(): void;
  init(): void;
};

export const authStore = create<TAuthStore>((set) => ({
  address: "",
  loggedIn: false,
  ready: false,

  init: async () => {
    try {
      const address = await signer.getAddress();
      const nonce = await sessionStorage.getItem("nonce");
      const res = await _axios.get("/validate", {
        params: { address: address, nonce: nonce },
      });
      set({ address: res.data.address, loggedIn: true, ready: true });
    } catch (err) {
      const accounts = await provider.listAccounts();

      if (accounts[0]) {
        set({ ready: true, address: accounts[0] });
      } else {
        set({ ready: true });
      }
    }
  },

  connectWallet: async () => {
    const accounts = await provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));

    if (accounts[0]) {
      set({ address: accounts[0] });
    }
  },

  signin: async () => {
    try {
      // Get nonce
      const res = await _axios.get("/nonce");
      // Create message
      const messageRaw = new SiweMessage({
        domain: window.location.host,
        address: await signer.getAddress(),
        statement: res.data.id, //"Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: res.data.nonce,
      });
      sessionStorage.setItem("nonce", res.data.nonce);
      const message = messageRaw.prepareMessage();

      // Get signature
      const signature = await signer.signMessage(message);
      // Send to server
      const res2 = await _axios.post("/verify", { message, signature });
      if (res2.status === 200) {
        set({ loggedIn: true });
        await sessionStorage.setItem("token", res2.data.data.token);
        await sessionStorage.setItem("userId", res2.data.data.userId);
      } else {
        alert("Error");
      }
    } catch (err) {}
  },
}));

export default authStore;
