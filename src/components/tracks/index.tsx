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
import Filter from '../filter';
import style from './style.module.css';

type Props = {
  ids: string;
};

export default function Tracks({ ids }: Props) {
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
      {tracks && (
        <>
          <Filter
            filterConfig={filterConfig}
            updateFilterConfig={updateFilterConfig}
          />
          <ul className={style.tracks__header}>
            {isLoading ? (
              <li>
                <h6>Loading...</h6>
              </li>
            ) : (
              <>
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
                  <ArrowDownUp
                    size={14}
                    className={clsx('', {
                      [style.tracks__header__arrow]: draggingID,
                    })}
                  />
                </li>
              </>
            )}
          </ul>
          <DragDropContext
            onDragStart={(e) => handleOnDragStart(e)}
            onDragEnd={(e) => handleOnDragEnd(e)}
          >
            <Droppable droppableId={'droppable'}>
              {(provided) => (
                <ul
                  className={style.tracks__list}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tracks.map((track, i) => (
                    <Draggable
                      key={track.track.id}
                      draggableId={track.track.id}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className={clsx('', {
                            [style.tracks__list_odd]: i % 2 === 0,
                            [style.tracks__list_dragging]:
                              draggingID !== track.track.id && draggingID,
                          })}
                        >
                          <img
                            style={{ viewTransitionName: 'artist-image' }}
                            src={track.track.album.images[2].url}
                            alt={track.track.name}
                          />
                          <div className={style.tracklist_details}>
                            <p>{track.track.name}</p>
                          </div>
                          <div className={style.tracklist_details}>
                            <Link href={`/tracks/${track.track.artists[0].id}`}>
                              <p>{track.track.artists[0].name}</p>
                            </Link>
                          </div>
                          <div>
                            <p>{track.track.album.name}</p>
                          </div>
                          <div
                            aria-label="drag-handle"
                            role="reorder tracklist"
                          >
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
        </>
      )}
    </section>
  );
}
