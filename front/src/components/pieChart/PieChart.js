import React, { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

export const PieChart = ({ data, height = 450, width = 450, margin = 50 }) => {
  const pieChart = useRef();
  useEffect(() => {
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(pieChart.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal().domain(data).range(d3.schemeSet1);
    const pie = d3.pie().value((d) => d.powerUsage.value);
    const data_ready = pie(data);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip-chart")
      .style("visibility", "hidden")
      .style("color", "black")
      .style("background-color", "white")
      .style("position", "absolute");

    const path = svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.9);

    path.on("mouseover", (e, d) => {
      tooltip.style("visibility", "visible");
      tooltip.html(
        d.data.name +
          "<br/>" +
          d.data.powerUsage.value +
          " " +
          d.data.powerUsage.unit
      );
    });

    path.on("mousemove", (e, d) => {
      tooltip
        .style("left", e.pageX + 20 + "px")
        .style("top", e.pageY + 20 + "px");
    });

    path.on("mouseout", (e, d) => {
      tooltip.style("visibility", "hidden");
    });
    return () => {
      d3.selectAll(".tooltip-chart").remove();
    };
  }, [data]);

  return (
    <div id="chartArea">
      <svg ref={pieChart}></svg>
    </div>
  );
};
