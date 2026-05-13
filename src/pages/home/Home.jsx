import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import productsMock from "../../mocks/products/mainProducts";

// TODO: разрабаться что такое виртуализация в react
// TODO: разобраться как виртуализация помогает в оптимизации и для чего в целом нужна
// TODO: разобраться как работает данный код

const ProductRows = React.memo(({ product, style }) => (
  <div style={style}>
    <span>test text</span>
    <h2>{product.name}</h2>
    <p>{product.price.base}</p>
  </div>
));

const Home = () => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: productsMock.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 600,
  });

  return (
    <>
      <h1>home page, success work</h1>
      <div ref={parentRef} style={{ height: window.innerHeight, overflow: "auto" }}>
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <ProductRows
              key={virtualItem.key}
              product={productsMock[virtualItem.index]}
              style={{
                position: "absolute",
                top: virtualItem.start,
                width: "100%",
                height: virtualItem.size,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
