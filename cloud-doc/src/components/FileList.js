import React, { useState, useEffect, useRef } from 'react'
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

    let node = useRef(null)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    let closeSearch = (editItem)=>{
        setEditStates(false);
        setValue('');
        // 如果有 editItem 需要删除掉这个 editItem
        if(editItem.isNew){
            onFileDelete(editItem.id)
        }
    }

    useEffect(()=>{
        const editItem = files.find(file=>file.id === editStates)
        if(enterPressed && editStates && value.trim()!==''){
            onSaveEdit(editItem.id, value)
            setEditStates(false)
            setValue('')
        }
        if(escPressed && editStates){
            closeSearch(editItem)
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
    }, [closeSearch, editStates, enterPressed, escPressed, files, onSaveEdit, value])
    useEffect(()=>{
        const newFile = files.find(file => file.isNew);
        console.log(newFile);
        if(newFile) {
           setEditStates(newFile.id);
           setValue(newFile.title); 
        }
    },[files]);
    useEffect(()=>{
        if(editStates){
            node.current.focus()
        }
    })

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file=>(
                    <li
                        className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                    {   (file.id !== editStates && !file.isNew) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon
                                size="lg"
                                icon={faMarkdown} 
                                />
                            </span>
                            <span 
                                className="col-6 c-link"
                                onClick= {()=>{onFileClick(file.id)}}
                                >
                                {file.title}
                            </span>


                            <button
                                type="button"
                                className="icon-button col-2"
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
                                className="icon-button col-2"
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
                    { ((file.id === editStates) || file.isNew) && 
                        <>
                            <input 
                                className="form-control col-10"
                                value = {value}
                                ref={node}
                                placeholder=" 请输入文件名称"
                                onChange={(e)=>{setValue(e.target.value)}}
                            />
                            <button
                                type='button col-2'
                                className="icon-button"
                                onClick={()=>{closeSearch(file);}}
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