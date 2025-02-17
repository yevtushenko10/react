import React, { useState, useEffect } from "react";

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const List = ({ list = [] }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [nonSelectedItems, setNonSelectedItems] = useState(list.map((_, i) => i));

    useEffect(() => {
        if (list.length === 0) return;

        const interval = setInterval(() => {
            setNonSelectedItems((prevNonSelected) => {
                if (prevNonSelected.length === 0) {
                    clearInterval(interval);
                    return [];
                }

                const randomIndex = getRandomInt(prevNonSelected.length);
                const randomElementByIndex = prevNonSelected[randomIndex];
                const newNonSelectedItems = prevNonSelected.filter((_, i) => i !== randomIndex);

                setSelectedItems((prevSelected) => [...prevSelected, randomElementByIndex]);

                return newNonSelectedItems;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [list]);

    return (
        <table>
            <tbody>
                {list.map((item, index) => (
                    <tr
                        key={index}
                        className={selectedItems.includes(index) ? "active" : undefined}
                    >
                        {Object.values(item).map((val, i) => (
                            <td key={i}>{val}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default List;
