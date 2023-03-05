import { useEffect, useState } from "react"
import { addBackgroundImage, addTasktoList } from "../helpers/request";

function HashModal({ type, setType, setList, todoList, setBackgroundImageUrl, callBack }) {

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const addTask = async () => {
        setIsLoading(true);
        if (inputValue === '') {
            setIsError(true);
        } else {
            const data = {
                data: {
                    id: todoList?.length + 1,
                    value: inputValue,
                    isCompleted: false
                }
            }

            await setList([...todoList, { id: todoList?.length + 1, value: inputValue, isCompleted: false }]);
            addTasktoList(data, setType);
        }

    }

    const changeBgImage = () => {
        if (inputValue === '') {
            setIsError(true);
        } else {
            addBackgroundImage(inputValue,setBackgroundImageUrl,setType,setIsLoading);
        }
    }

    useEffect(() => {
        if (inputValue !== '') {
            setIsError(false);
        }
    }, [inputValue])

    return (
        <>
            <div className="hash-modal-modal-wrap" >
                <div className="hash-modal-modal">
                    <div className="hash-modal-modal-header">
                        <img
                            src="./icons/close.svg"
                            onClick={() => { setType('') }}
                            className='close-icon'
                            alt={'icon'}
                        />
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); }}>
                        <div className="hash-modal-modal-body">
                            {
                                (type === 'decrypt') ? (
                                    <label>ENTER THE KEY</label>
                                ) : (
                                    (type === 'chang-bg-image') ? (
                                        <label>ENTER THE IMAGE URL</label>
                                    ) : (
                                        <label>ENTER THE TASK</label>
                                    )
                                )
                            }
                            <input
                                type={'text'}
                                className={(isError) ? ('hash-input-error') : ('hash-input')}
                                autoFocus={true}
                                value={inputValue ? inputValue : ''}
                                onChange={(e) => {
                                    setInputValue(e?.target?.value)
                                }}
                                placeholder={(isError) ? ('This field cannot be empty') : ('')}
                            />
                        </div>

                        <div className="hash-modal-modal-footer">
                            <button
                                type="button"
                                className="button"
                                onClick={() => { setType('') }}
                            >
                                Cancel
                            </button>

                            {
                                (type === 'decrypt') ? (
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setType('')
                                        }}
                                    >
                                        Decrypt
                                    </button>
                                ) : ((type === 'chang-bg-image') ? (
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={(e) => { changeBgImage() }}
                                        disabled={isLoading}
                                    >
                                        {(isLoading) ? ('Changing...') : ('Change')}
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={(e) => { addTask(e); }}
                                        disabled={isLoading}
                                    >
                                        {(isLoading) ? ('Adding...') : ('Add')}
                                    </button>
                                )

                                )
                            }


                        </div>
                    </form>

                </div>
            </div>

            <div className="modal-backdrop"></div>

        </>
    )
}

export default HashModal;