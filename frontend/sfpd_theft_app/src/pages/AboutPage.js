import React from 'react';
import styled from 'styled-components';
import Button from '../components/utility/Button';
import { Link } from 'react-router-dom';
import MyButton from '../components/utility/Button';
import { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import aboutIMG from '../images/aboutIMG.jpg'
import Footer from '../components/utility/Footer'

const Title = styled.h1`
`;

const SectionTitle = styled.h2`
     font-size: 1.7rem;
     margin: 3px 0px;
     font-weight: 500;
     @media (max-width: 868px) {
        font-size: 1.4rem;
    }
    
`;

const Paragraph = styled.p`
    font-size: 1.15rem;
    margin: 10px 0px;
    @media (max-width: 868px) {
        font-size: 1rem;
    }
`;

const TechSection = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 10px;
    margin: 10px 0px;
    &:last-of-type {
        margin-bottom: 30px; // Apply larger bottom margin to the last TechSection
    }
    ${Paragraph} {
        border-radius: 50px;
        margin:0px;
        padding: 0px 0px;

    }
`;

const TechTitle = styled.h3`
    margin: 0px;
    font-size: 1.2rem;
    margin: 3px 0px;
    font-weight: 500;
    padding: 5px 0px;
`;


const StyledLink = styled.a`
    color: ${props => props.theme.OppHoverBackground};
    font-weight: 500;
    &:hover {
        font-weight: 600;
    }
`
const MainContainer = styled.div`
    margin: 11px 11px 0px 12px;
    color: ${props => props.theme.text};
    position: relative; // Needed for absolute positioning of overlay

`;


const ContentContainer = styled.div`
  position: relative;
  z-index: 2; // Higher z-index than the overlay
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.backgroundOpp};

  @media (max-width: 868px) {
    margin-top: 60px;
}
`;


const HomeHeader = styled.div`
    padding: 20px 40px;
    z-index: 2;
    min-height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 25px;
    background-size: cover;
    background: ${props => props.theme.cardOpp};
    gap: 10px;

    @media (max-width: 868px) {
        margin: 10px 0px;
        padding: 10px 20px;
        text-align: left;
    }
`

const HomeTitle = styled.h1`
    font-size: 36px;
    margin: 0px;
    font-weight: 500;
    @media (max-width: 868px) {
        font-size: 1.8rem;
        margin-top: 20px;
    }
    
`

const HomeSubText = styled.p`
    color: ${props => props.theme.textAlt};
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
    
    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin-top: 15px;

    }
    `


const StyledEmail = styled.span`
    color: ${props => props.theme.primary};
    font-weight: 600;

`

const ContentSection = styled.div`
    padding: 0px 40px;
    padding-right: 250px;
    @media (max-width: 868px) {
        padding: 0 20px;  // Adjust padding
        padding-right: 20px;  // Adjust padding
    }
    
`

const TechIcons = styled.div`
    color: ${props => props.theme.textAlt};
    display: flex;
    flex-wrap: wrap; 
    font-size: .95rem;
    gap: 10px;
    width: 100%;
    margin: 15px 0px;
    * {
        
        border: 1px solid  ${props => props.theme.cardLight};
        border-radius: 50px;
        padding: 5px 9px;
    }
`;

const HashTag = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    margin-right: 8px;
    color: ${props => props.theme.secondary};
    
`

const ArrowIcon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
    margin-right: 10px;
    color: ${props => props.theme.secondary};
    
`

const TitleContainer = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;
`

const SmallTitleContainer = styled.div`
    display: flex;
    align-items: center;
`


function AboutPage() {
    const theme = useTheme();

    return (
        <div>
            <ContentContainer>
                <MainContainer>
                    <HomeHeader>
                        {/* <HomeTopText>Hi, my name is</HomeTopText> */}
                        <HomeTitle>Geospatial Analysis and Visualization of SFPD Incident Data</HomeTitle>
                        <HomeSubText>The project GitHub can be viewed here: <StyledLink href="https://github.com/Liam-Tomas/sfpd_theft_project" target="_blank" rel="noopener noreferrer">Project GitHub</StyledLink></HomeSubText>
                    </HomeHeader>
                    <ContentSection>
                        <TitleContainer>
                            <HashTag icon={faHashtag} />
                            <SectionTitle>Project Overview</SectionTitle>
                        </TitleContainer>
                        <Paragraph>
                            This project represents an advanced analysis of incident data reported by the San Francisco Police Department (SFPD),
                            focusing on creating an interactive application for users to understand local crime dynamics.
                            The goal is to both visualize and quantify crime patterns across San Francisco, combining advanced data analysis with a practical, user-centric application. The source of the data used in this project is DataSF. More information on the dataset can be found in the documentation: <StyledLink href=" https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783" target="_blank" rel="noopener noreferrer">Police Department Incident Reports: 2018 to Present</StyledLink>
                        </Paragraph>
                        <TechIcons>
                            <div>Flask</div>
                            <div>React</div>
                            <div>Geopandas</div>
                            <div>MySQL</div>
                            <div>Leaflet</div>
                            <div>Chart.js</div>
                            <div>Pandas</div>
                            <div>OpenCage</div>
                            <div>Geocoder</div>
                            <div>Matplotlib</div>
                        </TechIcons>
                        <TitleContainer>
                            <HashTag icon={faHashtag} />
                            <SectionTitle>Key Features</SectionTitle>
                        </TitleContainer>
                        <TechSection>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Interactive Maps</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                The app utilizes geospatial data to create a heatmap and a cluster map. The heatmap provides an intuitive visual representation of crime distribution across the city, with grid cells colored based on relative crime rates. The cluster map groups nearby incidents using Leaflet's marker cluster plugin. Clusters dynamically change in size and color to reflect incident density and break down into smaller groups or individual markers upon zooming. Each marker or cluster is equipped with customized popups, offering detailed incident information upon interaction.                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Local Crime Assessment</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                             The app generates a detailed local crime analysis for any given location in SF. Users can input an address, which is geocoded and matched to a pre-defined geospatial grid cell containing aggregated crime data. Leveraging GeoPandas for spatial analysis and Axios for client-server communication, the system calculates and displays detailed crime statistics for the specified location. This provides users with a quick and comprehensive understanding of crime rates in their area of interest.                                 </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Dynamic Dashboards</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                The platform hosts dynamic dashboards enriched with visualizations powered by Chart.js, including bar graphs, line charts and treemaps. Chart.js is used to dynamically visualize JSON data retrieved via SQL queries from the Flask API.                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Automated Weekly Data Refresh</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                The platform features an automated process, where Python scripts periodically download the latest CSV data from DataSF and convert it into GeoJSON format. This ensures that the application consistently displays the most current incident reports, updated on a weekly basis.                                </Paragraph>
                           
                            <TitleContainer>
                                <HashTag icon={faHashtag} />
                                <SectionTitle>Project Significance</SectionTitle>
                            </TitleContainer>
                            <Paragraph>
                                This application serves as a powerful tool for residents, policymakers, and researchers, offering:
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Local Crime Awareness</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Enables San Francisco residents to assess crime risks in their neighborhood.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Policy Development</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Assists policymakers in understanding crime patterns and developing targeted strategies.
                            </Paragraph>

                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Research and Analysis</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Provides researchers with a platform for in-depth analysis of urban crime trends.
                            </Paragraph>

                        </TechSection>


                    </ContentSection>
                    <Footer>
                        © 2023 Liam Armstrong. All Rights Reserved.
                    </Footer>
                </MainContainer>

            </ContentContainer>
        </div >
    );
}
export default AboutPage;

