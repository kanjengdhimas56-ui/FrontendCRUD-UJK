import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import DataSiswa from './pages/DataSiswa.jsx';
import EditSiswa from './pages/EditSiswa.jsx';
import FormTambahSiswa from './pages/TambahSiswa.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DataSiswa />} />
        <Route path="/siswa/edit/:kode_siswa" element={<EditSiswa />} />
        <Route path="/siswa/tambah" element={<FormTambahSiswa />} />
      </Routes>
    </div>
  )
}

export default App
