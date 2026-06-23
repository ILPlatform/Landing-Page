import React, { useEffect, useState } from 'react'; 
import { Button, Col, Container, Row } from 'reactstrap';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import ImageWebp from './ImageWebp';
import { callFunction } from '../firebase'; // Ensure the correct path

const CACHE_KEY = 'teamMembersCache';
const CACHE_EXPIRY_KEY = 'teamMembersCacheExpiry';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

function TeamMembers({ limit = 8 }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch team members from Firebase callable function
  const fetchTeamMembersFromAPI = async () => {
    try {
      const response = await callFunction('users_e_get_images')();
      
      if (response && response.data && response.data.response) {
        const members = response.data.response;
        console.log("Team Members Data:", members);
        setTeamMembers(members);
        // Store the fetched data in cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(members));
        localStorage.setItem(CACHE_EXPIRY_KEY, Date.now().toString());
      } else {
        throw new Error("No data returned from API or data format is incorrect");
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching team members:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to load team members, either from cache or API
  const loadTeamMembers = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    const isCacheValid = cacheExpiry && (Date.now() - parseInt(cacheExpiry, 10)) < CACHE_DURATION;

    if (cachedData && isCacheValid) {
      // Use cached data if it's still valid
      console.log("Using cached team members data");
      setTeamMembers(JSON.parse(cachedData));
      setLoading(false);
    } else {
      // Fetch from API if no valid cache
      console.log("Fetching team members from API");
      fetchTeamMembersFromAPI();
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Data fallback for rendering
  const data = {
    title: "Our Team",
    content: "Meet our amazing team.",
    roles: ["Default Role"], // Adjust roles according to your data
    join: "Join Us",
    about: "About Us"
  };

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error loading team members: {error.message}</p>;

  // Debugging: Check if teamMembers is an empty array
  console.log("Filtered Team Members:", teamMembers);

  // Render the team members or fallback message
  return (
    <div className="section section-light text-center">
      <Container>
        {/* Title and Description */}
        <Row className="align-items-center">
          <Col lg={2} />
          <Col className="mx-auto" lg={8}>
            <h2 className="mb-4 h3">
              <b>{data.title}</b>
            </h2>
            <p className={"h5"}>{data.content}</p>
          </Col>
          <Col lg={2} />
        </Row>

        <br />

        {/* Team Members */}
        <Row className="align-items-center">
          <Col lg={2} />
          <Col lg={8}>
            <Row>
              {teamMembers.length > 0 ? (
                teamMembers
                  .slice(0, limit) // Limit the number of members displayed
                  .map((member) => (
                    <Col className="mx-auto my-1 mb-4" lg={3} md={3} sm={4} xs={6} key={member.id || v4()}>
                      {member?.link ? (
                        <a href={member.link} target="_blank" rel="noreferrer">
                          <ImageWebp
                            srcWebp={member.image_url || "https://via.placeholder.com/150"}
                            src={member.image_url || "https://via.placeholder.com/150"}
                            alt={member.first_name}
                            className="m-0 w-100"
                            style={{
                              backgroundImage: 'url(' + require('assets/img/members/BackgroundLeaves.jpeg').default + ')',
                              backgroundSize: 'cover',
                              borderRadius: '16px'
                            }}
                          />
                        </a>
                      ) : (
                        <ImageWebp
                          srcWebp={member.image_url || "https://via.placeholder.com/150"}
                          src={member.image_url || "https://via.placeholder.com/150"}
                          alt={member.first_name}
                          className="m-0 w-100"
                          style={{
                            backgroundImage: 'url(' + require('assets/img/members/BackgroundLeaves.jpeg').default + ')',
                            backgroundSize: 'cover',
                            borderRadius: '16px'
                          }}
                        />
                      )}
                      <div>
                        <p className="text-center mb-0 mt-2">{member.first_name}</p>
                        <small>{data.roles[member.role] || "Default Role"}</small>
                      </div>
                    </Col>
                  ))
              ) : (
                <p>No team members found.</p>
              )}
            </Row>

            {/* Join or About Button */}
            {limit === teamMembers.length ? (
              <a href="mailto:info@ilplatform.be">
                <Button outline className="btn-round btn-large" style={{ width: '200px' }}>
                  {data.join}
                </Button>
              </a>
            ) : (
              <Link to="/about/" className="margin-auto justify-content-center">
                <Button outline className="btn-round btn-large" style={{ width: '240px' }}>
                  {data.about}
                </Button>
              </Link>
            )}
          </Col>
          <Col lg={2} />
        </Row>
      </Container>
    </div>
  );
}

export default TeamMembers;
