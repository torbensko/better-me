import * as d3 from "d3";
import { IData } from "./IData";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/donut-chart
export function DonutChart(
  data: IData[],
  {
    name = (x) => x.name, // given d in data, returns the (ordinal) label
    value = (y) => y.size, // given d in data, returns the (quantitative) value
    visible = (y) => (y.visible !== undefined ? y.visible : true),
    title, // given d in data, returns the title text
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    innerRadius = Math.min(width, height) / 3, // inner radius of pie, in pixels (non-zero for donut)
    outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
    labelRadius = (innerRadius + outerRadius) / 2, // center radius of labels
    format = ",", // a format specifier for values (in the label)
    names, // array of names (the domain of the color scale)
    colors, // array of colors for names
    stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = "round", // line join of stroke separating wedges
    padAngle = stroke === "none" ? 1 / outerRadius : 0 // angular separation between wedges
  }: {
    name?: (x: IData) => string;
    visible?: (x: IData) => boolean;
    value?: (x: IData) => number;
    title?: (index: number, point?: IData, data?: IData[]) => string;
    width?: number;
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
    labelRadius?: number;
    format?: string;
    names?: string[];
    colors?: string[];
    stroke?: string;
    strokeWidth?: number;
    strokeLinejoin?: string;
    padAngle?: number;
  } = {}
) {
  // Compute values.
  const N = d3.map(data, name);
  const V = d3.map(data, value);
  const isVisible = d3.map(data, visible);
  const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

  // Unique the names.
  if (names === undefined) names = N;
  const nameSet = new d3.InternSet(names);

  // Chose a default color scheme based on cardinality.
  const colorSet =
    colors ||
    d3.schemeSpectral[Math.max(4, nameSet.size)] ||
    d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), nameSet.size);

  // Construct scales.
  const color = d3.scaleOrdinal(nameSet, colorSet);

  // Compute titles.
  if (title === undefined) {
    const formatValue = d3.format(format);
    title = (i) => `${N[i]}\n${formatValue(V[i])}`;
  }

  // Construct arcs.
  const arcs = d3
    .pie()
    .padAngle(padAngle)
    .sort(null)
    .value((i) => V[i.valueOf()])(I);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel: d3.Arc<any, d3.DefaultArcObject> = d3
    .arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", strokeLinejoin)
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d) => color(N[d.data.valueOf()]))
    .attr("display", (d) => (isVisible[d.data.valueOf()] ? null : "none"))
    // @ts-ignore
    .attr("d", arc);

  // .append("title")
  // .text((d) => (title ? title(d.data.valueOf()) : "No title"));
  // svg
  //   .append("g")
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", 10)
  //   .attr("text-anchor", "middle")
  //   .selectAll("text")
  //   .data(arcs)
  //   .join("text")
  //   .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
  //   .selectAll("tspan")
  //   .data((d) => {
  //     const lines = title
  //       ? `${title(d.data.valueOf())}`.split(/\n/)
  //       : "Title missing";
  //     return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
  //   })
  //   .join("tspan")
  //   .attr("x", 0)
  //   .attr("y", (_, i) => `${i * 1.1}em`)
  //   .attr("font-weight", (_, i) => (i ? null : "bold"))
  //   .text((d) => d);
  return Object.assign(svg.node(), { scales: { color } });
}
