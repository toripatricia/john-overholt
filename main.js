/*scroll animations*/

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.2 }); // Adjust the threshold for when the animation triggers

    reveals.forEach(reveal => observer.observe(reveal));
});
