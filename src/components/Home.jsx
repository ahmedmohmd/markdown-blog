import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./common/Header";
import { Container, Row, Col } from "react-bootstrap";

const HomeStyle = styled.div`
  height: 100vh;

  position: relative;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .info {
      text-align: center;
      color: #0099ff;

      h1 {
        font-family: "Black Ops One";
        overflow-wrap: break-word !important;
        font-size: 90px;

        @media (max-width: 425px) {
          font-size: 60px;
        }

        @media (max-width: 320px) {
          font-size: 50px;
        }
      }

      p {
        font-size: 1.3rem;
      }
    }
  }
  img {
    min-width: 100%;
    position: absolute;
    bottom: 0;
  }
`;

function Home() {
  return (
    <HomeStyle className="">
      <Header />
      <Container>
        <Row>
          <Col>
            <div className="content d-flex justify-content-center align-items-center">
              <div className="info">
                <h1>
                  <span style={{ color: "#222", fontFamily: "Black Ops One" }}>
                    M
                  </span>
                  arkdown{" "}
                  <span style={{ color: "#222", fontFamily: "Black Ops One" }}>
                    B
                  </span>
                  log
                </h1>
                <p>You can write your own MarkDown Blogs by easy Way.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <img src="/images/wave.svg" alt="" />
    </HomeStyle>
  );
}

export default Home;
