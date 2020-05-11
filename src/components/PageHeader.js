import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

function PageHeader(props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {props.title}
      </Typography.Title>
      {props.subtitle && (
        <Typography.Text type="secondary">{props.subtitle}</Typography.Text>
      )}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
