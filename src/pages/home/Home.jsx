import { Link } from "react-router-dom";
import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import productsMock from "../../mocks/products/mainProducts";
import MainProductCard from "../../components/products/MainProductCard/MainProductCard";

import styles from "./Home.module.scss";

const getColumns = (width) => {
  if (width <= 768) return 2;
  if (width <= 1200) return 4;
  return 6;
};

const Home = () => {
  const listRef = useRef(null);

  const [scrollMargin, setScrollMargin] = useState(0);
  const [columns, setColumns] = useState(getColumns(window.innerWidth));

  useLayoutEffect(() => {
    const update = () => {
      if (listRef.current) {
        setScrollMargin(listRef.current.offsetTop);
      }

      setColumns(getColumns(window.innerWidth));
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const rows = useMemo(() => {
    const result = [];

    for (let i = 0; i < productsMock.length; i += columns) {
      result.push(productsMock.slice(i, i + columns));
    }

    return result;
  }, [columns]);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 420,
    overscan: 4,
    scrollMargin,
  });

  useEffect(() => {
    virtualizer.measure();
  }, [columns]);

  return (
      <section ref={listRef} className={styles.main_header}>
        <div
            className={styles.list}
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                  key={virtualRow.key}
                  className={styles.row}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${
                        virtualRow.start - scrollMargin
                    }px)`,
                  }}
              >
                {rows[virtualRow.index].map((product) => (
                    <Link
                        key={product.id}
                        to="/"
                        className={styles.cardLink}
                    >
                      <MainProductCard
                          title={product.name}
                          brand={product.brand}
                          image={product.media.images}
                          price={product.price}
                      />
                    </Link>
                ))}
              </div>
          ))}
        </div>
      </section>
  );
};

export default Home;
