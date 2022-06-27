//* Imports
import React from "react";
import styles from "../styles/home.module.scss";

//* Home JSX
function Home() {
  return (
    <div className={styles.home}>
      {/* <Header /> */}
      <main>
        <div className="container">
          <div className="row">
            <div className="col sm-12">
              <div className={styles.content}>
                <div className={styles.info}>
                  <h1>
                    <span
                      style={{ color: "#222", fontFamily: "Black Ops One" }}
                    >
                      M
                    </span>
                    arkdown{" "}
                    <span
                      style={{ color: "#222", fontFamily: "Black Ops One" }}
                    >
                      B
                    </span>
                    log
                  </h1>
                  <p>You can write your own MarkDown Blogs by easy Way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <img src="/images/wave.svg" alt="Svg Wave Image" />
    </div>
  );
}

export default Home;
