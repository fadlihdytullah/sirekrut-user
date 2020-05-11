import React, { Fragment } from "react";
import PageHeader from "../components/PageHeader";
import { Typography, Button } from "antd";
import Card from "../components/Card";

function Home() {
  return (
    <Fragment>
      <PageHeader
        title="Periode Pendaftaran"
        subtitle="Rekrutasi Dosen dan Pegawai Telkom University"
      />

      <Card>
        <div>
          <Typography.Title level={4}>Rekrutasi Staff</Typography.Title>
          <Typography.Text type="secondary">
            1 Maret 2020 &ndash; 10 Juli 2020
          </Typography.Text>
        </div>

        <div>
          <Typography.Text>Tersedia 5 posisi</Typography.Text>
        </div>

        <div>
          <Button type="dashed" href="/periode/izxc78dsax2">
            Lihat Detail
          </Button>
        </div>
      </Card>

      <Card>
        <div>
          <Typography.Title level={4}>Rekrutasi Dosen</Typography.Title>
          <Typography.Text type="secondary">
            1 Maret 2020 &ndash; 10 Juli 2020
          </Typography.Text>
        </div>

        <div>
          <Typography.Text>Tersedia 10 posisi</Typography.Text>
        </div>

        <div>
          <Button type="dashed" href="/periode/izxc78dsax2">
            Lihat Detail
          </Button>
        </div>
      </Card>
    </Fragment>
  );
}

export default Home;
