fetch(`/api/jobs/${jobId}/`)
.then(response => response.json())
.then(job => {

    document.getElementById('job-title').textContent = job.title;
    document.getElementById('company-name').innerHTML = `<strong>Company:</strong> ${job.company}`;
    document.getElementById('location').innerHTML = `<strong>Location:</strong> ${job.location}`;
    document.getElementById('schedule').innerHTML = `<strong>Schedule:</strong> ${job.schedule}`;

    if(document.getElementById('job-desc')) document.getElementById('job-desc').innerHTML = `<strong>Description:</strong> ${job.description}`;
    if(document.getElementById('job-salary')) document.getElementById('job-salary').innerHTML = `<strong>Salary:</strong> ${job.salary}`;
    if(document.getElementById('job-exp')) document.getElementById('job-exp').innerHTML = `<strong>Experience:</strong> ${job.experience}`;
    if(document.getElementById('job-gender')) document.getElementById('job-gender').innerHTML = `<strong>Gender:</strong> ${job.gender}`;
    if(document.getElementById('job-edu')) document.getElementById('job-edu').innerHTML = `<strong>Education:</strong> ${job.education}`;
    if(document.getElementById('tech-skills')) document.getElementById('tech-skills').innerHTML = `<strong>Tech Skills:</strong> ${job.techSkills}`;
    if(document.getElementById('soft-skills')) document.getElementById('soft-skills').innerHTML = `<strong>Soft Skills:</strong> ${job.softSkills}`;
    if(document.getElementById('company-industry')) document.getElementById('company-industry').innerHTML = `<strong>Industry:</strong> ${job.industry}`;

    if(document.getElementById('company-size')) document.getElementById('company-size').innerHTML = `<strong>Company Size:</strong> ${job.companySize}`;
    if(document.getElementById('job-id')) document.getElementById('job-id').innerHTML = `<strong>Job ID:</strong> ${job.id}`;
    if(document.getElementById('job-type')) document.getElementById('job-type').innerHTML = `<strong>Job Type:</strong> ${job.type}`;
    if(document.getElementById('job-category')) document.getElementById('job-category').innerHTML = `<strong>Job Category:</strong> ${job.category}`;
    if(document.getElementById('company-location')) document.getElementById('company-location').innerHTML = `<strong>Company Location:</strong> ${job.companyLocation}`;
    // fill benefits list
    const benefitsList = document.getElementById('benefits-list');
    if (benefitsList && job.benefits) { // Check if benefits exist before trying to split and display them
        benefitsList.innerHTML = job.benefits.split(',').map(b => `<li><strong>${b.trim()}</strong></li>`).join('');
        // it first splits the benefits string into an array using the comma as a separator, then maps each benefit to an HTML list item with strong tags for emphasis, and finally joins all the list items into a single string to set as the innerHTML of the benefitsList element.
    }
    fetch(`/api/jobs/?category=${job.category}`).then(response => response.json()) //it is fetched inside the first fetch's then block to ensure that we have the job's category available before trying to fetch similar jobs based on that category
     .then(allJobsData => {
         const similarJobsList = document.querySelector('#similar-jobs-list');
         const jobs= allJobsData.filter(j => j.category === job.category && j.id != job.id).slice(0, 3);
         if (similarJobsList) {
             similarJobsList.innerHTML = "";
             jobs.forEach(job => {
                 const li = document.createElement('li');
                 li.innerHTML = `<a href="/job-details/${job.id}/">${job.title} at ${job.company}</a>`;
                 similarJobsList.appendChild(li);
             });
         }
     })
     .catch(error => console.error('Error fetching similar jobs:', error));
  }
  ).catch(error => console.error('Error fetching job details:', error));

let applyBtn = document.getElementById('apply-btn');
let applyForm = document.querySelector('.apply-form');

applyBtn.addEventListener('click', function() {
  if (applyForm.style.display === 'none' || applyForm.style.display === '') {
    applyForm.style.display = 'block';
  } else {
    applyForm.style.display = 'none';
  }
});

let nameInput = document.querySelector('input[name="name"]');
let emailInput = document.querySelector('input[name="email"]');
let resumeInput = document.querySelector('input[name="resume"]');
let phoneInput = document.querySelector('input[name="phone"]');
 document.getElementById("application-form").onsubmit= function(e) {
  let namevalid = false;
  let emailvalid = false;
  let phonevalid = false;
  let resumevalid = false;
  e.preventDefault(); // Prevent form submission to validate first
  if (nameInput.value !="" && nameInput.value.length < 100){
    namevalid = true;
  }
  if (emailInput.value != "" && emailInput.value.includes('@') && emailInput.value.includes('.')){
    emailvalid = true;
  }
  if (phoneInput.value != "" && phoneInput.value.length===11 && phoneInput.value.startsWith('0')){
    phonevalid = true;
  }
  if (resumeInput.value != ""){
    resumevalid = true;
  }

  if(namevalid ===false || emailvalid === false || resumevalid === false || phonevalid === false){
    e.preventDefault();
    alert("Please fill all fields correctly!");
  }
  if(namevalid && emailvalid && resumevalid && phonevalid){

    const statuses = ["Under Review", "Accepted", "Rejected"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      let application = {
        jobId: idFromUrl,
        title: currentJob ? currentJob.title : "Untitled Job",
        company: currentJob ? currentJob.company : "Unknown Company",
        location: currentJob ? currentJob.location : "Not Specified",
        schedule: currentJob ? currentJob.schedule : "Full-time", 
        date: new Date().toLocaleDateString(), 
        status: randomStatus, 
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
      }
        
    let applications = JSON.parse(localStorage.getItem('applications')) || []; // Get existing applications from localStorage or initialize an empty array
    applications.push(application); // Add the new application to the array
    localStorage.setItem('applications', JSON.stringify(applications)); // Save the updated applications array back to localStorage
      window.location.href = "../pages/applied-jobs.html";
      console.log("redirecting to applied jobs page...");
      console.log(applications);
  }
  else{
    e.preventDefault(); // Prevent form submission if validation fails
  }
}

let shareBtn = document.querySelector('.share-btn');
shareBtn.addEventListener('click', async  function() {
  try{
    await navigator.clipboard.writeText(window.location.href);
    alert("Job details page URL copied to clipboard!");
  }
  catch(e){
    alert("Failed to copy URL: " + e);
  }});