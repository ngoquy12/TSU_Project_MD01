// Hàm trả về chuỗi HTML của phần menu
function renderMenu(keyActive) {
  console.log("keyActive: ", keyActive);

  // Tạo 1 mảng danh sách các link trong menu
  const menuItems = [
    {
      key: "dashboard",
      name: "Thống kê",
      link: "./dashboard.html",
      icon: '<i class="fa-solid fa-house"></i>',
    },
    {
      key: "category-manager",
      name: "Quản lý danh mục",
      link: "./category-manager.html",
      icon: '<i class="fa-solid fa-list"></i>',
    },
    {
      key: "product-manager",
      name: "Quản lý sản phẩm",
      link: "./product-manager.html",
      icon: '<i class="fa-brands fa-product-hunt"></i>',
    },
  ];

  // Nối các chuỗi HTML trong Menu
  let menuHTML = `
    <div class="logo-image">
          <img src="../public/images/logo.png" alt="" />
        </div>

        <nav class="list-link">
  `;

  // Nối chuỗi kèm theo xử lý logic và gán các dữ liệu động
  menuItems.forEach(function (item) {
    menuHTML += `
          <a href="${item.link}" class="link-item ${
      keyActive === item.key ? "active" : ""
    }">
           ${item.icon}
            <span>${item.name}</span>
          </a>
    `;
  });

  menuHTML += `</nav>`;

  return menuHTML;
}
