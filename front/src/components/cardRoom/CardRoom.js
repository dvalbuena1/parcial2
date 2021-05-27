import React from "react";
import "./CardRoom.scss";

export const CardRoom = (props) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
      {props.name === "Kitchen" ? (
        <img src="/kitchen.png" className="card-img-bottom" alt={props.name} />
      ) : (
        <img
          src="/living-room.png"
          className="card-img-bottom"
          alt={props.name}
        />
      )}
    </div>
  );
};
