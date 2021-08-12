import { FormEvent, useRef, useEffect } from 'react';
import './Modal.css';

interface ModalType {
    name: string | null;
    setName: Function;
    setGameStart: Function;
}

const Modal = ({ name, setName, setGameStart }: ModalType) => {
    const submitted = (e: any) => {
        e.preventDefault();
        setGameStart(true);
        setName(e.target[0].value.trim());
    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current!.focus();
    }, []);

    if (!name) {
        return (
            <div className="modal-container" tabIndex={0}>
                <form className="name-form" onSubmit={submitted}>
                    <input
                        ref={inputRef}
                        name="name"
                        placeholder="Enter Name! Press Enter to Start"
                        autoFocus
                        autoComplete="off"
                        onKeyUp={(e: any) => {
                            if (e.key === 'enter') {
                                submitted(e);
                            }
                        }}
                    />
                </form>
            </div>
        );
    }

    return <div className="modal-container"></div>;
};

export default Modal;
