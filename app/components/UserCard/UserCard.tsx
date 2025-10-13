import Link from 'next/link';
import Image from 'next/image';
import styles from './UserCard.module.css';

interface Props {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}

export default function UserCard({ id, name, age, image }: Props) {
  return (
    <div className={styles.card}>
      <Image
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
        className={styles.cardImage}
        width={500}
        height={300}
      />
      <div className={styles.cardContent}>
        Click to view details
        <h3>
          <Link href={`/users/${id}`}>{name}</Link>
        </h3>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}