'use client';
import * as Slider from '@radix-ui/react-slider';

import style from './style.module.css';

import * as Toggle from '@radix-ui/react-toggle';
import { FilterIcon, Move } from 'lucide-react';
import { useMemo, useState } from 'react';
import useTracklist from '~/lib/hooks/useTracklist';
import { AudioFeatures } from '../../../types';

import './style.css';

export default function Filter() {
  const { updateFilterConfig, filterConfig } = useTracklist();
  const [value, setValue] = useState(['', [0, 1]]);

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

  function handleOnChange(feature: keyof AudioFeatures, values: number[]) {
    setValue([feature, values]);
  }

  function handleOnPointerUp() {
    const feature = String(value[0]);
    const value1 = Number(value[1][0]);
    const value2 = Number(value[1][1]);
    updateFilterConfig(feature, value1, value2);
  }

  return (
    <div className={style.filter}>
      <div className={style.filter__heading}>
        <p>Track filters</p>
        <FilterIcon size={14} />
      </div>
      <form className={style.filter__form}>
        {filters.map((filter) => (
          <div className={style.filter__form__container} key={filter}>
            <div className={style.filter__form__label}>
              <p>{filter}</p>
              <small>{`${filterConfig[filter][0] * 100}% ${filterConfig[filter][1] * 100
                }%`}</small>
            </div>
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
                onPointerUp={handleOnPointerUp}
                className="SliderThumb"
                aria-label={`${filter} low`}
                role="slider"
              />
              <Slider.Thumb
                onPointerUp={handleOnPointerUp}
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
