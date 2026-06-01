import React, { useLayoutEffect, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import productsMock from "../../mocks/products/mainProducts";
import MainProductCard from "../../components/products/MainProductCard/MainProductCard";
import styles from "./Home.module.scss";

const ProductRows = React.memo(({ product, style }) => (
  <div style={style}>
    <MainProductCard
      title={product.name}
      brand={product.brand}
      image={product.media.images}
      price={product.price}
    />
  </div>
));

const Home = () => {
  const listRef = useRef(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const updateScrollMargin = () => {
      if (listRef.current) {
        setScrollMargin(listRef.current.offsetTop);
      }
    };

    updateScrollMargin();
    window.addEventListener("resize", updateScrollMargin);

    return () => window.removeEventListener("resize", updateScrollMargin);
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: productsMock.length,
    estimateSize: () => 480,
    overscan: 3,
    scrollMargin,
  });

  return (
    <section ref={listRef} className={styles.main_header}>
      <div
        className={styles.list}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <ProductRows
            key={virtualItem.key}
            product={productsMock[virtualItem.index]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start - scrollMargin}px)`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
