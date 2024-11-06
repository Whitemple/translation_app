import languages from "./languages";

const API_KEY = '7fe6f4ef4cffefe74e9f';
const translateButton__icon = document.querySelector('.translateButton__icon');
const form__leftTextArea = document.querySelector('#form__leftTextArea');
const main__translation = document.querySelector('.main__translation');
const form__changeLangeage = document.querySelector('.form__changeLangeage');
const languagesInputIn = document.querySelector('#languagesInputIn');
const languagesInputOut = document.querySelector('#languagesInputOut');
const form__translateButton = document.querySelector('.form__translateButton');


languagesInputIn.append(createDataList(languages, 'languagesInputDataList'));
languagesInputOut.append(createDataList(languages, 'languagesOutDataList'));


// Функция смены переводимого языка на переводящий
form__changeLangeage.addEventListener('click', e => {
    e.preventDefault();
    dataLanguages(languagesInputIn, languagesInputOut, form__leftTextArea, main__translation);
});

// Функция построения списка подходящих совпадений переводов
function createTranslatedList(textArray, element, option){
    for(let i=0; i<textArray.length; i++){
        const li = document.createElement('li');
        if(option){
            li.innerText = textArray[i][option];
        } else{
            li.innerText = textArray[i];
        }
        element.append(li);   
    }
}

// Функция смены данных (языка и текста) с переводимого на переводящий и наоборот
function dataLanguages(inputLang, outputlang, inputValue, outputValue){
    const languagesInputInValue = inputLang.value;
    const languagesInputOutValue = outputlang.value;
    const textFromtranslate = inputValue.value.split(/\r\n|\r|\n/g);
    const textAfterTranslate = outputValue.innerText.split(/\r\n|\r|\n/g);
    if(textFromtranslate[0] !== '' && textAfterTranslate[0] !== ''){
        let temproraryTextValue = textFromtranslate;
        inputValue.value = textAfterTranslate.join('\n');
        outputValue.innerText = '';
        createTranslatedList(temproraryTextValue, outputValue);
    }
    if(languagesInputInValue && languagesInputOutValue){
        let temproraryLangValue = languagesInputInValue;
        inputLang.value = languagesInputOutValue;
        outputlang.value = temproraryLangValue;
    }

}

// Функция отправки запроса на перевод формы
form__translateButton.addEventListener('click', e => {
    e.preventDefault();
    // Проверка на наличие данных перед запросом на сервер
    if(form__leftTextArea.value && languagesInputIn.value && languagesInputOut.value && main__translation){
        translaetText(form__leftTextArea.value, languagesInputIn.value, languagesInputOut.value, main__translation);
    }
});

async function translaetText(inputValue, inputLang, outputlang, outputValue) {
    const textFromtranslate = inputValue;
    try {
        const langFromTranslate = document.querySelector("#languagesInputIn option[value='" + inputLang + "']").dataset.value;
        const langToTranslate = document.querySelector("#languagesInputOut option[value='" + outputlang + "']").dataset.value;
        const request = await fetch(`https://api.mymemory.translated.net/get?q=${textFromtranslate}&key=${API_KEY}&mt=0&langpair=${langFromTranslate}|${langToTranslate}`);
        const response = await request.json();
        const data = await response;
        doWithOutputValue(outputValue, '');
        if(data.matches.length>0){
            createTranslatedList(data.matches, outputValue, 'translation');
        } else {
            doWithOutputValue(outputValue, 'Некорректно выбран язык для перевода');
        }
    } catch (error) {
        doWithOutputValue(outputValue, error);
    }
}

// Функция работы с полученным текстом
function doWithOutputValue(element, data){
    element.innerHTML = data;
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