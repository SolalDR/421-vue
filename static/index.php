<?php

session_start();

$string = file_get_contents("data.json");
$data = json_decode($string,  true);

$nbTelechargement = $data["nbDownload"];

include "main.php";
