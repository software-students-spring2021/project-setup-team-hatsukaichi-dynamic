// This file contains mock data for handling Mockaroo rate limit exceeded errors
const mockShows = JSON.parse(`[{
  "id": 36,
  "platform": "Netflix",
  "completed": false,
  "seasons": 2,
  "episodes": 30
},{
  "id": 3,
  "platform": "Amazon Prime",
  "completed": false,
  "seasons": 6,
  "episodes": 78
},
{
  "id": 54,
  "platform": "Disney Plus",
  "completed": true,
  "seasons": 0,
  "episodes": 8
},
{
  "id": 42,
  "platform": "HBO",
  "completed": false,
  "seasons": 5,
  "episodes": 71
},
{
  "id": 96,
  "platform": "Crunchyroll",
  "completed": false,
  "seasons": 2,
  "episodes": 17
},
{
  "id": 11,
  "platform": "Other",
  "completed": true,
  "seasons": 3,
  "episodes": 22
}]`)

const createMockUser = (id, username, password, email) => {
  return {
    id: id,
    username: username || 'mlaffan0',
    password: password || 'njb9oAB',
    email: email || 'jparkin0@utexas.edu',
    bio: '',
    img: '',
    shows: []
  }
}

const mockUserAPI = {
  1: {
    id: 1,
    username: 'mlaffan0',
    password: 'njb9oAB',
    email: 'jparkin0@utexas.edu',
    bio:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    img: 'http://dummyimage.com/182x112.jpg/dddddd/000000',
    shows: mockShows
  },
  2: {
    id: 2,
    username: 'fgoodlett1',
    password: 'Y3DJKGN2',
    email: 'rgrolmann1@cloudflare.com',
    bio: 'Mauris sit amet cursus integer. Ut tellus.',
    img: 'https://dummyimage.com/194x133.png/ffffff/000000',
    shows: mockShows
  },
  3: {
    id: 3,
    username: 'msuff2',
    password: 'hrqkb4',
    email: 'msuff2',
    bio:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    img: 'https://dummyimage.com/194x133.png/dddddd/000000',
    shows: mockShows
  },
  4: {
    id: 4,
    username: 'dstuckford3',
    password: 'ykBWYvO',
    email: 'mjosilevich3@apple.com',
    bio: 'Etiam faucibus cursus urna. Ut tellus.',
    img: 'https://dummyimage.com/194x133.png/ffffff/000000',
    shows: mockShows
  }
}

const mockUserUpdate = (id, newUser) => {
  const thirdUser = mockUserAPI[id]
  Object.keys(newUser).map((key) => {
    thirdUser[key] = newUser[key]
  })
  mockUserAPI[id] = thirdUser
  return thirdUser
}

const mockShowAPI = {
  54: {
    id: 54,
    name: 'Ladies They Talk About',
    description: 'Aenean sit amet justo.',
    genres: 'Drama|Romance',
    isMovie: false,
    episodes: 66,
    coverPhoto: 'http://dummyimage.com/243x117.png/dddddd/000000'
  },
  42: {
    id: 42,
    name: 'Samouraï, Le (Godson, The)',
    description: 'Etiam pretium iaculis justo.',
    genres: 'Crime|Drama|Thriller',
    isMovie: false,
    episodes: 56,
    coverPhoto: 'http://dummyimage.com/246x181.png/cc0000/ffffff'
  },
  96: {
    id: 96,
    name: "Bob Saget: That Ain't Right",
    description: 'Proin eu mi. Nulla ac enim.',
    genres: 'Comedy',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/174x138.png/dddddd/000000'
  },
  11: {
    id: 11,
    name: 'Ca$h',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    genres: 'Crime|Thriller',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/225x181.png/cc0000/ffffff'
  },
  3: {
    id: 3,
    name: 'Forest (Rengeteg)',
    description:
      'Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
    genres: 'Drama',
    isMovie: false,
    episodes: 10,
    coverPhoto: 'http://dummyimage.com/219x233.png/cc0000/ffffff'
  },
  36: {
    id: 36,
    name: 'Man in the Saddle',
    description: 'Vestibulum sed magna at nunc commodo placerat.',
    genres: 'Western',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/184x242.png/ff4444/ffffff'
  },
  10: {
    id: 10,
    name: 'Deck the Halls',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
    genres: 'Comedy',
    isMovie: false,
    episodes: 10,
    coverPhoto: 'http://dummyimage.com/175x231.png/dddddd/000000'
  }
}

const mockAllShows = JSON.parse(`[{
  "id": 36,
  "name": "Man in the Saddle",
  "description": "Vestibulum sed magna at nunc commodo placerat.",
  "genres": "Western",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/184x242.png/ff4444/ffffff"
},{
  "id": 3,
  "name": "Forest (Rengeteg)",
  "description": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
  "genres": "Drama",
  "isMovie": false,
  "episodes": 10,
  "coverPhoto": "http://dummyimage.com/219x233.png/cc0000/ffffff"
},
{
  "id": 54,
  "name": "Ladies They Talk About",
  "description": "Aenean sit amet justo.",
  "genres": "Drama|Romance",
  "isMovie": false,
  "episodes": 66,
  "coverPhoto": "http://dummyimage.com/243x117.png/dddddd/000000"
},
{
  "id": 42,
  "name": "Samouraï, Le (Godson, The)",
  "description": "Etiam pretium iaculis justo.",
  "genres": "Crime|Drama|Thriller",
  "isMovie": false,
  "episodes": 56,
  "coverPhoto": "http://dummyimage.com/246x181.png/cc0000/ffffff"
},
{
  "id": 96,
  "name": "Bob Saget: That Ain't Right",
  "description": "Proin eu mi. Nulla ac enim.",
  "genres": "Comedy",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/174x138.png/dddddd/000000"
},
{
  "id": 11,
  "name": "Ca$h",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  "genres": "Crime|Thriller",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/225x181.png/cc0000/ffffff"
},
{
  "id": 9,
  "name": "Smart People",
  "description": "Proin risus. Praesent lectus.",
  "genres": "Comedy|Drama|Romance",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/247x193.png/dddddd/000000"
}, {
  "id": 10,
  "name": "Deck the Halls",
  "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
  "genres": "Comedy",
  "isMovie": false,
  "episodes": 10,
  "coverPhoto": "http://dummyimage.com/175x231.png/dddddd/000000"
}]`)

