<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim</title>
    <link rel="stylesheet" href="css/iletisim.css">
    <script src="https://kit.fontawesome.com/075bf48d93.js" crossorigin="anonymous"></script></head>
</head>
<body>
    <section id="iletisim">
        <div class="container">
            <h3 id="h3iletisim">İletişim</h3>
            <form action=iletisim.php method="POST">
            <div id="iletisimopak"> 
                <div id="formgroup">
                    <div id="solform">
                        <input type="text" name="isim" placeholder="Ad Soyad" required class="form-control"> 
                        <!-- required özelliği kullanıcıya o kısmı doldurmadan geçirmiyor -->
                        <input type="text" name="tel" placeholder="Telefon numarası" required class="form-control">
                    </div>
                    <div id="sagform">
                        <input type="email" name="email" placeholder="Email adresi" required class="form-control"> 
                        <!-- required özelliği kullanıcıya o kısmı doldurmadan geçirmiyor -->
                        <input type="text" name="konu" placeholder="Konu Başlığı" required class="form-control">
                    </div>
                    <textarea name="mesaj" id="" cols="30" placeholder="Mesaj giriniz" rows="10" required class="form-control"></textarea>
                    <input type="submit" name="button" value="Gönder">
                </div>
                <div id="adres">
                    <h4 id="adresbasligi">Adres</h4>
                    <p class="adresp">Ahmetefendi mah. Çelebi cad.</p>
                    <p class="adresp">İkizkuleler sit. AB Blok NO:23</p>
                    <p class="adresp">Yozgat/Sorgun</p>
                    <p class="adresp">Email: hlcnoksz@gmail.com</p>
                    <p class="adresp">0541 188 1320</p>
                </div>
            </div>
            </form>
            <footer>
                <div id="copyright">2023 | Tüm Hakları Saklıdır</div>
                <div id="socialfooter"> 
                    <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook-f social"></i></a>
                    <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram social"></i></a>
                    <a href="https://twitter.com/"><i class="fa-brands fa-twitter social"></i></a>
                </div>
            </footer>
        </div>

        <?php
            require_once("baglanti.php");
            $baglanti = baglan();
            //Veri ekleme kısmı
            if(isset($_POST["button"]))
            {
                $adsoyad =$_POST["isim"];
                $telefon =$_POST["tel"];
                $email =$_POST["email"];
                $konu =$_POST["konu"];
                $mesaj =$_POST["mesaj"];
                $sorgu = "INSERT INTO i̇letisim (adsoyad, telefon, email, konu, mesaj) VALUES ('$adsoyad','$telefon','$email.','$konu.','$mesaj')";
                $sonuc = mysqli_query($baglanti,$sorgu); //Burda veritabanına gönderme işlemini yapıyoruz.
                if($sonuc){
                    echo "<script>alert('Mesajınız Başarı ile Gönderilmiştir.')</script>"; //Burda javascriptin alert methodunu kullandık.
                }else{
                    echo "Sorun var";
                }
            }

            
        ?>
    </section>
</body>
</html>