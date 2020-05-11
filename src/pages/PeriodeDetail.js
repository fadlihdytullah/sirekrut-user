import React, { Fragment } from "react";
import PageHeader from "../components/PageHeader";
import PositionList from "./PositionList";

function PeriodeDetail() {
  return (
    <Fragment>
      <PageHeader title="Rekrutmen Staff" subtitle="Tersedia 5 posisi" />

      <PositionList />
    </Fragment>
  );
}

export default PeriodeDetail;
