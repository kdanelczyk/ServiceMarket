import React from "react";

const ContentBox = ({ children }) => {
    return <div style={styles.container}>{children}</div>;
};

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "80px auto",
        padding: "20px",
        backgroundColor: "#333",
        color: "#fff",
    },
};

export default ContentBox;
