'use client';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilterIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import useTracklist from '~/lib/hooks/useTracklist';
import { AudioFeatures } from '../../../types';

import style from './style.module.css';

export default function Filter() {
  const { updateFilterConfig, filterConfig } = useTracklist();

  const attribute = {
    acousticness: ['Cyber', 'Earth'],
    danceability: ['Robotica', 'Groove'],
    energy: ['Serenity', 'Volcano'],
    valence: ['Shadows', 'Sunshine'],
  };

  const filters = useMemo(() => {
    return Object.keys(filterConfig) as (keyof AudioFeatures)[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnSelect(feature: keyof AudioFeatures, value: number) {
    if (value === 1) {
      updateFilterConfig(feature, 0, 0.25);
    } else if (value === 2) {
      updateFilterConfig(feature, 0.25, 0.5);
    } else if (value === 3) {
      updateFilterConfig(feature, 0.5, 0.75);
    } else if (value === 4) {
      updateFilterConfig(feature, 0.75, 1);
    } else {
      updateFilterConfig(feature, 0, 1);
    }
  }

  return (
    <div className={style.filter}>
      <div className={style.filter__heading}>
        <p>Track filters</p>
        <FilterIcon size={14} />
      </div>
      {filters.map((filter) => (
        <div key={filter} className={style.filter__toggle}>
          <p>{filter}</p>
          <ToggleGroup.Root
            onValueChange={(e) => handleOnSelect(filter, Number(e))}
            type="single"
            aria-label={`${filter} filter`}
            className={style.filter__toggle_group}
          >
            <ToggleGroup.Item
              className={style.filter__toggle_group_item}
              value="1"
            >
              <ChevronsLeft size={18} />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="2"
              className={style.filter__toggle_group_item}
            >
              <ChevronLeft size={18} />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              className={style.filter__toggle_group_item}
            >
              <ChevronRight size={18} />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"
              className={style.filter__toggle_group_item}
            >
              <ChevronsRight size={18} />
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <div className={style.filter__toggle_attributes}>
            <span>{attribute[filter][0]}</span>
            <span>{attribute[filter][1]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
