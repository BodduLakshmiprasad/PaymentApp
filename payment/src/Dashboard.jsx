import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function Dashboard() {
  const chartRef = useRef()

  useEffect(() => {
    const drawChart = async () => {
      const colRef = collection(db, 'events')
      const snapshot = await getDocs(colRef)
      const data = []
      snapshot.forEach(doc => {
        const item = doc.data()
        data.push({ category: item.category, count: item.registrations.length })
      })

      const svg = d3.select(chartRef.current)
        .attr("width", 500)
        .attr("height", 300)

      const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, 480])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([280, 0])

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => 280 - y(d.count))
        .attr("fill", "#4ade80")
    }

    drawChart()
  }, [])

  return (
    <div>
      <h1>Dashboard Insights</h1>
      <svg ref={chartRef}></svg>
    </div>
  )
}