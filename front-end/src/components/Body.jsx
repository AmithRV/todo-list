import { useEffect, useState } from "react";
import HashModal from "./HashModal";
import axios from '../helpers/axios';

// import { ToastContainer, toast } from 'react-toastify';

function Body({ type, setType, setBackgroundImageUrl, backgroundImageUrl }) {

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

        axios.delete('/remove-item', {
            data: {
                id: itemId
            }
        }).then(() => {
        }).catch((error) => {
        }).finally(() => {
        })
    }

    const getTodoList = () => {
        axios.get('/list')
            .then((response) => {
                console.log('list : ', response)
            }).catch((error) => {
            }).finally(() => {
            })
    }

    useEffect(() => {
        getTodoList();
    }, [])

    return (
        <>
            <div className="body-wrap" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>

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
                                                        alt={'icon'}
                                                    />
                                                    <img
                                                        src="./icons/close.svg"
                                                        className="close-icon action-icon"
                                                        onClick={() => { setSelectedItemIdForDelete('') }}
                                                        alt={'icon'}
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    src="./icons/trash.svg"
                                                    className="trash-icon action-icon"
                                                    onClick={() => { setSelectedItemIdForDelete(item?.id) }}
                                                    alt={'icon'}
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
                (type === 'decrypt' || type === 'add' || type === 'chang-bg-image') &&
                <HashModal
                    type={type}
                    setType={setType}
                    setList={setList}
                    todoList={list}
                    setBackgroundImageUrl={setBackgroundImageUrl}
                />
            }
        </>
    )
}

export default Body