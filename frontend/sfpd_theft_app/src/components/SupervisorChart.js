// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import * as d3 from 'd3';

// const SupervisorChart = () => {
//     const [data, setData] = useState([]);
//     const d3Container = useRef(null);
//     const api_route = 'http://127.0.0.1:5000/get-supervisor-breakdown';

//     useEffect(() => {
//         axios.get(api_route)
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     useEffect(() => {
//         if (data.length && d3Container.current) {
//             const svg = d3.select(d3Container.current);

//             // Set dimensions and margins for the graph
//             const margin = { top: 10, right: 10, bottom: 10, left: 10 };
//             const width = 450 - margin.left - margin.right;
//             const height = 450 - margin.top - margin.bottom;

//             // Create the treemap layout
//             const root = d3.hierarchy({ children: data })
//                 .sum(d => d.Total_Incidents)
//                 .sort((a, b) => b.height - a.height || b.value - a.value); 

//             d3.treemap()
//                 .size([width, height])
//                 .padding(1)
//                 (root);

//             // Draw rectangles for each node
//             svg.selectAll("rect")
//                 .data(root.leaves())
//                 .enter().append("rect")
//                 .attr("x", d => d.x0)
//                 .attr("y", d => d.y0)
//                 .attr("width", d => d.x1 - d.x0)
//                 .attr("height", d => d.y1 - d.y0)
//                 .style("fill", "#69b3a2");

//             // Add text labels
//             svg.selectAll("text")
//                 .data(root.leaves())
//                 .enter().append("text")
//                 .attr("x", d => d.x0 + 5)
//                 .attr("y", d => d.y0 + 20)
//                 .text(d => `District ${d.data.Supervisor_District}: ${d.data.Total_Incidents}`)
//                 .attr("font-size", "15px")
//                 .attr("fill", "white");
//         }
//     }, [data]);

//     return (
//         <svg
//             className="d3-component"
//             width={900}
//             height={500}
//             ref={d3Container}
//         />
//     );
// };

// export default SupervisorChart;



import React, { useState, useEffect } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import axios from 'axios';
import MainContainer from './MainContainer';

const SupervisorChart = () => {
    const [data, setData] = useState({ children: [] });
    const api_route = 'http://127.0.0.1:5000/get-supervisor-breakdown';

    useEffect(() => {
        axios.get(api_route)
            .then(response => {
                setData({
                    name: 'All Districts',
                    children: response.data.map(item => ({
                        name: `District ${item.Supervisor_District}`,
                        value: item.Total_Incidents
                    }))
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <MainContainer>
            <h3>Breakdown by Supervisor District</h3>
            <div style={{ height: 380 }}>
                <ResponsiveTreeMap
                    data={data}
                    identity="name"
                    value="value"
                    // innerPadding={3}
                    // outerPadding={3}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    labelSkipSize={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                    parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={11}
                />
            </div>
        </MainContainer>
    );
};

export default SupervisorChart;
