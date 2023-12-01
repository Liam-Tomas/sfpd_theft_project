// import React, { useState, useEffect, useContext } from 'react';
// import { ResponsiveTreeMap } from '@nivo/treemap';
// import axios from 'axios';
// import MainContainer from '../utility/MainContainer';
// import { ThemeContext } from 'styled-components';

// // Hardcoded neighborhoods for each Supervisor District
// const neighborhoodsByDistrict = {
//   "6": ["Tenderloin", "South of Market", "Mission Bay"],
//   "3": ["North Beach", "Chinatown", "Financial District"],
//   "5": ["Haight-Ashbury", "Western Addition", "Panhandle"],
//   "9": ["Mission District", "Bernal Heights", "Portola"],
//   "10": ["Bayview", "Hunter's Point", "Visitacion Valley"],
//   "2": ["Marina", "Pacific Heights", "Presidio"],
//   "8": ["Castro", "Noe Valley", "Glen Park"],
//   "0": ["Out of SF"], 
//   "7": ["West of Twin Peaks", "Inner Sunset", "Golden Gate Park"],
//   "1": ["Richmond District", "Sea Cliff", "Lincoln Park"],
//   "11": ["Excelsior", "Outer Mission", "Oceanview"],
//   "4": ["Sunset District", "Parkside", "Outer Sunset"]
// };

// const SupervisorChart = () => {
//     const theme = useContext(ThemeContext);
//     const [data, setData] = useState({ children: [] });
//     const api_route = 'http://127.0.0.1:5000/get-supervisor-breakdown';

//     useEffect(() => {
//         axios.get(api_route)
//             .then(response => {
//                 setData({
//                     name: 'All Districts',
//                     children: response.data.map(item => ({
//                         name: `District ${item.Supervisor_District} - ${neighborhoodsByDistrict[item.Supervisor_District.toString()].join(', ')}`,
//                         value: item.Total_Incidents
//                     }))
//                 });
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <MainContainer>
//             <h3>Breakdown by Supervisor District</h3>
//             <div style={{ height: 380, color: 'black' }}>
//                 <ResponsiveTreeMap
//                     data={data}
//                     identity="name"
//                     value="value"
//                     margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//                     labelSkipSize={12}
//                     labelTextColor={'black'} // Use text color from theme
//                     parentLabelTextColor={theme.text} // Use text color from theme for parent labels
//                     colors={{ scheme: 'nivo' }}
//                     borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
//                     animate={true}
//                     motionStiffness={90}
//                     motionDamping={11}
//                 />
//             </div>
//         </MainContainer>
//     );
// };

// export default SupervisorChart;

import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import axios from 'axios';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';

// Hardcoded neighborhoods for each Supervisor District
const neighborhoodsByDistrict = {
  "6": ["Tenderloin", "South of Market", "Mission Bay"],
  "3": ["North Beach", "Chinatown", "Financial District"],
  "5": ["Haight-Ashbury", "Western Addition", "Panhandle"],
  "9": ["Mission District", "Bernal Heights", "Portola"],
  "10": ["Bayview", "Hunter's Point", "Visitacion Valley"],
  "2": ["Marina", "Pacific Heights", "Presidio"],
  "8": ["Castro", "Noe Valley", "Glen Park"],
  "0": ["Out of SF"], 
  "7": ["West of Twin Peaks", "Inner Sunset", "Golden Gate Park"],
  "1": ["Richmond District", "Sea Cliff", "Lincoln Park"],
  "11": ["Excelsior", "Outer Mission", "Oceanview"],
  "4": ["Sunset District", "Parkside", "Outer Sunset"]
};

const SupervisorChart = ({ apiEndpoint }) => {
    const theme = useContext(ThemeContext);
    const [data, setData] = useState({ children: [] });
    const api_route = 'http://127.0.0.1:5000/get-supervisor-breakdown';

    useEffect(() => {
        axios.get(apiEndpoint)
            .then(response => {
                setData({
                    name: 'All Districts',
                    children: response.data.map(item => ({
                        name: `District ${item.Supervisor_District} - ${neighborhoodsByDistrict[item.Supervisor_District.toString()].join(', ')}`,
                        value: item.Total_Incidents
                    }))
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [apiEndpoint]);

    return (
        <MainContainer>
            <h3>Breakdown by Supervisor District</h3>
            <div style={{ height: 380, color: 'black' }}>
                <ResponsiveTreeMap
                    data={data}
                    identity="name"
                    value="value"
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    labelSkipSize={12}
                    labelTextColor={'black'} // Use text color from theme
                    parentLabelTextColor={theme.text} // Use text color from theme for parent labels
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
