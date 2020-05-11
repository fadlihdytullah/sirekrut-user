import React, { Fragment } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo from "./logo.png";

const { Header } = Layout;

const styles = {
  logo: {
    width: "48px",
    height: "48px",
    display: "block",
  },
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    background: "#eee",
  },
  logoWrapper: {
    display: "flex",
  },
};

function AppBar() {
  return (
    <Fragment>
      <Header style={styles.header}>
        <div style={(styles.logoWrapper, styles.centerContent)}>
          <img src={logo} alt="siRekrut Logo" style={styles.logo} />
          <Link to="/">
            <span style={{ marginLeft: "10px", color: "#111" }}>
              Web Rekrutasi{" "}
              <strong style={{ color: "red" }}>Telkom University</strong>
            </span>
          </Link>
        </div>
      </Header>
    </Fragment>
  );
}

export default AppBar;
