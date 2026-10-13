// app.js: khởi tạo ứng dụng Vue 3 (CDN). File này PHẢI nạp SAU vue.global.js

const app = Vue.createApp({
  // data(): dữ liệu "reactive" - khi thay đổi, giao diện tự cập nhật
  data() {
    return {
      products: [
        { id: 1, ten: "Electric Blue Case", anh: "../images/sp-1.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 2, ten: "Silver Case", anh: "../images/sp-2.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 3, ten: "Wireless Charger Pad", anh: "../images/sp-3.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 4, ten: "Active TWS Earbuds", anh: "../images/sp-4.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 5, ten: "Black Pro Case", anh: "../images/sp-5.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 6, ten: "Fast Charger Pad", anh: "../images/sp-6.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 7, ten: "Sport Earbuds", anh: "../images/sp-7.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" },
        { id: 8, ten: "USB-C Cable", anh: "../images/sp-8.jpg", gia: 250000, moTa: "Phụ kiện điện thoại chính hãng, bảo hành 12 tháng" }
      ],
      cart: [],      // mảng giỏ hàng: mỗi phần tử { ...sanPham, soLuong }
      tuKhoa: ''     // liên kết 2 chiều với ô tìm kiếm qua v-model
    };
  },

  // computed: giá trị tự tính lại khi dữ liệu phụ thuộc thay đổi
  computed: {
    // Tổng số lượng sản phẩm trong giỏ -> hiển thị ở header ({{ cartCount }})
    cartCount() {
      return this.cart.reduce((tong, sp) => tong + sp.soLuong, 0);
    },
    // Tổng tiền giỏ hàng
    tongTien() {
      return this.cart.reduce((tong, sp) => tong + sp.gia * sp.soLuong, 0);
    },
    // Danh sách sản phẩm đã lọc theo từ khoá (không phân biệt hoa thường)
    danhSachLoc() {
      const k = this.tuKhoa.trim().toLowerCase();
      return this.products.filter(sp => sp.ten.toLowerCase().includes(k));
    }
  },

  methods: {
    // Thêm sản phẩm vào giỏ: nếu đã có thì tăng số lượng, chưa có thì push mới.
    // Nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector + cập nhật
    // DOM thủ công - Vue tự động làm điều này nhờ reactivity.
    themVaoGio(sanPham) {
      const daCo = this.cart.find(sp => sp.id === sanPham.id);
      if (daCo) { daCo.soLuong++; }
      else { this.cart.push({ ...sanPham, soLuong: 1 }); }
    },
    // Xoá sản phẩm khỏi giỏ theo vị trí index (UI cập nhật tự động)
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },
    // Nếu ảnh .jpg chưa có thì tự dùng ảnh .svg tạm cùng tên
    anhLoi(event) {
      const img = event.target;
      if (!img.dataset.fallback) {
        img.dataset.fallback = '1';
        img.src = img.src.replace(/\.jpg$/, '.svg');
      }
    },
    // Định dạng tiền Việt
    dinhDangTien(so) {
      return so.toLocaleString('vi-VN') + ' VND';
    }
  }
});

app.mount('#app');
