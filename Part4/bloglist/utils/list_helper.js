const dummy = (blogs) => {
    return 1;
  }
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }
  // The function finds out which blog has the most likes. If there are many top favorites,
  // it is enough to return one of them
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
  
    return blogs.reduce((favorite, blog) => {
      return (favorite.likes > blog.likes) ? favorite : blog;
    });
  }


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }