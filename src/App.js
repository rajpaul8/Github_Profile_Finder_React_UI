import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import { GithubProvider } from "./components/context/github/GithubContext";

function App() {
  return (
    <GithubProvider>
      <BrowserRouter>
        {/* This className is from tailwind to auto- justify the spaces between the element on the screen */}
        <div className="flex flex-col justify-between h-screen">
          <Navbar></Navbar>
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home></Home>
                  </>
                }
              ></Route>
              <Route
                path="about"
                element={
                  <>
                    <About />
                  </>
                }
              ></Route>
              <Route
                path="notfound"
                element={
                  <>
                    <NotFound />
                  </>
                }
              ></Route>
              <Route
                path="/*"
                element={
                  <>
                    <NotFound />
                  </>
                }
              ></Route>
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
