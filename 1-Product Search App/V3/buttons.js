const favoriUrunler = []

//! UrunlerContainer'a Tıklayınca
urunlerContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('sepeteEkleButton')) {
    sepeteEkle(event.target)
  } else if (event.target.classList.contains('galpcikler')) {
    favoriEkleCikar(event.target)
  }
})

//!Sepetim Butonu
const sepetButton = document.querySelector('#sepetButton')
sepetButton.addEventListener('click', popupUzerineGeldiginde)
function popupUzerineGeldiginde() {
  const sepetPopup = document.getElementById('sepetPopup')
  sepetPopup.style.display =
    sepetPopup.style.display === 'none' ? 'block' : 'none'
}

//! Logo Img
const logoH66 = document.getElementById('logo')
logoH66.addEventListener('click', logoTiklandiginde)
function logoTiklandiginde() {
  urunlerContainer.innerHTML = ''
  bulInput.value = ''
  divOlusturma(urunler)
}

//!Arama Butonu
document.querySelector('header').addEventListener('click', function (event) {
  if (event.target.id === 'aramaButton') inputaYaziYazilinca()
})

//! Sepete Ekle
function sepeteEkle(button) {
  const index = parseInt(button.id.replace('sepeteEkleButton', ''))
  const div = document.getElementById(`urun${index}`)
  const urunBilgi = div.querySelector('.urun-bilgi').innerHTML
  sepetPopup.innerHTML += urunBilgi + '<hr>'
}

// !Favori ekle - çıkar
function favoriEkleCikar(galpcik) {
  const galpcikColor = galpcik.style.color

  if (galpcikColor !== 'red') {
    galpcik.style.color = 'red'
    galpcik.classList.remove('fa-beat')

    const galpcikIndex = parseInt(galpcik.id.replace('favori', '')) - 1
    const favoriyeAlinanUrun = urunler[galpcikIndex]

    if (favoriUrunler.length === 0) favoriUrunler.push(favoriyeAlinanUrun)
    else {
      for (let i = 0; i < favoriUrunler.length; i++) {
        if (favoriUrunler[i].isim === favoriyeAlinanUrun.isim) break
        else if (i === favoriUrunler.length - 1) {
          favoriUrunler.push(favoriyeAlinanUrun)
        }
      }
    }
  } else {
    galpcik.style.color = ''
    galpcik.classList.add('fa-beat')
    removeFavoriUrunler(galpcik)
  }
}

//! Favorilerim Butonuna Tıklayınca
const favorilerimButton = document.querySelector('#favorilerimButton')

favorilerimButton.addEventListener('click', favorilerimeTiklayinca)
function favorilerimeTiklayinca() {
  //* Tüm içeriği temizle
  urunlerContainer.innerHTML = ''

  //* Urunler-container' a yazdırtıyoruz
  divOlusturma(favoriUrunler)

  //* Galpciklerden birine tıklayınca favori urunumuzu siliyoruz
  const galpcikler = document.querySelectorAll('.galpcikler')
  galpcikler.forEach((galpcik) => {
    galpcik.addEventListener('click', function () {
      removeFavoriUrunler(galpcik)
      galpcik.parentElement.parentElement.remove()
    })
  })
}

//! FavoriUrunler Dizisinden Ürünü Silme
function removeFavoriUrunler(clickedGalpcik) {
  favoriUrunler.forEach((favoriUrun, index) => {
    const tiklananGalpcikId = parseInt(clickedGalpcik.id.replace('favori', ''))
    const favoriUrunId = parseInt(favoriUrun.id.replace('obje', ''))

    if (favoriUrunId === tiklananGalpcikId) {
      favoriUrunler.splice(index, 1)
    }
  })
}
