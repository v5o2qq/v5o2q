let cart = [];

// دالة لإضافة منتج إلى سلة التسوق
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price, quantity: 1 });
    }
    updateCartUI();
    updateCheckoutSummary();
}

// دالة لتحديث واجهة المستخدم لسلة التسوق
function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout-button");

    if (!cartItemsList || !totalElement) return;

    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} ر.س × ${item.quantity}`;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2) + " ر.س"; // تغيير الرمز إلى ر.س
    // إظهار أو إخفاء زر إتمام الشراء
    if (checkoutButton) {
        checkoutButton.style.display = cart.length > 0 ? "block" : "none";
    }

    // تخزين السلة في الـ localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// دالة لتحديث ملخص الدفع في صفحة الدفع
function updateCheckoutSummary() {
    const summaryList = document.getElementById("checkout-summary");
    const totalDisplay = document.getElementById("checkout-total");

    if (!summaryList || !totalDisplay) return;

    summaryList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} ر.س × ${item.quantity}`;
        summaryList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalDisplay.textContent = "الإجمالي: " + total.toFixed(2) + " ر.س"; // تغيير الرمز إلى ر.س
}

// دالة لحذف منتج من السلة
function removeFromCart(productName) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCartUI();
    updateCheckoutSummary();
}

// تحميل السلة من الـ localStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
        cart = storedCart;
        updateCartUI();
        updateCheckoutSummary();
    }
});
