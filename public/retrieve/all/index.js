window.addEventListener('DOMContentLoaded', function () {
    // TODO: Fetch all modules in the database from the Backend
    // TODO: Add each row returned onto the HTML table using the addToTable function found in ../helper.js
    fetch('/modules/retrieve/all', { method: 'get' })
        .then((response) => response.json())
        .then((res) => {
            const length = res.length
            for  (i = 0 ; i < length ; i++) {
                addToTable(res[i].code, res[i].name, res[i].credit)
            }
        })
        .catch((e) => {
            alert(e)
        });

});
