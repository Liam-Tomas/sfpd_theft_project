import React from 'react';
import styled from 'styled-components';
// import Button from '../components/utility/Button';
import { Link } from 'react-router-dom';
import MyButton from '../components/utility/Button';
import { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import aboutIMG from '../images/aboutIMG.jpg'
import Footer from '../components/utility/Footer'
import { 
  Map, 
  BarChart2, 
  RefreshCw, 
  Github,
  ExternalLink,
  CheckCircle,
  Code,
  Server,
  LineChart,
  Palette, 
  Database, 
  ChartNoAxesCombined,
  Cctv,
  Paintbrush
  
} from 'lucide-react';

const Title = styled.h1`
`;

const SectionTitle = styled.h2`
text-align:center;
     font-size: 35px;
     margin: 3px 0px;
     margin-bottom:50px;
     font-weight: 500;
    padding: 0px 20px;

     @media (max-width: 868px) {
        font-size: 1.4rem;
    }
    
`;

const SectionTitleMid = styled.h2`
     font-size: 35px;
     margin: 3px 0px;
     margin-bottom:50px;
     font-weight: 500;
    padding: 0px 20px;
    text-align: center;

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


const Section = styled.div`
  padding: 50px 20px;
  background: ${props => props.theme.backgroundOpp};
  @media (max-width: 868px) {
    padding: 40px 20px;
  }
`;

const Section2 = styled.div`
  padding: 60px 200px;
  background: ${props => props.theme.backgroundOpp};
  border-radius: 20px;
  @media (max-width: 868px) {
    padding: 40px 20px;
  }
`;



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
    padding: 100px 40px;
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
    font-size: 60px;
    letter-spacing: -1px;
    margin-top: 0px;
    margin-bottom: 0px;
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
    line-height:1.5;
    letter-spacing: -1px;
    margin: 15px 0px 0px 0px;

    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin-top: 15px;

    }
    `


const ContentSection = styled.div`
    padding: 0px 0px;
    padding-bottom: 60px;
    @media (max-width: 868px) {
        padding: 0 20px;  // Adjust padding
        padding-right: 20px;  // Adjust padding
    }
    
`
const Button = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
    color: ${props => props.theme.primaryText};

  svg {
    margin-right: 0.5rem;
  }
`;

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



const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 0rem 0;
  padding: 0 30px;

  @media (min-width: 1500px) {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.cardOpp};
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`
const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.textAlt};
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 15px 0px 0px 0px;
  gap: 1rem;
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.primary};
  color: white;
  font-weight:600;
  color: ${props => props.theme.primaryText};

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Button)`
  background: ${props => props.theme.buttonSubtle};
  color: ${props => props.theme.text};
  
  &:hover {
    background: ${props => props.theme.buttonSubtleHover};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem 0;
`;

const TechBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background: ${props => props.theme.cardLight};
  color: ${props => props.theme.textAlt};
  font-size: 0.9rem;
  font-weight: 500;
`;


const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

const TechGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

const TechCard = styled.div`
  background: ${props => props.theme.cardOpp};
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    color: ${props => props.theme.primary};
  }
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const HeaderRow = styled.div`
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  margin: 0;
  margin-top: 10px;
`;
const TechItem = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const TechName = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.25rem;
`;

const TechDescription = styled.div`
  font-size: .9rem;
  color: ${props => props.theme.textAlt};
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 30px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

const ImpactCard = styled.div`
  background: ${props => props.theme.cardOpp};
  padding: 2rem;
  border-radius: 12px;
  
  svg {
    color: ${props => props.theme.primary};
    margin-bottom: 1rem;
  }
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImpactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const ImpactDescription = styled.p`
  color: ${props => props.theme.textAlt};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const MetricsList = styled.div`
  border-top: 1px solid ${props => props.theme.cardLight};
  padding-top: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const MetricDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
`;



