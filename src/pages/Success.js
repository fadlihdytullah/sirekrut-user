import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

function Success() {
  const history = useHistory();
  return (
    <Result
      status="success"
      title="Berkas Telah Berhasil Dikirimkan!"
      subTitle="Berkas kamu akan kami periksa dan lakukan seleksi."
      extra={[
        <Button type="primary" onClick={() => history.push("/")}>
          Kembali ke Halaman Utama
        </Button>,
      ]}
    />
  );
}

export default Success;
