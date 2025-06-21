import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
      draggable={"touch"}
    />
    <Component {...pageProps} />
  </>
}
