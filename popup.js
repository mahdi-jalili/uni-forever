const yourUniversityDomain = "https://examole.ac.ir/";

const button = document.getElementById("button");
const message = document.getElementById("message");

function getCookie(callback) {
    chrome.cookies.get({ url: yourUniversityDomain, name: "MoodleSession" }, function (cookie) {
        if (callback) {
            callback(cookie);
        }
    });
}

function setCookie(details, callback) {
    chrome.cookies.set(details, function (cookie) {
        if (callback) {
            callback(cookie);
        }
    });
}

button.addEventListener("click", function () {
    try {
        getCookie(function (cookie) {
            var newCookie = {
                url: yourUniversityDomain,
                name: cookie.name,
                value: cookie.value,
                path: cookie.path,
                secure: cookie.secure,
                sameSite: cookie.sameSite,
                expirationDate: 3376684800, // until 2077 :)
            };

            setCookie(newCookie, function (cookie) {
                setMessage("با موفقیت انجام شد. شما تا سال ۲۰۷۷ لاگین خواهید ماند 🤗");
            });
        });
    } catch (err) {
        setMessage("خطایی رخ داده است. لطفا پس از بررسی دسترسی های افزونه دوباره تلاش کنید 😥");
    }
});

function setMessage(str) {
    message.textContent = str;
    message.hidden = false;
}

function clearMessage() {
    message.hidden = true;
    message.textContent = "";
}
