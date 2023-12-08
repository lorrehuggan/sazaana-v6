import style from './style.module.css';

export default function Hero() {
  return (
    <section className={style.hero}>
      <h1>
        Personlised Playlist <span>Inspired</span> by Your Favourite Artists...
      </h1>
      <h4>
        Type in an artist, and we will curate the <span>perfect playlist</span>{' '}
        that echoes their style,{' '}
        <span className={style.span}>just for you.</span>
      </h4>
    </section>
  );
}
