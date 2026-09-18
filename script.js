const usernameInput = document.getElementById("username");
const reasonSelect = document.getElementById("reason");
const generateBtn = document.getElementById("generateBtn");

const result = document.getElementById("result");
const displayUsername = document.getElementById("displayUsername");
const profileLink = document.getElementById("profileLink");
const reportText = document.getElementById("reportText");

const copyBtn = document.getElementById("copyBtn");
const openTikTok = document.getElementById("openTikTok");
const message = document.getElementById("message");

let cooldown = false;
let remaining = 0;

function cleanUsername(value) {
    return value
        .trim()
        .replace(/^@+/, "")
        .replace(/\s+/g, "");
}

function createReport(username, reason, version) {
    const profileUrl =
        `https://www.tiktok.com/@${encodeURIComponent(username)}`;

    const templates = [
        `Tôi muốn báo cáo tài khoản @${username} vì có dấu hiệu ${reason}.

Trang tài khoản:
${profileUrl}

Vui lòng kiểm tra nội dung và hoạt động của tài khoản theo quy định TikTok.`,

        `Tài khoản @${username} có dấu hiệu ${reason}.

Tài khoản:
${profileUrl}

Tôi đề nghị TikTok kiểm tra và xác minh trường hợp này.`,

        `Tôi nhận thấy tài khoản @${username} có hoạt động đáng ngờ liên quan đến ${reason}.

Link:
${profileUrl}

Vui lòng xem xét trường hợp này.`,

        `Báo cáo tài khoản @${username}.

Lý do:
${reason}

Hồ sơ:
${profileUrl}

Mong TikTok kiểm tra dựa trên bằng chứng và quy định hiện hành.`,

        `Tôi gửi thông tin để TikTok kiểm tra tài khoản @${username} về vấn đề ${reason}.

Hồ sơ:
${profileUrl}

Tôi cung cấp thông tin này để TikTok xác minh và xử lý nếu có vi phạm.`
    ];

    return templates[version];
}

function startCooldown() {
    cooldown = true;
    remaining = 15;

    generateBtn.disabled = true;

    const timer = setInterval(() => {
        remaining--;

        if (remaining <= 0) {
            clearInterval(timer);
            cooldown = false;
            generateBtn.disabled = false;
            generateBtn.textContent = "Tạo báo cáo";
            message.textContent = "✅ Có thể tạo báo cáo tiếp.";
        } else {
            generateBtn.textContent = `⏳ Chờ ${remaining}s`;
        }
    }, 1000);
}

generateBtn.addEventListener("click", () => {
    if (cooldown) return;

    const username = cleanUsername(usernameInput.value);

    if (!username) {
        message.textContent = "⚠️ Vui lòng nhập username.";
        return;
    }

    const reason = reasonSelect.value;
    const profileUrl =
        `https://www.tiktok.com/@${encodeURIComponent(username)}`;

    displayUsername.textContent = `@${username}`;
    profileLink.href = profileUrl;
    openTikTok.href = profileUrl;

    // Tạo 5 mẫu để người dùng lựa chọn,
    // không tự động gửi 5 báo cáo.
    reportText.value =
        "MẪU 1\n\n" + createReport(username, reason, 0) +
        "\n\n-------------------------\n\n" +
        "MẪU 2\n\n" + createReport(username, reason, 1) +
        "\n\n-------------------------\n\n" +
        "MẪU 3\n\n" + createReport(username, reason, 2) +
        "\n\n-------------------------\n\n" +
        "MẪU 4\n\n" + createReport(username, reason, 3) +
        "\n\n-------------------------\n\n" +
        "MẪU 5\n\n" + createReport(username, reason, 4);

    result.classList.remove("hidden");
    message.textContent =
        "✅ Đã tạo 5 mẫu. Hãy chọn mẫu phù hợp để gửi thủ công.";

    startCooldown();
});

copyBtn.addEventListener("click", async () => {
    if (!reportText.value) return;

    try {
        await navigator.clipboard.writeText(reportText.value);
        copyBtn.textContent = "✅ Đã sao chép";

        setTimeout(() => {
            copyBtn.textContent = "📋 Sao chép nội dung";
        }, 1800);
    } catch {
        reportText.select();
        document.execCommand("copy");
    }
});

usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !cooldown) {
        generateBtn.click();
    }
});
