import style from './loading.module.css';

export default function Loading() {
  return (
    <div className={style.loading}>
      <div className={style.loading__image_placeholder}></div>
      <p>Thinking...</p>
    </div>
  );
}
