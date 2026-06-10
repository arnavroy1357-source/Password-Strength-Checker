setTimeout(()=>{
document.getElementById("loader").style.display="none";
},2500);

const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", async ()=>{

const response = await fetch("/check",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
password:passwordInput.value
})
});

const data = await response.json();

document.getElementById("strength").innerText =
data.strength;

document.getElementById("score").innerText =
data.score;

document.getElementById("entropy").innerText =
data.entropy;

const progress =
document.getElementById("progress");

progress.style.width =
data.percentage + "%";

if(data.strength==="Weak"){
progress.style.background="#ff3b3b";
}
else if(data.strength==="Medium"){
progress.style.background="#ffae00";
}
else if(data.strength==="Strong"){
progress.style.background="#00d084";
}
else{
progress.style.background="#00e5ff";
}

for(let key in data.checks){

const element =
document.getElementById(key);

if(data.checks[key]){
element.classList.add("valid");
}
else{
element.classList.remove("valid");
}
}
});

document.getElementById("toggle")
.addEventListener("click",()=>{

const field =
document.getElementById("password");

field.type =
field.type==="password"
? "text"
: "password";
});

document.getElementById("generateBtn")
.addEventListener("click",async()=>{

const response =
await fetch("/generate");

const data =
await response.json();

document.getElementById(
"generatedPassword"
).value = data.password;
});

document.getElementById("copyBtn")
.addEventListener("click",()=>{

const field =
document.getElementById(
"generatedPassword"
);

field.select();

navigator.clipboard.writeText(
field.value
);

alert("Password Copied!");
});