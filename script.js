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

function cleanUsername(value) {
    return value
        .trim()
        .replace(/^@+/, "")
        .replace(/\s+/g, "");
}

generateBtn.addEventListener("click", () => {
    const username = cleanUsername(usernameInput.value);

    if (!username) {
        message.textContent = "⚠️ Vui lòng nhập username.";
        result.classList.add("hidden");
        return;
    }

    const reason = reasonSelect.value;

    const profileUrl =
        `https://www.tiktok.com/@${encodeURIComponent(username)}`;

    displayUsername.textContent = `@${username}`;

    profileLink.href = profileUrl;

    const report = 
`Xin chào TikTok,

Tôi muốn báo cáo tài khoản @${username} vì có dấu hiệu: ${reason}.

Trang tài khoản:
${profileUrl}

Tôi đề nghị TikTok kiểm tra tài khoản và nội dung liên quan theo quy định của nền tảng.

Tôi cung cấp thông tin này để TikTok xem xét và xác minh.`;

    reportText.value = report;

    openTikTok.href = profileUrl;

    result.classList.remove("hidden");
    message.textContent = "✅ Đã tạo nội dung báo cáo.";
});

copyBtn.addEventListener("click", async () => {
    if (!reportText.value) return;

    try {
        await navigator.clipboard.writeText(reportText.value);

        copyBtn.textContent = "✅ Đã sao chép";

        setTimeout(() => {
            copyBtn.textContent = "📋 Sao chép nội dung";
        }, 1800);

    } catch (error) {
        reportText.select();
        document.execCommand("copy");

        copyBtn.textContent = "✅ Đã sao chép";

        setTimeout(() => {
            copyBtn.textContent = "📋 Sao chép nội dung";
        }, 1800);
    }
});

usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        generateBtn.click();
    }
});
