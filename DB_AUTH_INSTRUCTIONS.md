# Instrucciones de Integración con GoDaddy (Base de Datos y PHP)

Para que el sistema de login funcione correctamente, necesitas configurar una base de datos MySQL y algunos archivos PHP en tu servidor de GoDaddy.

## 1. Tabla de Usuarios (MySQL)

Ejecuta este SQL en tu phpMyAdmin o cliente de base de datos:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    fecha_nacimiento VARCHAR(20), -- Guardado como DD/MM/AAAA por ahora
    pais VARCHAR(100),
    tipo_login ENUM('google', 'email') NOT NULL,
    google_id VARCHAR(255), -- Para usuarios de Google
    verificado TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE login_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0
);
```

## 2. API Backend (PHP)

Crea una carpeta llamada `api` en la raíz de tu servidor (o donde prefieras) y añade estos archivos.

### `save_user.php`
Este archivo recibirá los datos del perfil y los guardará.

```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Configuración DB
$host = "localhost";
$db_name = "tu_base_de_datos";
$username = "tu_usuario";
$password = "tu_password";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    
    $data = json_decode(file_get_contents("php://input"));

    if(!empty($data->email)) {
        // Verificar si existe
        $query = "SELECT id FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            // Actualizar
            $query = "UPDATE users SET nombre=:nombre, apellido=:apellido, fecha_nacimiento=:dob, pais=:pais WHERE email=:email";
        } else {
            // Insertar
            $query = "INSERT INTO users (email, nombre, apellido, fecha_nacimiento, pais, tipo_login) 
                      VALUES (:email, :nombre, :apellido, :dob, :pais, :tipo_login)";
        }

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":nombre", $data->name);
        $stmt->bindParam(":apellido", $data->surname);
        $stmt->bindParam(":dob", $data->dob);
        $stmt->bindParam(":pais", $data->country);
        
        $tipo_login = $data->loginType ?? 'email';
        if($query[0] == 'I') $stmt->bindParam(":tipo_login", $tipo_login);

        if($stmt->execute()) {
            echo json_encode(array("message" => "Usuario guardado."));
        } else {
            echo json_encode(array("message" => "Error al guardar."));
        }
    }
} catch(PDOException $exception) {
    echo json_encode(array("error" => $exception->getMessage()));
}
?>
```

### `send_code.php`
Para enviar el código por email.

```php
<?php
// ... Configuración DB igual que arriba ...

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$code = rand(100000, 999999);
$expires = date("Y-m-d H:i:s", strtotime("+15 minutes"));

// Guardar código en DB
$stmt = $conn->prepare("INSERT INTO login_codes (email, codigo, expires_at) VALUES (?, ?, ?)");
$stmt->execute([$email, $code, $expires]);

// Enviar Email
$to = $email;
$subject = "Tu código de confirmación - Guía de Parche";
$message = "Hola! Tu código es: " . $code . "\nExpira en 15 minutos.";
$headers = "From: no-reply@guiadeparche.com";

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
```

## 3. Configuración en el Frontend

He dejado los `fetch` comentados en `src/components/auth/LoginForm.jsx`. Una vez que subas estos archivos PHP, debes descomentar esas líneas y poner la URL correcta de tu servidor GoDaddy.
