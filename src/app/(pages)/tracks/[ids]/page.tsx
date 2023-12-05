import Tracks from '~/components/tracks';

export default function Page({ params }: { params: { ids: string } }) {
  return (
    <div>
      <Tracks ids={params.ids} />
    </div>
  );
}
