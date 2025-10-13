'use client';

import styles from './dashboard.module.css';
import { User } from '@prisma/client';

export function ProfileForm({user}: {user: User | null}){
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      age: formData.get('age'),
      image: formData.get('image'),
    };

     const res = await fetch('/api/user', {
       method: 'PUT',
       body: JSON.stringify(body),
       headers: {
         'Content-Type': 'application/json',
       },
     });
    
    await res.json();
  };
  return (
    <div>
      <h2 className={styles.profileFormTitle}>Edit Your Profile</h2>
      <form onSubmit={updateUser} className={styles.profileForm}>

        <div className={styles.formField}>
          <label className={styles.formLabel}>Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={user?.name ?? ''} 
            className={styles.formInput}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>Bio</label>
          <textarea
            name="bio"
            cols={30}
            rows={6}
            defaultValue={user?.bio ?? ''}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>Age</label>
          <input 
            type="number" 
            name="age" 
            defaultValue={user?.age ?? 0} 
            className={styles.formInput}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>Profile Image URL</label>
          <input 
            type="url" 
            name="image" 
            defaultValue={user?.image ?? ''} 
            className={styles.formInput}
          />
        </div>

        <button 
          type="submit"
          className={styles.submitButton}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}