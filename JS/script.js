// const disabledKeys = ["u", "I"];
        
// const showAlert = e => {
//     e.preventDefault();
//     return alert("Sorry, you can't view or copy source codes this way!");
// }

// document.addEventListener("contextmenu", e => {
//     showAlert(e);
// });

// document.addEventListener("keydown", e => {
//     if (e.ctrlKey && disabledKeys.includes(e.key) || e.key === "F12") {
//         showAlert(e);
//     }
// });

// Select element function
function select(el) {
    if(el)
        if (el.trim()) return document.querySelector(el)
        else console.log('Please enter element...!')
}
function selectAll(el) {
    if(el)
        if (el.trim()) return document.querySelectorAll(el) 
        else console.log('Please enter element...!')
}
// Import elements from html
const body  = select('body')
const nav = select('#nav-mobile')
const toggleBtn = select('#toggle-menu')
const xBtn = select('#x-menu')
const formSelect = select('.input-container')
const selectDown = selectAll('.down')
const bookingContent = select('.booking-content')
const addRoomBtn = select('.add-room')
const roomContainer = selectAll('.room-container')
const bookingForm = select('.booking-form')

// 'Select' of the form events function
function selectFunc(e) {
    document.addEventListener('click', (e) => {
        if (e.target.nodeName == 'SELECT') {
            const inputContainer = e.target.parentElement
            inputContainer.children[1].classList.toggle('select-active')
        } else {
            selectDown.forEach((down) => {
                if (down.classList.contains('select-active')) {
                    down.classList.remove('select-active')
                }
            })
        }
    })
}
// Show menu function
function showMenu() {
    body.style.overflow = 'hidden'
    nav.classList.remove('d-none')
    setTimeout(() => {
        nav.style.opacity = '1'
        toggleBtn.classList.add('d-none')
        xBtn.classList.remove('d-none')
    }, 10)
}
// Close menu function
function closeMenu() {
    xBtn.classList.add('d-none')
    toggleBtn.classList.remove('d-none')
    body.style.overflow = 'visible'
    nav.style.opacity = '0'
    setTimeout(() => {
        nav.classList.add('d-none')
    }, 300)
}
// SelectFunc call
selectFunc()

// Show menu event
toggleBtn.addEventListener('click', (e) => {
    showMenu()
})
// Close menu event
xBtn.addEventListener('click', (e) => {
    closeMenu()
})
// Room counter
let counterRoom = 2

// Add room html element function
function addRoom() {
    select('.room-num').parentElement.classList.remove('d-none')
    const newRoom = `
    <div class="room-container row justify-content-between pb-3">
        <div class="col-12 mt-3 mb-2">
            <div class="row justify-content-between align-items-center">
                <div class="col-3 col-sm-6">
                    <b class="room-num">Xona ${counterRoom++}</b>
                </div>
                <div class="col-6 text-end">
                    <div class="del-btn">
                        <p class="del-room d-inline-block">Xonani o'chirish</p>
                        <i class="del-icon fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="input-container">
                <select class="form-select add-people" name="add-people">
                    <option value="1">1 katta</option>
                    <option value="2" selected>2 kattalar</option>
                    <option value="3">3 kattalar</option>
                    <option value="4">4 kattalar</option>
                    <option value="5">5 kattalar</option>
                    <option value="6">6 kattalar</option>
                    <option value="7">7 kattalar</option>
                    <option value="8">8 kattalar</option>
                    <option value="9">9 kattalar</option>
                    <option value="10">10 kattalar</option>
                </select>
                <span class="down"></span>
                <i class="input-icon select-icon fa-solid fa-user"></i>
            </div>
        </div>
        <div class="col-sm-6 mt-4 mt-sm-0">
            <div class="input-container">
                <select class="form-select add-children" name="add-children">
                    <option value="none" disabled selected>Bolalar sonini qo'shish</option>
                    <option value="none">Yo'q</option>
                    <option value="0">Yosh bola (1yoshgacha)</option>
                    <option value="1">Yosh bola 1yosh</option>
                    <option value="2">Yosh bola 2yosh</option>
                </select>
                <span class="down"></span>
                <i class="input-icon select-icon fa-sharp fa-solid fa-plus"></i>
            </div>
        </div>
    </div>`
    bookingContent.innerHTML += newRoom
}
// Remove room html element
function removeRoom(e) {
    const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
    target.remove()
}
// Dropdown showing the number of guests
function guestsShow(e) {
    e.preventDefault()
        if (select('.dropdown-wrapper__rooms').children.length < 5) {
            select('.dropdown-wrapper__rooms').innerHTML += (`
            <div class="dropdown-wrapper__room col-12">
                <div class="row">
                    <div class="col-6 my-3">
                        <h5 class="bron-dropdown__subtitle text-uppercase my-0 mt-2">Xona ${counterRoom++}</h5>
                    </div>
                    <div class="col-6 mt-3 text-end">
                        <i class="del-icon fa-regular fa-trash-can text-brown"></i>
                    </div>
                    <div class="col-6 mb-2">
                        <h5 class="bron-category my-0">Kattalar</h5>
                    </div>
                    <div class="col-6 mb-2">
                        <h5 class="bron-category my-0">
                            3 yoshdan kichik bolalar
                        </h5>
                    </div>
                    <div class="col-6">
                        <input type="number" class="form-control bron-value" placeholder="Kattalar soni">
                        </div>
                    <div class="col-6">
                        <input type="number" class="form-control bron-value" placeholder="Bolalar soni">
                    </div>
                    <div class="col-12 mt-4">
                        <div class="tag-line"></div>
                    </div>
                </div>
            </div>
            `) 
        }
}
// Add room btn checker
if (addRoomBtn)
    addRoomBtn.addEventListener('click', (e) => {
        addRoom()
    })
