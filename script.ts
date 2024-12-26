const form = document .getElementById('resumeForm')as HTMLFormElement;
const resumeOutputElement = document .getElementById ('resumeOutput')as HTMLDivElement;
const shareableLinkConatiner =document .getElementById('shareable-link-container')as HTMLDivElement;
const shareableLinkElement =document .getElementById('shareable-link')as HTMLAnchorElement;
const downloadPdfButton =document .getElementById('download-pdf')as HTMLButtonElement;



form.addEventListener('submit', (event:Event)=>{
    event.preventDefault();


    const username =(document .getElementById('username')as HTMLInputElement).value
    const email =(document .getElementById('email')as HTMLInputElement).value
    const phone =(document .getElementById('phone')as HTMLInputElement).value
    const education =(document .getElementById('education')as HTMLTextAreaElement).value
    const experience =(document .getElementById('experience')as HTMLTextAreaElement).value
    const skills =(document .getElementById('skills')as HTMLTextAreaElement).value

    const resumeData={
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username,JSON.stringify(resumeData));


    const resumeHTML =`
    <h2><b> Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>
    
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    
     <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    
     <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>`;

    resumeOutputElement.innerHTML = resumeHTML;
    const shareableURL= `
    ${window.location.origin}?username=${encodeURIComponent(username)}`;

    shareableLinkConatiner.style.display ='block';
    shareableLinkElement.href=shareableURL;
    shareableLinkElement.textContent =shareableURL;
});
downloadPdfButton.addEventListener('click',()=>{
    window.print();
});
window.addEventListener('DOMContentLoaded',()=>{
    const urlParams= new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if(username){
        const saveResumeData = localStorage.getItem(username);
        if(saveResumeData){
            const resumeData =JSON.parse(saveResumeData);
            (document.getElementById('username')as HTMLInputElement).value=username;
            (document.getElementById('name')as HTMLInputElement).value=resumeData.name;
            (document.getElementById('email')as HTMLInputElement).value=resumeData.email;
            (document.getElementById('phone')as HTMLInputElement).value=resumeData.phone;
            (document.getElementById('education')as HTMLTextAreaElement).value=resumeData.education;
            (document.getElementById('experience')as HTMLTextAreaElement).value=resumeData.experience;
            (document.getElementById('skills')as HTMLTextAreaElement).value=resumeData.skills;
        }
    }
});

