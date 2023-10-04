// Определение переменных
const quizLeftElements = document.querySelectorAll('.quiz__left');
const quizRight7Elements = document.querySelectorAll('.quiz__right_7_1, .quiz__right_7_2, .quiz__right_7_3');
let currentQuestionIndex = 1;

$(document).ready(function(){
  $('form').submit(function(e) {
    e.preventDefault();
    if(!$(this).valid()) {
      return;
    }
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('form').trigger('reset');
    });
    return false;
});
  /* $('div.packaging__header').on('click', 'div:not(.packaging__header_item_active)', function() {
    $(this)
      .addClass('packaging__header_item_active').siblings().removeClass('packaging__header_item_active')
      .closest('div.packaging__tabs').find('div.packaging__tab').removeClass('packaging__tab_1_active packaging__tab_2_active packaging__tab_3_active packaging__tab_4_active packaging__tab_5_active packaging__tab_6_active').eq($(this).index()).addClass('packaging__tab_1_active packaging__tab_2_active packaging__tab_3_active packaging__tab_4_active packaging__tab_5_active packaging__tab_6_active');
    }); */
  $('div.sites__header').on('click', 'div:not(.sites__header_item_active)', function() {
    $(this)
      .addClass('sites__header_item_active').siblings().removeClass('sites__header_item_active')
      .closest('div.container').find('div.sites__tabs').removeClass('sites__tabs_active').eq($(this).index()).addClass('sites__tabs_active');
    });        
});

function showNextQuizRight7(index) {
  if (index >= quizRight7Elements.length) {
    return; // Останавливаемся, если все элементы были обработаны
  }

  // Удаляем класс активности у всех элементов "quiz__right_7_2" и "quiz__right_7_3"
  quizRight7Elements.forEach((element) => {
    element.classList.remove('quiz__right_7_1_active', 'quiz__right_7_2_active', 'quiz__right_7_3_active');
  });

  // В зависимости от значения index добавляем нужный класс активности
  if (index === 0) {
    quizRight7Elements[index].classList.add('quiz__right_7_1_active');
  } else if (index === 1) {
    quizRight7Elements[index].classList.add('quiz__right_7_2_active');
  } else if (index === 2) {
    quizRight7Elements[index].classList.add('quiz__right_7_3_active');
    
    // Удаляем класс активности у всех блоков .quiz__left_remained_number
    $('.quiz__left_remained_number').removeClass('quiz__left_remained_number_active');

    // Добавляем класс активности к блоку "quiz__left_remained_number_done"
    $('.quiz__left_remained_number_done').addClass('quiz__left_remained_number_active');

    // Удаляем класс активности у предыдущего блока quiz__left
    $('.quiz__left').removeClass('quiz__left_active');

    // Добавляем класс активности к текущему блоку quiz__left
    $('.quiz__left').eq(index).addClass('quiz__left_active');
    
    // Добавляем класс активности quiz__left_2_active к элементу с классом quiz__left_2
    $('.quiz__left_2').addClass('quiz__left_2_active');
  }
  

  // Вызываем функцию снова с индексом следующего элемента после задержки в 3 секунды
  setTimeout(() => {
    showNextQuizRight7(index + 1);
  }, 3000);
}

const arrowWrapper = document.querySelector('.packaging__text_title'),
      arr = arrowWrapper.querySelectorAll('img'),
      packingHeader = document.querySelector('.packaging__header'),
      packingItem = document.querySelectorAll('.packaging__header_item'),
      packingText = document.querySelector('.packaging__text'),
      packingTab = document.querySelectorAll('.packaging__tab'),
      packingTabs = document.querySelector('.packaging__tabs')

let count = 0;

function clickNextArrow(arrow) {

  
  packingTabs.addEventListener('click', (e) =>{

    if (e.target.classList.contains('arrow_right') && e.target){
      count++;
      if (count < packingItem.length) {
        packingHeader.style.transform = `translateX(${-111 * count}px)`;

        packingItem.forEach((item, i) => {
          item.classList.remove('packaging__header_item_active')
        })
  
        packingItem[count].classList.add('packaging__header_item_active')

        packingTab.forEach((tab, i) => {
          tab.classList.remove(`packaging__tab_${i+1}_active`)
        })

        packingTab[count].classList.add(`packaging__tab_${count+1}_active`)

      } else {
        count = 5;
      }
      
    }
    
  })
}



