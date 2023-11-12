<?php
 "require_once("baglanti.php");
 $baglanti = baglan();"
 $kisiid = $_GET["id"];
 $sorgu = "SELECT * FROM iletisim WHERE kisiid = $kisiid";
 $sonuc = mysqli_query($baglanti,$sorgu);
 if($sonuc){
    $satir = mysqli_fetch_assoc($sonuc);
}
echo '
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
    '.$ogr_id.'
        <form method="POST" action="ogrenci_update.php">
        <table>
        <tr>
            <td>ID</td>
            <td><input type="text" name="id" value="'.$satir["id"].'"></td>
        </tr>
            <tr>
                <td>Adı</td>
                <td><input type="text" name="isim" value="'.$satir["isim"].'"></td>
            </tr>
            <tr>
                <td>Soyadı</td>
                <td><input type="text" name="tel" value="'.$satir["tel"].'"></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" name="gonder" value="Gönder">
                </td>
            </tr>
        </table>
        </form>
    </body>
</html>';
'

?>