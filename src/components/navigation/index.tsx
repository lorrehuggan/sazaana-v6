import clsx from 'clsx';
import Image from 'next/image';
import Authentication from './authentication';
import style from './style.module.css';

export default function Navigation() {
  return (
    <div className={clsx(style.nav, 'container')}>
      <div>
        <Image
          src="/icon.png"
          width="50"
          height="50"
          alt="logo"
        />
      </div>
      <Authentication />
    </div>
  );
}
