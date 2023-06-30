import * as d3 from "d3";
import { type tSymbol } from "~/components/tree-container/types";

export function createChord(
    container: HTMLDivElement | undefined,
    symbols: tSymbol[],
) {
    if (!container) {
        return {
            destroy: () => {}
        };
    }

    const { width } = container.getBoundingClientRect();
    const height = width;
    const innerRadius = Math.min(width, height) * 0.5 - 20;
    const outerRadius = innerRadius + 6;

    const names = Array.from(d3.union(symbols.flatMap(d => [d.symbol, d.previousSymbol])));
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const {symbol, previousSymbol} of symbols) matrix[index.get(symbol)][index.get(previousSymbol)] += 1;

    const chord = d3.chordDirected()
        .padAngle(12 / innerRadius)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const ribbon = d3.ribbonArrow()
        .radius(innerRadius - 0.5)
        .padAngle(1 / innerRadius);

    const colors = d3.schemeCategory10;

    const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const chords = chord(matrix);

    svg.append("path")
        .attr("fill", "none")
        .attr("d", d3.arc()({outerRadius, startAngle: 0, endAngle: 2 * Math.PI}));

    svg.append("g")
        .attr("fill-opacity", 0.75)
        .selectAll()
        .data(chords)
        .join("path")
        .attr("d", ribbon)
        .attr("fill", d => colors[d.target.index])
        .style("mix-blend-mode", "multiply")
        .append("title")
        .text(d => names[d.source.index]);

    const g = svg.append("g")
        .selectAll()
        .data(chords.groups)
        .join("g");

    g.append("path")
        .attr("id", d => `arc-path-${d.index}`)
        .attr("d", arc)
        .attr("fill", d => colors[d.index])
        .attr("stroke", "#fff");

    g.append("text")
        .attr("dy", -3)
        .append("textPath")
        .attr("xlink:href", d => `#arc-path-${d.index}`)
        .attr("startOffset", d => d.startAngle * outerRadius)
        .text(d => names[d.index]);

    g.append("title").text(d => names[d.index]);

    return {
        destroy: () => {
            console.log('clean up!');
        },
        node: svg.node()
    };
}