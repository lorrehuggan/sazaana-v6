import style from './style.module.css';

export default function Hero() {
  return (
    <section className={style.hero}>
      <h1>
        Personlised Playlist <span>Inspired</span> by Your Favourite
        Artists...
      </h1>
      <h4>
        Type in an artist, and we will curate the{' '}
        <span>perfect playlist</span> that echoes their style, just for
        you.
      </h4>
    </section>
  );
}
