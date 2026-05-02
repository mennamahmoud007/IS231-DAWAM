const params = new URLSearchParams(window.location.search);
const idFromUrl = params.get('id');
const allJobsData = JSON.parse(localStorage.getItem("jobs")) || [];
const currentJob = allJobsData.find(j => j.id == idFromUrl);

if (currentJob) {

    document.getElementById('job-title').textContent = currentJob.title;
    document.getElementById('company-name').innerHTML = `<strong>Company:</strong> ${currentJob.company}`;
    document.getElementById('location').innerHTML = `<strong>Location:</strong> ${currentJob.location}`;
    document.getElementById('schedule').innerHTML = `<strong>Schedule:</strong> ${currentJob.schedule}`;

    if(document.getElementById('job-desc')) document.getElementById('job-desc').innerHTML = `<strong>Description:</strong> ${currentJob.description}`;
    if(document.getElementById('job-salary')) document.getElementById('job-salary').innerHTML = `<strong>Salary:</strong> ${currentJob.salary}`;
    if(document.getElementById('job-exp')) document.getElementById('job-exp').innerHTML = `<strong>Experience:</strong> ${currentJob.experience}`;
    if(document.getElementById('job-gender')) document.getElementById('job-gender').innerHTML = `<strong>Gender:</strong> ${currentJob.gender}`;
    if(document.getElementById('job-edu')) document.getElementById('job-edu').innerHTML = `<strong>Education:</strong> ${currentJob.education}`;
    if(document.getElementById('tech-skills')) document.getElementById('tech-skills').innerHTML = `<strong>Tech Skills:</strong> ${currentJob.techSkills}`;
    if(document.getElementById('soft-skills')) document.getElementById('soft-skills').innerHTML = `<strong>Soft Skills:</strong> ${currentJob.softSkills}`;
    if(document.getElementById('company-industry')) document.getElementById('company-industry').innerHTML = `<strong>Industry:</strong> ${currentJob.industry}`;

    if(document.getElementById('company-size')) document.getElementById('company-size').innerHTML = `<strong>Company Size:</strong> ${currentJob.companySize}`;
    if(document.getElementById('job-id')) document.getElementById('job-id').innerHTML = `<strong>Job ID:</strong> ${currentJob.id}`;
    if(document.getElementById('job-type')) document.getElementById('job-type').innerHTML = `<strong>Job Type:</strong> ${currentJob.type}`;
    if(document.getElementById('job-category')) document.getElementById('job-category').innerHTML = `<strong>Job Category:</strong> ${currentJob.category}`;
    if(document.getElementById('company-location')) document.getElementById('company-location').innerHTML = `<strong>Company Location:</strong> ${currentJob.companyLocation}`;

    const benefitsList = document.getElementById('benefits-list');
    if (benefitsList && currentJob.benefits) {
        benefitsList.innerHTML = currentJob.benefits.split(',').map(b => `<li><strong>${b.trim()}</strong></li>`).join('');
    }

    const similarJobsList = document.querySelector('#similar-jobs-list');
    if (similarJobsList && currentJob) {
        const similarJobs = allJobsData.filter(job => 
            job.category === currentJob.category && job.id != currentJob.id
        );

        const displayList = similarJobs.length > 0 ? similarJobs : allJobsData.filter(j => j.id != currentJob.id);
        
        similarJobsList.innerHTML = ""; 
        displayList.slice(0, 3).forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="job-details.html?id=${job.id}">${job.title} at ${job.company}</a>`;
            similarJobsList.appendChild(li);
        });
    }  
}


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