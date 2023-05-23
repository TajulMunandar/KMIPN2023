import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Form, Row, InputGroup, Button } from "react-bootstrap";
import "../assets/css/theme.css";
const Logins = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <Container className="d-flex flex-column">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
            <Card className="smooth-shadow-md">
              <Card.Body className="p-4">
                <div>
                  <Player
                    src="https://assets1.lottiefiles.com/packages/lf20_AasFI3JGwb.json"
                    background="transparent"
                    speed="1"
                    loop
                    controls
                    autoplay
                    style={{ width: "75%" }}
                  />
                  <p className="text-muted text-center">Please enter your user information.</p>
                </div>
                <Form className="p-2">
                  <Row className="mb-3">
                    <Form.Group
                      className="mb-4"
                      md="4"
                      controlId="validationCustom01"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        defaultValue="Mark"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-4"
                      md="4"
                      controlId="validationCustom01"
                    >
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        defaultValue="Mark"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="Show Password"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group>
                    <Button className="btn-home" onClick={() => navigate('/')}>Sign In</Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Logins;

//robot

{
  /* <Player
                    src="https://assets5.lottiefiles.com/packages/lf20_GbabwrUY2k.json"
                    background="transparent"
                    speed="1"
                    loop
                    controls
                    autoplay
                    style={{ width: "75%" }}
                  /> */
}
