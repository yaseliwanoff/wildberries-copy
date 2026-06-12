import styles from "./MainProductCard.module.scss";
import ProductPrice from "./ProductPrice";
import ProductReviews from "./ProductReviews";
import { Link } from "react-router-dom";

const resolveImageSrc = (image) => {
  if (Array.isArray(image)) {
    return image[0] ?? "";
  }
  return image ?? "";
};

const MainProductCard = ({ title, image, rating, price, brand }) => {
  const imageSrc = resolveImageSrc(image);

  return (
    <div className={styles.product_card_wrapper}>
      <Link to={"/"} className={styles.product_card_link_wrapper}>
        <img src={imageSrc} alt={title} className={styles.product_card_image} />
        <div className={styles.product_card_info}>
          {price && <ProductPrice price={price} />}
          <h2 className={styles.product_card_info_text}>
            {brand && (
              <span className={styles.product_card_brand}>{brand}</span>
            )}
            <span className={styles.product_card_title}>
              / {`${title.substr(0, 10)}...`}
            </span>
          </h2>
          {rating && <ProductReviews rating={rating} />}
        </div>
        <button className={styles.product_card_order}>Заказать</button>
      </Link>
    </div>
  );
};

export default MainProductCard;
