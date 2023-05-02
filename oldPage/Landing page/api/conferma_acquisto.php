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

  $persona = $_POST["persona"];
  $mail = $_POST["mail"];
  $telefono = $_POST["telefono"];
  $pacchetto = $_POST["pacchetto"];
  $paypal_name = substr($_POST["paypal_name"],0,127);
  $paypal_address = substr($_POST["paypal_address"],0,500);
  $paypal_mail = substr($_POST["paypal_mail"],0,255);
  $order_id = substr($_POST["order_id"],0,64);
  $payer_id = substr($_POST["payer_id"],0,64);
  $persona = $_POST["persona"];
  $mail = $_POST["mail"];
  $telefono = $_POST["telefono"];
  $cod_fisc = $_POST["cod_fisc"];
  $address = $_POST["address"];
  $city = $_POST["city"];
  $cap = $_POST["cap"];
  $prov = $_POST["prov"];
  $data_pagamento = $_POST["data_pagamento"];
  $pacchetto = $_POST["pacchetto"];
  $pacchetto_desc = $_POST["pacchetto_desc"];
  $costo = $_POST["costo"];

  $sql = "INSERT INTO vendite (persona,mail,telefono,paypal_nome,paypal_indirizzo,paypal_mail,order_id,payer_id,codice_fiscale,indirizzo,localita,cap,provincia,data_acquisto,prezzo_pagato,flag_contattato,pacchetto";
  $sql .= ") VALUES (";
  $sql .= toString($persona) . ",";   //persona
  $sql .= toString($mail) . ",";   //mail
  $sql .= toString($telefono) . ",";   //telefono
  $sql .= toString($paypal_name) . ",";   //paypal_nome
  $sql .= toString($paypal_address) . ",";   //paypal_indirizzo
  $sql .= toString($paypal_mail) . ",";   //paypal_mail
  $sql .= toString($order_id) . ",";   //order_id
  $sql .= toString($payer_id) . ",";   //payer_id
  $sql .= toString($cod_fisc) . ",";   //codice_fiscale
  $sql .= toString($address) . ",";   //indirizzo
  $sql .= toString($city) . ",";   //localita
  $sql .= toString($cap) . ",";   //cap
  $sql .= toString($prov) . ",";   //provincia
  $sql .= toString($data_pagamento) . ",";   //data_acquisto
  $sql .= $costo . ",";//prezzo_pagato
  $sql .= "'N',";   //flag_contattato
  $sql .= $pacchetto . ")";   //pacchetto
  $result = $mysqli->query($sql);
  if (!$result) {
    printf("Errore durante il salvataggio dei dati: se hai acquistato il pacchetto contattami in privato %s\n", $mysqli->error);
  }
  $mysqli->close();

  if (!$sviluppo){
    $to = "radunirunningcoach@outlook.it";
    $subject = "Acquisto nuovo coaching !!!";
    $message = "
      Venduto pacchetto ".$pacchetto_desc."
      Dati acquirente
      Acquirente: ".$persona."
      Telefono: ".$telefono."
      Mail: ".$mail."
      Codice fiscale: ".$cod_fisc."
      Indirizzo: ".$address."
      Località: ".$city."
      Cap: ".$cap."
      Provincia: ".$prov."
    ";
    $headers .= "From: pacchetti@alexrunningcoach.it";
  
    mail($to,$subject,$message,$headers);

  }

  function toString($string){
    return "'".str_replace("'", '"', $string)."'"; 
  }
?>
