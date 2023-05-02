<?php
  session_start();
  if(!isset($_SESSION['user_logged'])){
    header("Location: dashboard.php");
    exit();
  }
?>
<!DOCTYPE html>
<html lang="it">
  <head>
    <!--- basic page needs
        ================================================== -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Storico vendite pacchetti</title>
    <!-- SEO TAG
        ================================================== -->
    <meta name="author" content="erikwski" />

    <!-- icon of website
        ================================================== -->
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="images/logo/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="images/logo/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="images/logo/favicon-16x16.png"
    />
    <link rel="manifest" href="images/logo/site.webmanifest" />
    <link
      rel="mask-icon"
      href="images/logo/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#2293ca" />
    <style>
      
      h1{
        font-size: 30px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 300;
        text-align: center;
        margin-bottom: 15px;
      }
      @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
      body{
        background: -webkit-linear-gradient(45deg, #256cc4, #1f94a4);
        background: linear-gradient(45deg, #256cc4, #1f94a4);
        font-family: 'Roboto', sans-serif;
      }
      section{
        margin: 1rem;
        display: flex;
        flex-direction: column;
        max-width: 100%;
        max-height: 100%;
        align-items: center;
        justify-content: center;
      }
      #storico_pacc{
        display:flex;
        flex-direction: column;
      }
      .button_container{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        margin-top: 1.5rem;
      }
      .button_container a{
        padding: 8px 2rem;
        background: linear-gradient(45deg, #1f93a4, #227ab8);
        border: 1px solid #000;
        border-radius: 1rem;
        color: #fff;
        transition: .7s all;
      }
      .button_container a:hover{
        transform: scale(1.1);
      }
      .card_acquisto{
        border-radius: 1rem;
        box-shadow: 0 0 5px -1px #000;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background: #fff;
        margin: 1rem 0 .75rem;
        padding: 1rem;
        position: relative;
      }
      .card_acquisto:before{
        content: attr(pacchetto);
        position: absolute;
        top: -15px;
        left: calc(50% - 150px);
        width: 300px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(45deg, #ff6c00, #dc5119);
        border-radius: 1rem;
        text-align: center;
        border: 1px solid;
        border-bottom-width: 3px;
        border-left-width: 2px;
        border-right-width: 2px;
      }
      .fake_input{
        width: calc(50% - 2.2rem);
        padding: 5px 0;
        border: 1px solid gainsboro;
        border-radius: 2rem;
        text-align: center;
        margin: 1.5rem 1rem 0;
        position: relative;
      }
      .full_width{
        width: 100%;
      }
      @media screen and (max-width: 800px) {
        .fake_input{
          width: calc(100% - 2.2rem);
        }
        .button_container{
          flex-direction: column;
        }
        .button_container a:first-child{
          margin-bottom: 1rem;
        }
      }
      @media screen and (min-width: 1300px) {
        .fake_input{
          width: calc(33.3333333333% - 1.5rem);
          margin: 1.5rem .5rem 0;
        }
        .full_width{
          width: calc(33.3333333333% - 1.5rem);
          margin: 1.5rem .5rem 0;
        }
      }
      .fake_input:before{
        content: attr(etichetta);
        position: absolute;
        top: -18px;
        left: 0;
        width: 100%;
        text-align: center;
        font-style: italic;
        font-size: 13px;
        opacity: .8;
      }
      .fatturato{
        background: linear-gradient(180deg, #0daf16, #1ba92e);
        padding: 8px 2rem;
        border-radius: 2rem;
        color: #fff;
        border: 1px solid #000;
        opacity: .7;
      }
      

      /* for custom scrollbar for webkit browser*/

      ::-webkit-scrollbar {
          width: 6px;
      } 
      ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      } 
      ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      }
      @import url("css/sweetalert.css");
    </style>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  </head>
  <body>
      <section>
        <h1>Storico acquisti pacchetti</h1>
        <div id="storico_pacc">
        </div>
      </section>
  </body>
  <script src='js/sweetalert.js'></script>    
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous">
  </script>
  <script>
    const COSTO_PACCHETTI = [
      {
        id: 1,
        desc: "BASIC MENSILE",
        costo: 60,
      },
      {
        id: 2,
        desc: "BASIC TRIMESTRALE",
        costo: 157,
      },
      {
        id: 3,
        desc: "STANDARD MENSILE",
        costo: 90,
      },
      {
        id: 4,
        desc: "STANDARD TRIMESTRALE",
        costo: 237,
      },
      {
        id: 5,
        desc: "PREMIUM MENSILE",
        costo: 120,
      },
      {
        id: 6,
        desc: "PREMIUM TRIMESTRALE",
        costo: 317,
      },
      {
        id: 7,
        desc: "OFFERTA 10 GIUGNO",
        costo: 317,
      },
    ];

    function templateOrdine(dati){
      let desc_pacc, idx_pacc = COSTO_PACCHETTI.findIndex(pac=> pac.id == dati[11])
      if(idx_pacc >= 0) desc_pacc = COSTO_PACCHETTI[idx_pacc].desc
      return `
        <div class="card_acquisto" data-id="${dati[0]}" pacchetto="${desc_pacc}">
          <div class="fake_input" etichetta="Data acquisto">
            <span>${dati[9]}</span>
          </div>
          <div class="fake_input" etichetta="Acquirente">
            <span>${dati[1]}</span>
          </div>
          <div class="fake_input" etichetta="Telefono">
            <span>${dati[3]}</span>
          </div>
          <div class="fake_input" etichetta="Mail">
            <span>${dati[2]}</span>
          </div>
          <div class="fake_input" etichetta="Indirizzo">
            <span>${dati[5]}</span>
          </div>
          <div class="fake_input" etichetta="Localita">
            <span>${dati[6]}</span>
          </div>
          <div class="fake_input" etichetta="Cap">
            <span>${dati[7]}</span>
          </div>
          <div class="fake_input" etichetta="Provincia">
            <span>${dati[8]}</span>
          </div>
          <div class="fake_input full_width" etichetta="Codice fiscale">
            <span>${dati[4]}</span>
          </div>
          <div class="button_container">
            ${dati[10] === "S" ? `<span class="fatturato">FATTURATO</span>` : `<a href="#!" class="fattura">SEGNA COME FATTURATO</a>`}
            <a href="#!" class="elimina">ELIMINA</a>
          </div>
        </div>
      `;
    }
    $( document ).ready(function() {
      $.getJSON("api/storico_ordini.php")
      .done(j=>{
        $("#storico_pacc").html(j.map(ord=> templateOrdine(ord)).join(""))
        $(".fattura").click(function(){
          Swal.fire({
            title: 'Confermi di aver fatturato questo pacchetto?',
            showDenyButton: true,
            confirmButtonText: 'Confermo',
            denyButtonText: `Annulla`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              let parent = $(this).parents(".card_acquisto")
              $.get("api/update_flag.php",{
                id: parent.data("id"),
                flag: "S",
              }).done((ris)=>{
                if(ris.length){
                  Swal.fire('Errore! Contattare amministrazione', '', 'error')
                }else{
                  $(this).remove();
                  parent.find(".button_container").prepend(`<span class="fatturato">FATTURATO</span>`)
                  Swal.fire('Pacchetto fatturato correttamente!', '', 'success')
                }
              }).fail(()=>{
                Swal.fire('Errore! Contattare amministrazione', '', 'error')
              })
            }
          })
        })
        $(".elimina").click(function(){
          Swal.fire({
            title: 'Confermi di eliminare questo acquisto?',
            showDenyButton: true,
            confirmButtonText: 'Confermo',
            denyButtonText: `Annulla`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              let parent = $(this).parents(".card_acquisto")
              $.get("api/update_flag.php",{
                id: parent.data("id"),
                flag: "C",
              }).done((ris)=>{
                if(ris.length){
                  Swal.fire('Errore! Contattare amministrazione', '', 'error')
                }else{
                  Swal.fire('Pacchetto eliminato correttamente!', '', 'success')
                  parent.remove()
                }
              }).fail(()=>{
                Swal.fire('Errore! Contattare amministrazione', '', 'error')
              })
            }
          })
        })
      })
      .fail(()=>  Swal.fire('Errore nella connessione al server! Contattare amministrazione', '', 'error'))
    });
    
  </script>
</html>
