

import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Anime from "./routes/Anime/Anime";
import Footer from "./components/Footer";
import Singleanime from "./routes/Anime/Singleanime";
import CreateAnime from "./routes/Anime/createAnime"
import EditAnime from "./routes/Anime/editAnime"
function App() {
  

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/anime" element={<Anime/>}/>
        <Route path="/anime/:slug" element={<Singleanime/>}/>
        <Route path="/createanime" element={<CreateAnime/>}/>
        <Route path="/editAnime/:slug" element={<EditAnime/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
