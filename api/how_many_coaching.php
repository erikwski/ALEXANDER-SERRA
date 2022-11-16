<?php
  session_start();
  $sviluppo = true;

  if ($sviluppo){
    $db_host = 'localhost';
    $db_user = 'root';
    $db_password = '';
    $db_db = 'my_avid3830173';
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

  $sql = "SELECT COUNT(*) AS contatore";
  $sql .= " FROM vendite WHERE pacchetto = 8 ORDER BY id DESC";
  $result = $mysqli->query($sql);
  if (!$result) {
    printf("Errore durante il salvataggio dei dati: se hai acquistato il pacchetto contattami in privato %s\n", $mysqli->error);
  }
  // $number = $result->fetch_object()->name;
  printf($result->fetch_object()->contatore);
  $mysqli->close();
?>
