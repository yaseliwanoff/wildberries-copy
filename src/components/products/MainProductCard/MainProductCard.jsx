import styles from "./MainProductCard.module.scss";

const MainProductCard = ({ title, image, price, brand, rating }) => {
  return (
    <div className={styles.product_card_wrapper}>
      <img src={image} alt={title} className={styles.product_card_image} />
      <div className={styles.product_card_info}></div>
    </div>
  );
};

export default MainProductCard;