function clickPrevArrow(arrow) {
  

  packingTabs.addEventListener('click', (e) =>{

    if (e.target.classList.contains('arrow_left') && e.target){
      count-=1;
      if (count >= 0) {

        packingHeader.style.transform = `translateX(${-111 * count}px)`;

        packingItem.forEach((item, i) => {
          item.classList.remove('packaging__header_item_active')
        })
  
        packingItem[count].classList.add('packaging__header_item_active')

        packingTab.forEach((tab, i) => {
          tab.classList.remove(`packaging__tab_${i+1}_active`)
        })

        packingTab[count].classList.add(`packaging__tab_${count+1}_active`)
        
      } else {
        count = 0
      }
      
    }

  })
}

clickNextArrow(arr[1])
clickPrevArrow(arr[0])


/* const arrow = document.querySelector(".sites .arrow");
const headItems = document.querySelectorAll(".sites__header_item");
const tabss = document.querySelectorAll(".sites__tabs");

let headerItemWidth = 154; // Ширина элемента sites__header_item, замените на фактическую ширину

function shiftHeaderItems() {
  const actHeaderItem = document.querySelector(".sites__header_item_active");
  const actTab = document.querySelector(".sites__tabs_active");

  // Удаление активного класса у текущих активных элементов
  actHeaderItem.classList.remove("sites__header_item_active");
  actTab.classList.remove("sites__tabs_active");

  // Перемещение первого элемента в конец списка и назначение активного класса для следующих элементов
  if (actHeaderItem.nextElementSibling) {
    actHeaderItem.nextElementSibling.classList.add("sites__header_item_active");
    actTab.nextElementSibling.classList.add("sites__tabs_active");
  } else {
    headItems[0].classList.add("sites__header_item_active");
    tabss[0].classList.add("sites__tabs_active");
  }
}

// Добавление обработчика событий для стрелки
arrow.addEventListener("click", shiftHeaderItems); */

const arrow = document.querySelector(".sites .arrow");
const header = document.querySelector(".sites__header");
const headItems = document.querySelectorAll(".sites__header_item");
const tabss = document.querySelectorAll(".sites__tabs");

let headerItemWidth = 152; // Ширина элемента sites__header_item, замените на фактическую ширину
let currentPosition = 0;

function shiftHeaderItems() {
  const actHeaderItem = document.querySelector(".sites__header_item_active");
  const actTab = document.querySelector(".sites__tabs_active");

  // Удаление активного класса у текущих активных элементов
  actHeaderItem.classList.remove("sites__header_item_active");
  actTab.classList.remove("sites__tabs_active");

  // Перемещение первого элемента в конец списка и назначение активного класса для следующих элементов
  if (actHeaderItem.nextElementSibling) {
    actHeaderItem.nextElementSibling.classList.add("sites__header_item_active");
    actTab.nextElementSibling.classList.add("sites__tabs_active");
    currentPosition -= headerItemWidth;
  } else {
    headItems[0].classList.add("sites__header_item_active");
    tabss[0].classList.add("sites__tabs_active");
    currentPosition = 0;
  }

  // Добавление трансформации для сдвига sites__header
  header.style.transform = `translateX(${currentPosition}px)`;
}

// Добавление обработчика событий для стрелки
arrow.addEventListener("click", shiftHeaderItems);


// Получаем ссылки на стрелки и элементы local-item
const backButton = document.querySelector(".arrows .arrow:nth-child(1)"); // Стрелка "назад"
const forwardButton = document.querySelector(".arrows .arrow:nth-child(2)"); // Стрелка "вперед"
const localItems = document.querySelectorAll(".local-item");

let currentIndex = 0; // Инициализируем индекс текущего отображаемого local-item

// Функция для отображения предыдущего local-item
function showPrevLocalItem() {
  localItems[currentIndex].classList.remove("local-item_active");
  currentIndex = (currentIndex - 1 + localItems.length) % localItems.length;
  localItems[currentIndex].classList.add("local-item_active");
}

// Функция для отображения следующего local-item
function showNextLocalItem() {
  localItems[currentIndex].classList.remove("local-item_active");
  currentIndex = (currentIndex + 1) % localItems.length;
  localItems[currentIndex].classList.add("local-item_active");
}

// Добавляем обработчики событий на стрелки
backButton.addEventListener("click", showPrevLocalItem);
forwardButton.addEventListener("click", showNextLocalItem);

document.addEventListener("DOMContentLoaded", function() {
  var toggleButton = document.querySelector(".toggle-menu");
  var menuRect = document.querySelector(".promo__info-menu");
  
  toggleButton.addEventListener("click", function(e) {
      e.preventDefault(); // Предотвращаем переход по ссылке
      if (menuRect.style.display === "none" || menuRect.style.display === "") {
          menuRect.style.display = "block"; // Показываем блок
      } else {
          menuRect.style.display = "none"; // Скрываем блок
      }
  });
});



