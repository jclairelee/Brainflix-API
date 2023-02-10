const express = require("express");
const router = express.Router();
const path = require("node:path");
const fs = require("node:fs");
const videosInJSON = path.join(__dirname, "../data/videos.json");
const videos = require(videosInJSON);

const writeData = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (error) => {
    console.log(error);
  });
};

router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/:id", (req, res) => {
  const found = videos.find((videos) => videos.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video ID ${req.params.id} is not found` });
  }
});

router.post("/", (req, res) => {
  const newVideo = {
    id: req.body.id,
    title: req.body.title,
    channel: "Claire Lee",
    image: "http://localhost:8080/img3.jpg",
    description: req.body.description,
    views: "1,543",
    likes: "132",
    duration: "2:05",
    video: "#",
    timestamp: req.body.date,
    comments: [],
  };
  videos.push(newVideo);
  writeData(videosInJSON, videos);
});

router.get("/:id/comments", (req, res) => {
  const found = videos.find((videos) => videos.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video ID ${req.params.id} is not found` });
  }
});

router.get("/:id/comments/:commentId", (req, res) => {
  const found = videos.find(
    (videos) => videos.comments[0].id === req.params.commentId
  );
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video ID ${req.params.id} is not found` });
  }
});

router.post("/:id/comments", (req, res) => {
  const newComment = {
    id: req.body.id,
    name: req.body.name,
    comment: req.body.comment,
    likes: req.body.likes,
    timestamp: req.body.timestamp,
  };
  const found = videos.find((videos) => videos.id === req.params.id);
  found.comments.push(newComment);
  writeData(videosInJSON, videos);
});

router.delete("/:id/comments/:commentId", (req, res) => {
  const comment = videos.some(
    (videos) => videos.comments[0].id === req.params.commentId
  );
  if (comment) {
    const commentAfterDelete = videos.filter(
      (videos) => videos.comments[0].id !== req.params.commentId
    );
    writeJSONFile(videosJSONFile, commentAfterDelete);
    res.json({
      message: `Comment #${req.params.commentId} has been deleted`,
      comment: commentAfterDelete,
    });
  } else {
    res
      .status(404)
      .json({ error: `Can not find the comment #${req.params.commentId}` });
  }
});

module.exports = router;
