import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Player } from "@lottiefiles/react-lottie-player";
import Navigationbar from "../component/main/Navigationbar";
import Footer from "../component/main/Footer";
import AOS from "aos";
import "aos/dist/aos.css"
import "/kmipn/kmipn/src/assets/css/main/index.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        {loading ? (
          <Player
            src="https://assets5.lottiefiles.com/packages/lf20_GbabwrUY2k.json"
            background="transparent"
            speed="1"
            loop
            controls
            autoplay
            style={{ width: "50%" }}
          />
        ) : (
          <>
            <Navigationbar />
            <div className="home">
              <Container>
                <Row className="d-flex">
                  <Col>
                    <div className="title-home" data-aos="fade-right" data-aos-duration="1000">
                      <TypeAnimation
                        sequence={[
                          "INVLOW", 
                          1000, 
                          "INVENTORY FLOW", 
                          2000, 
                          () => {
                            console.log("Sequence completed"); // Place optional callbacks anywhere in the array
                          },
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                    <div className="text-home mt-3 lh-base" data-aos="fade-right" data-aos-duration="1000">
                    Inventory System and Borrowing Items in Infinite Learning
                    Streamline your access to educational resources with Infinite Learning's inventory system. Explore, borrow, and stay informed with real-time updates.
                    </div>
                    <div className="mt-3" data-aos="fade-right" data-aos-duration="1000">
                      <Button
                        className="btn-home"
                        onClick={() => navigate("/peminjaman")}
                      >
                        START
                      </Button>
                    </div>
                  </Col>
                  <Col >  
                    <Player
                      src="https://assets2.lottiefiles.com/packages/lf20_9wpyhdzo.json"
                      background="transparent"
                      speed="1"
                      loop
                      controls
                      autoplay
                     
                    />
                  </Col>
                </Row>
              </Container>
            </div>
            <Footer data-aos="fade-down" data-aos-duration="1000" />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
