import Filter from '../filter';
import Save from '../save';
import style from './style.module.css';

export default function Options() {
  return (
    <section className={style.options}>
      <h6>options</h6>
      <Save />
      <Filter />
    </section>
  );
}
