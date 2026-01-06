// Các phần tử trong DOM
const formCategory = document.querySelector("#form-add-category");
const categoryCodeInput = document.querySelector("#category-code");
const categoryNameInput = document.querySelector("#category-name");
const tbodyElement = document.querySelector("#tbody");
// Lấy ra danh sách các radio có name=status
const categoryStatues = document.querySelectorAll("input[name=status]");
let categoryStatusValue = "active";

// Mảng chứa danh sách danh mục
let categories = JSON.parse(localStorage.getItem("categories")) || [];

// Lắng nghe sự kiện thay đổi khi người dùng chọn trạng thái
categoryStatues.forEach(function (item) {
  //   Lắng nghe sự kiện khi người dùng change
  item.addEventListener("change", function (event) {
    // Input nào được checked, thì sẽ lấy giá trị của input đó
    if (event.target.checked) {
      categoryStatusValue = event.target.value;
    }
  });
});

// Hàm mở modal thêm mới/ cập nhật danh mục
function handleShowModal() {
  // Thay đổi style để hiển thị form thêm mới danh mục
  formCategory.style.display = "flex";
}

// Hàm đóng modal thêm mới / cập nhật danh mục
function handleCloseModal() {
  // Thay đổi style để ẩn form thêm mới danh mục
  formCategory.style.display = "none";
}

// Hàm submit form
function handleSubmit(event) {
  // Ngăn chặn sự kiện load lại trang khi submit form
  event.preventDefault();

  //   Validate dữ liệu đầu vào
  if (!categoryCodeInput.value) {
    alert("Mã danh mục không được để trống");
    return;
  }

  if (!categoryNameInput.value) {
    alert("Tên danh mục không được để trống");
    return;
  }

  // Chuyển đổi tất cả dữ liệu từ input thành 1 đối tượng
  const newCategory = {
    id: Math.ceil(Math.random() * 10000000),
    name: categoryNameInput.value,
    code: categoryCodeInput.value,
    status: categoryStatusValue,
  };

  //   Push phần danh mục mới vào trong mảng categories
  categories.unshift(newCategory);

  // Lưu trữ dữ liệu lên localStorage
  localStorage.setItem("categories", JSON.stringify(categories));

  //   Reset giá trị trong Form
  categoryNameInput.value = "";
  categoryCodeInput.value = "";
  document.querySelector("input[name=status][value=active]").checked = true;

  // Đóng form
  handleCloseModal();

  //   Render lại danh sách mới nhất
  renderCategories();
}

// Hàm render danh sách danh mục
function renderCategories() {
  // Xóa tbody cũ
  tbodyElement.innerHTML = "";

  // Duyệt qua mảng categories
  categories.forEach(function (category) {
    // Convert trạng thái từ tiếng anh sang tiếng việt
    const statusText =
      category.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";
    // Tạo 1 thẻ tr
    const trElement = document.createElement("tr");

    trElement.innerHTML = `
        <td>${category.code}</td>
        <td>${category.name}</td>
        <td>${statusText}</td>
        <td>
            <button>Sửa</button>
            <button>Xóa</button>
        </td>
    `;

    // Gán từng thẻ tr đã có dữ liệu vào trong tbody
    tbodyElement.appendChild(trElement);
  });
}

renderCategories();
