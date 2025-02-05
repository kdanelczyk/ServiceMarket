import { List, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";

const PaginatedList = ({
    data,
    totalPages = 0,
    renderItem,
    onPageChange,
    onSizeChange,
    pageSize,
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(pageSize);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
        if (onPageChange) {
            onPageChange(page - 1);
        }
    };

    const handleSizeChange = (newSize) => {
        setCurrentSize(newSize);
        if (onSizeChange) {
            onSizeChange(newSize);
        }
    };

    return (
        <div>
            <List dataSource={data} renderItem={renderItem} />

            <div style={styles.buttonContainer}>
                <StyledButton onClick={() => handleSizeChange(16)}>Pokaż 16</StyledButton>
                <StyledButton onClick={() => handleSizeChange(64)}>Pokaż 64</StyledButton>
            </div>

            {/* Pagination Controls */}
            <div style={styles.paginationContainer}>
                <Pagination
                    current={currentPage + 1}
                    total={totalPages * currentSize}
                    pageSize={currentSize}
                    onChange={handlePageChange}
                    itemRender={(page, type) => {
                        if (type === "prev") return <span style={styles.paginationArrow}>&larr;</span>;
                        if (type === "next") return <span style={styles.paginationArrow}>&rarr;</span>;
                        if (type === "page")
                            return (
                                <span
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        ...styles.paginationButton,
                                        backgroundColor: currentPage + 1 === page ? "#555" : "#333",
                                    }}
                                >
                                    {page}
                                </span>
                            );
                        return null;
                    }}
                    showSizeChanger={false}
                    showLessItems
                />
            </div>
        </div>
    );
};

const styles = {
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        gap: "8px",
    },
    paginationArrow: {
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        padding: "5px",
    },
    paginationButton: {
        padding: "11px 17px",
        borderRadius: "5px",
        cursor: "pointer",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        transition: "background-color 0.2s ease",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px",
    },
};

export default PaginatedList;
