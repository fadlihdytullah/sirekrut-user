import React, { Fragment } from "react";
import Card from "../components/Card";
import { Typography, Button, Modal } from "antd";
import { Link } from "react-router-dom";

function PositionItem(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Fragment>
      <Modal
        width={720}
        title="Detail Informasi Posisi"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button
            onClick={() => setShowModal(false)}
            style={{ marginRight: 8 }}
          >
            Kembali
          </Button>,
          <Link
            to={{
              pathname: "/submission",
              state: {
                data: {
                  periodID: "izxc78dsax2",
                  periodName: "Rekrutasi Staff",
                  positionID: "34zcas34",
                  positionName: "Staff IT Sisfo",
                },
              },
            }}
          >
            <Button type="primary">Submit</Button>
          </Link>,
        ]}
        cancelText="Kembali"
      >
        <Typography.Title level={3}>Staff IT Sisfo</Typography.Title>
        <div style={{ display: "flex" }}>
          <div style={{ width: "200px" }}>Minimum IPK</div>
          <div>: 3.0</div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "200px" }}>Minimum Lulusan</div>
          <div>: Diploma</div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "200px" }}>Program Studi</div>
          <div>
            : D3 Teknik Informatika, D3 Manajemen Informatika <br />{" "}
            <Typography.Paragraph type="danger">
              * Pelamar harus lulusan dari salah satu program studi diatas.
            </Typography.Paragraph>
          </div>
        </div>

        <div>
          <Typography.Text strong>Kualifikasi</Typography.Text>
          <Typography.Paragraph>
            1. Lulusan Minimal D3 dari perguruan Tinggi Dalam & Luar Negeri
            dengan akreditasi minimal B atau setara 2. Usia per 1 Januari
            maksimal 25 Tahun 3. Memiliki Keterampilan komunikasi yang baik 4.
            Memahami Komputer
          </Typography.Paragraph>
        </div>
      </Modal>

      <Card>
        <div style={{ width: "150px" }}>
          <Typography.Text strong>{props.data.title}</Typography.Text>
        </div>

        <div>
          <Typography.Text
            type="secondary"
            style={{ fontSize: ".75rem", display: "block" }}
          >
            Minimum IPK
          </Typography.Text>
          <Typography.Text>{props.data.minimumGPA}</Typography.Text>
        </div>

        <div>
          <Typography.Text
            type="secondary"
            style={{ fontSize: ".75rem", display: "block" }}
          >
            Minimum Lulusan
          </Typography.Text>
          <Typography.Text>{props.data.minimumGraduation}</Typography.Text>
        </div>

        <div>
          <Button
            type="dashed"
            onClick={() => {
              setShowModal(true);
            }}
            style={{ marginRight: 8 }}
          >
            Lihat Detail
          </Button>

          <Link
            to={{
              pathname: "/submission",
              state: {
                data: {
                  periodID: "izxc78dsax2",
                  periodName: "Rekrutasi Staff",
                  positionID: "34zcas34",
                  positionName: "Staff IT Sisfo",
                },
              },
            }}
          >
            <Button type="primary">Submit</Button>
          </Link>
        </div>
      </Card>
    </Fragment>
  );
}

export default PositionItem;