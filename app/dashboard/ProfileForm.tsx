'use client';
import { updateUser } from "./updateUser";
// import { useOptimistic } from "react";

// for client side validation, use required or type=email ...

export function ProfileForm({ user }: any) {
  
  return (
    <div>
      <h2>Edit Your Profile</h2>
      {/* action only work on forms and things inside forms  */}
      {/* <form onSubmit={updateUser}> */}
      <form action={updateUser}>

        <label> Name: 
        <input type="text" name="name" defaultValue={user?.name ?? ''} />
        </label>
        <label> Bio: 
        <textarea
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ''}
        ></textarea>
        </label>
        <label> Age: 
            <input type="text" name="age" defaultValue={user?.age ?? 0} />
        </label>
        <label> Profile Image URL:
            <input type="text" name="image" defaultValue={user?.image ?? ''} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}