import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import './IndividualShow.css'
import axios from 'axios'
import { mockShowAPI, mockShowImage } from './MockData'
import { Link } from 'react-router-dom'
import platforms from './Platforms'
import Select from 'react-select'
require('dotenv').config()

/*the component stores user's watched episode progress 
by allowing to save the show's latest season and episode watched*/
const ProgressData = ({ season, episode, isMovieSet }) => {
  const refSeason = useRef()
  const refEpisode = useRef()
  const saveProgressData = () => {
    let progress = []
    let seasonS = React.findDOMNode(this.refs.season).value
    let episodeS = React.findDOMNode(this.refs.episode).value
    progress.push(seasonS)
    progress.push(episodeS)
  } //return null if the show is a movie since a movie does not have seasons or episodes
  if (isMovieSet === true) {
    return null
  } else {
    return (
      <div type="hidden">
        <form onSubmit={(e) => saveProgressData()}>
          <label className="label-custom" htmlFor="season">
            Current Season:{' '}
          </label>
          <input
            id="season"
            className="progress"
            defaultValue={season}
            ref={refSeason}
          />
          <br />
          <label className="label-custom" htmlFor="episode">
            Current Episode:
          </label>
          <input
            id="episode"
            className="progress"
            defaultValue={episode}
            ref={refEpisode}
          />
          <br />
          <input
            className="btn-progress"
            id="btn-progress"
            type="submit"
            value="Save Progress"
          />
        </form>
      </div>
    )
  }
}


const Description = ({ genres, description, totalEpisodes, isMovie }) => {

  return (
    <div className="description">
      <span>
        Genres
      </span>
      <p>
        {genres ? genres.replaceAll("|", ", ") 
        : null}</p>
      <span>
        Description
      </span>
      <p>
        {description}
      </p>
      {isMovie ? (
        <>
          <span>
            Total Episodes
          </span>
          <p>
            {totalEpisodes}.
          </p>
        </>
      ) : <p>This entry is a movie</p>}
    </div>
    )
  }

const IndividualShow = ({ id, seasons, episodes, completed, progress }) => {
  const [show, setShow] = useState({});


  useEffect(() => {
    axios
      .get(
      `https://my.api.mockaroo.com/shows/${id}.json?key=${process.env.REACT_APP_MOCKAROO_KEY}`
      )
      .then((response) => {
        setShow(response.data)
      })
      .catch((err) => {
        console.log(
          "We likely reached Mockaroo's request limit, or you did not insert your API key in .env."
        )
        console.log(err)
        setShow(mockShowAPI[id])
      })
  }, [id])

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="show-content">
          <fieldset className="main">
            <div className="show-details">
              <fieldset>
                <h3 id="title" value={show.name} ref={refTitle}>
                  {show.name}
                </h3>
                <Link to="/my-shows/1">
                  <button className="btn-progress">Return to Shows</button>
                </Link>
                <Link to="/my-shows/1">
                  <button className="btn-progress">
                    Add to In Progress Shows
                  </button>
                </Link>
                <Link to="/my-shows/1">
                  <button className="btn-progress">Add to Watched Shows</button>
                </Link>
                <ProgressData season={seasons} episode={episodes} isMovieSet={show.isMovie} />
                <Select className="platform-select" options={platforms} />
                <div className="show-content">
                  <Description
                    genre={show.genres}
                    description={show.description}
                    totalEpisodes={show.episodes}
                    isMovie={show.isMovie}
                  />
                </div>
              </fieldset>
            </div>
            <div id="cover">
              <p className="label-custom">{show.name}</p>
              <br />
              <img
                src={mockShowImage(show.id)}
                alt={`cover-${show.id}`}
                ref={refCover}
              ></img>
            </div>
            <div id="clear"></div>
          </fieldset>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default IndividualShow
