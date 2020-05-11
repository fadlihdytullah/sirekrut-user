import React, { Fragment } from "react";
import PositionItem from "./PositionItem";

function PositionList() {
  return (
    <Fragment>
      <PositionItem
        data={{
          title: "Staff IT Sisfo",
          minimumGPA: 3.0,
          minimumGraduation: "Diploma",
        }}
      />

      <PositionItem
        data={{
          title: "Staff Admin LAK",
          minimumGPA: 2.5,
          minimumGraduation: "Diploma",
        }}
      />

      <PositionItem
        data={{
          title: "Lead Web Developer SISFO",
          minimumGPA: 3.0,
          minimumGraduation: "Sarjana",
        }}
      />

      <PositionItem
        data={{
          title: "Staff Admin LAC",
          minimumGPA: 3.0,
          minimumGraduation: "Diploma",
        }}
      />

      <PositionItem
        data={{
          title: "Lab Assistant FIT",
          minimumGPA: 3.0,
          minimumGraduation: "Diploma",
        }}
      />
    </Fragment>
  );
}

export default PositionList;
