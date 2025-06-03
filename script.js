const bannerContainer = document.querySelector('.banner-container');
const bannerImages = document.querySelectorAll('.banner-img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const messageContainer = document.querySelector('.message-container');
const emptyMessage = document.querySelector('.message-empty');
const cartList = document.querySelector('.cart-list');
//轮播图
let currentIndex = 0;
const totalImages = bannerImages.length;

function showImage(index) {
    bannerImages.forEach(img => {
        img.style.opacity = 0;
    });
    bannerImages[index].style.opacity = 1;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}, 5000);
//搜索功能

//储存消息的数组
let messages = [];

//message function
function addMessage(content) {
    if (!content.trim()) {
        return;
    }
    messages.push(content);
    updateMessageDisplay();

    //clear input
    searchInput.value = '';

    //store messages in localStorage
    localStorage.setItem('messages', JSON.stringify(messages));
}

//delete message function
function deleteMessage(index) {
    messages.splice(index, 1);
    updateMessageDisplay();

    //update localStorage
    localStorage.setItem('messages', JSON.stringify(messages));
}

//update message display
function updateMessageDisplay() {
    messageContainer.innerHTML = '';
    if (messages.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';

        messages.forEach((message, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <span class="message-content">${message}</span>
                <button class="delete-btn" onclick="deleteMessage(${index})">删除</button>
            `;
            messageContainer.appendChild(messageElement);
        });
    }
}

//search button click event
searchButton.addEventListener('click', () => {
    addMessage(searchInput.value);
});

//search input keydown event
searchInput.addEventListener('keypress',(e) =>{
    if (e.key === 'Enter') {
        addMessage(searchInput.value);
    }
});

//load messages from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        updateMessageDisplay();
    }
});

// 设置消息通知的显示高度
const cart = document.querySelector('.cart');
cart.addEventListener('mouseenter', () => {
    const height = messages.length > 0 ? Math.min(messages.length * 40 + 20, 300) : 100;
    cartList.style.height = height + 'px';
});

cart.addEventListener('mouseleave', () => {
    cartList.style.height = '0px';
});