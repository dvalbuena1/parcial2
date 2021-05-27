import React from "react";
import { FormattedMessage } from "react-intl";

export const TableDetail = (props) => {
  return (
    <table className="table">
      <thead>
        <th scope="col">#</th>
        <th scope="col">
          <FormattedMessage id="idTable" />
        </th>
        <th scope="col">
          <FormattedMessage id="deviceTable" />
        </th>
        <th scope="col">
          <FormattedMessage id="valueTable" />
        </th>
      </thead>
      <tbody>
        {props.devices.map((device, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.desired.value + ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
