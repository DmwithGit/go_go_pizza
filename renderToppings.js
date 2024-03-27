import { getData } from "./getData.js";
import { renderPizzas } from "./renderPizzas.js";


export const renderToppings = async () => {
    const { en: enToppings, ru: ruToppings } = await getData('https://confused-vanilla-guide.glitch.me/api/toppings');

    const toppingsList = document.querySelector('.toppings__list');
    toppingsList.textContent = '';

    const items = enToppings.map((enName, i) => {
        const item = document.createElement('li');
        item.classList.add('toppings__item')
        item.innerHTML = `
            <input class="toppings__checkbox" type="checkbox" id="${enName}" name="topping" value="${ruToppings}">
            <label class="toppings__label" for="${enName}">${ruToppings[i][0].toUpperCase()}${ruToppings[i].slice(1).toLowerCase()}</label>
        `
        
        return item;
    });


    toppingsList.append(...items);   
  


    const itemReset = document.createElement('li');             // кнопка для сброса топпинга
    itemReset.classList.add('toppings__item');
    const btnReset = document.createElement('button');
    btnReset.classList.add('toppings__reset');
    btnReset.type = 'reset';

    itemReset.append(btnReset);


    const toppingsForm = document.querySelector('.toppings__form')
    
    toppingsForm.addEventListener('change', (event) => {
        const FormData = new FormData(toppingsForm);
        console.log(Object.fromEntries(FormData));

        const checkedToppings = [];

        for (const [, value] of FormData.entries()) {
            checkedToppings.push(value)
        }

        console.log(checkedToppings);

        renderPizzas(checkedToppings)
    })
}