// Remove room function call checker 500ms
setInterval(() => {
    // If the length of 'room-container' is
    // greater than 1, 'del-btn' is clicked and the room is deleted
    if (selectAll('.room-container').length > 1) {
        select('.del-btn').addEventListener('click', (e) => {
            removeRoom(e)
        })
    } else if (selectAll('.room-container').length >= 1) {
        counterRoom = 2
        select('.room-num').parentElement.classList.add('d-none')
    }
}, 500)
// bron dropdown wrapper show or hide checker
if (select('.btn-guests')) {
    select('.btn-guests').addEventListener('click', (e) => {
        select('.bron-dropdown-wrapper').classList.toggle('d-none')
    })
}
if (select('.done')) {
    select('.done').addEventListener('click', (e) => {
        e.preventDefault()
        select('.bron-dropdown-wrapper').classList.add('d-none')
    })
}
if (select('.form-bron')) {
    select('.form.bron').addEventListener('submit', (e) => {
        selectAll('.bron-value').forEach((item) => {
            let result = 0
            result += item
        })
    })
}
// Guests show function checking and calling
if (select('.btn-white')) {
    select('.btn-white').addEventListener('click', (e) => {
        guestsShow(e)
    })
}
// Check length of ".dropdown-wrapper__room" every 500ms, if greater than 1,
// remove room from HTML, if length is less than or equal to 1,
// set room counter to 2
setInterval(() => {
    if (selectAll('.dropdown-wrapper__room').length > 1) {
        select('.fa-trash-can').addEventListener('click', (e) => {
            const target = e.target.parentElement.parentElement.parentElement
            target.style.transform = 'translateX(-400px)'
            target.style.backgroundColor = 'rgb(255, 211, 211)'
            setTimeout(() => {
                target.remove()
            }, 500)
            
        })
    } else if (selectAll('.dropdown-wrapper__room').length >= 1) {
        counterRoom = 2
    }
}, 500)

// Rooms carousel function
function caruselFunc(carousel, arrowIcons) {
    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft - scrollWidth > -1 ? "none" : "block";
    }
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            carousel.scrollLeft += icon.classList.contains('left') ? -selectAll(".corousel-img")[0].clientWidth +20 : selectAll(".corousel-img")[0].clientWidth +20;
            setTimeout(() => showHideIcons(), 60);
        });
    });
    const autoSlide = () => {
        if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
        positionDiff = Math.abs(positionDiff);
        let valDifference = selectAll(".corousel-img")[0].clientWidth +20 - positionDiff;
        if(carousel.scrollLeft > prevScrollLeft) {
            return carousel.scrollLeft += positionDiff > selectAll(".corousel-img")[0].clientWidth +20 / 4 ? valDifference : -positionDiff;
        }
        carousel.scrollLeft -= positionDiff > selectAll(".corousel-img")[0].clientWidth +20 / 4 ? valDifference : -positionDiff;
    }
    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    }
    const dragging = (e) => {
        if(!isDragStart) return;
        isDragging = true;
        // isDragging = false;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }
    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if(!isDragging) return;
        isDragging = false;
        autoSlide();
    }
    // Throw an event if the carousel function is present
    if(carousel) {
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart);

        document.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging);

        document.addEventListener("mouseup", dragStop);
        document.addEventListener("mouseleave", dragStop);
        carousel.addEventListener("touchend", dragStop);    
    }
    
}
// Call the carousel function
caruselFunc(select('.carousel-one'), selectAll('.carousel-one-icon'))
caruselFunc(select('.carousel-two'), selectAll('.carousel-two-icon'))
caruselFunc(select('.carousel-three'), selectAll('.carousel-three-icon'))
caruselFunc(select('.carousel-four'), selectAll('.carousel-four-icon'))
caruselFunc(select('.carousel-five'), selectAll('.carousel-five-icon'))
caruselFunc(select('.carousel-one-facilities'), selectAll('.carousel-one-icon-facilities'))
caruselFunc(select('.carousel-two-facilities'), selectAll('.carousel-two-icon-facilities'))
caruselFunc(select('.carousel-three-facilities'), selectAll('.carousel-three-icon-facilities'))
caruselFunc(select('.carousel-four-facilities'), selectAll('.carousel-four-icon-facilities'))
caruselFunc(select('.carousel-five-facilities'), selectAll('.carousel-five-icon-facilities'))
caruselFunc(select('.carousel-six-facilities'), selectAll('.carousel-six-icon-facilities'))

const date = new Date()
const currentDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()
const arrivalDate = select('#arrival-date')
const departureDate = select('#departure-date')

// const timeDiff = Math.abs(date2.getTime() - date1.getTime());
// const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

// console.log(diffDays);

// if (bookingForm) {
//     bookingForm.addEventListener('submit', (e) => {
//         e.preventDefault()
//         console.log(arrivalDate.value);
//         // const timeDiff = Math.abs(+arrivalDate.value - +currentDate);
//         // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//         // console.log(+diffDays);
//     })
// }