window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;

        // TODO: Implement delete Module by Code
        fetch(`/modules/${code}`, { method: 'delete' })
        .then((response) => response.json())
        .then((res) => {
            alert("Module has been deleted!")
        })
        .catch((e) => {
            alert(`Module has not been deleted! Reason :${e}`)
        });
    };
});
