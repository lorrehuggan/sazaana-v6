'use client';
import * as Slider from '@radix-ui/react-slider';

import style from './style.module.css';

import { FilterIcon } from 'lucide-react';
import { useMemo } from 'react';
import useTracklist from '~/lib/hooks/useTracklist';
import { AudioFeatures } from '../../../types';
import './style.css';

export default function Filter() {
  const { updateFilterConfig, filterConfig } = useTracklist();

  const attribute = {
    acousticness: ['Cyber Strings', 'Earth Tunes'],
    danceability: ['Rigid Robotica', 'Groove Grove'],
    energy: ['Serenity Stream', 'Volcano Vibe'],
    valence: ['Mellow Shadows', 'Sunshine Melody'],
  };

  const filters = useMemo(() => {
    return Object.keys(filterConfig) as (keyof AudioFeatures)[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnChange(
    feature: keyof AudioFeatures,
    values: readonly number[]
  ) {
    updateFilterConfig(feature, values[0], values[1]);
  }

  return (
    <div className={style.filter}>
      <div className={style.filter__heading}>
        <p>Track filters</p>
        <FilterIcon size={14} />
      </div>
      <form>
        {filters.map((filter) => (
          <div key={filter}>
            <label htmlFor={filter}>{filter}</label>
            <Slider.Root
              minStepsBetweenThumbs={5}
              className="SliderRoot"
              defaultValue={[filterConfig[filter][0], filterConfig[filter][1]]}
              max={1}
              step={0.025}
              onValueChange={(values) => handleOnChange(filter, values)}
            >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb
                className="SliderThumb"
                aria-label={`${filter} low`}
                role="slider"
              />
              <Slider.Thumb
                className="SliderThumb"
                aria-label={`${filter} high`}
                role="slider"
              />
            </Slider.Root>
            <section className={style.filter__attributes}>
              <span>{attribute[filter][0]}</span>
              <span>{attribute[filter][1]}</span>
            </section>
          </div>
        ))}
      </form>
    </div>
  );
}
