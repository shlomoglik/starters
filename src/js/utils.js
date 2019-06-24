//FORM sumbiting handler
function getFormValues(form) {
    let data = {};
    let elements = form.elements;
    for (let i in elements) {
        let el = elements[i]
        if (el.name && el.value) {
            data[el.name] = el.value || ""
        }
    }
    if (data == {}) return null;
    return data;
}


//DOM travarse
function closestByClass(el, cls) {
    while (!el.classList.contains(cls)) {
        el = el.parentNode;
        if (!el) {
            return null;
        }
    }
    return el;
}



module.exports =
    {
        getFormValues,
        closestByClass
    }