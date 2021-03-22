import React, { useEffect, useState, useRef } from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'
import './IndividualShow.css';
import axios from 'axios';
import { createMockUser, mockShowAPI, mockUserImage, mockShowImage } from './MockData'


const ProgressData = ({ season, episode }) => {
  const refSeason = useRef();
  const refEpisode = useRef();
  const saveProgressData = (() => {
    //to be returned in back-end stage
    let progress = [];
    var season = React.findDOMNode(this.refs.season).value;
    var episode = React.findDOMNode(this.refs.episode).value;
    progress.push(season);
    progress.push(episode);
  });
  return (
    <form onSubmit={(e) => saveProgressData()} >
      <label for="season">Current Season: </label>
      <input id="season" class="progress" value={season} ref={refSeason} />
      <br />
      <label for="episode">Current Episode:</label>
      <input id="episode" class="progress" value={episode} ref={refEpisode} />
      <br /><br />
      <input type="submit" value="Save Progress" />
    </form>
  )
}


const PlatformData = () => {

  const refNetflix = useRef();
  const refPrime = useRef();
  const refHulu = useRef();
  const refApple = useRef();


  const savePlatform = (() => {
    //to be returned in back-end stage
    //var this.refs.netflix.checked; 
  });
  return (
    <div>
      <p>Select the platform: </p>
      <form onSubmit={(e) => savePlatform()}>

        <input type="checkbox" id="netflix" value="Netflix" ref={refNetflix} />
        <label for="netflix">Netflix  </label>
        <input type="checkbox" id="prime" value="Prime" ref={refPrime} />
        <label for="prime">Prime  </label>
        <input type="checkbox" id="hulu" value="Hulu" ref={refHulu} />
        <label for="hulu">Hulu  </label>
        <input type="checkbox" id="apple" value="Apple" ref={refApple} />
        <label for="apple">Apple TV+  </label><br /><br />
        <input type="submit" value="Save Platform" />
      </form>
    </div>
  )
}

const Description = ({ genre, description, total_episodes, is_movie }) => {
  const refDescription = useRef();
  const refIsMovie = useRef();
  const refGenre = useRef();
  const refTotalEpisodes = useRef();
  const saveMovieData = (() => {
    //to be returned in back-end stage
    //var this.refs.netflix.checked; 
  });
  return (
    <div class="description">
      <br /><br />
      <label for="genre">Genre:  </label>
      <input type="text" id="genre" value={genre} ref={refGenre} readonly /><br /><br />
      <label for="description">Description: </label>
      <textarea id="description" value={description} ref={refDescription} readonly /><br /><br />
      <label for="total_episodes">Total Episodes: </label>
      <input type="text" id="total_episodes" value={total_episodes} ref={refTotalEpisodes} readonly /><br /><br />
      <label for="isMovie">Is it a movie? </label>
      <input type="text" id="isMovie" value={is_movie} ref={refIsMovie} readonly /><br /><br />
    </div>
  )
}

const IndividualShow = (props) => {

  const refTitle = useRef();
  const refCover = useRef();
  const returnToShows = (() => {
    window.location.href = '/my-shows/'
  });
  const addToWatched = (() => {

    window.location.href = '/my-shows/'
  });


  let [show, setShow] = useState([]);

  useEffect(() => {
    //temporary variable to be replaced
    let showInfo = [];
    let show_id = "54";
    //axios.get(`https://my.api.mockaroo.com/shows/${show.id}.json?key=3010e030`)
    axios.get(`https://my.api.mockaroo.com/shows/${show_id}.json?key=3010e030`)
      .then((response) => {
        showInfo.push(response.data);
        console.log(showInfo);
        console.log(show);
        setShow(showInfo);
      })
  }, [])


  return (
    <>
      <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="header"><h2>Show Page</h2></div>

      <div class="show_content">
        <fieldset class="main">
          <div class="show-details">
            <fieldset >
              {show.map(s => (
                <h3 id="title" value={s.name} ref={refTitle}>{s.name}</h3>
              ))}
              <button onClick={(e) => returnToShows()}>
                Return to Shows
      </button>
              <button onClick={(e) => addToWatched()}>
                Add to In Progress or Watched Shows
      </button>
              <ProgressData season="5" episode="7" />
              <br /><br />
              <PlatformData />
              <br /><br />
              <div class="show_content">
                {show.map(s => (
                  <Description genre={s.genres} description={s.description} total_episodes={s.episodes} is_movie={s.isMovie} />
                ))}

                <br />
              </div>
            </fieldset>

          </div>
          {show.map(s => (
            <img id="cover" src={s.coverPhoto} alt="" ref={refCover}></img>
          ))}
          <div id="clear"></div>
        </fieldset>
      </div>

      <Footer />
    </>
  );
}
export default IndividualShow