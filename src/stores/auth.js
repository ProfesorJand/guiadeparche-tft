import { atom, computed } from 'nanostores';

export const $admin = atom(false);
export const $superAdmin = atom(false);
export const $user = atom(null);
export const $authError = atom(null);
export const $authLoading = atom(false);

// Estado derivado: Se actualiza AUTOMÁTICAMENTE cuando $user cambia
export const $hasMasterPlan = computed([$user, $admin, $superAdmin], (user, admin, superAdmin) => {
  if (!user) return false;
  return !!(
    admin || 
    superAdmin || 
    user.master_plan === 1 || 
    user.master_plan === '1'
  );
});
let initialTab = 'data';
if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab')) {
    initialTab = params.get('tab');
  }
}
export const $activeTab = atom(initialTab);

// Función para validar si el Master Plan expiró usando la hora de Argentina
const checkMasterPlanExpiration = (userData) => {
  if (userData && userData.master_plan == 1 && userData.master_plan_expiration_date) {
    try {
      // 1. Obtener la hora actual simulando que el navegador está en Argentina
      const argTimeStr = new Date().toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"});
      const nowArg = new Date(argTimeStr);
      
      // 2. Convertir la fecha de MySQL (ej. "2024-06-25 10:30:00") a objeto Date local
      const expStr = userData.master_plan_expiration_date.replace(' ', 'T');
      const expDate = new Date(expStr);
      
      // 3. Comparar ambas horas "locales"
      if (nowArg > expDate) {
        userData.master_plan = 0; // Expiró
      }
    } catch(e) {
      console.error("Error comprobando expiración:", e);
    }
  }
  return userData;
};

export const setUser = (userRaw) => {
  const user = checkMasterPlanExpiration(userRaw);
  $user.set(user);


  // 1. Verificamos si es superAdmin desde la base de datos (superAdmin == 1 o isSuperAdmin)
  const isSuperAdmin = !!(user?.superAdmin == 1 || user?.isSuperAdmin || user?.super_admin == 1);
  
  // 2. Verificamos si es admin normal desde la base de datos (admin == 1 o isAdmin).
  const isAdmin = !!(user?.admin == 1 || user?.isAdmin);

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
      const userDataRaw = JSON.parse(savedUser);
      const userData = checkMasterPlanExpiration(userDataRaw);
      $user.set(userData);
      const isSuper = !!(userData.isSuperAdmin || userData.superAdmin == 1 || userData.super_admin == 1);
      const isAdminNormal = !!(userData.isAdmin || userData.admin == 1);

      $admin.set(isAdminNormal);
      $superAdmin.set(isSuper);

      // Verificación en segundo plano con la base de datos
      fetch("https://api.guiadeparche.com/verify-user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email })
      })
      .then(res => res.json())
      .then(verifyData => {
        if (verifyData.status === 'success' && verifyData.user) {
          // Fusionar los datos para no perder isAdmin o isSuperAdmin si el script PHP no los devuelve
          const currentUser = $user.get();
          const mergedUser = { ...currentUser, ...verifyData.user };
          setUser(mergedUser); // Esto actualizará el estado y el localStorage automáticamente
        } else if (verifyData.status === 'error') {
          // Si el usuario ya no existe o hay un error crítico, opcionalmente desloguear
          // logOut();
        }
      })
      .catch(e => console.error("Error validando usuario en background:", e));
      
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