'use client';
import Link from 'next/link';
import style from './_css/notfound.module.css';

export default function NotFound() {
  return (
    <div className={style.not}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
