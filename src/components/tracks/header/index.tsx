import style from './style.module.css';

export default function Header() {
  return (
    <ul className={style.header}>
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
    </ul>
  );
}
