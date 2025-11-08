// Select status orders
const listSelectStatus = document.querySelectorAll("#order-status-select");
const formChangeStatus = document.querySelector("[form-change-statusOrder]");

if (listSelectStatus) {
  const changeSelectColor = (selectStatus, status) => {
    selectStatus.classList.remove(
      "bg-info",
      "bg-success",
      "bg-danger",
      "bg-warning"
    );

    if (status === "delivering") {
      selectStatus.classList.add("bg-info");
    } else if (status === "success") {
      selectStatus.classList.add("bg-success");
    } else if (status === "refuse") {
      selectStatus.classList.add("bg-danger");
    } else if (status === "pending") {
      selectStatus.classList.add("bg-warning");
    }
  };

  listSelectStatus.forEach((selectStatus) => {
    const initialStatus = selectStatus.value;
    changeSelectColor(selectStatus, initialStatus);

    // Vô hiệu hóa nếu trạng thái ban đầu là success
    if (initialStatus === "success" || initialStatus === "refuse") {
      selectStatus.disabled = true;
    }

    selectStatus.addEventListener("change", (e) => {
      const status = e.target.value;

      // Nếu trạng thái chuyển sang success, vô hiệu hóa thẻ <select>
      if (status === "success") {
        selectStatus.disabled = true;
      }

      changeSelectColor(selectStatus, status);
      const id = selectStatus.getAttribute("data-id");
      const path = formChangeStatus.getAttribute("path");
      const action = path + "/" + status + "/" + id + "?_method=PATCH";
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// End select status orders

// Expended row order details

document.addEventListener("DOMContentLoaded", () => {
  // Lấy tất cả nút Chi tiết
  const buttons = document.querySelectorAll(".btn-detail");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr"); // tr hiện tại
      const expandRow = row.nextElementSibling; // tr.expanded-row
      const expandContent = expandRow.querySelector(".expand-content");

      // Nếu đang mở thì đóng lại
      if (expandContent.classList.contains("open")) {
        expandContent.classList.remove("open");
        expandContent.innerHTML = "";
        return;
      }

      // Đóng tất cả các dòng khác
      document.querySelectorAll(".expand-content.open").forEach((el) => {
        el.classList.remove("open");
        el.innerHTML = "";
      });

      const address = btn.dataset.address || "Chưa có thông tin";
      const userInfo = btn.dataset.user || "Chưa có thông tin";

      // Lấy sản phẩm từ các div con của nút
      const productDivs = btn.querySelectorAll("div");
      let itemsHTML = "";
      productDivs.forEach((p) => {
        itemsHTML += `
          <tr>
            <td>
              <img src="${
                p.dataset.thumbnail
              }" style="width:50px;height:50px;object-fit:cover;">
            </td>
            <td>${p.dataset.title}</td>
            <td>${p.dataset.quantity}</td>
            <td>${Number(p.dataset.price).toLocaleString("vi-VN")}₫</td>
          </tr>
        `;
      });

      // Gán nội dung chi tiết vào expandContent
      expandContent.innerHTML = `
  <div class="p-3 bg-light border-top">
    <p><strong>Khách hàng:</strong> ${userInfo}</p>
    <p><strong>Địa chỉ:</strong> ${address}</p>
    <p><strong>Sản phẩm:</strong></p>
    <table class="table table-sm table-bordered mt-2 text-center">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>
  </div>
`;

      // Mở dòng chi tiết
      expandContent.classList.add("open");
    });
  });
});

// End expended row order details
