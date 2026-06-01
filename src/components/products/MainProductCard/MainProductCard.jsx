import styles from "./MainProductCard.module.scss";
import ProductPrice from "./ProductPrice";

const resolveImageSrc = (image) => {
  if (Array.isArray(image)) {
    return image[0] ?? "";
  }
  return image ?? "";
};

const MainProductCard = ({ title, image, price, brand }) => {
  const imageSrc = resolveImageSrc(image);

  return (
    <div className={styles.product_card_wrapper}>
      <img src={imageSrc} alt={title} className={styles.product_card_image} />
      <div className={styles.product_card_info}>
        {brand && <p className={styles.product_card_brand}>{brand}</p>}
        <h3 className={styles.product_card_title}>{title}</h3>
        {price && <ProductPrice price={price} />}
      </div>
    </div>
  );
};

export default MainProductCard;
