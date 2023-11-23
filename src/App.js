import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./Context/useData";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/detail/:userId" element={<DetailScreen />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
