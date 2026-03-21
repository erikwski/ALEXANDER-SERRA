<?php
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
  $idContatore = isset($_GET["id"]) ? (int)$_GET["id"] : 0;
  
  if ($idContatore <= 0) {
    echo json_encode(['error' => 'ID contatore non valido']);
    exit();
  }

  // Prepared statement per sicurezza
  $stmt = $mysqli->prepare("UPDATE contatori SET contatore = contatore + 1 WHERE id = ?");
  $stmt->bind_param("i", $idContatore);
  
  if (!$stmt->execute()) {
    echo json_encode(['error' => 'Errore durante il salvataggio dei dati: ' . $mysqli->error]);
  } else {
    echo json_encode(['success' => true]);
  }
  
  $stmt->close();
  $mysqli->close();
?>
