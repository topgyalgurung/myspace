'use client';
import { updateUser } from "./updateUser";
import styles from './dashboard.module.css';
import { User } from '@prisma/client';

export function ProfileForm({user}: {user: User}){
  return (
    <div>
      <h2 className={styles.profileFormTitle}>Edit Your Profile</h2>
      <form action={updateUser} className={styles.profileForm}>

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