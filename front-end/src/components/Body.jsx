import { useEffect, useState } from "react";
import HashModal from "./HashModal";

function Body({ type, setType }) {

    const [list, setList] = useState([]);
    const [selectedItemIdForDelete, setSelectedItemIdForDelete] = useState();

    const updateArray = (itemId, isCompleted) => {
        setList(
            (prevArray) => {
                return prevArray.map((value) => {
                    if (value?.id === itemId) {
                        return {
                            id: value?.id,
                            value: value?.value,
                            isCompleted: !isCompleted
                        };
                    } else {
                        return value;
                    }
                });
            });
    };

    const removeItemFromList = (itemId) => {
        const updatedItems = list.filter(item => item?.id !== itemId);
        setList(updatedItems);
    }

    return (
        <>
            <div className="body-wrap">
                <div className="body">
                    <div className="cardlist">
                        {
                            list?.map((item, index) => {
                                return (
                                    <div className="list-element" key={index}>
                                        <input
                                            type="checkbox"
                                            id="myCheckbox"
                                            className="checkbox"
                                            onClick={(e) => {
                                                updateArray(item?.id, item?.isCompleted)
                                            }}
                                            value={(item?.isCompleted) ? (item?.isCompleted) : ('')}
                                        />
                                        <label
                                            htmlFor="myCheckbox"
                                            className={(item?.isCompleted) ? ("checkbox-label-line-through") : ("checkbox-label")}
                                        >
                                            {item?.value}
                                        </label>

                                        {
                                            (selectedItemIdForDelete === item?.id) ? (
                                                <div className="delete-action">
                                                    <img
                                                        src="./icons/check.svg"
                                                        className="check-icon action-icon"
                                                        onClick={() => { removeItemFromList(item?.id) }}
                                                    />
                                                    <img
                                                        src="./icons/close.svg"
                                                        className="close-icon action-icon"
                                                        onClick={() => { setSelectedItemIdForDelete('') }}
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    src="./icons/trash.svg"
                                                    className="trash-icon action-icon"
                                                    onClick={() => { setSelectedItemIdForDelete(item?.id) }}
                                                />
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            {
                (type === 'decrypt' || type === 'add') && <HashModal type={type} setType={setType} setList={setList} todoList={list} />
            }
        </>
    )
}

export default Body