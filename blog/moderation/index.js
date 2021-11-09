import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    console.log("Received event", type);

    if (type === "CommentCreated") {
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status: data.content.includes("orange") ? "rejected" : "approved",
            },
        }).catch((err) => console.log(err.message))
    }

    return res.send({});
});

app.listen(4003, () => {
    console.log("Listening on 4003");
});
