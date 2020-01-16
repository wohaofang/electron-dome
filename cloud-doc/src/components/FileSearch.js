import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';


const FileSearch = ({ title, onFileSearch }) => {
    const [ inputActive, setInpitActive ] = useState(false);
    const [ value, setValue ] = useState('');
    const enterPressed = (13)
    const escPressed = useKeyPress(27)
    let node = useRef(null)
    const closeSearch = () => {
        setInpitActive(false);
        setValue('');
        onFileSearch(false)
    }

    useEffect(()=>{
        // console.log('enterPressed',enterPressed,inputActive)
        // if(enterPressed && inputActive){
        //     onFileSearch(value)
        // }
        // if(escPressed && inputActive){
        //     closeSearch()
        // }
        const handleInputEvent = (event) => {
            const { keyCode } = event;
            if (keyCode === 13 && inputActive) {
                onFileSearch(value)
            } else if (keyCode === 27 && inputActive) {
                closeSearch()
            }
        }
        document.addEventListener('keyup', handleInputEvent);
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return(
        <div className='alert alert-primary d-flex justify-content-between align-items-center mb-0'>
            {   !inputActive && 
                <>
                    <span>{title}</span>
                    <button
                        type='button'
                        className="icon-button"
                        onClick={()=>{setInpitActive(true)}}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faSearch} 
                            title="搜索"
                        />
                    </button>
                </>
            }
            {   inputActive && 
                <>
                    <input 
                        className="form-control"
                        value = {value}
                        ref={node}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                    <button
                        type='button'
                        className="icon-button"
                        onClick={closeSearch}
                    >
                         <FontAwesomeIcon
                            size='lg'
                            icon={faTimes} 
                            title="关闭"
                        />
                    </button>
                </>
            }
        </div>
    )
}

FileSearch.propTypes = {
    title : PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
    title: '我的云文档'
}
export default FileSearch;