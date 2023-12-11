'use client';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import clsx from 'clsx';
import { ArrowDownUp, GripHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import useTracklist from '~/lib/hooks/useTracklist';
import style from './style.module.css';

export default function Tracks() {
  const { tracks, set, isLoading, updateFilterConfig, filterConfig } =
    useTracklist();

  const [draggingID, setDraggingID] = useState<string | null>(null);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    set(items);
    setDraggingID(null);
  }

  function handleOnDragStart(result: DragStart) {
    setDraggingID(result.draggableId);
  }

  return (
    <section className={style.tracks}>
      {isLoading && <h6>Loading...</h6>}
      {!isLoading && (
        <ul className={style.tracks__heading}>
          <li>
            <h6>Song</h6>
          </li>
          <li>
            <h6>{null}</h6>
          </li>
          <li>
            <h6>Album</h6>
          </li>
          <li>
            <h6>{null}</h6>
          </li>
        </ul>
      )}
      {tracks.length > 0 && (
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          onDragStart={handleOnDragStart}
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={style.tracks__songs}
              >
                {tracks.map((track, index) => (
                  <Draggable
                    key={track.track.id}
                    draggableId={track.track.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={clsx(style.tracks__song, {
                          [style.tracks__dragging]:
                            draggingID !== track.track.id &&
                            draggingID !== null,
                        })}
                      >
                        <img
                          src={track.track.album.images[2].url}
                          alt={track.track.name}
                        />
                        <div className={style.tracks__song_details}>
                          <p>{track.track.name}</p>
                          <div>
                            {track.track.explicit && (
                              <div className={style.tracks__song_explicit}>
                                <p>E</p>
                              </div>
                            )}
                            {track.track.artists
                              .slice(0, 3)
                              .map((artist, index, array) => (
                                <Link
                                  href={`/tracks/${artist.id}`}
                                  key={artist.id}
                                >
                                  <span>
                                    {artist.name}
                                    {index < array.length - 1 ? ', ' : ''}
                                  </span>
                                </Link>
                              ))}
                          </div>
                        </div>
                        <div className={style.tracks__song_album}>
                          <p>{track.track.album.name}</p>
                        </div>
                        <div className={style.tracks__song_handle}>
                          <span {...provided.dragHandleProps}>
                            <GripHorizontal size={18} />
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </section>
  );
}
