import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function DataSiswa() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getData = () => {
        setIsLoading(true)
        axios.get("http://localhost:3000/api/siswa")
            .then(res => {
                setData(res.data)
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
    useEffect(() => {
        getData()
    }, [])
    const handleDelete = (kode_siswa) => {
        const confirmDelete = window.confirm("Yakin mau hapus?");
        if (confirmDelete) {
            setIsLoading(true);
            axios.delete("http://localhost:3000/api/siswa/" + kode_siswa)
                .then((res) => {
                    alert("hapus data dengan id, " + kode_siswa + " berhasil");
                    console.log(res)
                    getData();
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    const handleEdit = (kode_siswa) => {
        setIsLoading(true);
        axios.get("http://localhost:3000/api/siswa/" + kode_siswa)
            .then((response) => {
                navigate("/siswa/edit/" + kode_siswa);
            })
            .catch((err) => {
                alert("Gagal memuat data!");
                setIsLoading(false);
            });
    }
    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3000/api/siswa")
            .then((response) => {
                console.log("response", response.data);
                setData(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-content container-fluid mt-3 px-4 py-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between mx-4 mb-4 gap-3">
                    <div>
                        <h2 className="page-title mb-1">Data Siswa</h2>
                        <p className="page-subtitle mb-0">Data Siswa yang terdaftar di sekolah</p>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary mb-0 mt-2" onClick={() => navigate("/siswa/tambah")}>
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Tambah Data
                        </button>
                    </div>
                </div>
                <div className="table-card m-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Kode</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Jurusan</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ?
                                    (<tr>
                                        <td colSpan="6" align="center"><div className="spinner-border spinner-border-sm" aria-hidden="true" role="status"></div> <b style={{ color: "crimson" }}>Kamu nungguin ya...</b></td>
                                    </tr>)
                                    :
                                    (data.map(x => (
                                        <tr>
                                            <td style={{ color: "rgba(0, 0, 0, 0.75)" }}>{x.kode_siswa}</td>
                                            <td style={{ color: "rgba(0, 0, 0, 0.75)" }}>{x.nama_siswa}</td>
                                            <td style={{ color: "rgba(0, 0, 0, 0.75)" }}>{x.alamat_siswa}</td>
                                            <td style={{ color: "rgba(0, 0, 0, 0.75)" }}>{x.tgl_siswa}</td>
                                            <td style={{ color: "rgba(0, 0, 0, 0.75)" }}>{x.jurusan_siswa}</td>
                                            <td>
                                                <button className="btn btn-outline-warning me-2" onClick={() => handleEdit(x.kode_siswa)} style={{ fontSize: "12px" }}>Edit</button>
                                                <button className="btn btn-outline-danger" onClick={() => handleDelete(x.kode_siswa)} style={{ fontSize: "12px" }}>Hapus</button>
                                            </td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}