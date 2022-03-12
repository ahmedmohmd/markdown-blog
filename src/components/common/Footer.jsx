import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer + " text-center"}>
      <div className={styles.info}>Made By 🐼 Ahmed Mohamed</div>
    </div>
  );
}

export default Footer;
