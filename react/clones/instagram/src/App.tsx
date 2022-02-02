import { Header, NavBar, MainPage, ActivityPage } from "./components";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/accounts/activity" element={<ActivityPage />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
