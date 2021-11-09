import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Received event", type);

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id: id,
      title: title,
      comments: [],
    };

  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({
      id: id,
      content: content,
      status: status
    });

  } else if (type === "CommentUpdated") {
    const { id, postId } = data;
    const commentIdx = posts[postId].comments.map(c => c.id).indexOf(id)
    posts[postId].comments[commentIdx] = data
  }
  res.status(201).send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
