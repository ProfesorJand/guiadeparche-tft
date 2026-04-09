import { atom } from 'nanostores';

export const $user = atom(null);
export const $authError = atom(null);
export const $authLoading = atom(false);

export const setUser = (user) => {
  $user.set(user);
  if (user) {
    localStorage.setItem('gp_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('gp_user');
  }
};

// Initial state from localStorage if available
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('gp_user');
  if (savedUser) {
    try {
      $user.set(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to parse saved user', e);
      localStorage.removeItem('gp_user');
    }
  }
}
