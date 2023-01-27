const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchBtn = document.querySelector('#searchBtn');
const result = document.querySelector('.result');
const sound = document.querySelector('.sound');

searchBtn.addEventListener('click', () => {
    let inpWord = document.querySelector('#inpWord').value;
    fetch(`${url}${inpWord}`).then(res => res.json()).then(data => {
        console.log(data)
        result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                        <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>${data[0].phonetic}</p>
                    </div>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || ""}    
                    </p>
        `
        sound.setAttribute('src', `${data[0].phonetics[0].audio}`)
    }).catch( (error) => {
        result.innerHTML = `<h3 class='error'>Couldn't Find the Word</h3>`;
        alert(error);
    });
})

const playSound = () => {
    sound.play();
}