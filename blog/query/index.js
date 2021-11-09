import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };

  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });

  } else if (type === "CommentUpdated") {
    const { id, postId } = data;
    const commentIdx = posts[postId].comments.map(c => c.id).indexOf(id)
    posts[postId].comments[commentIdx] = data
  }
}

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Received event", type);
  handleEvent(type, data)

  res.status(201).send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios.get("http://localhost:4005/events").catch((err) => console.log(err.message))
  for (let event of res.data) {
    console.log("Processing Event: ",event.type)
    handleEvent(event.type,event.data)
  }
});
