import { Route, Router, Routes } from "react-router"
import Header from "./components/Header"
import Swap from "./components/Swap"
import Tokens from "./components/Tokens"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 justify-center items-center w-full">
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
