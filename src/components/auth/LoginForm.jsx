import React, { useState, useEffect, useRef } from 'react';
import { $user, setUser } from '../../stores/auth';
import { useStore } from '@nanostores/react';
import styles from './LoginForm.module.css';

// For Google Identity Services (GIS)
const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_ID_CLIENT_GOOGLE_CLOUD_OAUTH;

const LoginForm = () => {
  const user = useStore($user);
  const googleBtnContainerRef = useRef(null);
  const [step, setStep] = useState('choice'); // choice, email-input, verify-code, profile-complete, success
  const [email, setEmail] = useState('');
  const [sameEmail, setSameEmail] = useState('');
  const [codeTimer, setCodeTimer] = useState(0);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dob: '',
    country: ''
  });

  useEffect(() => {
    // Only run if we are in the 'choice' step
    if (step === 'choice') {
      const init = () => {
        if (window.google) {
          initializeGoogleSignIn();
        }
      };

      if (!window.google) {
        // Avoid duplicate script insertion
        const existingScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          script.defer = true;
          script.onload = init;
          document.body.appendChild(script);
        } else {
          // If script already exists but hasn't loaded yet
          existingScript.addEventListener('load', init);
          // Also call init in case it's already loaded but window.google was just set
          if (window.google) init();
        }
      } else {
        init();
      }
    }
  }, [step]);

    useEffect(() => {
    // Exit early when timer reaches 0
    if (codeTimer <= 0) return;

    // Set up the interval
    const timer = setInterval(() => {
      setCodeTimer((prev) => prev - 1);
    }, 1000);

    // Clean up the interval on unmount or before running the effect again
    return () => clearInterval(timer);
  }, [codeTimer]);

  useEffect(()=>{
    console.log({user})
    if(!user){
      setStep('choice');
    }
  },[user])

  const verifyUser = async (email, typeLogin, googleData = null) => {
    const verifyRes = await fetch('https://api.guiadeparche.com/verify-user.php', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`
          },
          body: JSON.stringify({ email }),
        });
        
        const result = await verifyRes.json();
        console.log("Verification API Result:", result);
        
        if (result.status === 'success' && result.user) {
          const datosUsuario = result.user;
          setUser({ 
            email: datosUsuario.email, 
            name: datosUsuario.nombre, 
            surname: datosUsuario.apellido, 
            country: datosUsuario.pais, 
            dob: datosUsuario.fecha_nacimiento, 
            loginType: typeLogin,
            isAdmin: result.isAdmin
          });
          setEmail(datosUsuario.email);
          setStep('success');
        } else {
          // User not found in DB
          console.log("User not found in DB, proceeding to profile completion");
          
          if (typeLogin === 'google' && googleData) {
            setFormData({
              ...formData,
              name: googleData.given_name || '',
              surname: googleData.family_name || ''
            });
            setEmail(googleData.email);
          } else {
            setEmail(email);
          }
          
          setStep('profile-complete');
        }
  }

  const handleGoogleResponse = async (response) => {
    console.log("Google Login Response Received:", response);
    setLoading(true);
    setError(null);
    
    try {
      const decoded = decodeJWT(response.credential);
      console.log("Decoded Google JWT:", decoded);
      
      if (decoded.email) {
        console.log("Verifying user with email:", decoded.email);
        await verifyUser(decoded.email, 'google', decoded)
      } else {
        throw new Error("No se pudo obtener el email de la cuenta Google.");
      }
    } catch (err) {
      console.error("Google Login handle error:", err);
      setError('Error al procesar el inicio de sesión con Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    try {
      console.log("Initializing Google Sign-In with Client ID:", GOOGLE_CLIENT_ID);
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: 'popup',
        auto_select: false
      });

      const googleBtnContainer = googleBtnContainerRef.current;
      if (googleBtnContainer) {
        window.google.accounts.id.renderButton(
          googleBtnContainer,
          { 
            theme: 'outline', 
            size: 'large', 
            width: googleBtnContainer.offsetWidth > 0 ? googleBtnContainer.offsetWidth : 300, 
            text: 'continue_with' 
          }
        );
      }
    } catch (err) {
      console.error("Google GIS init failed", err);
    }
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (err) {
      return {};
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log({email})
    try {
      const response = await fetch('https://api.guiadeparche.com/send-code.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setStep('verify-code');
        setCodeTimer(180);
      } else {
        setError(result.message || 'Error al enviar el código');
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.guiadeparche.com/verify-code.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const result = await response.json();

      if (result.status === 'success') {
        await verifyUser(email, 'email')
      } else {
        setError(result.message || 'El código es incorrecto');
      }
    } catch (err) {
      setError('Error de conexión. Verifica tu conexión a internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleDobChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.substring(2, 4);
        if (value.length > 4) {
          formattedValue += '/' + value.substring(4, 8);
        }
      }
    }

    setFormData({ ...formData, dob: formattedValue });
  };

  const validateDob = (dateString) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    const date = new Date(year, month - 1, day);
    const now = new Date();

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      year > 1900 &&
      date < now
    );
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateDob(formData.dob)) {
      setError('La fecha de nacimiento no es válida. Usa el formato DD/MM/AAAA.');
      return;
    }

    setLoading(true);
    setError(null);
    // añadir si el usuario ya existe omite el paso de guardar usuario y pasa a success
    console.log({email})
    if (user) {
      setStep('success');
      return;
    }
    try {
      const response = await fetch('https://api.guiadeparche.com/save-user.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`
        },
        body: JSON.stringify({ email, ...formData })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setUser({ email, ...formData });
        setStep('success');
      } else {
        setError(result.message || 'Error al guardar el perfil');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const renderChoice = () => (
    <div className={styles.auth_step}>
      <h2>Iniciar Sesión</h2>
      
      {/* Container for the official Google button */}
      <div ref={googleBtnContainerRef} className={styles.google_btn_container}></div>
      
      <div className={styles.divider}>o</div>
      <button onClick={() => setStep('email-input')} className={styles.email_btn_choice}>
        Usar correo electrónico
      </button>
    </div>
  );

  const renderEmailInput = () => (
    <div className={styles.auth_step}>
      <h2>Ingresa tu correo</h2>
      <p>Te enviaremos un código de confirmación.</p>
      <form onSubmit={handleEmailSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@ejemplo.com"
          required
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.submit_btn} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Código'}
        </button>
      </form>
      <button onClick={() => setStep('choice')} className={styles.back_btn} disabled={loading}>Volver</button>
    </div>
  );

  const renderVerifyCode = () => (
    <div className={styles.auth_step}>
      <h2>Verifica tu correo</h2>
      <p>Ingresa el código enviado a <b>{email}</b>.</p>
      <form onSubmit={handleCodeVerify}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de 6 dígitos"
          required
          maxLength={6}
          className={styles.input}
          disabled={loading}
        />
        {
          codeTimer > 0 ? (
            <p>Reenviar código en {codeTimer} segundos</p>
          ) : (
            <button onClick={handleEmailSubmit} className={styles.submit_btn} disabled={loading}>
              Reenviar código
            </button>
          )
        }
        <button type="submit" className={styles.submit_btn} disabled={loading}>
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
      <button onClick={() => setStep('email-input')} className={styles.back_btn} disabled={loading}>Corregir correo</button>
    </div>
  );

  const renderProfileComplete = () => (
    <div className={styles.auth_step}>
      <h2>Completa tu perfil</h2>
      <p>Necesitamos unos datos adicionales para continuar.</p>
      <form onSubmit={handleProfileSubmit}>
        <div className={styles.form_group}>
          <label>Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={styles.input}
            disabled={loading}
          />
        </div>
        <div className={styles.form_group}>
          <label>Apellido</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            required
            className={styles.input}
            disabled={loading}
          />
        </div>
        <div className={styles.form_group}>
          <label>Fecha de Nacimiento</label>
          <input
            type="text"
            value={formData.dob}
            onChange={handleDobChange}
            placeholder="DD/MM/AAAA"
            required
            maxLength={10}
            className={styles.input}
            disabled={loading}
          />
        </div>
        <div className={styles.form_group}>
          <label>País</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
            className={styles.select}
            disabled={loading}
          >
            <option value="">Selecciona tu país</option>
            <option value="Argentina">Argentina</option>
            <option value="España">España</option>
            <option value="México">México</option>
            <option value="Chile">Chile</option>
            <option value="Colombia">Colombia</option>
          </select>
        </div>
        <button type="submit" className={styles.submit_btn} disabled={loading}>
          {loading ? 'Guardando...' : 'Finalizar Registro'}
        </button>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className={styles.auth_step}>
      <h2>¡Bienvenido, {user?.name || email}!</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button onClick={() => window.location.href = '/perfil'} className={styles.primary_btn}>Perfil</button>
      <button onClick={() => window.location.href = '/'} className={styles.primary_btn}>Ir al Inicio</button>
    </div>
  );

  if (user && step !== 'success' && step !== 'profile-complete') {
    return renderSuccess();
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        {error && <div className={styles.error_msg}>{error}</div>}

        {step === 'choice' && renderChoice()}
        {step === 'email-input' && renderEmailInput()}
        {step === 'verify-code' && renderVerifyCode()}
        {step === 'profile-complete' && renderProfileComplete()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};

export default LoginForm;
