import React from "react";
import QueuesList from "./QueuesList";

const Queues = ({ dataRef, nowPlaying, nowPlayingHook } = this.props) => {
  return (
    <div className="compo-queues__wrapper">
      <ul className="compo-queues">
        <li className="compo-queues__item header-item">
          <span className="compo-queues__item-title header-title">Title</span>
          <span className="compo-queues__item-channel header-channel">
            Channel
          </span>
          <span className="compo-queue__item-duration header-duration">
            Duration
          </span>
          <span className="compo-queue__item-spacer header-spacer">&nbsp;</span>
        </li>
        <li className="compo-queues__item">
          <span className="compo-queues__item-title">
            {nowPlaying.videoTitle}
          </span>
          <span className="compo-queues__item-channel">Channel</span>
          <span className="compo-queue__item-duration">Duration</span>
          <span className="compo-queue__item-spacer">&nbsp;</span>
        </li>
      </ul>
      <ul className="compo-queues">
        <li className="compo-queues__item header-item">
          <span className="compo-queues__item-title header-title">Title</span>
          <span className="compo-queues__item-channel header-channel">
            Channel
          </span>
          <span className="compo-queue__item-duration header-duration">
            Duration
          </span>
          <span className="compo-queue__item-spacer header-spacer">&nbsp;</span>
        </li>
        {dataRef.map((x, index) => (
          <QueuesList
            key={index}
            title={x.videoTitle}
            id={index}
            videoid={x.videoId}
            dataRef={dataRef}
            getNowPlaying={nowPlayingHook}
          />
        ))}
      </ul>
    </div>
  );
};

export default Queues;
