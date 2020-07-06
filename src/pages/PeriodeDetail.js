import React, { Fragment } from "react";
import axios from "axios";
import { message, Empty, Skeleton, Alert } from "antd";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PositionList from "./PositionList";
import { AppContext } from "../context/AppContext";
import { TIMELINES_API, POSITIONS_API } from "../config";
import { formatDate } from "../utils";

function PeriodeDetail() {
  const { appState, dispatchApp } = React.useContext(AppContext);
  const [data, setData] = React.useState({});
  const params = useParams();
  const today = new Date().setHours(0, 0, 0, 0);
  const endDate = (data && new Date(data.endDate).setHours(0, 0, 0, 0)) || null;

  const handleFetchTimelineDetails = async () => {
    try {
      dispatchApp({ type: "FETCH_POSITIONS_INIT" });

      const response = await axios.get(TIMELINES_API.getSingle(params.id));
      const result = response.data;

      if (result.success) {
        setData(result.data);
        const fetchPosition = async () => {
          const data = result.data.positions.map(async (position) => {
            const res = await axios.get(POSITIONS_API.getSingle(position.id));
            return { ...res.data.data, quota: position.quota };
          });
          const promiseDone = Promise.all(data);
          return promiseDone;
        };
        const positionsData = await fetchPosition();

        dispatchApp({
          type: "FETCH_POSITIONS_SUCCESS",
          payload: { positions: positionsData },
        });
      } else {
        throw new Error(result.errors);
      }
    } catch (error) {
      message.error(error.message);

      dispatchApp({
        type: "FETCH_POSITIONS_FAILURE",
        payload: { error: error.message },
      });
    }
  };

  React.useEffect(
    () => {
      handleFetchTimelineDetails();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Fragment>
      <PageHeader
        title={(data && data.title) || ""}
        subtitle={
          !appState.loading
            ? `Tersedia ${
                (data &&
                  Array.isArray(data.positions) &&
                  data.positions.length) ||
                0
              } posisi`
            : null
        }
      />
      {appState.loading ? (
        <Skeleton />
      ) : !appState.positions.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          {today > endDate ? (
            <div style={{ marginTop: 15, marginBottom: 20 }}>
              <Alert
                message={`Periode ini telah berakhir pada tanggal ${
                  (data && formatDate(data.endDate)) || ""
                }`}
                type="warning"
              />
            </div>
          ) : null}
          <PositionList
            disableButton={today > endDate}
            data={appState.positions}
            periode={data && data.id}
          />
        </>
      )}
    </Fragment>
  );
}

export default PeriodeDetail;
