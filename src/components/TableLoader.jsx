import React, { Fragment } from "react";
import ContentLoader from "react-content-loader";

const TableLoader = (props) => {
  const { rows = 6 } = props;
  const rowHeight = 60;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        marginTop: "24px",
        borderRadius: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
        {new Array(rows).fill(" ").map((el, index) => {
          const contentVerticalPosition = (contentHeight) =>
            rows > 1 ? contentHeight + rowHeight * index : contentHeight;
          return (
            <Fragment key={index}>
              <rect
                x="20"
                y={`${contentVerticalPosition(20)}`}
                rx="4"
                ry="4"
                width="40"
                height="20"
              />
              <rect
                x="100"
                y={`${contentVerticalPosition(20)}`}
                rx="10"
                ry="4"
                width="600"
                height="20"
              />
              <rect
                x="750"
                y={`${contentVerticalPosition(20)}`}
                rx="10"
                ry="4"
                width="600"
                height="20"
              />
              <rect
                x="1450"
                y={`${contentVerticalPosition(20)}`}
                rx="4"
                ry="4"
                width="20"
                height="20"
              />
            </Fragment>
          );
        })}
      </ContentLoader>
    </div>
  );
};

export default TableLoader;
