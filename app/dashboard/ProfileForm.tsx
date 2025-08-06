'use client';

export function ProfileForm({ user }: any) {

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
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
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update profile');
      }
  
      const data = await res.json();
      console.log('Profile updated successfully:', data);
      // You might want to add some UI feedback here
    } catch (error) {
      console.error('Error updating profile:', error);
      // You might want to add some UI error feedback here
    }
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={updateUser}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={user?.name ?? ''} />
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ''}
        ></textarea>
        <label htmlFor="age">Age</label>
        <input type="text" name="age" defaultValue={user?.age ?? 0} />
        <label htmlFor="image">Profile Image URL</label>
        <input type="text" name="image" defaultValue={user?.image ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}