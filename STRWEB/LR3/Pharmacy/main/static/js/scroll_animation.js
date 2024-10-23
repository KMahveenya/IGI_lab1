const bottleContainer = document.querySelectorAll('.bottle-container');

        // Добавляем обработчик для события прокрутки
window.addEventListener('scroll', function() {
    // Получаем значение прокрутки
    
    //this.alert(this.window.outerHeight + ' ' + scrollPosition);
    //  alert();
    //console.log(scrollPosition);
    // Рассчитываем смещение бутылки на основе прокрутки
    bottleContainer.forEach(bottle => {
        const scrollPosition = window.scrollY;
        let moveY = scrollPosition * 3; // Коэффициент 0.5 для уменьшения скорости перемещения
        while (moveY > this.window.innerHeight - this.getComputedStyle(bottle).top.slice(0, -2))
        {
            //console.log(moveY);
            moveY = moveY - this.window.innerHeight - 300;
            
        }
        bottle.style.transform = `translate(0%, calc(0% + ${moveY}px))`;
    });
    
});