import NavBar from "./components/NavBar.jsx";
import Beranda from "./pages/Beranda.jsx";
import Success from "./pages/tes.jsx";
import DataCategories from "./pages/DataCategories.jsx";
import DataMovies from "./pages/DataMovies.jsx";
import FormTambahCategories from "./pages/FormTambahCategories.jsx";
import FormTambahMovies from "./pages/FormTambahMovies.jsx";
import FormEditCategories from "./pages/FormEditCategories.jsx";
import FormEditMovies from "./pages/FormEditMovies.jsx";
import AuthRegister from "./pages/AuthRegister.jsx";
import AuthLogin from "./pages/AuthLogin.jsx";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <NavBar />
            <div className="container mt-3">
                
                <Routes>
                    <Route path="/" element={<Beranda />} />
                    <Route path="/data-categories" element={<DataCategories />} />
                    <Route path="/data-movies" element={<DataMovies />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/categories/tambah" element={<FormTambahCategories />} />
                    <Route path="/categories/edit/:id" element={<FormEditCategories />} />
                    <Route path="/movies/tambah" element={<FormTambahMovies />} />
                    <Route path="/movies/edit/:id" element={<FormEditMovies />} />
                    <Route path="/register" element={<AuthRegister />} />
                    <Route path="/login" element={<AuthLogin />} />
                </Routes>
            </div>
        </>
    )
}
export default App;
//  style={{ paddingLeft: "10%", paddingRight: "10%", marginTop: "50px" }}