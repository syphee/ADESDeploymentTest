// TODO Implement GPA Calculation
/**
 * Given N modules
 *      the ith module have a credit of credits[i] and grade of grades[i]
 *
 * GPA = (sum of all (credits[i] * grades[i])) / (sum of all credits[i])
 * */
function calculateGpa(credits, grades, numberOfModules) {
    if (numberOfModules === 0) return 0;

    let totalCredits = 0
    let totalGrades = 0;

    credits.forEach(element => {
        totalCredits += element
    });

    grades.forEach(element => {
        totalGrades += element * credits[element]
    });

    console.log(`Credits : ${totalCredits} | Grades  ${totalGrades}`)


    const GPA = (totalGrades/totalCredits)

    console.log(`Calculated GPA | ${GPA}`)
    return GPA;

    // return 'Not Yet Implemented!';
}

function fetchModule(code) {
    return fetch(`/modules/${code}`).then(function (response) {
        return response.json();
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML

    // Adding module to table
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior
        const code = form.querySelector('input[name=code]').value;
        addToTable(code, '???', '???');
    };

    // Retrieving Module information
    document.querySelector('#retrieve').onclick = function () {
        const rows = document.querySelectorAll('tbody tr');

        // TODO: Use 1 query instead of row.length number of queries.
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const code = row.querySelector('td:first-child').textContent;
            const nameCell = row.querySelector('td:nth-child(2)');
            const creditCell = row.querySelector('td:nth-child(3)');

            nameCell.textContent = 'Loading...';
            creditCell.textContent = 'Loading...';
            fetchModule(code)
                .then(function (body) {
                    if (body.error) throw new Error(body.error);
                    nameCell.textContent = body.module.name;
                    creditCell.textContent = body.module.credit;
                })
                .catch(function (error) {
                    nameCell.textContent = 'XXXXXXXX';
                    creditCell.textContent = error.message;
                });
        }
    };

    // Calculating GPA
    document.querySelector('#gpa button').onclick = function () {
        const rows = document.querySelectorAll('tbody tr');
        let hasErrors = false;
        const credits = [];
        const grades = [];
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];

            // add credit /grades ontop of credit for each loop
            const credit = +row.querySelector('td:nth-child(3)').textContent;
            const grade = +row.querySelector('td:nth-child(4) select').value;
            row.classList.remove('error');
            if (Number.isNaN(credit) || Number.isNaN(grade)) {
                row.classList.add('error');
                hasErrors = true;
            } else {
                credits.push(credit);
                grades.push(grade);
            }
        }
        if (hasErrors) {
            return alert('One or more rows has error, please fix or delete them before computing');
        }
        console.log("Clicked!")
        const gpa = calculateGpa(credits, grades, credits.length);
        document.querySelector('#gpa span').textContent = gpa;
        return null;
    };
});
