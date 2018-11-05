
const api = "http://localhost:3001"

let authorizationToken = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': authorizationToken
}

export const fetchAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .catch(err => console.log(err))

export const updateVote = (id, params) => 
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify({option: params}),
    headers,
  })
  .then(response => response.json())
  .catch(err => console.log(err))

  export const createPost = (post) => {
    console.log(`${api}/posts ----` +  JSON.stringify(post))
    fetch(`${api}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers,
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  }
   