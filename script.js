document.getElementById("job-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("job-title").value;
    let company = document.getElementById("job-company").value;
    let location = document.getElementById("job-location").value;
    let description = document.getElementById("job-description").value;

    let jobList = document.querySelector(".job-listings ul");

    let newJob = document.createElement("li");
    newJob.classList.add("job"); // Add class for search filtering
    newJob.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
        <a href="#">Apply Now</a>
    `;

    jobList.appendChild(newJob);

    // Animate the new job listing
    newJob.style.opacity = 0;
    newJob.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newJob.style.opacity = 1;
        newJob.style.transform = 'translateY(0)';
        newJob.style.transition = 'opacity 0.5s, transform 0.5s';
    }, 10);

    document.getElementById("job-form").reset();
});

function showContent(page) {
    let content = document.getElementById("content");

    let pages = {
        home: `<h2>Welcome to JobConnect </h2><p>Find the best job opportunities here.</p>`,
        jobs: `<h2>Latest Job Listings</h2><p>Discover new job openings in various industries.</p>`,
        companies: `<h2>Top Hiring Companies</h2><p>Explore companies looking for talented professionals.</p>`,
        about: `<h2>About Us</h2><p>We are dedicated to connecting job seekers with the best opportunities.</p>`,
        contact: `<h2>Contact Us</h2><p>Email: support@jobportal.com | Phone: 123-456-7890</p>`
    };

    content.innerHTML = pages[page] || `<h2>Page Not Found</h2>`;
    content.style.opacity = 0;
    setTimeout(() => {
        content.style.opacity = 1;
        content.style.transition = 'opacity 0.5s';
    }, 10);
}

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let keyword = document.getElementById("keywords").value.toLowerCase();
    let location = document.getElementById("location").value.toLowerCase();
    let company = document.getElementById("company").value.toLowerCase();

    let jobs = document.querySelectorAll(".job-listings ul li");
    let found = false;

    jobs.forEach(job => {
        let jobTitle = job.querySelector("h3").innerText.toLowerCase();
        let jobCompany = job.querySelector("p:nth-child(2)").innerText.toLowerCase();
        let jobLocation = job.querySelector("p:nth-child(3)").innerText.toLowerCase();

        if ((keyword === "" || jobTitle.includes(keyword)) &&
            (location === "" || jobLocation.includes(location)) &&
            (company === "" || jobCompany.includes(company))) {
            job.style.display = "block";

            if (!found) {
                job.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to first matching job
                found = true;
            }
        } else {
            job.style.display = "none";
        }
    });

    if (!found) {
        alert("No jobs found for your search. Try different keywords or location.");
    }
});