const form = document.querySelector('#form');
const input = document.querySelector('#tvinput');
const column = document.querySelector('#card-col');
const container = document.querySelector('.container-fluid');
const heading = document.querySelector('.display-3');


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchQ = input.value;
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQ}`)
    let data = await res.json();

    if (input.value === '') {
        const alert = document.createElement('h5');
        alert.setAttribute('id', 'alertDiv');
        alert.textContent = 'Please Enter the Movie Name';
        container.insertBefore(alert, heading);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    } else {
        column.innerHTML = "";
    }
    try {
        if (data.length === 0) {
            const errorMsg = document.createElement('h3');
            errorMsg.textContent = 'Sorry!, No Result found :(';
            column.appendChild(errorMsg);
            form.reset();
        }
        else {
            for (let i = 0; i < data.length; i++) {
                const movieCard = document.createElement('div');
                movieCard.setAttribute('class', 'card');
                const movieImg = document.createElement('img');
                if (data[i].show.image === null) {
                    movieImg.setAttribute('src', `https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg`);
                    movieImg.setAttribute('width', '286px');
                    movieImg.setAttribute('height', '402px');

                } else {
                    movieImg.setAttribute('src', `${data[i].show.image.medium}`);
                }
                movieImg.setAttribute('class', 'card-img-top');
                movieCard.appendChild(movieImg);
                const cardBody = document.createElement('div');
                cardBody.setAttribute('class', 'card-body');
                movieCard.appendChild(cardBody);
                const h5 = document.createElement('h5');
                h5.setAttribute('class', 'card-title');
                h5.textContent = data[i].show.name;
                cardBody.appendChild(h5);
                const rating = document.createElement('p');
                rating.setAttribute('class', 'rating');
                if (data[i].show.rating.average === null) {
                    rating.textContent = 'IMDB: N/A';
                } else {
                    rating.textContent = `IBMD: ${data[i].show.rating.average}`;
                }
                cardBody.append(rating);
                const link = document.createElement('a');
                link.setAttribute('href', `${data[i].show.url}`);
                link.setAttribute('class', 'btn btn-primary');
                link.textContent = "Know More";
                cardBody.append(link);
                column.appendChild(movieCard);
            }
            form.reset();
        }
    }
    catch (e) {
        document.body.textContent = e;
    }
})


// function makeColor(r, g, b) {
//     const color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//     color.rgb = function () {
//         const { r, g, b } = this;
//         return `rgb{${r}, ${g}, ${b}}`;
//     }
//     color.add = function () {
//         const { r, g, b } = this;
//         return `${r + g + b}`
//     }
//     return color;
// }

// const firstcolor = makeColor(200, 80, 250);


// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Color.prototype.add = function () {
//     const { r, g, b } = this;
//     return `${r + g + b}`;

// }
// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb{${r}, ${g}, ${b}}`;
// }



// class Color {
//     constructor(r, g, b) {
//         this.r = r;
//         this.g = g;
//         this.b = b;
//     }
//     add() {
//         const { r, g, b } = this;
//         return `${r + g + b}`;
//     }
// }

// const firstColor = new Color(250, 114, 36);
// const SecondColor = new Color(255, 180, 25);