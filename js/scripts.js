$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});
// Register
const msgregister = document.querySelector(".msgregister");
const nameregister = document.querySelector(".nameforregister");
const emailregister = document.querySelector(".emailforregister");
const passregister = document.querySelector(".passforregister");
const registerbtn = document.querySelector(".registerbtn");
const emailforregisterMSG = document.querySelector(".emailforregistersgm");
const passforregisterMSG = document.querySelector(".passforregistermsg");
registerbtn.addEventListener("click", event => {
    event.preventDefault();
    const nameregisterValue = nameregister.value;
    const emailregisterValue = emailregister.value;
    const passregisterValue = passregister.value;
    emailforregisterMSG.innerHTML = "";
    passforregisterMSG.innerHTML = "";
    let sendregister = true;
    if (emailregisterValue.indexOf("@") === -1 || emailregisterValue.indexOf(".") === -1) {
        emailforregisterMSG.innerHTML = "لطفا ایمیل معتبر وارد کنید";
        sendregister = false;
    }
    if (passregisterValue.length === 0) {
        passforregisterMSG.innerHTML = "رمز عبور وارد کنید";
        sendregister = false;
    } else if (passregisterValue.length < 5) {
        passforregisterMSG.innerHTML = "رمز عبور طولانی تر از وارد کنید";
        sendregister = false;
    }
    if (sendregister) {
        fetch('https://loginapp-a93aa-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: nameregister.value,
                email: emailregister.value,
                pass: passregister.value
            })
        })
            .then(res => {
                msgregister.style.color = "green";
                msgregister.innerHTML = `ثبت نام شما انجام شد لطفا ورود کنید`;
                setInterval(() => {
                    msgregister.innerHTML = "";
                }, 6000);
                nameregister.value = "";
                emailregister.value = "";
                passregister.value = "";
            })
            .catch(err => console.log(err));
    }
});
// Login
const emailforlogin = document.querySelector(".emailforlogin");
const passforlogin = document.querySelector(".passforlogin");
const loginBtn = document.querySelector(".login-btn");
const LoginMsg = document.querySelector(".msg-login");
const emailvalue = emailforlogin.value;
const passvalue = passforlogin.value;
const passmsg = document.querySelector(".passmsg");
const emailmsg = document.querySelector(".emailmsg");
const loginfalse = document.querySelector(".loginfalse");
let sendlogin = true;
loginBtn.addEventListener("click", event => {
    event.preventDefault();
    LoginMsg.innerHTML = "";
    loginfalse.innerText = "";
    fetch('https://loginapp-a93aa-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
        .then((response) => response.json())
        .then((getdata) => {
            const data = Object.entries(getdata);
            data.forEach(item => {
                item.forEach(item => {
                    if (emailforlogin.value === item.email && passforlogin.value === item.pass) {
                        emailforlogin.value = "";
                        loginfalse.innerText = "";
                        passforlogin.value = "";
                        LoginMsg.style.color = "green";
                        LoginMsg.innerHTML = "ورود موفق ! در حال انتقال به پنل";
                        setInterval(() => {
                            window.location.href = "/panel";
                        }, 2000);
                    }
                });
            })
        });
});

