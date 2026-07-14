<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Manejar solicitud OPTIONS (CORS preflight) de inmediato
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Habilitar compresión GZIP después de responder a OPTIONS
if (isset($_SERVER['HTTP_ACCEPT_ENCODING']) && substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
    ob_start("ob_gzhandler");
} else {
    ob_start();
}

header('Content-Type: application/json; charset=utf-8');

require "../db.php";
if (!$conn->set_charset("utf8mb4")) {
    // ignorar si falla
}

// 1. CREAR TABLA SI NO EXISTE
// Mapeamos cada "key" de tu objeto a una columna. Los arrays/objetos complejos van como JSON.
$tableQuery = "
CREATE TABLE IF NOT EXISTS composiciones_tft (
    id VARCHAR(100) PRIMARY KEY,
    version VARCHAR(50),
    ocultar TINYINT(1) DEFAULT 0,
    nombre VARCHAR(150),
    tier VARCHAR(50),
    tierExtra VARCHAR(50),
    posicion INT DEFAULT 0,
    dificultad VARCHAR(50),
    categoria VARCHAR(100),
    tipoDeDano VARCHAR(100),
    tipSEO TEXT,
    urlSEO VARCHAR(150),
    campeonMeta JSON,
    niveles JSON,
    itemsPrio JSON,
    posicionamiento JSON,
    campeonesEarly JSON,
    dioses JSON,
    bestBuild JSON,
    condiciones JSON,
    aumentos JSON,
    encuentros JSON,
    mejoresItems JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$conn->query($tableQuery);

$method = $_SERVER['REQUEST_METHOD'];

// ==========================================
// GET: OBTENER TODAS LAS COMPOSICIONES
// ==========================================
if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM composiciones_tft");
    $composiciones = [];
    
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Convertir de nuevo el TINYINT a booleano
            $row['ocultar'] = (bool)$row['ocultar'];
            $row['posicion'] = (int)$row['posicion'];
            
            // Decodificar las columnas JSON para que React reciba objetos/arreglos reales
            $jsonFields = ['campeonMeta', 'niveles', 'itemsPrio', 'posicionamiento', 'campeonesEarly', 'dioses', 'bestBuild', 'condiciones', 'aumentos', 'encuentros', 'mejoresItems'];
            foreach ($jsonFields as $field) {
                $row[$field] = json_decode($row[$field], true) ?: [];
            }
            
            $composiciones[] = $row;
        }
    }
    
    echo json_encode(["status" => "success", "data" => $composiciones]);
    $conn->close();
    exit();
}

// ==========================================
// POST: CREAR O ACTUALIZAR COMPOSICIÓN
// ==========================================
if ($method === 'POST') {
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);
    
    if (!$data || !isset($data['id'])) {
        echo json_encode(["status" => "error", "message" => "Datos inválidos o falta el ID de la compo."]);
        exit();
    }

    // Preparar campos simples
    $id = $conn->real_escape_string($data['id']);
    $version = $conn->real_escape_string($data['version'] ?? '');
    $ocultar = empty($data['ocultar']) ? 0 : 1;
    $nombre = $conn->real_escape_string($data['nombre'] ?? '');
    $tier = $conn->real_escape_string($data['tier'] ?? '');
    $tierExtra = $conn->real_escape_string($data['tierExtra'] ?? '');
    $posicion = (int)($data['posicion'] ?? 0);
    $dificultad = $conn->real_escape_string($data['dificultad'] ?? '');
    $categoria = $conn->real_escape_string($data['categoria'] ?? '');
    $tipoDeDano = $conn->real_escape_string($data['tipoDeDano'] ?? '');
    $tipSEO = $conn->real_escape_string($data['tipSEO'] ?? '');
    $urlSEO = $conn->real_escape_string($data['urlSEO'] ?? '');

    // Preparar campos JSON
    $campeonMeta = $conn->real_escape_string(json_encode($data['campeonMeta'] ?? []));
    $niveles = $conn->real_escape_string(json_encode($data['niveles'] ?? []));
    $itemsPrio = $conn->real_escape_string(json_encode($data['itemsPrio'] ?? []));
    $posicionamiento = $conn->real_escape_string(json_encode($data['posicionamiento'] ?? []));
    $campeonesEarly = $conn->real_escape_string(json_encode($data['campeonesEarly'] ?? []));
    $dioses = $conn->real_escape_string(json_encode($data['dioses'] ?? []));
    $bestBuild = $conn->real_escape_string(json_encode($data['bestBuild'] ?? []));
    $condiciones = $conn->real_escape_string(json_encode($data['condiciones'] ?? []));
    $aumentos = $conn->real_escape_string(json_encode($data['aumentos'] ?? []));
    $encuentros = $conn->real_escape_string(json_encode($data['encuentros'] ?? []));
    $mejoresItems = $conn->real_escape_string(json_encode($data['mejoresItems'] ?? []));

    // Sentencia UPSERT (Inserta, y si el ID ya existe, actualiza todos los campos)
    $sql = "INSERT INTO composiciones_tft (
                id, version, ocultar, nombre, tier, tierExtra, posicion, dificultad, categoria, tipoDeDano, tipSEO, urlSEO, 
                campeonMeta, niveles, itemsPrio, posicionamiento, campeonesEarly, dioses, bestBuild, condiciones, aumentos, encuentros, mejoresItems
            ) VALUES (
                '$id', '$version', $ocultar, '$nombre', '$tier', '$tierExtra', $posicion, '$dificultad', '$categoria', '$tipoDeDano', '$tipSEO', '$urlSEO',
                '$campeonMeta', '$niveles', '$itemsPrio', '$posicionamiento', '$campeonesEarly', '$dioses', '$bestBuild', '$condiciones', '$aumentos', '$encuentros', '$mejoresItems'
            ) ON DUPLICATE KEY UPDATE 
                version = VALUES(version),
                ocultar = VALUES(ocultar),
                nombre = VALUES(nombre),
                tier = VALUES(tier),
                tierExtra = VALUES(tierExtra),
                posicion = VALUES(posicion),
                dificultad = VALUES(dificultad),
                categoria = VALUES(categoria),
                tipoDeDano = VALUES(tipoDeDano),
                tipSEO = VALUES(tipSEO),
                urlSEO = VALUES(urlSEO),
                campeonMeta = VALUES(campeonMeta),
                niveles = VALUES(niveles),
                itemsPrio = VALUES(itemsPrio),
                posicionamiento = VALUES(posicionamiento),
                campeonesEarly = VALUES(campeonesEarly),
                dioses = VALUES(dioses),
                bestBuild = VALUES(bestBuild),
                condiciones = VALUES(condiciones),
                aumentos = VALUES(aumentos),
                encuentros = VALUES(encuentros),
                mejoresItems = VALUES(mejoresItems)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Composición guardada exitosamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error de SQL: " . $conn->error]);
    }
    
    $conn->close();
    exit();
}

// ==========================================
// DELETE: ELIMINAR COMPOSICIÓN
// ==========================================
if ($method === 'DELETE') {
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);
    
    if (!$data || !isset($data['id'])) {
        echo json_encode(["status" => "error", "message" => "Datos inválidos o falta el ID."]);
        exit();
    }
    
    $id = $conn->real_escape_string($data['id']);
    
    $sql = "DELETE FROM composiciones_tft WHERE id = '$id'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Composición eliminada."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al eliminar: " . $conn->error]);
    }
    
    $conn->close();
    exit();
}

echo json_encode(["status" => "error", "message" => "Método no soportado."]);
?>
