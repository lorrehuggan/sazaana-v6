import Artist from '~/components/artist';
import Options from '~/components/options';
import Tracks from '~/components/tracks';

import style from './page.module.css';

export default function Page({ params }: { params: { ids: string } }) {
  return (
    <>
      <Artist id={params.ids} />
      <div className={style.container}>
        <Options />
        <Tracks />
      </div>
    </>
  );
}
