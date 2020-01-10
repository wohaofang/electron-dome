import React,{useState} from 'react';
import './App.css';
import LikeBtn from './components/LikeBtn'
import Mouse from './components/Mouse'
import DogShow from './components/DogShow'

import useMouse from './hook/useMouse'
import useURLLoader from './hook/useURLLoader'

  const style = {
    width: 200
  }

const DogShowHook = ()=>{
  const [data,loading] = useURLLoader('https://dog.ceo/api/breeds/image/random');
  return(
    <div>
      {loading? <p>dog读取中</p>
        : <img src={data && data.message}  style={style} alt="dog"/>
      }
    </div>
  )
}

const CatShowHook = () =>{
  const [type, setType] = useState(1)
  const [data,loading] = useURLLoader(`https://api.thecatapi.com/v1/images/search?category_ids=${type}`)
  return(
    <div>
      {loading? <p>cat读取中</p>
        : <img src={data && data[0].url}  style={style} alt="cat"/>
      }
      <button onClick={()=>{setType(1)}}>帽子</button>
      <button onClick={()=>{setType(5)}}>盒子</button>
    </div>
  )
}

function App() {
  // const position = useMouse()
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>{position.x}</h1> */}
        <CatShowHook/>
        <DogShowHook/>

        <DogShow/>
        {/* <Mouse /> */}
        <LikeBtn />
      </header>
    </div>
  );
}

export default App;
