import { List, Pagination } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Card from './Card';

const PaginatedList = ({ fetchData, attributesToShow, detailsUrl }) => {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchPageData = useCallback(async (page, size) => {
        try {
            const response = await fetchData(page, size);
            setData(response.data.content);
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [fetchData]);

    useEffect(() => {
        fetchPageData(currentPage, 10);
    }, [currentPage, fetchPageData]);

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
    };

    return (
        <div>
            <List
                dataSource={data}
                renderItem={(item) => {
                    const link = `${detailsUrl}/${item.id}`;
                    return (
                        <Card
                            item={item}
                            attributesToShow={attributesToShow}
                            link={link}
                        />
                    );
                }}
            />
            <Pagination
                current={currentPage + 1}
                total={totalItems}
                pageSize={10}
                onChange={handlePageChange}
                itemRender={(page, type, originalElement) => {
                    if (type === 'prev') {
                        return <span style={styles.arrow}>&larr;</span>;
                    }
                    if (type === 'next') {
                        return <span style={styles.arrow}>&rarr;</span>;
                    }
                    return originalElement;
                }}
            />
        </div>
    );
};

const styles = {
    arrow: {
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default PaginatedList;
