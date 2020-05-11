import React from "react";

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #f0f0f0",
    padding: "1.5rem",
    marginBottom: 16,
  },
};

function Card(props) {
  return <div style={styles.card}>{props.children}</div>;
}

export default Card;
