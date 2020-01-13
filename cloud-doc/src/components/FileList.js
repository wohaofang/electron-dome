import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress';

const FileList = ( { files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStates, setEditStates] = useState(false);
    const [value, setValue] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () =>{
        setEditStates(false);
        setValue('');
    }

    useEffect(()=>{
        if(enterPressed && editStates){
            const editItem = files.find(file=>file.id === editStates)
            onSaveEdit(editItem.id, value)
            setEditStates(false)
            setValue('')
        }
        if(escPressed && editStates){
            closeSearch()
        }
        // const handleInputEvent = (event) => {
        //     const { keyCode } = event;
        //     if (keyCode === 13 && editStates) {
        //         const editItem = files.find(file=>file.id === editStates)
        //         onSaveEdit(editItem.id, value)
        //         setEditStates(false)
        //         setValue('')
        //     } else if (keyCode === 27 && editStates) {
        //         closeSearch()
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent);
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent)
        // }
    }, [editStates, enterPressed, escPressed, files, onSaveEdit, value])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file=>(
                    <li
                        className="list-group-item bg-light row d-flex align-items-center file-item"
                        key={file.id}
                    >
                    {   (file.id !== editStates) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon
                                size="lg"
                                icon={faMarkdown} 
                                />
                            </span>
                            <span 
                                className="col-7 c-link"
                                onClick= {()=>{onFileClick(file.id)}}
                                >
                                {file.title}
                            </span>


                            <button
                                type="button"
                                className="icon-button col-1"
                                onClick={() => {setEditStates(file.id); setValue(file.title)}}
                                >
                                <FontAwesomeIcon
                                    title="编辑"
                                    size="lg"
                                    icon={faEdit} 
                                />
                            </button>

                            <button
                                type="button"
                                className="icon-button col-1"
                                onClick={() => {onFileDelete(file.id)}}
                                >
                                <FontAwesomeIcon
                                    title="删除"
                                    size="lg"
                                    icon={faTrash} 
                                />
                            </button>
                        </>
                    }
                    { (file.id === editStates) && 
                        <>
                            <input 
                                className="form-control col-10"
                                value = {value}
                                onChange={(e)=>{setValue(e.target.value)}}
                            />
                            <button
                                type='button col-2'
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
                    </li>
                ))
             }
        </ul>
      ) 
}




FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func,
  }
  export default FileList