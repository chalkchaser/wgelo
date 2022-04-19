import { useEffect, useState } from 'react'

import LoginOutButton from "./LoginOutButton"
import Profiles from './Profile'


const PageButtons = ({setPage}) =>{
    return(
        <nav id ="about-nav">
        <button onClick={()=>setPage('about')}>About this App</button>
        <button onClick={()=>setPage('faq')}>Frequently Asked</button>
        <button onClick={()=>setPage('tech')}>Development Info</button>
        </nav>
    )
}


const About = () =>{

const [page, setPage]= useState('about')

const Content = ({page}) =>{

    if(page==="about"){
        return(
        <div id = "about">
              
          <h1>WGElo - a simple system  for skill tracking.</h1>
          <PageButtons setPage={setPage}/>
          <h2>About </h2>
        
          WGElo allows you to create players and record their matches.
         It provides a database, to track and store every player's elo rating,
         as well as their profile to view individual rating progressions.
         Log in to create your own Wgelo table. You can start right away by creating individual players and recording matches between them.
 
          <h3>What can I use this app for?</h3>
          This app was created for my casual but fiercely competitive friend group.
          There is a variety of use cases for elo tables, such as tracking fantasy leagues and predicting game outcomes.
          Our friend group uses this app to track matches and player skill in our semi-casual chess tournaments and other skill-related games.

        
          <br/>
          
          
          </div>
        )
    }else if(page === 'faq'){
        return(
        <div id = "about">
            <h1>WGElo - a simple system  for skill tracking.</h1>
            <PageButtons setPage={setPage}/>
            <h2>Frequently asked Questions </h2>
          

               
                

            <h3>What is elo?</h3>
            The Elo system is a method for calculating the relative skill levels of players. It is used in a variety of leagues in games such as Chess or Table Tennis.
            The difference of player ratings is taken into consideration when a match is recorded. 
            A weaker player gains more points by beating a higher rated player than a lower rated one.
            For more information, you can visit <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Wikipedia</a>
            <br/>

            
            <h3>Which formula do you use to calculate the elo rating?</h3>
            The standard formula is being used, with a starting elo of 1200 and a permanent k-value of 16.
            <h3>Why can I not log in?</h3>
            Unfortunately, due to missing features in the authentication platform, 
            some IOS devices might have trouble logging in, especially IPhones devices (all browsers), or MacBooks using the Safari browser.

        </div>
        )  }else if(page === 'tech'){
            return(<div id = "about">
                 <h1>WGElo - a simple system  for skill tracking.</h1>
                 <PageButtons setPage={setPage}/>
                 <h2>Development info </h2>
           


                    <br/>
               
                    WGElo is fully functional fullstack, using:
                     <ul>
                     
                    <li>React for the Interface</li>
                    <li>NodeJs/Express for the API</li>
                    <li>MongoDB to save player and match data</li>
                    <li>Auth0 for account management</li>
                    <li>Javascript, CSS, HTML/JSX</li>

                    </ul>
                    For more information, you can visit the official <a href='https://github.com/chalkchaser/wgelo'>Github repository</a>
            </div>)
      

    }

}

return(
      <div id="all">
      <span id="top">   
          <LoginOutButton/>
          <Profiles/>
        </span>

        <div id = "main">
        <Content page={page}/>

        </div>
      </div>
)
}

      export default About