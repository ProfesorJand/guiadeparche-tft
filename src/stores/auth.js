import { atom } from 'nanostores';

export const $admin = atom(false);
export const $superAdmin = atom(false);
export const $user = atom(null);
export const $authError = atom(null);
export const $authLoading = atom(false);
export const $activeTab = atom('data');

export const setUser = (user) => {
  $user.set(user);

  // 1. Verificamos si es superAdmin desde la base de datos (superAdmin == 1 o isSuperAdmin)
  const isSuperAdmin = !!(user?.superAdmin == 1 || user?.isSuperAdmin || user?.super_admin == 1);
  
  // 2. Verificamos si es admin normal desde la base de datos (admin == 1 o isAdmin).
  // Nota: Si es superAdmin, también es admin automáticamente (hereda todos los accesos).
  const isAdmin = !!(user?.admin == 1 || user?.isAdmin || isSuperAdmin);

  $admin.set(isAdmin);
  $superAdmin.set(isSuperAdmin);

  if (user) {
    localStorage.setItem('gp_user', JSON.stringify({ ...user, isAdmin, isSuperAdmin }));
  } else {
    localStorage.removeItem('gp_user');
  }
  
  // Mantenemos gp_admin y gp_super_admin en localStorage por compatibilidad
  if (isAdmin) {
    localStorage.setItem('gp_admin', 'true');
  } else {
    localStorage.removeItem('gp_admin');
  }

  if (isSuperAdmin) {
    localStorage.setItem('gp_super_admin', 'true');
  } else {
    localStorage.removeItem('gp_super_admin');
  }
};

// Lógica de recuperación al cargar la página
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('gp_user');
  
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      $user.set(userData);
      
      const isSuper = !!(userData.isSuperAdmin || userData.superAdmin == 1 || userData.super_admin == 1);
      const isAdminNormal = !!(userData.isAdmin || userData.admin == 1 || isSuper);

      $admin.set(isAdminNormal);
      $superAdmin.set(isSuper);
    } catch (e) {
      console.error('Error al cargar usuario guardado', e);
      localStorage.removeItem('gp_user');
      localStorage.removeItem('gp_admin');
      localStorage.removeItem('gp_super_admin');
    }
  } else {
    // Si no hay usuario en gp_user, buscamos si hay rastro de admin en localStorage
    const savedAdmin = localStorage.getItem('gp_admin');
    const savedSuper = localStorage.getItem('gp_super_admin');
    if (savedAdmin === 'true') $admin.set(true);
    if (savedSuper === 'true') {
      $superAdmin.set(true);
      $admin.set(true); // SuperAdmin siempre tiene acceso de Admin normal
    }
  }
}

export const logOut = () => {
  $user.set(null);
  $admin.set(false);
  $superAdmin.set(false);
  localStorage.removeItem('gp_user');
  localStorage.removeItem('gp_admin');
  localStorage.removeItem('gp_super_admin');
};

export const setActiveTab = (tab) => {
  $activeTab.set(tab);
};