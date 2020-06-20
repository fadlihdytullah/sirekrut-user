import React, { Fragment } from "react";
import axios from "axios";
import { message, Empty, Skeleton, Alert } from "antd";
import { useHistory, useParams, useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PositionList from "./PositionList";
import { AppContext } from "../context/AppContext";
import { TIMELINES_API, POSITIONS_API, config } from "../config";
import { formatDate } from "../utils";

function PeriodeDetail() {
  const { appState, dispatchApp } = React.useContext(AppContext);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const today = new Date().setHours(0, 0, 0, 0);
  const endDate = new Date(location.state.endData).setHours(0, 0, 0, 0);

  const handleFetchTimelineDetails = async () => {
    try {
      dispatchApp({ type: "FETCH_POSITIONS_INIT" });

      const response = await axios.get(TIMELINES_API.getSingle(params.id));
      const result = response.data;

      if (result.success) {
        const fetchPosition = async () => {
          const data = result.data.positions.map(async (position) => {
            const res = await axios.get(POSITIONS_API.getSingle(position.id));
            return { ...res.data.data, quota: position.quota };
          });
          const promiseDone = Promise.all(data);
          return promiseDone;
        };
        const positionsData = await fetchPosition();

        console.log(positionsData, "iniasdada");
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
      console.log(today, "this is today");
      console.log(endDate, "this is");
      handleFetchTimelineDetails();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Fragment>
      <PageHeader
        title="Rekrutmen Staff"
        subtitle={
          !appState.loading
            ? `Tersedia ${appState.positions.length} posisi`
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
                message={`Periode ini telah berakhir pada tanggal ${formatDate(
                  location.state.endData
                )}`}
                type="warning"
              />
            </div>
          ) : null}
          <PositionList
            disableButton={today > endDate}
            data={appState.positions}
            periode={location.state.periode}
          />
        </>
      )}
    </Fragment>
  );
}

export default PeriodeDetail;
