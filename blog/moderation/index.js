import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const handleEvent = async (type, data) => {
    if (type === "CommentCreated") {
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status: data.content.includes("orange") ? "rejected" : "approved",
            },
        }).catch((err) => console.log(err.message))
    }
}

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    console.log("Received event", type);
    handleEvent(type, data)
    return res.send({});
});

app.listen(4003, async () => {
    console.log("Listening on 4003");
    const res = await axios.get("http://localhost:4005/events").catch(err => console.log(err.message))
    for (let event of res.data) {
        console.log("Processing Event: ", event.type)
        handleEvent(event.type, event.data)
    }
});
