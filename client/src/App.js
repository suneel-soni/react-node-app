import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<h1>Create Product</h1>} />
          <Route path='/update' element={<h1>Update Product</h1>} />
          <Route path='/profile' element={<h1>Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
