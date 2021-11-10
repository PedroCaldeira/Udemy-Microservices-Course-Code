import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  // await axios.post("http://localhost:4005/events", {
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body
  console.log("Received event", type)

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data
    const comment = commentsByPostId[postId].find((c => c.id === id))
    comment.status = status

    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { id, status, postId, content }
    })
  }
  res.send({})
})

app.listen(4001, () => {
  console.log("Listening on 4001");
});
