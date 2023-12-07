import Artist from '~/components/artist';
import Tracks from '~/components/tracks';

export default function Page({ params }: { params: { ids: string } }) {
  return (
    <div>
      <Artist id={params.ids} />
      <Tracks ids={params.ids} />
    </div>
  );
}
