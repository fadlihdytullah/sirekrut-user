import React, { Fragment } from "react";
import { Typography, Input, Radio, Avatar, Button } from "antd";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const styles = {
  labelContainer: {
    width: "150px",
  },
  fullWidth: {
    width: "100%",
  },
};

const FormElement = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    }}
  >
    {props.children}
  </div>
);

function Submission(props) {
  const location = useLocation();

  const { data } = location.state;

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Formulir Administrasi
        </Typography.Title>
        <Button type="primary">Kirim Lamaran</Button>
      </div>

      <div>
        <div>
          <Typography.Text strong>Nama Periode: </Typography.Text>
          <Typography.Text>{(data && data.periodName) || ""}</Typography.Text>
        </div>
        <div>
          <Typography.Text strong>Nama Posisi: </Typography.Text>
          <Typography.Text>{(data && data.positionName) || ""}</Typography.Text>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, marginTop: 16 }}>
        <div style={{ width: "600px" }}>
          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Nama Lengkap</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Email</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Alamat</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Asal</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Tanggal Lahir</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Jenis Kelamin</Typography.Text>
            </div>
            <div
              style={{ display: "flex", flex: 1 }}
              flexJustifyContent="flex-start"
            >
              <Radio checked={true}>Laki-laki</Radio>
              <Radio>Perempuan</Radio>
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Telepon</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Pendidikan Terakhir</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Nilai TOEFL</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Buktu TOEFL</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <div>
                <Button>Upload</Button>
              </div>
              <Typography.Text type="danger">
                * Hanya menerima sertifikat TOEFL/IELTS Telkom
              </Typography.Text>
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Nilai Tes 360</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <Input
                style={styles.fullWidth}
                name="name"
                placeholder={""}
                value={""}
                allowClear={true}
                onChange={() => {}}
              />
              <Typography.Text type="danger">* Jika ada</Typography.Text>
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Buktu Tes 360</Typography.Text>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <div>
                <Button>Upload</Button>
              </div>
              <Typography.Text type="danger">* Jika ada</Typography.Text>
            </div>
          </FormElement>
        </div>
        <div style={{ marginLeft: 24, width: "150px" }}>
          <div style={{ width: "150" }}>
            <Avatar icon={<UserOutlined />} shape="square" size={150} />
            <div style={{ marginTop: 8 }}>
              <Button block>Upload Photo</Button>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Typography.Text>Dokumen Lainnya</Typography.Text>
            <Button block>Upload CV</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Submission;
