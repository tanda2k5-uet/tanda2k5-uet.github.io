(function () {
  const cfg = window.HIENLAB_CONFIG || {};

  // 1. Hydrate brand configuration across DOM & JSON-LD
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (cfg[key]) el.textContent = cfg[key];
  });

  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const key = el.getAttribute("data-config-href");
    if (!cfg[key]) {
      if (key === "githubUrl") el.hidden = true;
      return;
    }
    el.setAttribute("href", key === "email" ? `mailto:${cfg[key]}` : cfg[key]);
  });

  const zaloBtn = document.getElementById("zalo-direct-btn");
  if (zaloBtn && cfg.zaloUrl) {
    zaloBtn.setAttribute("href", cfg.zaloUrl);
  }

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const ldScript = document.getElementById("ld-json-org");
  if (ldScript && cfg.brandName && cfg.domain) {
    try {
      const ld = JSON.parse(ldScript.textContent);
      ld.name = cfg.brandName;
      ld.url = `https://${cfg.domain}`;
      if (cfg.email) ld.email = cfg.email;
      ldScript.textContent = JSON.stringify(ld, null, 2);
    } catch (_) {
      // Keep fallback JSON-LD
    }
  }

  // 2. Mobile menu toggle
  const menuBtn = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.hidden = expanded;
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  // 3. Interactive PCB Hardware Inspector
  const pcbDetails = {
    mcu: {
      title: "Khối Vi điều khiển & Firmware",
      tag: "C / C++ • FreeRTOS",
      desc: "Lập trình STM32, ESP32, ATmega16/328, Arduino chuẩn cấu trúc module, xử lý ngắt thời gian thực, giao tiếp UART/SPI/I2C/CAN và tối ưu chống nhiễu.",
      deliverables: ["Source code chú thích rõ", "File mô phỏng Proteus", "Hướng dẫn nạp & debug"]
    },
    pcb: {
      title: "Khối Nguồn & Thiết kế mạch PCB",
      tag: "KiCad • Altium • 2–4 Layer",
      desc: "Thiết kế mạch nguồn hạ áp ổn định (24V/12V xuống 5V/3.3V), bảo vệ ngược cực, lọc nhiễu và layout PCB tối ưu đường nguồn — sẵn sàng gửi gia công JLCPCB/PCBWay.",
      deliverables: ["File Gerber & Drill", "Danh sách BOM + CPL", "Kiểm tra sạch ERC/DRC"]
    },
    plc: {
      title: "Khối PLC & Truyền thông Công nghiệp",
      tag: "Siemens S7 • Mitsubishi FX",
      desc: "Viết chương trình Ladder / Structured Text, gán I/O rõ ràng, truyền thông Modbus RTU/RS485 và thiết kế màn hình HMI giám sát trạng thái hệ thống.",
      deliverables: ["Project TIA / GX Works", "Bảng gán địa chỉ I/O", "Sơ đồ đấu nối tủ điện"]
    },
    mech: {
      title: "Khối Cảm biến & Đo lường",
      tag: "Encoder • ADC • Sensor",
      desc: "Tích hợp cảm biến nhiệt độ, khoảng cách, dòng điện, encoder phản hồi vị trí/tốc độ; lọc tín hiệu số giúp hệ thống đo chính xác trong môi trường có nhiễu.",
      deliverables: ["Mạch phối hợp tín hiệu", "Thuật toán lọc & hiệu chuẩn", "Kiểm thử đáp ứng thực"]
    },
    driver: {
      title: "Khối Công suất & Cơ cấu chấp hành",
      tag: "PWM • Stepper • Servo",
      desc: "Điều khiển động cơ DC, động cơ bước, servo, relay/MOSFET cách ly quang bảo vệ vi điều khiển, phù hợp cánh tay robot, băng tải và thiết bị tự động.",
      deliverables: ["Mạch cách ly & công suất", "Điều khiển PID / PWM", "File CAD in 3D giá đỡ"]
    }
  };

  const pcbNodes = document.querySelectorAll(".pcb-node");
  const inspTitle = document.getElementById("inspector-title");
  const inspTag = document.getElementById("inspector-tag");
  const inspDesc = document.getElementById("inspector-desc");
  const inspDeliv = document.getElementById("inspector-deliverables");

  function selectPcbNode(key) {
    const info = pcbDetails[key];
    if (!info) return;
    pcbNodes.forEach((n) => n.classList.toggle("is-active", n.dataset.node === key));
    if (inspTitle) inspTitle.textContent = info.title;
    if (inspTag) inspTag.textContent = info.tag;
    if (inspDesc) inspDesc.textContent = info.desc;
    if (inspDeliv) {
      inspDeliv.innerHTML = info.deliverables.map((item) => `<span>${item}</span>`).join("");
    }
  }

  pcbNodes.forEach((node) => {
    node.addEventListener("click", () => selectPcbNode(node.dataset.node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectPcbNode(node.dataset.node);
      }
    });
  });

  // 4. Project category filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
      projectItems.forEach((item) => {
        item.hidden = target !== "all" && item.dataset.category !== target;
      });
    });
  });

  // 5. Technical Scope Brief Builder
  const scopeCheckboxes = document.querySelectorAll('input[name="scope"]');
  const timelineSelect = document.getElementById("timeline-select");
  const briefOutput = document.getElementById("brief-output");
  const copyBtn = document.getElementById("copy-brief-btn");

  function buildBriefText() {
    const selected = Array.from(scopeCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => `- ${cb.value}`);
    const timeline = timelineSelect ? timelineSelect.value : "Linh hoạt";
    const scopeBlock = selected.length ? selected.join("\n") : "- (Chưa chọn hạng mục — cần tư vấn thêm)";
    return `[YÊU CẦU KỸ THUẬT - ${cfg.brandName || "HienLab"}]\nHạng mục:\n${scopeBlock}\nThời gian dự kiến: ${timeline}`;
  }

  function updateBrief() {
    if (briefOutput) briefOutput.textContent = buildBriefText();
  }

  scopeCheckboxes.forEach((cb) => cb.addEventListener("change", updateBrief));
  if (timelineSelect) timelineSelect.addEventListener("change", updateBrief);
  updateBrief();

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(buildBriefText());
        const prev = copyBtn.textContent;
        copyBtn.textContent = "Đã sao chép!";
        setTimeout(() => {
          copyBtn.textContent = prev;
        }, 1800);
      } catch (_) {
        copyBtn.textContent = "Hãy bôi đen để copy";
      }
    });
  }

  // 6. Contact Form validation + mailto composer
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("sender-name");
      const contactInput = document.getElementById("sender-contact");
      const detailInput = document.getElementById("sender-detail");
      const errName = document.getElementById("err-name");
      const errContact = document.getElementById("err-contact");
      const errDetail = document.getElementById("err-detail");

      let valid = true;
      errName.textContent = "";
      errContact.textContent = "";
      errDetail.textContent = "";

      if (!nameInput.value.trim()) {
        errName.textContent = "Vui lòng nhập họ tên hoặc đơn vị của bạn.";
        valid = false;
      }
      if (!contactInput.value.trim()) {
        errContact.textContent = "Vui lòng nhập Email hoặc số Zalo để mình phản hồi.";
        valid = false;
      }
      if (detailInput.value.trim().length < 10) {
        errDetail.textContent = "Vui lòng mô tả ngắn gọn yêu cầu (ít nhất 10 ký tự).";
        valid = false;
      }

      if (!valid) {
        feedback.textContent = "";
        return;
      }

      const subject = encodeURIComponent(`[${cfg.brandName || "HienLab"}] Yêu cầu kỹ thuật từ ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `${buildBriefText()}\n\nNgười gửi: ${nameInput.value.trim()}\nLiên hệ: ${contactInput.value.trim()}\n\nChi tiết bài toán:\n${detailInput.value.trim()}`
      );
      const targetEmail = cfg.email || "ph12340965@gmail.com";

      feedback.textContent = "Đang mở ứng dụng Email với đầy đủ nội dung yêu cầu của bạn...";
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    });
  }
})();
