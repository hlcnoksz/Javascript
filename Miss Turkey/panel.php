<!DOCTYPE html>
<html>
<head>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>
</head>
<body>

<h1>Gönderilen Postalar</h1>

<table id="customers">
  <tr>
    <th>Ad Soyad</th>
    <th>Telefon</th>
    <th>Email</th>
    <th>Konu</th>
    <th>Mesaj</th>
  </tr>

  <?php
  require_once("baglanti.php");
  $baglanti = baglan();
  $sorgu = "SELECT * FROM `i̇letisim`";
  $sonuc = mysqli_query($baglanti,$sorgu);
  
  if($sonuc)
  {
    while($satir = mysqli_fetch_assoc($sonuc))
    {
      echo "
      <tr>
        <td>".$satir['adsoyad']."</td>
        <td>".$satir['telefon']."</td>
        <td>".$satir['email']."</td>
        <td>".$satir['konu']."</td>
        <td>".$satir['mesaj']."</td>
    </tr>
    ";
    }
  }

  else
  {
    echo "Veritabanında Kayıtlı Hiçbir veri Bulunamamıştır.";
  }
?>
</table>
</body>
</html>