function selectRadioButton(event) {
  const radioButton = event.currentTarget.querySelector('.radio-button');

  // Проверяем, если радиокнопка уже выбрана или нет радиокнопки
  if (radioButton && !radioButton.checked) {
    const radioGroup = document.querySelectorAll('input[type="radio"][name="' + radioButton.name + '"]');
    radioGroup.forEach((radio) => {
      radio.checked = false;
    });

    radioButton.checked = true;

    const inputWrappers = document.querySelectorAll('.input-wrapper');
    inputWrappers.forEach((inputWrapper) => {
      inputWrapper.classList.remove('input-wrapper_active');
    });

    const inputWrapper = event.currentTarget;
    inputWrapper.classList.add('input-wrapper_active');

    const textElements = document.querySelectorAll('.text');
    textElements.forEach((textElement) => {
      textElement.classList.remove('text_active');
    });

    const textElement = inputWrapper.querySelector('.text');
    textElement.classList.add('text_active');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const headerBurger = document.querySelector(".header__burger");
  const menu320 = document.querySelector(".menu-320");
  const menuOverlay = document.querySelector(".menu-overlay");
  const body = document.body;

  headerBurger.addEventListener("click", function () {
      menu320.classList.toggle("menu-320_active");
      menuOverlay.style.display = "block";
      body.classList.toggle("menu-open");
  });

  menuOverlay.addEventListener("click", function () {
      menu320.classList.remove("menu-320_active");
      menuOverlay.style.display = "none";
      body.classList.remove("menu-open");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Функция для выполнения кода при определенной ширине экрана
  function handleScreenWidth() {
    const screenWidth = window.innerWidth;

    // Проверяем, что ширина находится в диапазоне от 320px до 699px
    if (screenWidth >= 320 && screenWidth <= 699) {
      const quiz = document.querySelectorAll('.button_quiz'),
            quizRight = document.querySelectorAll('.quiz__right'),
            quizHead = document.querySelector('.quiz'),
            quizLeft = document.querySelectorAll('.quiz__left'),
            quizLeftRemained = document.querySelector('.quiz__left_remained'),
            quizLeftLock = document.querySelector('.quiz__left_lock'),
            quizFive = document.querySelector('.quiz__right_5'),
            checkbox = quizFive.querySelectorAll('.input-wrapper'),
            quizRemained = document.querySelectorAll('.quiz__left_remained'),
            a = setInterval(checkThree, 100);

      quiz.forEach((button,i) => {
        button.addEventListener('click', (e) => {
          if (i==9) {
            quizHead.style.height = '365px';
            quizLeft[0].style.display ='none';
          }
          checkbox.forEach((input, i) => {
            if (input.classList.contains('input-wrapper_active')){
              quizRight.forEach((quiz,i) => {
                if (quiz.classList.contains('quiz__right_5_active')){
                  quizHead.style.height = '1170px';
                  quizLeft[0].style.top = '85%';
                  quizLeftRemained.style.top = '-1004px';
                  quizLeftLock.style.top = '-990px';
                }
              })
            }
          })
        })
      })
      function checkThree() {
        if (document.querySelector('.quiz__right_7_3').classList.contains('quiz__right_7_3_active')) {
          document.querySelector('.quiz').style.height = '672px';
          document.querySelector('.quiz__left_2').style.bottom = '-500px';
          clearInterval(a)
        }
      }
    }
  }

  // Вызываем функцию при загрузке страницы
  handleScreenWidth();

  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', handleScreenWidth);
});



// Функция, которая будет вызываться при клике на текст рядом с радиокнопкой
function selectRadioByText(event) {
  // Получаем радиокнопку, связанную с текстовым элементом
  const radioInput = event.currentTarget.querySelector('input[type="radio"]');
  if (radioInput) {
    // Проверяем, если радиокнопка уже выбрана, то не нужно ничего менять
    if (!radioInput.checked) {
      // Снимаем выбор с других радиокнопок с тем же именем
      const radioGroup = document.querySelectorAll('input[type="radio"][name="' + radioInput.name + '"]');
      radioGroup.forEach((radio) => {
        radio.checked = false;
      });
      // Выбираем текущую радиокнопку
      radioInput.checked = true;
    }
  }
}

// Добавляем обработчик клика на все элементы с классом .social
const socialElements = document.querySelectorAll('.social');
socialElements.forEach((element) => {
  element.addEventListener('click', selectRadioByText);
});

// Обработчик события для каждой радиокнопки с классом .radio-button
const radioButtons = document.querySelectorAll('input[type="radio"].radio-button');
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', selectRadioButton);
});

