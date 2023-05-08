<?php
$sviluppo = false;

if ($sviluppo) {
  $db_host = 'localhost';
  $db_user = 'root';
  $db_password = '';
  $db_db = 'alexrunningcoach';
  $db_port = 3306;
} else {
  $db_host = 'localhost';
  $db_user = 'avid3830173';
  $db_password = '';
  $db_db = 'my_avid3830173';
  $db_port = 3306;
}

$persona = $_POST["persona"];
$mail = $_POST["mail"];
$telefono = $_POST["telefono"];
$pacchetto = $_POST["pacchetto"];
$persona = $_POST["persona"];
$mail = $_POST["mail"];
$telefono = $_POST["telefono"];
$cod_fisc = $_POST["cod_fisc"];
$address = $_POST["address"];
$city = $_POST["city"];
$cap = $_POST["cap"];
$prov = $_POST["prov"];
$pacchetto_desc = $_POST["pacchetto_desc"];

$to = "radunirunningcoach@outlook.it";
// $to = "erikwski.spam@gmail.com"; //updDtEff
$subject = $persona . " ha visualizzato dati bonifico !!!";
$message = "
        Un utente ha visualizzato i dati bonifico per " . $pacchetto_desc . "
        Dati acquirente
        Acquirente: " . $persona . "
        Telefono: " . $telefono . "
        Mail: " . $mail . "
        Codice fiscale: " . $cod_fisc . "
        Indirizzo: " . $address . "
        Località: " . $city . "
        Cap: " . $cap . "
        Provincia: " . $prov . "
      ";
$headers .= "From: pacchetti@alexrunningcoach.it";

mail($to, $subject, $message, $headers);
?>