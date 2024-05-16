import "./app.css";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Layout />
    <Toaster position="top-center" toastOptions={{duration: 2000}} />
    </>
  );
}

export default App;

