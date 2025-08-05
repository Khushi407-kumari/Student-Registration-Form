// JavaScript 
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Prevent form submission by default
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('fullNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';

    let isValid = true;

    // Validate Full Name (must not be empty)
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName === '') {
        document.getElementById('fullNameError').textContent = 'Please enter your Full Name .';
        isValid = false;
    }


    // Gender Validation
        const GenderError = document.getElementById("GenderError");
        // const genderSelected = document.querySelector('input[name="gender"]:checked');

        if (!Gender) {
            GenderError.radioContent = "Please select a GEnder.";
            isValid = false ;
        } else {
            GenderError.radioContent = "";
        }

    // Validate Email (must not be empty and must be valid format)
    const email = document.getElementById('email');
    if (email.value.trim() === '') {
        document.getElementById('emailError').textContent = 'Please enter your Email .';
        isValid = false;
    } else if (!email.validity.valid) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Phone (must not be empty)
    const phone = document.getElementById('phone').value.trim();
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Please enter your Phone number.';
        isValid = false;
    }

    // If all fields are valid, submit the form or show success

    if (isValid) {
        const student = {
            fullName,
            email: email.value.trim(),
            phone
        };

        fetch('http//localhost:3306/student_db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        })
            .then(res => res.text())
            .then(msg => alert("Form submitted successfully!"))
            .catch(err => alert('Error: ' + err.message));
    }
});