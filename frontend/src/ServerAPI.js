
const api = "http://localhost:3001"

let authorizationToken = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': authorizationToken
}

export const getAll = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .catch(err => console.log(err))

export const updateVote = (id, params) => 
  fetch(`${api}/posts/${id}`, {method: 'POST', headers: headers, body: JSON.stringify({option: params})})
    .then(res => res.json())
    .catch(err => console.log(err))