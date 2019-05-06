import m from 'mithril'
function loginUser(uData) {
    const login = fetch('/loginUserApi', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify(uData)
    })
    console.log('start call to login page !!! TODO => m.route.set()');
}

module.exports = { loginUser };

