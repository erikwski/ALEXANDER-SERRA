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

  $sql = "SELECT id,persona,mail,telefono,codice_fiscale,indirizzo,localita,cap,provincia,data_acquisto,flag_contattato,pacchetto";
  $sql .= " FROM vendite WHERE flag_contattato <> 'C' ORDER BY id";
  $result = $mysqli->query($sql);
  if (!$result) {
    printf("Errore durante il salvataggio dei dati: se hai acquistato il pacchetto contattami in privato %s\n", $mysqli->error);
  }
  $rows = [];
  while($row = $result->fetch_row()) {
    $rows[] = $row;
  }
  header("Content-Type: application/json");
  echo json_encode($rows); 
  $mysqli->close();
?>
