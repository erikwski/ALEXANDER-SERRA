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

  $idContatore = $_GET["idContatore"];

  $sql = "UPDATE contatori
    SET contatore = @contatore := contatore + 1
    WHERE id = $idContatore";
  $result = $mysqli->query($sql);
  if (!$result) {
    printf("Errore durante il salvataggio dei dati: %s\n", $mysqli->error);
  }
  $mysqli->close();

  function toString($string){
    return "'".str_replace("'", '"', $string)."'"; 
  }
?>
