import languages from "./languages";

let text = 'Example';
const API_KEY = '7fe6f4ef4cffefe74e9f';
const main = document.querySelector('.main');
const form__leftTextArea = document.querySelector('#form__leftTextArea');
const main__translation = document.querySelector('.main__translation');
const form__changeLangeage = document.querySelector('.form__changeLangeage');
const languagesInputIn = document.querySelector('#languagesInputIn');
const languagesInputOut = document.querySelector('#languagesInputOut');
const form__translateButton = document.querySelector('.form__translateButton');

languagesInputIn.append(createDataList(languages, 'languagesInputDataList'));
languagesInputOut.append(createDataList(languages, 'languagesOutDataList'));


// function createDataLists(languages){
//     main.innerHTML = `
//         <form class="main__form form">
//             <div class="form__AreaContainer">
//                 <div class="form__TextAreaContainer">
//                     <textarea name="" id="form__leftTextArea" class="form__textArea"></textarea>
//                     <!-- <label for="languagesInputDataList">Текущий язык:</label> -->
//                     <input autocomplete="off" list="languagesInputDataList" class="languagesInput" name="languagesInput" id="languagesInputIn">
//                     ${createDataList(languages, 'languagesInputDataList')}
//                 </div>
//                 <button class="form__changeLangeage"> = </button>
//                 <div class="form__TextAreaContainer">
//                     <textarea name="" id="form__rightTextArea" class="form__textArea"></textarea>
//                     <!-- <label for="languagesOutDataList">Перевести:</label> -->
//                     <input autocomplete="off" list="languagesOutDataList" class="languagesInput" name="languagesOut" id="languagesInputOut">
//                     ${createDataList(languages, 'languagesOutDataList')}
//                 </div>
//             </div>
//                 <!-- <label for="my-browser">Ваш язык:</label> -->
//             <button type="submit" class="form__translateButton">Translate it!</button>
//         </form>
    
//     `;
// }

// Функция смены переводимого языка на переводящий
form__changeLangeage.addEventListener('click', e => {
    e.preventDefault();
    const languagesInputInValue = languagesInputIn.value;
    const languagesInputOutValue = languagesInputOut.value;
    let temproraryValue = languagesInputInValue;
    languagesInputIn.value = languagesInputOutValue;
    languagesInputOut.value = temproraryValue;
});

// Функция отправки запроса на перевод формы
form__translateButton.addEventListener('click', e => {
    e.preventDefault();
    translaetText(form__leftTextArea.value, languagesInputIn.value, languagesInputOut.value, main__translation);
});

async function translaetText(inputValue, inputLang, outputlang, outputValue) {
    const textFromtranslate = inputValue;
    try {
        if(!textFromtranslate || !inputLang || !outputlang){
            alert('Введите данные!');
            console.log(inputLang)
        } else{
            const langFromTranslate = document.querySelector("#languagesInputIn option[value='" + inputLang + "']").dataset.value;
            const langToTranslate = document.querySelector("#languagesInputOut option[value='" + outputlang + "']").dataset.value;
            const request = await fetch(`https://api.mymemory.translated.net/get?q=${textFromtranslate}&key=${API_KEY}&mt=0&langpair=${langFromTranslate}|${langToTranslate}`);
            const response = await request.json();
            const data = await response;
            outputValue.innerHTML='';
            console.log(data.matches.length>0)
            if(data.matches.length>0){
                for(let i=0; i<data.matches.length; i++){
                    const li = document.createElement('li');
                    li.innerText = data.matches[i].translation;
                    outputValue.append(li);   
                }
            } else {
                outputValue.innerHTML='Некорректно выбран язык для перевода';
            }
            
        }
    } catch (error) {
        outputValue.innerHTML = error
    }
}


function createDataList(languages, idName){
    const dataList = document.createElement('datalist');
    dataList.classList.add('languagesDataList');
    dataList.setAttribute('id', idName);
    for(let value in languages){
        const option = document.createElement('option');
        option.value = languages[value];
        option.setAttribute('data-value', value)
        // option.label = value;
        dataList.append(option);
    }
    return dataList;
}



// form__translateButton.addEventListener('click', e => {
//     e.preventDefault();
//     const initLang = form__leftTextArea.value;
//     const translatedLang = form__rightTextArea.value;
//     const fromLang = languagesInputIn.value;
//     const toLang = languagesInputOut.value;

// })


async function translate () {
    // const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&key=${API_KEY}&langpair=en|ru`)
    // const data = await response.json()
    // console.log(data)
}
translate();








// const languagesInput = document.querySelector('.languagesInput');
// const languagesDataList = document.querySelector('.languagesDataList');

// // for(let input of languagesInput){
// //     input.addEventListener('onfocus')
// //     console.log(input);
// // };

// function findSimilarLanguage(){
//     let text = languagesInput.value.toUpperCase();
//     for (let option of languagesDataList.options) {
//       if(option.value.toUpperCase().indexOf(text) > -1){
//         option.style.display = "block";
//     }else{
//       option.style.display = "none";
//       }
//     };
// }

// languagesInput.onfocus = function () {
//     languagesDataList.style.display = 'block';
//     languagesInput.style.borderRadius = "5px 5px 0 0";
    
//   };
//   for (let option of languagesDataList.options) {
//     option.onclick = function () {
//         languagesInput.value = option.value;
//         languagesDataList.style.display = 'none';
//         languagesInput.style.borderRadius = "5px";
//     }
//   };

//   languagesInput.oninput = function() {
//     var text = languagesInput.value.toUpperCase();
//     for (let option of languagesDataList.options) {
//       if(option.value.toUpperCase().indexOf(text) > -1){
//         option.style.display = "block";
//     }else{
//       option.style.display = "none";
//       }
//     };
//   }
