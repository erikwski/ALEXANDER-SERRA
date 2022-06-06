<?php
  session_start();
  if(isset($_SESSION['user_logged'])){
    header("Location: pacchetti_venduti.php");
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
    <title>Dashboard login</title>
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
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <!--Stylesheet-->
    <style media="screen">
      *,
      *:before,
      *:after{
          padding: 0;
          margin: 0;
          box-sizing: border-box;
      }
      body{
          background-color: #080710;
      }
      .background{
          width: 430px;
          height: 520px;
          position: absolute;
          transform: translate(-50%,-50%);
          left: 50%;
          top: 50%;
      }
      .background .shape{
          height: 200px;
          width: 200px;
          position: absolute;
          border-radius: 50%;
      }
      .shape:first-child{
          background: linear-gradient(
              #1845ad,
              #23a2f6
          );
          left: -80px;
          top: -80px;
      }
      .shape:last-child{
          background: linear-gradient(
              to right,
              #ff512f,
              #f09819
          );
          right: -30px;
          bottom: -80px;
      }
      #form{
          height: 520px;
          width: 400px;
          background-color: rgba(255,255,255,0.13);
          position: absolute;
          transform: translate(-50%,-50%);
          top: 50%;
          left: 50%;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.1);
          box-shadow: 0 0 40px rgba(8,7,16,0.6);
          padding: 50px 35px;
      }
      #form *{
          font-family: 'Poppins',sans-serif;
          color: #ffffff;
          letter-spacing: 0.5px;
          outline: none;
          border: none;
      }
       @media screen and (max-width: 400px) {
         #form{
          height: 550px;
          width: 340px;
         }
       }
      #form h3{
          font-size: 32px;
          font-weight: 500;
          line-height: 42px;
          text-align: center;
      }

      label{
          display: block;
          margin-top: 30px;
          font-size: 16px;
          font-weight: 500;
      }
      input{
          display: block;
          height: 50px;
          width: 100%;
          background-color: rgba(255,255,255,0.07);
          border-radius: 3px;
          padding: 0 10px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 300;
      }
      ::placeholder{
          color: #e5e5e5;
      }
      #login{
        margin-top: 50px;
        width: 100%;
        background-color: #ffffff;
        color: #000;
        padding: 15px 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
        transition: .7s;
      }
      #login:hover{
        transform: scale(1.1);
        background: #2293ca;
        color: #fff;
      }
      #avviso_errore{
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-top: 10px;
        background: #ff000091;
        border-radius: 4rem;
        position: absolute;
        top: -70px;
        padding: 1rem;
        width: 90%;
        left: 5%;
      }

    </style>
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
  </head>

  <body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <div id="form">
      
      <h3>Login</h3>
      <label for="username">Username</label>
      <input name="username" type="text" placeholder="Inserisci il tuo username" id="username">

      <label for="password">Inserisci Password</label>
      <input name="password" type="password" placeholder="Password" id="password">

      <button id="login">Log In</button>
      <span id="avviso_errore" style="display: none;">Credenziali di accesso non corrette</span>
    </div>

    <script>
      
      var log = document.getElementById("login");
      log.addEventListener("click",()=>{
        fetch('api/check_login.php?username='+document.getElementById("username").value+'&password='+document.getElementById("password").value)
          .then(response => response.json())
          .then(data =>{
            if(data.status){
              location.reload();
            }else{
              document.getElementById("avviso_errore").style.display = "block"
            }
          })
      })
    </script>
  </body>
</html>