function AboutPage() {
    const features = [
        {
          icon: Map,
          title: "Interactive Maps",
          description: "Explore dynamic heat and cluster maps of crime distribution across San Francisco, powered by Leaflet's mapping capabilities."
        },
        {
          icon: Cctv,
          title: "Local Crime Assessment",
          description: "Get a detailed crime analysis for any SF location through our geocoding system and pre-defined geospatial grid cells."
        },
        {
          icon: BarChart2,
          title: "Dynamic Dashboards",
          description: "Visualize crime data through interactive Chart.js powered dashboards featuring bar graphs, line charts, and treemaps."
        },
        {
          icon: RefreshCw,
          title: "Automated Updates",
          description: "Data stays current with automatic weekly data refreshes, ensuring the most recent incident reports are always available."
        },
        {
            icon: Paintbrush,
            title: "Custom Design",
            description: "This site is built with custom CSS using Styled Components, inspired by Material Design principles."
        }
      ];
      const technologies = {
        "Frontend": {
            icon: Palette, // New icon for Frontend
            techs: [
                { name: "React", description: "UI Framework" },
                { name: "Chart.js", description: "Data Visualization" },
                { name: "Leaflet", description: "Interactive Maps" }
            ]
        },
        "Backend": {
            icon: Database, // New icon for Backend
            techs: [
                { name: "Flask", description: "API Server" },
                { name: "MySQL", description: "Database" },
                { name: "Pandas", description: "Data Processing" }
            ]
        },
        "Data": {
            icon: ChartNoAxesCombined, // New icon for Data
            techs: [
                { name: "Geopandas", description: "Spatial Analysis" },
                { name: "OpenCage", description: "Geocoding" },
                { name: "Matplotlib", description: "Static Visualizations" }
            ]
        }
    };
    
      const impacts = [
        {
          title: "Public Safety Enhancement",
          description: "Empowering residents and law enforcement with data-driven insights.",
          metrics: ["Up-to-date Data", "100K+ Data Points", "24/7 Updates"]
        },
        {
          title: "Urban Planning Support",
          description: "Providing crucial data visualization tools for city planners and policy makers.",
          metrics: ["All SF Districts", "5+ Years of Data", "Custom Analysis"]
        },
        {
          title: "Research Foundation",
          description: "Supporting academic and institutional research on urban crime patterns.",
          metrics: ["API Access", "Raw Data Export", "Custom Queries"]
        }
      ];

    const theme = useTheme();

    return (
        <div>
            <ContentContainer>
                
                <MainContainer>
                    <HomeHeader>
                        {/* <HomeTopText>Hi, my name is</HomeTopText> */}
                        <HomeTitle>Project Overview</HomeTitle>
                                {/* <HomeSubText>
                                Geospatial Analysis of SFPD Incident Data
                                </HomeSubText> */}
                        <ButtonContainer>
                            <PrimaryButton 
                                href="https://github.com/Liam-Tomas/sfpd_theft_project" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <Github size={20} /> View on GitHub
                            </PrimaryButton>
                            <SecondaryButton 
                                href="https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={20} /> View Data Source
                            </SecondaryButton>
                        </ButtonContainer>
                    </HomeHeader>
                    
                    <ContentSection>
                        {/* <TitleContainer>
                            <HashTag icon={faHashtag} />
                            <SectionTitle>Project Overview</SectionTitle>
                        </TitleContainer>
                        <Paragraph>
                        This project provides an interactive tool for exploring crime trends reported by the San Francisco Police Department (SFPD), empowering users to better understand the dynamics of local incidents. The application visualizes crime patterns across San Francisco, making it easy for users to analyze data through an intuitive interface. Using data from DataSF, this project combines advanced data analysis with user-focused design to offer insights into crime frequency, types, and locations. For more information about the dataset, visit: <StyledLink href="https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783" target="_blank" rel="noopener noreferrer">Police Department Incident Reports: 2018 to Present</StyledLink>
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
                        </TechIcons> */}
                        
                        <Section>
                            <SectionTitle>Key Features</SectionTitle>
                            <FeaturesGrid>
                            {features.map((feature, index) => (
                                <FeatureCard key={index}>
                                <IconWrapper>
                                    <feature.icon size={24} />
                                </IconWrapper>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                                </FeatureCard>
                            ))}
                            </FeaturesGrid>
                        </Section>
      
                        <Section2>
                            <SectionTitleMid>Technology Stack</SectionTitleMid>
                            <TechGrid>
                              {Object.entries(technologies).map(([category, { icon: Icon, techs }]) => (
                                <TechCard key={category}>
                                  <HeaderRow>
                                    <Icon size={32} /> {/* Render the top-level category icon */}
                                    <CategoryTitle>{category}</CategoryTitle>
                                  </HeaderRow>
                                  <TechGrid2>
                                    {techs.map((tech) => (
                                      <TechItem key={tech.name}>
                                        <TechName>{tech.name}</TechName>
                                        <TechDescription>{tech.description}</TechDescription>
                                      </TechItem>
                                    ))}
                                  </TechGrid2>
                                </TechCard>
                              ))}
                            </TechGrid>

                        </Section2>
                        <Section>
                            <SectionTitle>Project Impact</SectionTitle>
                            <ImpactGrid>
                            {impacts.map((impact, index) => (
                                <ImpactCard key={index}>
                                <CheckCircle size={24} />
                                <ImpactTitle>{impact.title}</ImpactTitle>
                                <ImpactDescription>{impact.description}</ImpactDescription>
                                <MetricsList>
                                    {impact.metrics.map((metric, idx) => (
                                    <MetricItem key={idx}>
                                        <MetricDot />
                                        <span>{metric}</span>
                                    </MetricItem>
                                    ))}
                                </MetricsList>
                                </ImpactCard>
                            ))}
                            </ImpactGrid>
                        </Section>



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

