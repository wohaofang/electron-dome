import React,{ useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import uuidv4 from 'uuid/v4';

import {flattenArr , objToArr} from './utils/helper'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'

import defaultFiles from './utils/defaultFiles'

const fs = window.require('fs')
console.log(fs)
console.dir(fs)
function App() {
  const [ files, setFiles] = useState(flattenArr(defaultFiles));
  // console.log(files)
  const [ activeFileID, setActiveFileID] = useState('');
  const [ openedFileIDs, setOpenedFileIDs] = useState([]);
  const [ unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const [ searchedFiles, setSearchedFiles] = useState([]);

  const filesArr = objToArr(files);
// console.log(filesArr)

  const FileClick = (fileID) =>{
    // 设置 active file
    setActiveFileID(fileID)
    // 添加 id 
    if(!openedFileIDs.includes(fileID)){
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }
  const tabClose = (id)=>{
    // 删除
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabWithout)
    // 设置高亮
    if (tabWithout.length > 0) {
      setActiveFileID(tabWithout[0])
    }else{
      setActiveFileID('')
    }
  }
  const fileChange = (id,value) => {
    // 更新输入内容
    const newFile = {...files[id],body: value}
    setFiles({...files, [id]: newFile})

    if(!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([ ...unsavedFileIDs, id])
    }
  }
  const deleteFile = (id) => {
    // 删除file id
    // const newFiles = files.filter(file => file.id !== id)
    delete files[id]
    setFiles(files)

    // close tab if opened
    tabClose(id)
  }
  const updateFileName = (id,title) => {
    // 更新 file name
    const newFiles = { ...files[id], title, isNew: false}
    setFiles({...files, [id]: newFiles})
  }
  const fileSearch = (keyword) => {
    let newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

 
  const createNewFile = () => {
    const newID = uuidv4();
    const newFile =  {
      id: newID,
      title: '',
      body: '## 请输入 Markdown',
      createdAt: new Date().getTime(),
      isNew: true
    }
    setFiles({ ...files, [newID]: newFile})
  }
  const openedFiles = openedFileIDs.map( openID => {
    return files[openID]
  })
  const activeFile = files[activeFileID]
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr;

  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch 
            title = '我的云笔记'
            onFileSearch={fileSearch}
          />
          <FileList 
            files={fileListArr}
            onFileClick={FileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className='row no-gutters button-group '>
            <div className='col'>
              <BottomBtn 
                text="新建"
                colorClass="btn-primary"
                onBtnClick={createNewFile}
                icon={faPlus}
              />
            </div>
            <div className='col'>
              <BottomBtn 
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className='col-9 right-panel'>
        { !activeFile &&
          <div className="start-page">
            选择或者创建新的 Markdown 文档
          </div>
        }
        {
          activeFile &&
          <>
            <TabList 
              files={openedFiles}
              activeId= {activeFileID}
              unsaveIds={unsavedFileIDs}
              onTabClick={tabClick}
              onCloseTab={tabClose}
            />
            <SimpleMDE 
              key={activeFile && activeFile.id}
              value={activeFile && activeFile.body}
              onChange={(value)=>{fileChange(activeFile.id,value)}}
              options={{
                minHeight: '515px',

              }}
            />
          </>
        }
       
        </div>
      </div>
    </div>
  );
}

export default App;
