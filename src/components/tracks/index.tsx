'use client';
import clsx from 'clsx';
import { GripHorizontal } from 'lucide-react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import useTracklist from '~/lib/hooks/useTracklist';
import style from './style.module.css';

type Props = {
  ids: string;
};

export default function Tracks({ ids }: Props) {
  const { tracks } = useTracklist({ ids });

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    console.log(result);
  }

  return (
    <section className={style.tracks}>
      {tracks && (
        <>
          <ul className={style.tracks__header}>
            <li>
              <h6>Song</h6>
            </li>
            <li>
              <h6>{null}</h6>
            </li>
            <li>
              <h6>Artist</h6>
            </li>
            <li>
              <h6>Album</h6>
            </li>
            <li>
              <h6>{null}</h6>
            </li>
          </ul>
          <DragDropContext onDragEnd={(e) => handleOnDragEnd(e)}>
            <Droppable droppableId="tracklist">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={style.tracks__list}
                >
                  {tracks.map((track, i) => {
                    if (!track.track.album.images[2]?.url) return null;
                    return (
                      <Draggable
                        key={track.track.id}
                        draggableId={track.track.id}
                        index={i}
                      >
                        {(provided) => {
                          return (
                            <li
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className={clsx('', {
                                [style.tracks__list_odd]: i % 2 === 0,
                              })}
                            >
                              <img
                                src={track.track.album.images[2].url}
                                alt={track.track.name}
                              />
                              <div className={style.tracklist_details}>
                                <p>{track.track.name}</p>
                              </div>
                              <div className={style.tracklist_details}>
                                <p>{track.track.artists[0].name}</p>
                              </div>
                              <div>
                                <p>{track.track.album.name}</p>
                              </div>
                              <div
                                {...provided.dragHandleProps}
                                aria-label="drag-handle"
                                role="reorder tracklist"
                              >
                                <span>
                                  <GripHorizontal size={18} />
                                </span>
                              </div>
                            </li>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </section>
  );
}
