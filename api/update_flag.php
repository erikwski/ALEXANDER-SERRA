<?php
  session_start();
  if(!isset($_SESSION['user_logged'])){
    echo "non abilitato";
    exit();
  }
  $sviluppo = false;

  if ($sviluppo){
    $db_host = 'localhost';
    $db_user = 'root';
    $db_password = '';
    $db_db = 'alexrunningcoach';
    $db_port = 3306;
  }else{
    $db_host = 'localhost';
    $db_user = 'avid3830173';
    $db_password = '';
    $db_db = 'my_avid3830173';
    $db_port = 3306;
  }


  $mysqli = new mysqli(
    $db_host,
    $db_user,
    $db_password,
    $db_db
  );
	
  if ($mysqli->connect_error) {
    echo 'Errno: '.$mysqli->connect_errno;
    echo '<br>';
    echo 'Error: '.$mysqli->connect_error;
    exit();
  }

  // Input validation
  $id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;
  $flag = isset($_GET["flag"]) ? $_GET["flag"] : '';
  
  if ($id <= 0 || !in_array($flag, ['S', 'N'])) {
    echo json_encode(['error' => 'Parametri non validi']);
    exit();
  }

  // Prepared statement per sicurezza
  $stmt = $mysqli->prepare("UPDATE vendite SET flag_contattato = ? WHERE id = ?");
  $stmt->bind_param("si", $flag, $id);
  
  if (!$stmt->execute()) {
    echo json_encode(['error' => 'Errore durante il salvataggio dei dati: ' . $mysqli->error]);
  } else {
    echo json_encode(['success' => true]);
  }
  
  $stmt->close();
  $mysqli->close();
?>
