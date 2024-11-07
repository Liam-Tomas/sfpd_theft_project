import React, { useContext } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';
import { CrimeData } from '../charts/CrimeData'; // Adjust the path as necessary

// Neighborhoods in each Supervisor District
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

const SupervisorChart = ({ chartData }) => {
    const theme = useContext(ThemeContext);

    const formattedData = {
        name: 'All Districts',
        children: chartData.map(item => ({
            name: `District ${item.Supervisor_District} - ${neighborhoodsByDistrict[item.Supervisor_District.toString()].join(', ')}`,
            value: item.Total_Incidents
        }))
    };

    return (
        <MainContainer>
            <h3>Breakdown by Supervisor District</h3>
            <div style={{ height: 380, color: 'black' }}>
                <ResponsiveTreeMap
                    data={formattedData}
                    identity="name"
                    value="value"
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    labelSkipSize={12}
                    labelTextColor={'black'}
                    parentLabelTextColor={theme.text}
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
