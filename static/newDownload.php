<?php

session_start();

$string = file_get_contents("data.json");

if(!$_SESSION["download"]){

  $data = json_decode($string,  true);
  $data["nbDownload"]++;
  $string = json_encode($data);

  file_put_contents("data.json", $string);

  $_SESSION["download"] = true;
}

header("Location: /static/421.apk");