// Обработчик события для каждой радиокнопки
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', function () {
        // Получаем все блоки input-wrapper на странице
        const inputWrappers = document.querySelectorAll('.input-wrapper');

        // Получаем все элементы с классом "text" на странице
        const textElements = document.querySelectorAll('.text');

        // Сбрасываем стили для всех блоков input-wrapper
        inputWrappers.forEach((inputWrapper) => {
            inputWrapper.classList.remove('input-wrapper_active');
        });

        // Сбрасываем стили для всех элементов с классом "text"
        textElements.forEach((textElement) => {
            textElement.classList.remove('text_active');
        });

        // Получаем текущий родительский элемент (input-wrapper) радиокнопки
        const parentInputWrapper = this.closest('.input-wrapper');

        // Получаем элемент с классом "text"
        const textElement = parentInputWrapper.querySelector('.text');

        // Применяем стили к выбранной радиокнопке и соответствующему элементу "text"
        parentInputWrapper.classList.add('input-wrapper_active');
        textElement.classList.add('text_active');
    });
});
 
function selectInput(event) {
  const currentInput = event.currentTarget.querySelector('.checkbox-button');
  const isChecked = currentInput.checked;

  currentInput.checked = !isChecked;
  const inputWrapper = event.currentTarget;
  inputWrapper.classList.toggle('input-wrapper_active');

  const textElement = inputWrapper.querySelector('.text');
  textElement.classList.toggle('text_active');
}
 
function showQuestion(index) {
  // Скрыть все вопросы
  $('.quiz__right').removeClass('quiz__right_1_active quiz__right_2_active quiz__right_3_active quiz__right_4_active quiz__right_5_active quiz__right_6_active quiz__right_7_active');

  // Показать текущий вопрос
  $(`.quiz__right_${index}`).addClass(`quiz__right_${index}_active`);

  // Обновить текст количества оставшихся вопросов
  $('.quiz__left_remained_number').removeClass('quiz__left_remained_number_active');
  $(`.quiz__left_remained_number:nth-child(${index})`).addClass('quiz__left_remained_number_active');

  $('#quizStages .quiz__right_stages_item').removeClass('quiz__right_stages_item_active');
  for (let i = 1; i <= index; i++) {
    $(`#quizStages .quiz__right_stages_item:nth-child(${i})`).addClass('quiz__right_stages_item_active');
  }

  // Очистить активный вариант ответа третьего вопроса, если он не выбран
  if (index !== 3) {
    $('.quiz__right_3').removeClass('quiz__right_3_active1 quiz__right_3_active2 quiz__right_3_active3 quiz__right_3_active4 quiz__right_3_active5');
  }
}



function nextQuestion() {
  if (currentQuestionIndex < 7) {
    const selectedAnswer = $(`.quiz__right_${currentQuestionIndex}`).find('input[type="radio"]:checked, input[type="checkbox"]:checked');

    // Если пользователь выбрал правильный ответ (6) и текущий индекс вопроса равен 2
    if (selectedAnswer.length > 0 && selectedAnswer.val() === '6' && currentQuestionIndex === 2) {
      // Пропустить следующий вопрос и перейти к четвертому
      currentQuestionIndex += 2;
    } else {
      if (selectedAnswer.length > 0 || $(`.quiz__right_${currentQuestionIndex}`).find('input[type="radio"], input[type="checkbox"]').length === 0) {
        currentQuestionIndex++;
      }
    }

    if (currentQuestionIndex === 3) {
      const selectedChoice = selectedAnswer.val();
      $('.quiz__right_3').removeClass('quiz__right_3_active1 quiz__right_3_active2 quiz__right_3_active3 quiz__right_3_active4 quiz__right_3_active5');
      $(`.quiz__right_3[data-choice="${selectedChoice}"]`).addClass(`quiz__right_3_active${selectedChoice}`);
    }

    showQuestion(currentQuestionIndex);

    if (currentQuestionIndex === 7) {
      showNextQuizRight7(0);
    }
  }
}

