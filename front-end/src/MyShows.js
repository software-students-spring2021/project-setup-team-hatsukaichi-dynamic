import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import {
  createMockUser,
  mockAllShows,
  mockShowAPI,
  mockShowImage
} from './MockData'
import './MyShows.css'
import Modal from 'react-modal'
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom'
import { platforms } from './DropdownOptions'
import amazon from './Images/amazon.jpg'
import crunchyroll from './Images/crunchyroll.png'
import disney from './Images/disney.jpg'
import hbo from './Images/hbo.jpg'
import hulu from './Images/hulu.png'
import netflix from './Images/netflix.png'
import other from './Images/other.png'
require('dotenv').config()

const ShowGrid = (props) => {
  const [shows, setShows] = useState([])
  const [filteredShows, setFilteredShows] = useState([])

  useEffect(() => {
    let promises = []
    let showInfo = []

    // This check is crucial--it sees whether userData (the props) has been loaded yet or not
    if (!props.shows) {
      setShows([])
      setFilteredShows([])
    } else {
      props.shows.map((show) => {
        promises.push(
          axios
            .get(`http://localhost:4000/shows/${show.id}`)
            .then((response) => {
              showInfo.push(response.data)
            })
            .catch((err) => {
              console.log('Error: could not make the request.')
              console.log(err)
              showInfo.push(mockShowAPI[show.id])
            })
        )
        return show.id
      })

      Promise.all(promises).then(() => {
        setShows(showInfo)
        setFilteredShows(showInfo)
      })
    }
  }, [props.shows])

  useEffect(() => {
    if (props.shows === undefined || shows.length === 0) {
      setFilteredShows([])
    } else {
      const res = filterShows(props.shows, props.status, props.platform).map(
        (showUserInfo) => {
          return shows.find((show) => show.id === showUserInfo.id)
        }
      )
      setFilteredShows(res)
    }
  }, [props.shows, props.status, props.platform, shows])

  const setPlatformLogo = (platform) => {
    let platformLogo
    if (platform === 'Amazon Prime') {
      platformLogo = amazon
    } else if (platform === 'Crunchyroll') {
      platformLogo = crunchyroll
    } else if (platform === 'Disney Plus') {
      platformLogo = disney
    } else if (platform === 'HBO') {
      platformLogo = hbo
    } else if (platform === 'Hulu') {
      platformLogo = hulu
    } else if (platform === 'Netflix') {
      platformLogo = netflix
    } else { //platform is 'other' or hasn't been set
      platformLogo = other
    }
    return platformLogo
  }

  return (
    <> 
      <h3 id="title">My Shows</h3>
      <div id="show-container">
        {filteredShows !== undefined && filteredShows.length !== 0 ? (
          filteredShows.map((show) => {
            return (
              <Link to={`/show/${show.id}`} key={show.id}>
                {' '}
                <img
                  className="show-images"
                  src={mockShowImage(show.id)}
                  alt={`cover-${show.id}`}
                />
                  <img
                  className="platform-image"
                  src={setPlatformLogo(props.platform)}
                  alt={`${props.platform} logo`}
                />
               </Link>
            )
          })
        ) : (
          <p id="no-shows">No shows found...</p>
        )}
      </div>
    </>
  )
}

// filterShows filters a list of shows with user information by their status (indicated by a boolean)
// the status variable being passed into this function, however, is a string as to account for
// the case where no show status filtering is being done
const filterShows = (shows, status, platform) => {
  const isCompleted = status === 'Completed'
  if (!shows) {
    return []
  } else {
    const filtered = shows.filter((show) => {
      if (platform === '' || show.platform === platform) {
        console.log(show)
        if (status === '') {
          return show
        }
        return show.completed === isCompleted
      }
      return false
    })
    return filtered
  }
}

const MyShows = (props) => {
  const [userData, setUserData] = useState([])
  const [status, setStatus] = useState('')
  const [inProgressSelected, setInProgressSelected] = useState(false)
  const [completedSelected, setCompletedSelected] = useState(false)
  const [open, setOpen] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axios(`http://localhost:4000/tv_users/${props.id}`)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((err) => {
        // This case is likely to be due to Mockaroo rate limiting!
        // It'd be good to add some error handling here later, if someone tries to
        // access a non-existent user
        console.log('Error: could not make the request.')
        console.log(err)
        const mockUser = createMockUser(props.id)
        setUserData(mockUser)
      })
  }, [props.id])

  const toggleModal = () => {
    setOpen(!open)
  }

  const onStatusChange = (buttonType) => {
    if (buttonType === 'in progress') {
      inProgressSelected ? setStatus('') : setStatus('In Progress')
      // This if statement logic ensures that the two status buttons are never on at the same time
      if (status !== '') {
        setCompletedSelected(false)
      }
      setInProgressSelected(!inProgressSelected)
    } else {
      completedSelected ? setStatus('') : setStatus('Completed')
      if (status !== '') {
        setInProgressSelected(false)
      }
      setCompletedSelected(!completedSelected)
    }
  }

  const searchShows = (input, shows) => {
    return shows
      .filter((show) => {
        return show.name.toLowerCase().includes(input.toLowerCase())
      })
      .map((show) => {
        return { value: show.id, label: show.name }
      })
  }

  const loadOptions = (input) => {
    return axios
      .get(`http://localhost:4000/shows`)
      .then((response) => {
        return searchShows(input, response.data)
      })
      .catch((err) => {
        console.log('Error: could not make the request.')
        console.log(err)
        return searchShows(input, mockAllShows)
      })
  }

  const [selectedPlatform, setSelectedPlatform] = useState('')
  
  const onChange = (platform) => {
    setSelectedPlatform(platform.value)
  }
    
  const linkToShow = (e) => {
    history.push(`/show/${e.value}`)
  }

  return (
    <>
      <Header />
      <div id="container">
        <h3 id="profile-title">{userData.username}'s Shows</h3>
        {/* TODO: Use onChange props for AsyncSelect to trigger Individual Show modal */}
        <div id="search-container">
          <AsyncSelect
            className="search-bar"
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={linkToShow}
          />
        </div>
        <div id="filter-container">
          <button
            className={
              inProgressSelected ? 'selected filter-button' : 'filter-button'
            }
            onClick={(e) => onStatusChange('in progress')}>
            In Progress
          </button>
          <button className="my-shows-button" onClick={toggleModal}>
            Filter Shows
          </button>
          <Modal
            className="filter-modal"
            isOpen={open}
            onRequestClose={toggleModal}
            contentLabel="Filter Shows"
            overlayClassName="modal-open">
            <div className="modal-contents">
              <h3 id="filter-title">Filter by Platform</h3>
              <br />
              <Select
                options={platforms}
                onChange={onChange}
                value={selectedPlatform}
              />
              <button
                className="my-shows-button"
                id="apply"
                onClick={toggleModal}>
                Apply
              </button>
            </div>
          </Modal>
          <button
            className={
              completedSelected ? 'selected filter-button' : 'filter-button'
            }
            onClick={(e) => onStatusChange('completed')}>
            Completed
          </button>
        </div>
        <ShowGrid
          shows={userData.shows}
          status={status}
          platform={selectedPlatform}
        />
      </div>
      <Footer />
    </>
  )
}
export default MyShows 
