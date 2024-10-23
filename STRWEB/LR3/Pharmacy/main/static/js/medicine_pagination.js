let start_meds = JSON.parse(document.getElementById('medicine-data').textContent.replace(/<.+>/, ''));
let meds = start_meds;

const medsPerPage = 3;
let currentPage = 1;

const medList = document.querySelector('.container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function animation()
{
    let shopItems = document.querySelectorAll('.shop-item');
    shopItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            const rotateX = ((y / rect.height) - 0.5) * 45;
            const rotateY = ((x / rect.width) - 0.5) * -45;
    
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

function renderEmployees()
{
    medList.innerHTML = '';

    const start = (currentPage - 1) * medsPerPage;
    const end = start + medsPerPage;

    const medsToShow = meds.slice(start, end);
    
    medsToShow.forEach(med => {
        let figure = document.createElement('figure');
        figure.classList.add('shop-item');

        let section = document.createElement('section');
        section.classList.add('container2');

        if (med.med.image && med.med.image != '')
        {
            let img =  document.createElement('img');
            img.src = med.med.image;
            img.width = '250';
            section.appendChild(img);
            if (med.med.discount != 0)
            {
                let span = document.createElement('span');
                span.id = 'discount';
                span.textContent = 'Скидка ' + med.med.discount + '%';
                section.appendChild(span);
            }
        }

        let article = document.createElement('article');
        let div = document.createElement('div');
        div.classList.add('shop-item-hover');
        article.appendChild(div);
        let p = document.createElement('p');
        let b = document.createElement('b');
        b.textContent = med.med.name
        p.appendChild(b);
        article.appendChild(p);

        if (med.med.discount != 0)
        {
            p = document.createElement('p');
            p.textContent = "Цена: " + Math.round(med.med.price - med.med.price * med.med.discount / 100, -2) + " BYN / " + med.med.price + " BYN";
            article.appendChild(p);
        }
        else
        {
            p = document.createElement('p');
            p.textContent = 'Цена: ' + med.med.price + ' BYN';
            article.appendChild(p);
        }

        section.appendChild(article);
        article = document.createElement('article');

        let button = document.createElement('button');
        let a = document.createElement('a');
        a.classList.add('button');
        a.href = '/medicines/' + med.dep_id + '/' + med.cat_id + '/' + med.med.id + '/';
        a.textContent = 'Подробнее';
        button.appendChild(a);
        article.appendChild(button);
        section.appendChild(article);
        figure.appendChild(section);
        medList.appendChild(figure);
    });
    
    pageInfo.textContent = `Страница ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= meds.length;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1)
    {
        currentPage--;
        renderEmployees();
    }
    animation();
});

nextBtn.addEventListener('click', () => {
    if ((currentPage * medsPerPage) < meds.length)
    {
        currentPage++;
        renderEmployees();
    }
    animation();
});

renderEmployees();
animation();