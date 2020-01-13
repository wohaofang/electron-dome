import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'


import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch 
            title = '我的云笔记'
            onFileSearch={(value)=>{console.log(value)}}
          />
          <FileList 
            files={defaultFiles}
            onFileClick={(id)=>{console.log(id)}}
            onFileDelete={(id)=>{console.log(id)}}
            onSaveEdit={(id,newValue)=>{console.log(id,newValue)}}
          />
          <div className='row no-gutters'>
            <div className='col'>
              <BottomBtn 
                text="新建"
                colorClass="btn-primary"
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
        <div className='col-9 bg-primary right-panel'>
          <h1>right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;