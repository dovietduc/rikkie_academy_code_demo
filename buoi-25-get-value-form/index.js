let radioSelectorChecked = document.querySelector('.sex_choose:checked');
let btnSelector = document.querySelector('.btn');



function handleAddStudent() {
    let valueRadio = document.querySelector('.sex_choose:checked').value;
    console.log(valueRadio);
}






btnSelector.addEventListener('click', handleAddStudent);
