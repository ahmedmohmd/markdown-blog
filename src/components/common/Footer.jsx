//* Imports
import styles from "../../styles/footer.module.scss";

//* Footer JSX
function Footer() {
  return (
    <div className={styles.footer + " text-center"}>
      <div className={styles.info}>Made With 🐼 Ahmed Mohamed</div>
    </div>
  );
}

export default Footer;
