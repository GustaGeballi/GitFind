import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/itemList";

import './styles.css'

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  };


  return (
    <div className="App">
      <Header/>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"/>
        <div className="info">
          <div className="busca">
            <input name="usuario" 
            value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder="@username"/>
            <button onClick={handleGetData}>buscar</button>
          </div>
          {currentUser?.name ? (
            <>
            <div className="profile">
            <img 
            src={currentUser.avatar_url}
            className="profile_img" 
            alt="profile image"/>
            <div className="info_profile">
              <h4>{currentUser.name}</h4>
              <p>@{currentUser.login}</p>
              <span>{currentUser.bio}</span>
            </div>
            </div>
            <hr/>
          </>
          ) : null}
          {repos?.length ? (
          <div>
            <h4 className="repositories">
              Repositórios
            </h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
          </div>
        ) : null}
        </div>
      </div>
    </div>
    
  );
}

export default App;
