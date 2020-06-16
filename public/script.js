const en = document.querySelector('.en');
const br = document.querySelector('.pt-br');

const spanEn = en.querySelector('span')
    .addEventListener('click', function(){
        en.style.display='none'
        br.style.display='block'
    });

const spanBr = br.querySelector('span')
    .addEventListener('click', function(){
        br.style.display='none'
        en.style.display='block'
    });

