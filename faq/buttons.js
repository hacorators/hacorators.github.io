function $(sel, elem = document) { return elem.querySelector(sel) }
function $$(sel, elem = document) { return elem.querySelectorAll(sel) }

function expandAll(open) {
    $$('details').forEach(d => d.open = open)
}

$('#btn-expand').addEventListener("click", () => expandAll(true));
$('#btn-collapse').addEventListener("click", () => expandAll(false));