function selectRadioButton6(event) {
  // Получаем номер выбранного подарка (data-choice)
  const choice = event.currentTarget.dataset.choice;
  
  // Устанавливаем радиокнопку
  $(event.currentTarget).find(".radio-button").prop("checked", true);
  
  // Переключаем видимость блоков с подарками
  $(".quiz__right_6_picture").each(function() {
    if ($(this).data("choice").toString() === choice) {
      $(this).addClass("quiz__right_6_picture_active");
    } else {
      $(this).removeClass("quiz__right_6_picture_active");
    }
  });

  $("#giftTextPlan").toggleClass("quiz__left_lock_text_3_active", choice === "1");
  $("#giftTextSite").toggleClass("quiz__left_lock_text_3_active", choice === "2");
  $("#giftTextConsultation").toggleClass("quiz__left_lock_text_3_active", choice === "3");
  $("#giftTextNone").toggleClass("quiz__left_lock_text_3_active", choice === "4");


}

$(document).ready(function() {
  // Обработчик клика на радиокнопке (для отложенных элементов)
  $(document).on("click", ".quiz__right_6 .input-wrapper", selectRadioButton6);
});

  $(document).ready(function(){
    $('div.packaging__header').on('click', 'div:not(.packaging__header_item_active)', function() {
      $(this)
        .addClass('packaging__header_item_active').siblings().removeClass('packaging__header_item_active')
        .closest('div.packaging__tabs').find('div.packaging__tab').removeClass('packaging__tab_1_active packaging__tab_2_active packaging__tab_3_active packaging__tab_4_active packaging__tab_5_active packaging__tab_6_active').eq($(this).index()).addClass('packaging__tab_1_active packaging__tab_2_active packaging__tab_3_active packaging__tab_4_active packaging__tab_5_active packaging__tab_6_active');
    });
    
    $('div.sites__header').on('click', 'div:not(.sites__header_item_active)', function() {
      $(this)
        .addClass('sites__header_item_active').siblings().removeClass('sites__header_item_active')
        .closest('div.container').find('div.sites__tabs').removeClass('sites__tabs_active').eq($(this).index()).addClass('sites__tabs_active');
    });        
  
    // Начало опроса при загрузке страницы
    showQuestion(currentQuestionIndex);
  
    // Обработчик клика на кнопку "Далее"
    $('.button_quiz').click(function () {
      nextQuestion();
    });
  });
  
  $(document).ready(function() {
    // Функция, которая показывает модальное окно и устанавливает нужный текст подзаголовка
    function openModalAndSetText(modal, subtitleClassToShow) {
      // Сначала скрываем все подзаголовки
      $(".subtitle").hide();
      // Затем показываем нужный подзаголовок
      $(subtitleClassToShow).show();
      // Открываем модальное окно
      $(modal).show();
      // Запрет прокрутки страницы
      $('body').css('overflow', 'hidden');
    }
  
    // Функция закрытия модального окна и разрешения прокрутки сайта
    function closeModalAndEnableScroll(modal) {
      $(modal).hide();
      $('body').css('overflow', 'auto');
    }
    
    // Обработчики кликов по кнопкам
    $(".button_wrapper_packaging .button").on("click", function() {
      const buttonIndex = $(".button_wrapper_packaging .button").index(this);
  
      switch (buttonIndex) {
        case 0:
          openModalAndSetText(".overlay", ".subtitle_research_active");
          break;
        case 1:
          openModalAndSetText(".overlay", ".subtitle_prototype");
          break;
        case 2:
          openModalAndSetText(".overlay", ".subtitle_design");
          break;
        case 3:
          openModalAndSetText(".overlay", ".subtitle_layout");
          break;
        case 4:
          openModalAndSetText(".overlay", ".subtitle_traffic");
          break;
        case 5:
          openModalAndSetText(".overlay", ".subtitle_analytics");
          break;
      }
    });
  
    // Закрытие модального окна при клике вне его области
    $(document).on("click", function(event) {
      if ($(event.target).closest(".popup").length === 0 && $(event.target).hasClass("overlay")) {
        closeModalAndEnableScroll(".overlay");
      }
    });
  });

  $(document).ready(function() {
    var exitPopupShown = false;
    
    function showExitPopup() {
      if (!exitPopupShown) {
        $('#popup-exit').fadeIn();
        exitPopupShown = true;
      }
    }
    
    function hideExitPopup() {
      $('#popup-exit').fadeOut();
    }
  
    $(document).on('mouseleave', function(e) {
      if (e.clientY < 0) { // Проверка, что курсор находится вне окна браузера
          showExitPopup();
      }
    });
  
    // Закрытие попапа при клике за его пределами
    $(document).on('click', function(e) {
      if ($(e.target).closest('#popup-exit .popup-exit').length === 0) {
        hideExitPopup();
      }
    });
  
  });

  /* document.getElementById("mySelect").addEventListener("change", function() {
    var selectedOption = this.options[this.selectedIndex];
    document.getElementById("myInput").value = selectedOption.value;
  }); */

  $('.select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});
 

  








