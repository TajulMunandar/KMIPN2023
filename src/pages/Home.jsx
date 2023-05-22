import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Player } from "@lottiefiles/react-lottie-player";
import Navigationbar from "../component/Navigationbar";
import Footer from "../component/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <Navigationbar />
        <div className="home">
          <Container>
            <Row className="d-flex">
              <Col>
                <div className="title-home">INVENTORY FLOW</div>
                <div className="text-home mt-3">
                  Sistem Inventarisasi dan Peminjaman Barang pada Dinas
                  Komunikasi dan Informatika Provinsi Sumatera Utara
                </div>
                <div className="mt-3 mb-3">
                  <Button className="btn-home" onClick={() => navigate('/peminjaman')}>MULAI</Button>
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
      </div>
    </>
  );
};

export default Home;
