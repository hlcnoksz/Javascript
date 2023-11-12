<?php
function baglan(){
    $baglanti = mysqli_connect("localhost","root","","proje");
    if (!$baglanti) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //echo "Bağlantı sağladık";
    return $baglanti;
}
?>