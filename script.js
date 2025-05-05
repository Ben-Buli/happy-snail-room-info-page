function showPanel(link) {
  const panel = document.getElementById("infoPanel");
  const iframe = document.getElementById("panelIframe");
  iframe.src = link;
  panel.classList.add("show");
}

function hidePanel() {
  const panel = document.getElementById("infoPanel");
  const iframe = document.getElementById("panelIframe");
  panel.classList.remove("show");
  iframe.src = "";
}

const titleText = document.getElementById("titleText");
const container1 = document.getElementById("cardContainer1");
const container2 = document.getElementById("cardContainer2");
const tabHost1 = document.getElementById("tabHost1");
const tabHost2 = document.getElementById("tabHost2");

function renderHost(container, data) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-xl-3 card-animate";
    col.style.animationDelay = `${index * 100}ms`;

    col.innerHTML = `
      <div class="host_card" data-link="${item.link}" data-bg="${item.imgurl}">
        <div class="bg_zoom"></div>
        <a class="caption-btn">${item.btnText}</a>
      </div>
    `;
    container.appendChild(col);
  });

  // 設定背景圖與點擊事件
  container.querySelectorAll(".host_card").forEach((card) => {
    const bg = card.dataset.bg;
    const link = card.dataset.link;
    const bgZoom = card.querySelector(".bg_zoom");

    if (bgZoom) {
      bgZoom.style.backgroundImage = `url('${bg}')`;
      bgZoom.style.backgroundSize = "cover";
      bgZoom.style.backgroundPosition = "center";
      bgZoom.style.width = "100%";
      bgZoom.style.height = "100%";
      bgZoom.style.position = "absolute";
      bgZoom.style.top = "0";
      bgZoom.style.left = "0";
      bgZoom.style.transition = "transform 0.4s ease";
    }

    card.addEventListener("mouseover", () => {
      if (bgZoom) bgZoom.style.transform = "scale(1.2)";
    });
    card.addEventListener("mouseout", () => {
      if (bgZoom) bgZoom.style.transform = "scale(1)";
    });

    card.addEventListener("click", () => {
      if (link && link !== "undefined") {
        window.open(link, "_blank");
      } else {
        showToast("⚠️ 此房型尚未設置連結", true);
      }
    });
  });
}

// 顯示提示訊息
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "80px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = isError ? "#dc3545" : "#28a745";
  toast.style.color = "white";
  toast.style.padding = "8px 16px";
  toast.style.borderRadius = "6px";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 載入資料
fetch("data.json")
  .then((res) => {
    if (!res.ok) throw new Error("無法讀取 data.json");
    return res.json();
  })
  .then((data) => {
    renderHost(container1, data.host1);
    renderHost(container2, data.host2);
    console.log("資料載入成功 ✅");
  })
  .catch((err) => {
    console.error("讀取資料錯誤：", err);
    showToast("資料載入失敗 ❌", true);
  });

// tab 切換控制
tabHost1.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost1.classList.add("active");
  tabHost2.classList.remove("active");

  container2.classList.remove("fade-in");
  container2.classList.add("fade-out");
  titleText.innerText = "一館房型";

  setTimeout(() => {
    container2.style.display = "none";
    container1.style.display = "flex";
    container1.classList.remove("fade-out");
    container1.classList.add("fade-in");
  }, 300);
});

tabHost2.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost2.classList.add("active");
  tabHost1.classList.remove("active");

  container1.classList.remove("fade-in");
  container1.classList.add("fade-out");
  titleText.innerText = "二館房型";

  setTimeout(() => {
    container1.style.display = "none";
    container2.style.display = "flex";
    container2.classList.remove("fade-out");
    container2.classList.add("fade-in");
  }, 300);
});
