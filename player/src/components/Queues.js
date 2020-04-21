import React from "react";
import QueuesList from "./QueuesList";
import fire from "../config/Config";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Queues = (
  { dataRef, nowPlaying, nowPlayingHook, setNextVideo } = this.props
) => {
  const reorder = (list, start, end) => {
    const result = Array.from(list);
    const [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      dataRef,
      result.source.index,
      result.destination.index
    );
    fire.database().ref().child("queueLists").set(items);
  };

  return (
    <div className="compo-queues__wrapper">
      <ul className="compo-queues">
        <li className="compo-queues__item header-item">
          <p>Playing</p>
        </li>
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
          <button
            className="compo-queues__item-del-ctrl"
            onClick={() => setNextVideo()}
          >
            <span></span>
          </button>
        </li>
      </ul>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="compo-queues"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <li className="compo-queues__item header-item">
                <p>Next Up</p>
              </li>
              <li className="compo-queues__item header-item">
                <span className="compo-queues__item-title header-title">
                  Title
                </span>
                <span className="compo-queues__item-channel header-channel">
                  Channel
                </span>
                <span className="compo-queue__item-duration header-duration">
                  Duration
                </span>
                <span className="compo-queue__item-spacer header-spacer">
                  &nbsp;
                </span>
              </li>
              {dataRef.map((x, index) => (
                <QueuesList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  key={index}
                  title={x.videoTitle}
                  channel={x.videoChannel}
                  id={index}
                  videoid={x.videoId}
                  dataRef={dataRef}
                  getNowPlaying={nowPlayingHook}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Queues;
