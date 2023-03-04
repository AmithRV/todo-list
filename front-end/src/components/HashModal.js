import { useState } from "react"

function HashModal({ type, setType, setList, todoList }) {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addTask =async () => {
        setIsLoading(true);
        setType('');
        await setList([...todoList, { id: todoList?.length+1, value: inputValue, isCompleted: false }])
        setIsLoading(false);
    }


    return (
        <>
            <div className="hash-modal-modal-wrap">
                <div className="hash-modal-modal">
                    <div className="hash-modal-modal-header">
                        <img
                            src="./icons/close.svg"
                            onClick={() => { setType('') }}
                            className='close-icon'
                            alt={'icon'}
                        />
                    </div>

                    <form>
                        <div className="hash-modal-modal-body">
                            {
                                (type === 'decrypt') ? (
                                    <label>ENTER THE KEY</label>
                                ) : (
                                    <label>ENTER THE TASK</label>
                                )
                            }
                            <input
                                type={'text'}
                                className='hash-input'
                                autoFocus={true}
                                value={inputValue ? inputValue : ''}
                                onChange={(e) => {
                                    setInputValue(e?.target?.value)
                                }}
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
                                        onClick={() => { setType('') }}
                                    >
                                        Decrypt
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="button"
                                        onClick={() => { addTask() }}
                                        disabled={isLoading}
                                    >
                                        {(isLoading) ? ('Adding...') : ('Add')}
                                    </button>
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