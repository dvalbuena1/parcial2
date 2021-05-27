import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHomeById } from "../../services/utils";
import { CardRoom } from "../../components/cardRoom/CardRoom";
import { TableDetail } from "../../components/tableDetail/TableDetail";
import "./HomesDetail.scss";
import { FormattedMessage } from "react-intl";
import { PieChart } from "../../components/pieChart/PieChart";

export const HomesDetail = (props) => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem(`${id}-rooms`) === null) setRooms([]);
      else setRooms(JSON.parse(localStorage.getItem(`${id}-rooms`)));
    }

    getHomeById(id).then((data) => {
      setRooms(data.rooms);
      localStorage.setItem(`${id}-rooms`, JSON.stringify(data.rooms));
    });
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="container">
            <h1>
              <FormattedMessage id="myRooms" />
            </h1>
          </div>
        </div>
      </div>
      {rooms.length === 0 ? (
        <div className="text-center">
          <h2>
            <FormattedMessage id="loading" />
          </h2>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-8">
              <div className="container">
                <div className="row row-cols-3 g-3">
                  {rooms.length !== 0 &&
                    rooms.map((room, i) => (
                      <div
                        key={i}
                        className="col click"
                        onClick={() => setRoom(room)}
                      >
                        <CardRoom {...room} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-4">
              {room ? <TableDetail {...room} /> : <></>}
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h2>
                      <FormattedMessage id="stats" />
                    </h2>
                  </div>
                </div>
                <div className="row justify-content">
                  <div className="col"></div>
                  <div className="col">
                    <div className="container">
                      <div className="row">
                        <div className="col text-center">
                          <h3>
                            <FormattedMessage id="titleChart" />
                          </h3>
                        </div>
                      </div>
                      <PieChart data={rooms} />
                    </div>
                  </div>
                  <div className="col"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
