const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach((note) => {
    // Normalde notlar oluşurken texarea kısmı görünür geliyor, biz bunu burda değiştiriyoruz
    let myNote  =  addNewNote(note)
    myNote.children[1].classList.remove('hidden') // classı main olan divden hidden classını kaldırıyoruz
    myNote.children[2].classList.add('hidden')    // textArea'ya hidden classını ekliyoruz
  })
}

addBtn.addEventListener('click', () => addNewNote())
// Fonkisyonda text oluşturduk ve içine de metin atadık veya boş değer atadık.
function addNewNote(text = 'Notunuzu Buraya Yazınız') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? 'hidden' : ''}"></div>                              <!-- Text varsa hiçbirşey yapma -->
        <textarea class="${text ? '' : 'hidden'}"></textarea>                         <!-- Text varsa  Textarea'yı gizle -->
    `

  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = text

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLS()
  })

  editBtn.addEventListener('click', () => {
    // Toggle hidden vasa kaldır, yoksa ekle anlamında kullanılıyor.
    main.classList.toggle('hidden')   
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target

    main.innerHTML = value

    updateLS()
  })

  document.body.appendChild(note)
  updateLS()

  return note

}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')
  const notes = []

  notesText.forEach((note) => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}
