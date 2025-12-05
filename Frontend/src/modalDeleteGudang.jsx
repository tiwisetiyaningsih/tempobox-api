import axios from "axios";

export default function ModalDeleteGudang({ show, onClose, data, onSuccess }) {
  if (!show || !data) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/gudang/${data.id}`);
      alert("Gudang berhasil dihapus");
      onSuccess();
      onClose();
    } catch {
      alert("Gagal menghapus");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Konfirmasi</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            Yakin ingin menghapus gudang:
            <br />
            <b>{data.nama}</b>?
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button className="btn btn-danger" onClick={handleDelete}>Hapus</button>
          </div>

        </div>
      </div>
    </div>
  );
}