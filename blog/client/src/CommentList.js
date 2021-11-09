import React from "react";

const PostList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    const commentMessage = comment.status === "pending" ? "This comment is pending moderation" : comment.status === "rejected" ? "This comment has been rejected" : comment.content
    return <li key={comment.id}>{commentMessage}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default PostList;
