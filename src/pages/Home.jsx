import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Player } from "@lottiefiles/react-lottie-player";
import Navigationbar from "../component/main/Navigationbar";
import Footer from "../component/main/Footer";
import "/kmipn/kmipn/src/assets/css/main/index.css";

const Home = () => {
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
                    <div className="title-home">
                      <TypeAnimation
                        sequence={[
                          "INVLOW", 
                          1000, 
                          "INVENTORY FLOW", 
                          2000, 
                          "INVENTARISASI KOMINFO", 
                          3000,
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
                    <div className="text-home mt-3">
                      Sistem Inventarisasi dan Peminjaman Barang pada Dinas
                      Komunikasi dan Informatika Provinsi Sumatera Utara
                    </div>
                    <div className="mt-3 mb-3">
                      <Button
                        className="btn-home"
                        onClick={() => navigate("/peminjaman")}
                      >
                        MULAI
                      </Button>
                    </div>
                  </Col>
                  <Col>
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
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
