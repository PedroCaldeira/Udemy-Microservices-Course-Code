import React from "react";

const PostList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.status === "pending" ? "comment pending moderation" : comment.status === "rejected" ? "comment rejected" : comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default PostList;
