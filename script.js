// PASTE YOUR NEW DEPLOYMENT URL HERE
const API_URL = "https://script.google.com/macros/s/AKfycby-iA3fM2WF7kU5Y_aw5j6V2r__xrdHxxjXK4qAZ0YeoY8NlDgg1b7AkLCXsIZoMpI7Lw/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const submitButton = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Collect data from the form
        const booking = {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            service: document.getElementById("service").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(booking), // Sending data as JSON
                headers: { "Content-Type": "application/json" }
            });

            // The CORS error is prevented by the correct Web App deployment.
            const result = await response.json();

            // NOTE: Checking for 'SUCCESS' to match the Code.gs response
            if (result.status === "SUCCESS") { 
                alert("Booking confirmed! Your details have been saved.");
                form.reset();
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            // This catch block handles genuine network issues (e.g., no internet, or a 500 error)
            alert("Network Error: Could not connect to the booking server. Please try again.");
            console.error(err);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});