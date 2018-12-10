
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

export const getPost = (postId) => 
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const updateVote = (id, params) => 
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify({option: params}),
    headers,
  })
  .then(response => response.json())
  .catch(err => console.log(err))

export const createPost = (post) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers,
  })
  .then(res => res.json())
   
export const deletePostById = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  })
  .then(res => res.json())
   
export const editPost = (post) => 
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers,
  })
  .then(res => res.json())

export const fetchCommentById = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
      .then(res => res.json())

export const fetchAllPostComments = (postId) => 
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const editComment = (comment) => 
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers,
  })
  .then(res => res.json())

export const updateCommentVote = (commentId, params) => 
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    body: JSON.stringify({option: params}),
    headers,
  })
  .then(response => response.json())
  .catch(err => console.log(err))

export const deleteComment = (comment) => 
  fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers,
  })
  .then(res => res.json())

export const createComment = (comment) => 
  fetch(`${api}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers,
  })
  .then(res => res.json())