// Toggle menu mobile: Tailwind không có sẵn JS, nên tự viết hành vi
var btn = document.getElementById('menu-btn');
var menu = document.getElementById('mobile-menu');

btn.addEventListener('click', function () {
  // đổi qua lại giữa class "hidden" và "flex"
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

// Bấm vào link trong menu mobile thì tự đóng menu
menu.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
  });
});

// Hiệu ứng nhỏ: header đậm bóng hơn khi cuộn
window.addEventListener('scroll', function () {
  document.querySelector('header').classList.toggle('shadow-lg', window.scrollY > 20);
});
