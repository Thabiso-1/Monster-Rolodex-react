import { useState, useEffect } from 'react';
import './App.css';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/seearch-box.component';



const App = () =>{
  
  const [serchField, setSearchField] = useState(''); //[value, setValue]
  const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filterdMonsters, setFilterdMonsters] = useState(monsters);

  console.log('renderd');


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
       .then(Response => Response.json())
       .then((users) => setMonsters(users)
       );
  },[]);
  
  useEffect(() =>{
    const newFilterdMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(serchField);
    });

    setFilterdMonsters(newFilterdMonsters);
  }, [monsters, serchField])



  const onSearchChange = (event) => {
            const serchFieldString = event.target.value.toLocaleLowerCase();
            setSearchField(serchFieldString);
           
  }

  const onTitleChange = (event) => {
    const serchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(serchFieldString);
   
  }

  return(
    <div className='App'>
      <h1 className='app-title'>{title}</h1>

      <SearchBox
         className='search-box'
         onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <br/>
       <SearchBox
         className='title-search-box'
         onChangeHandler={onTitleChange}
        placeholder='set title'
      />
      <CardList monsters={filterdMonsters}/>
    </div>
  )
}


// class App extends Component{

//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       serchField: ''
//     };
//   }

//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(Response => Response.json())
//       .then((users) => this.setState(() => {
//         return{monsters: users};
//       }
//       )
//       );
//   }
//   onSearchChange = (event) => {
//     const serchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return {serchField};
//     })
//   }

//   render(){
//     //console.log('render from app.js');
//     const {monsters, serchField} = this.state;
//     const {onSearchChange} = this;
//     const filterdMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(serchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monster Rolodex</h1>

//         <SearchBox
//         className='search-box'
//         onChangeHandler={onSearchChange}
//         placeholder='search monsters'/>
//         <CardList monsters={filterdMonsters}/>   
//       </div>
//     );
//   }
// }

export default App;
