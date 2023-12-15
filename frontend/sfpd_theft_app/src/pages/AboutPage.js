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

const Title = styled.h1`
    margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
     font-size: 1.7rem;
     margin: 3px 0px;
     font-weight: 500;
`;

const Paragraph = styled.p`
    font-size: 1.15rem;
    margin: 10px 0px;
`;

const Footer = styled.div`
    padding: 20px 0px 10px 0px;
    color: ${props => props.theme.textAlt};

`;

const TechSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 10px 0px;
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

const TechSubTitle = styled.h4`
    text-align: left;
    margin: 0px;
    padding: 8px 0px;
`;


const StyledLink = styled.a`
    color: ${props => props.theme.OppHoverBackground};
    font-weight: 500;
    &:hover {
        font-weight: 600;
    }
`
const MainContainer = styled.div`
    margin: 11px 11px 11px 12px;
    color: ${props => props.theme.text};
    position: relative; // Needed for absolute positioning of overlay
    background: 

  @media (max-width: 768px) {
    align-items: '';

  }

`;


const ContentContainer = styled.div`
  position: relative; // Position relative to stack above the overlay
  z-index: 2; // Higher z-index than the overlay
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.backgroundOpp};


`;


const HomeHeader = styled.div`
    padding: 20px 40px;
    z-index: 2; // Add a higher z-index
    min-height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 25px;
    background-size: cover;
    background: ${props => props.theme.cardOpp};
    gap: 10px;

    @media (max-width: 868px) {
        margin: 0px 0px;
        text-align: left;
    }
`

const HomeTitle = styled.h1`
    font-size: 36px;
    margin: 0px;
    font-weight: 500;
    @media (max-width: 868px) {
        font-size: 2.8rem;
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

    }`


const StyledEmail = styled.span`
    color: ${props => props.theme.primary};
    font-weight: 600;

`

const ContentSection = styled.div`
    padding: 0px 40px;
    padding-right: 200px;
    

`

const TechIcons = styled.div`
    color: ${props => props.theme.textAlt};
    display: flex;
    font-size: .95rem;
    gap: 10px;
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
                        <HomeSubText>The project github can be viewed here: <StyledLink href="https://github.com/Liam-Tomas/sfpd_theft_project" target="_blank" rel="noopener noreferrer">github.com/Liam-Tomas/sfpd-theft-project</StyledLink></HomeSubText>
                    </HomeHeader>
                    <ContentSection>
                        <TitleContainer>
                            <HashTag icon={faHashtag} />
                            <SectionTitle>Project Overview</SectionTitle>
                        </TitleContainer>
                        <Paragraph>
                            This project represents an advanced analysis of incident data reported to the San Francisco Police Department (SFPD),
                            focusing on creating an interactive application for users to understand local crime dynamics.
                            My approach both visualizes and quantifies urban crime patterns across San Francisco, combining advanced data analysis with a practical, user-centric application.
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
                            <SectionTitle>Key Technical Highlights</SectionTitle>
                        </TitleContainer>
                        <TechSection>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Geospatial Grid Generation</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Utilizing GeoPandas, a geospatial grid over San Francisco is created. This involves defining the city's boundaries and subdividing the area into a fine grid. Each grid cell is uniquely identified and represents a specific geographic area.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Data Processing</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Incident data from the SFPD is loaded and processed. The data, containing latitude and longitude information for each incident, is transformed into a GeoDataFrame.
                                This data is then spatially joined with the geospatial grid, allowing incidents to be mapped to specific grid cells.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Heatmap Layer Creation in Leaflet</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                In the React front-end, the LeafletMap component uses the GeoJSON data (representing the grid and calculated crime rate) to create a heatmap layer.
                                A custom color-coding function dynamically styles each grid cell based on the relative crime rate, creating a visually intuitive heatmap.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Interactive Map Features</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                The Leaflet map is enhanced with interactivity. Users can click on different areas of the heatmap to view detailed information about crime probabilities and statistics in that specific grid cell.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Localized Crime Data Analysis</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                A key feature of the project enables users to input their addresses, which are converted into geographical coordinates. These coordinates are used to locate the nearest grid cell in the heatmap and provides users with detailed crime rates specific to that location.
                            </Paragraph>
                            <SmallTitleContainer>
                                <ArrowIcon icon={faArrowRightLong} />
                                <TechTitle>Dynamic Data Presentation</TechTitle>
                            </SmallTitleContainer>
                            <Paragraph>
                                Utilizes Chart.js to render JSON data returned from SQL queries sourced from the Flask API, providing real-time data visualizations.
                            </Paragraph>
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

                        <Footer>
                            © 2023 Liam Armstrong. All Rights Reserved.
                        </Footer>
                    </ContentSection>
                </MainContainer>

            </ContentContainer>
        </div >
    );
}
export default AboutPage;

