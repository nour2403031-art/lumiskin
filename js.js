
 window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-container');
    const scrollPos = window.scrollY;
    const maxScroll = window.innerHeight;

    const scrollProgress = Math.min(scrollPos / maxScroll, 1);

    let newSize = 100 + (scrollProgress * 80);
    
    hero.style.backgroundSize = newSize + '%';
    
    hero.style.transition = 'none';ero.style.backgroundSize = newSize + '%';
    
    hero.style.transition = 'background-size 0.1s ease-out';
 });

 function validatesignup() {
    let Fname=document.getElementById('Fname').value;
    let Fnameregex=/^[a-zA-Z\s]+$/;
    if (!Fnameregex.test(Fname)) {
        alert("First Name should be more than 3 characters, can only contain letters and spaces!");
        return false;
    }

    let Lname=document.getElementById('Lname').value;
    let Lnameregex=/^[a-zA-Z\s]+$/;
    if (!Lnameregex.test(Lname)) {
        alert("Last Name should be more than 3 characters, can only contain letters and spaces!");
        return false;
    }

    let email=document.getElementById('Email').value;
    let emailregex=/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    let password=document.getElementById('Password').value;
    let passwordregex=/^(?=.[A-Z])(?=.\d).{8,}$/;
    if (!passwordregex.test(password)) {
        alert("Password must be at least 8 characters long and include uppercase and atleast one number");
        return false;
    }

    let confirmPassword=document.getElementById('Confirm_Password').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    alert("Account created successfully!");
    return false;
 }

 function validateLogin(){

    let email=document.getElementById('Login_Email').value;
    let emailregex=/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!emailregex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }
   
        let password=document.getElementById('Login_Password').value;
        if(password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return false;
        }
        else if(password.length===0) {
            alert("Please enter your password!");
            return false;
        }
        alert("Logged in successfully!");
    return false;
 }


 window.addEventListener('scroll', () => {
  const brand = document.querySelector('.footer-brand h1');
  const triggerBottom = window.innerHeight / 5 * 4;
  const brandTop = brand.getBoundingClientRect().top;

  if(brandTop < triggerBottom) {
    brand.style.transform = "translateY(0)";
    brand.style.opacity = "1";
  }
});
 
