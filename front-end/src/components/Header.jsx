import { useState } from "react";

function Header({ setType }) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <>
            <div className='header-wrap'>
                <div className="header">
                    <div className="loader">
                        <div className="circle">
                        </div>
                    </div>

                    <div className="settings">
                        <img
                            src="./icons/settings.svg"
                            onClick={() => { setIsMenuVisible(!isMenuVisible) }}
                            alt={'icon'}
                        />
                    </div>
                </div>
            </div>

            {
                (isMenuVisible) ? (
                    <div className="menu-wrap">
                        <div className="menu">
                            <span
                                className="menu-item"
                                onClick={() => {
                                    setType('decrypt');
                                    setIsMenuVisible(false);
                                }}
                                title='press +'
                            >
                                Decrypt
                            </span>

                            <span
                                className="menu-item"
                                onClick={() => {
                                    setType('add');
                                    setIsMenuVisible(false);
                                }}
                            >
                                Add
                            </span>
                        </div>
                    </div>
                ) : (<></>)
            }

        </>
    )
}

export default Header;