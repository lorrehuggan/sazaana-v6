import * as Slider from '@radix-ui/react-slider';

import style from './style.module.css';

import { useMemo } from 'react';
import { AudioFeatures } from '../../../types';
import './style.css';

type Props = {
  updateFilterConfig: (feature: string, min: number, max: number) => void;
  filterConfig: AudioFeatures;
};

export default function Filter({ updateFilterConfig, filterConfig }: Props) {
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
          </div>
        ))}
      </form>
    </div>
  );
}
