const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, obj)  => acc + obj.likes, 0)
}

const favoriteBlog = (blogs) => {

  return blogs.length === 0
    ? null
    : blogs.reduce((acc, obj)  => acc.likes > obj.likes ? acc : obj)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