const mockPopularShows = JSON.parse(
  `[
    {
      "title":"Game of Thrones",
      "year":2011,
      "ids":{
        "trakt":1390,
        "slug":"game-of-thrones",
        "tvdb":121361,
        "imdb":"tt0944947",
        "tmdb":1399,
        "tvrage":24493
      }
    }, {
      "title":"Breaking Bad",
      "year":2008,
      "ids":{
        "trakt":1388,
        "slug":"breaking-bad",
        "tvdb":81189,
        "imdb":"tt0903747",
        "tmdb":1396,
        "tvrage":18164
      }
    }, {
      "title":"The Walking Dead",
      "year":2010,
      "ids":{
        "trakt":1393,
        "slug":"the-walking-dead",
        "tvdb":153021,
        "imdb":"tt1520211",
        "tmdb":1402,"tvrage":25056
      }
    }, {
      "title":"The Big Bang Theory",
      "year":2007,
      "ids":{
        "trakt":1409,
        "slug":"the-big-bang-theory",
        "tvdb":80379,
        "imdb":"tt0898266",
        "tmdb":1418,
        "tvrage":8511
      }
    }, {
      "title":"Sherlock",
      "year":2010,
      "ids":{
        "trakt":19792,
        "slug":"sherlock",
        "tvdb":176941,
        "imdb":"tt1475582",
        "tmdb":19885,
        "tvrage":23433
      }
    }, {
      "title":"How I Met Your Mother",
      "year":2005,
      "ids":{
        "trakt":1095,
        "slug":"how-i-met-your-mother",
        "tvdb":75760,
        "imdb":"tt0460649",
        "tmdb":1100,
        "tvrage":3918
      }
    }, {
      "title":"Dexter",
      "year":2006,
      "ids":{
        "trakt":1396,
        "slug":"dexter",
        "tvdb":79349,
        "imdb":"tt0773262",
        "tmdb":1405,
        "tvrage":null
      }
    }, {
      "title":"Friends",
      "year":1994,
      "ids":{
        "trakt":1657,
        "slug":"friends",
        "tvdb":79168,
        "imdb":"tt0108778",
        "tmdb":1668,
        "tvrage":3616
      }
    }, {
      "title":"Stranger Things",
      "year":2016,
      "ids":{
        "trakt":104439,
        "slug":"stranger-things",
        "tvdb":305288,
        "imdb":"tt4574334",
        "tmdb":66732,
        "tvrage":48493
      }
    }, {
      "title":"Arrow",
      "year":2012,
      "ids":{
        "trakt":1403,
        "slug":"arrow",
        "tvdb":257655,
        "imdb":"tt2193021",
        "tmdb":1412,"tvrage":30715
      }
    }
  ]`
)

const mockGOT = JSON.parse(
  {
    "title": "Game of Thrones",
      "year": 2011,
      "ids": {
        "trakt": 353,
        "slug": "game-of-thrones",
        "tvdb": 121361,
        "imdb": "tt0944947",
        "tmdb": 1399
      },
      "overview": "Game of Thrones is an American fantasy drama television series created for HBO by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is titled A Game of Thrones.\n\nThe series, set on the fictional continents of Westeros and Essos at the end of a decade-long summer, interweaves several plot lines. The first follows the members of several noble houses in a civil war for the Iron Throne of the Seven Kingdoms; the second covers the rising threat of the impending winter and the mythical creatures of the North; the third chronicles the attempts of the exiled last scion of the realm's deposed dynasty to reclaim the throne. Through its morally ambiguous characters, the series explores the issues of social hierarchy, religion, loyalty, corruption, sexuality, civil war, crime, and punishment.",
      "first_aired": "2011-04-18T01:00:00.000Z",
      "airs": {
        "day": "Sunday",
        "time": "21:00",
        "timezone": "America/New_York"
      },
      "runtime": 60,
      "certification": "TV-MA",
      "network": "HBO",
      "country": "us",
      "updated_at": "2014-08-22T08:32:06.000Z",
      "trailer": null,
      "homepage": "http://www.hbo.com/game-of-thrones/index.html",
      "status": "returning series",
      "rating": 9,
      "votes": 111,
      "comment_count": 92,
      "language": "en",
      "available_translations": [
        "en",
        "tr",
        "sk",
        "de",
        "ru",
        "fr",
        "hu",
        "zh",
        "el",
        "pt",
        "es",
        "bg",
        "ro",
        "it",
        "ko",
        "he",
        "nl",
        "pl"
      ],
      "genres": [
        "drama",
        "fantasy"
      ],
      "aired_episodes": 50
  }
)

const mockErrorMessage = {
  response: {
    status: 500,
    message: 'mockaroo api limit exceeded (probably)'
  }
}

module.exports = {
  createMockUser: createMockUser,
  mockShowAPI: mockShowAPI,
  mockAllShows: mockAllShows,
  mockUserAPI: mockUserAPI,
  mockUserUpdate: mockUserUpdate,
  mockPopularShows: mockPopularShows,
  mockErrorMessage: mockErrorMessage
}
