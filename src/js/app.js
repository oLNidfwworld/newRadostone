import '../scss/app.scss';

import Swiper, { Thumbs, Autoplay, EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFlip, Grid, Navigation, Pagination } from 'swiper';
Swiper.use([Navigation]);
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; //???  
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js";
import Choices from 'choices.js';
import IMask from 'imask';
// import lax from 'lax.js'

const DragNDrop = require('./drag-n-drop/main');
const popupS = require('popups');

function debounce(callee, timeoutMs) {

    return function perform(...args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }

        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)

    }
}


document.addEventListener('DOMContentLoaded', function () {




    //#region Переменные
    var lastScrollTop = 0;
    const root = document.querySelector(':root');
    const computedStyles = getComputedStyle(root);
    var phone_inputs = document.querySelectorAll('input[type=phone]');

    //#region Шапка
    /** @var Кнопка открытия бургера  */
    const burger_open = document.querySelector('.burger-button');
    /** @var Кнопка закрытия бургера  */
    const burger_close = document.querySelector('#close-burger');
    /** @var Элемент шапки  */
    const header = document.querySelector('header');
    /** @var Задний фон меню */
    const bg_burger = document.querySelector('.bg-burger')
    /** @var Задний фон меню */
    const burger = document.querySelector('.burger')
    //#endregion

    //#region Главная
    /** @var Кнопка разворачивания контента  */
    const expander = document.querySelector('.expand-this');
    //#endregion 

    //#region Раздел
    /** @var Поле со списком - сортировка */
    const sort_element = document.querySelector('#_sort');
    /** @var Поле со списком - фильтрация */
    const filter_element = document.querySelector('#_filter');
    /** @var Адаптивная кнопка для фильтра и сортировки */
    const filter_sort_buttond = document.querySelector('.top-bar #sett');
    /** @var Адаптивная кнопка для поиска */
    const search_button = document.querySelector('.top-bar .lupa');
    /** @var Элементы раздела */
    const block_elements = document.querySelectorAll('.display-block .el');
    /** @var Мобильный фильтр */
    const filter_mob = document.querySelector('.top-bar #mob-sett');
    /** @var Поиск */
    const search_field = document.querySelector('.top-bar .search');



    //#endregion 

    //#region Слайдеры
    /** @var Верхний слайдер на главной */
    const top_slider = new Swiper('.top-slider', {
        slidesPerView: 1,
        rewind: true,
    })
    /** @var Слайдер на элементах раздела */
    const items_gal = new Swiper('.mini-gallery', {
        modules: [Pagination, EffectCoverflow],
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'coverflow',
        rewind: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination'
        }
    })

    /** @var Слайдер thumb картинок -> текста */
    const story_img_slider_thumbs =  new Swiper('.story-slider-img-thumbs',{
        modules:[Thumbs,Navigation],
        direction:'vertical',
        freeMode:true,
        watchSlidesProgress: true,
        allowTouchMove:false
    })
    
    /** @var Слайдер thumb текста */
    const story_text_slider_thumbs = new Swiper('.story-slider-text-thumbs',{
        modules:[Thumbs],
        direction:'horizontal',
        freeMode:true,
        watchSlidesProgress: true,
        slidesPerView:1,
        thumbs: {
            swiper: story_img_slider_thumbs,
         },
         allowTouchMove:false
    })

    
   
    /** @var Слайдер сториборд*/ 
    const story_slider = new Swiper('.story-slider',{
        modules:[Thumbs,Autoplay], 
        direction:'vertical',
        thumbs: {
            swiper: story_text_slider_thumbs,
         },
        autoplay:{
            delay:9000,
        },
        slidesPerView:3,
        // slidesPerGroup:3, 
        initialSlide:0,
        centeredSlides: true,
        centeredSlidesBounds: true,
       
    })
    const observer = new MutationObserver(()=>{
        slides.forEach(slide=>{ 

            if(slide.classList.contains('swiper-slide-prev')){
                slide.querySelector('.text-cont').addEventListener('click',()=>story_slider.slidePrev(300))
            }else if (slide.classList.contains('swiper-slide-next')){
                slide.querySelector('.text-cont').addEventListener('click',()=>story_slider.slideNext(300))
            }
        })
    })
    const slides = document.querySelectorAll('.story-slider .swiper-slide');
    
    slides.forEach(slide=>{
        observer.observe(slide,{
            attributes:true
        });
        if(slide.classList.contains('swiper-slide-prev')){
            slide.querySelector('.text-cont').addEventListener('click',()=>story_slider.slidePrev(300))
        }else if (slide.classList.contains('swiper-slide-next')){
            slide.querySelector('.text-cont').addEventListener('click',()=>story_slider.slideNext(300))
        }
    })

    
    
   const reviews_slider = new Swiper('.reviews',{
        modules:[Pagination],
        pagination:{
            el:'.swiper-pagination'
        }
   })

    //#endregion

    //#region Деталка
    /** @var Поле со списком - выбор цвета */
    const color_element = document.querySelector('.color-selector');
    //#endregion

    //#region Контакты
    /** @var Поле со списком - города */
    const cities_element = document.querySelector('.cities');
    //#endregion

    //#region Чойсеры
    /** @var Сортировка */
    if (sort_element) {
        const sort_field = new Choices(sort_element, {
            allowHTML: true,
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices sort-field'
            }
        });
    }
    /** @var Фильтрация */
    if (filter_element) {
        const filter_field = new Choices(filter_element, {
            allowHTML: true,
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices filter-field'
            }
        });
    }

    /** @var Выбор цвета */
    if (color_element) {
        const color_field = new Choices(color_element, {
            allowHTML: true,
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices color-selector'
            }
        });
    }
    /** @var Выбор цвета */
    if (cities_element) {
        const cities_field = new Choices(cities_element, {
            allowHTML: true,
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices cities-selector'
            }
        });
    }
    //#endregion 

    try{
        const dd = new DragNDrop('.drag-n-drop');
    }catch{

    }
    


    //#endregion

    //#region Прослушки     
    if (phone_inputs) {
        phone_inputs.forEach((el) => {
            var maskOptions = {
                mask: '+{7} 000 000-00-00',
                // definitions:{
                //     '#': /(|8)/,
                // }

            }
            var mask = IMask(el, maskOptions);
            let trys = false;
            el.addEventListener('input', function () {
                if (trys == false && mask.value[3] != '9' && mask.value[3] != undefined) {
                    mask.value = "+7 ";

                }

            })
        });
    }
    if (expander) {
        expander.addEventListener('click', function () {
            expander.parentElement.classList.toggle('expanded');
            expander.classList.toggle('expanded');
        })
    }
    if (block_elements) {
        block_elements.forEach((el) => {
            el.addEventListener('mouseover', () => {
                el.classList.add('hover');
            })
        })
        block_elements.forEach((el) => {
            el.addEventListener('mouseout', () => {
                el.classList.remove('hover');
            })
        })
    }
    if (filter_sort_buttond) {
        filter_sort_buttond.addEventListener('click', () => {
            filter_mob.classList.toggle('show')
        })
    }
    if (search_button) {
        search_button.addEventListener('click', () => {
            search_field.classList.toggle('show');
        })
    }



    document.addEventListener('mouseover', (e) => {

        if (e.target.classList.contains('button')) {
            let if_ripple = e.target.querySelector('.ripple')



            let ripple_div = document.createElement('div');
            // root.style.setProperty('--js-button-x',e.offsetX + 'px')  
            // root.style.setProperty('--js-button-y', e.offsetY + 'px');
            ripple_div.style.top = e.offsetY + 'px';
            ripple_div.style.left = e.offsetX + 'px';
            ripple_div.classList.add('ripple');
            e.target.appendChild(ripple_div);
            setTimeout(() => {
                ripple_div.remove();
            }, 800)

        }
    })

    document.addEventListener('scroll', function () {
        var st = window.pageYOffset;
        if (window.pageYOffset > 115) {
            if (st > lastScrollTop) {
                header.classList.add('hide')
            } else {
                header.classList.remove('hide')

            }
            lastScrollTop = window.pageYOffset;
        }
    })

    document.querySelector('.language').addEventListener('click', function () {
        document.querySelector('.select').classList.toggle('drop');
    })
    burger_open.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()

        burger.classList.add('move');

        bg_burger.classList.add('bg-burger-style')
        document.addEventListener("scroll", () => menu_scroll_controll(burger, bg_burger), { once: true });
    })
    burger_close.addEventListener('click', function () {
        burger.classList.remove('move');

        bg_burger.classList.remove('bg-burger-style')
    })
    bg_burger.addEventListener("click", function (event) {
        burger.classList.remove('move');

        bg_burger.classList.remove('bg-burger-style')
    })


    //#endregion 

})


function menu_scroll_controll(burger, bg_burger) {
    burger.classList.remove('move')
    bg_burger.classList.remove('bg-burger-style')
}


