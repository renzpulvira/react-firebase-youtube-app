const Video = require("../models/video-model");

addVideo = async (req, res) => {
  const body = req.body;
  const video = new Video({
    title: req.body.title,
    videoId: req.body.title
  });

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a youtube title"
    });
  }

  if (!video) {
    return res.status(400).json({ success: false, error: err });
  }

  video
    .save()
    .then(results => {
      console.log(results);
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Video not added"
      });
    });
};

getVideos = async (req, res) => {
  await Video.find({}, (err, videos) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!videos.length) {
      return res.status(404).json({ success: false, error: `video not found` });
    }
    return res.status(200).json({ success: true, data: video });
  }).catch(err => console.log(err));
};

deleteVideo = async (req, res) => {
  await Video.findOneAndDelete({ _id: req.params.id }, (err, video) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!video) {
      return res.status(400).json({ success: false, error: "Video not found" });
    }

    return res.status(200).json({ success: true, data: video });
  }).catch(err => console.log(err));
};

module.exports = {
  addVideo,
  getVideos,
  deleteVideo
};
