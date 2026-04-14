import { atom } from 'nanostores';

export const $admin = atom(false);
export const $user = atom(null);
export const $authError = atom(null);
export const $authLoading = atom(false);

// ... (líneas 1-7 iguales)

export const setUser = (user) => {
  $user.set(user);
  // Aseguramos que el estado de admin sea un booleano real
  const isAdmin = !!(user?.isAdmin); 
  $admin.set(isAdmin);

  if (user) {
    localStorage.setItem('gp_user', JSON.stringify({ ...user, isAdmin }));
  } else {
    localStorage.removeItem('gp_user');
  }
  
  // Mantenemos gp_admin por compatibilidad si es necesario, pero el objeto user es el principal
  if (isAdmin) {
    localStorage.setItem('gp_admin', 'true');
  } else {
    localStorage.removeItem('gp_admin');
  }
};

// Lógica de recuperación al cargar la página
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('gp_user');
  
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      $user.set(userData);
      // Sincronizamos el estado de admin directamente desde el objeto del usuario
      $admin.set(!!userData.isAdmin);
    } catch (e) {
      console.error('Error al cargar usuario guardado', e);
      localStorage.removeItem('gp_user');
      localStorage.removeItem('gp_admin');
    }
  } else {
    // Si no hay usuario, buscamos si hay rastro de admin (opcional)
    const savedAdmin = localStorage.getItem('gp_admin');
    if (savedAdmin === 'true') $admin.set(true);
  }
}


export const logOut = () => {
  $user.set(null)
  $admin.set(false)
  localStorage.removeItem('gp_user');
  localStorage.removeItem('gp_admin');
}
