import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FormEditSiswa() {
    const { kode_siswa } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    //mendefinisikan nilai awal state form dengan objek kosong
    const [form, setForm] = useState({
        nama_siswa: "",
        alamat_siswa: "",
        tgl_siswa: "",
        jurusan_siswa: ""
    });
    const hadleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        //untuk ngecek secara live
        console.log(e.target.value)
    }
    const getData = () => {
        setIsLoading(true)
        axios.get("http://localhost:3000/api/siswa/" + kode_siswa)
            .then(res => {
                setForm(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                // console.error("Gagal ambil data:", error)
                alert("Gagal memuat data!")
            })
        // .finally(() => {
        //     setIsLoading(false)
        // })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.put("http://localhost:3000/api/siswa/" + kode_siswa, form)
            .then((res) => {
                alert("DATA BERHASIL DIPERBARUI!")
                setForm({
                    nama_siswa: "",
                    alamat_siswa: "",
                    tgl_siswa: "",
                    jurusan_siswa: ""
                })
                console.log(res)
                setIsLoading(false)
            })
    }
    const handleBack = () => {
        window.history.back();
    }
    useEffect(() => {
        setIsLoading(true);
        getData();
    }, [])
    return (
        <div className="dashboard-wrapper">
            <div className="form-wrapper position-relative">
                <div className="form-card">
                    <div className="form-header">
                        <div className="form-icon">
                            <i className="bi bi-person-check-fill"></i>
                        </div>
                        <h1 className="form-title">Edit Siswa</h1>
                        <p className="form-subtitle">Edit data siswa yang sudah terdaftar</p>
                    </div>
                    <form className="form-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" name="nama_siswa" onChange={hadleChange} value={form.nama_siswa} className="form-control" id="floatingInputGroup1" placeholder="Name" required />
                            <label htmlFor="floatingInputGroup1">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" name="tgl_siswa" onChange={hadleChange} value={form.tgl_siswa} className="form-control" id="floatingInputGroup2" placeholder="Tanggal Lahir" />
                            <label htmlFor="floatingInputGroup2">Tanggal Lahir</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea name="alamat_siswa" onChange={hadleChange} value={form.alamat_siswa} className="form-control" placeholder="Alamat" style={{ height: "100px" }} id="floatingTextarea" ></textarea>
                            <label htmlFor="floatingTextarea">Alamat Siswa</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="jurusan_siswa" onChange={hadleChange} value={form.jurusan_siswa} className="form-control" id="floatingInputGroup3" placeholder="Jurusan" required />
                            <label htmlFor="floatingInputGroup3">Jurusan</label>
                        </div>
                        <button type="submit" className="btn btn-primary col-12 mt-4">
                            {isLoading ? <div><div className="spinner-border spinner-border-sm" aria-hidden="true" role="status"></div> Loading...</div> : <span>Submit</span>}
                        </button>
                        <div className="d-flex justify-content-center mt-3">
                            <span className="back" onClick={handleBack}>
                                kembali
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}