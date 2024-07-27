function $(sel, elem = document) { return elem.querySelector(sel) }
function $$(sel, elem = document) { return elem.querySelectorAll(sel) }

function expand(open) {
    const dts = $$('details')
    for (let i = 0; i < dts.length; i++) dts[i].open = open
}

$('#btn-expand').addEventListener("click", () => expand(true));
$('#btn-collapse').addEventListener("click", () => expand(false));
