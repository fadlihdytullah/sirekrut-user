import React, { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { Typography, Button, message, Empty, Skeleton } from "antd";
import axios from "axios";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { AppContext } from "../context/AppContext";
import { TIMELINES_API, config } from "../config";
import { formatDate } from "../utils";

function Home() {
  const { appState, dispatchApp } = React.useContext(AppContext);
  const history = useHistory();

  const handleFetchTimelines = async () => {
    try {
      dispatchApp({ type: "FETCH_TIMELINES_INIT" });

      const response = await axios.get(TIMELINES_API.getAll);
      const result = response.data;

      if (result.success) {
        console.log(result.data, "TRASDSADSADSAD");
        dispatchApp({
          type: "FETCH_TIMELINES_SUCCESS",
          payload: { dataTimelines: result.data },
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: "FETCH_TIMELINES_FAILURE",
        payload: { error: error.message },
      });
    }
  };

  React.useEffect(
    () => {
      handleFetchTimelines();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Fragment>
      <PageHeader
        title="Periode Pendaftaran"
        subtitle="Rekrutasi Dosen dan Pegawai Telkom University"
      />
      {appState.loading ? (
        <Skeleton />
      ) : !appState.dataTimelines.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        appState.dataTimelines.map((data) => (
          <Card>
            <div>
              <Typography.Title level={4}>{data.title}</Typography.Title>
              <Typography.Text type="secondary">
                {formatDate(data.startDate)} &ndash; {formatDate(data.endDate)}
              </Typography.Text>
            </div>

            <div>
              <Typography.Text>
                Tersedia {data.positions && data.positions.length} posisi
              </Typography.Text>
            </div>

            <div>
              <Button type="dashed">
                <Link
                  to={{
                    pathname: `/periode/${data.id}`,
                    state: {
                      // data
                      periode: data.id,
                      endData: data.endDate,
                    },
                  }}
                >
                  Lihat Detail
                </Link>
              </Button>
            </div>
          </Card>
        ))
      )}
    </Fragment>
  );
}

export default Home;
