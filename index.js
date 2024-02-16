const display=document.querySelector("#out");
const button=document.querySelector("[btn]");
const buttonmsg=document.querySelector("[btn-msg]");
const datalength=document.querySelector("[data-length]");
const slider=document.querySelector("[data-length-slider]");
const upper=document.querySelector("#upper");
const lower=document.querySelector("#lower");
const number=document.querySelector("#number");
const symbol=document.querySelector("#symbol");
const strength_ind=document.querySelector("[strength-ind]");
const gener=document.querySelector("[generate]");
const allcheckbox=document.querySelectorAll('input[type="checkbox"]');

const str="~`!@#$%^&*()_+?:,.<>-{}|";
let len=10;
datalength.textContent =10;
let selectedchoices=[];
const  handlecopy=async()=>{
  await navigator.clipboard.writeText(display.value);
};
// console.log(display);
const handleslider=(e)=>{
slider.value=e.target.value;
datalength.textContent =e.target.value;
len=e.target.value;

}
const handlecheckbox = () => {
  selectedchoices = [];
  allcheckbox.forEach((ele) => {
      if (ele.checked) {
          selectedchoices.push(ele.id); 
      }
  });
  console.log(selectedchoices);
};

const generatestrength = () => {
  console.log("hi");
  const len = selectedchoices.length; // Make sure selectedchoices is defined and populated
  if (len == 4) {
    strength_ind.style.backgroundColor = 'green';
  } else if (len == 3) { // Use 'else if' to check for multiple conditions
    strength_ind.style.backgroundColor = 'yellow';
  } else {
    strength_ind.style.backgroundColor = 'red';
  }
}


button.addEventListener("click",handlecopy);
allcheckbox.forEach((ele)=>{
  ele.addEventListener("change",handlecheckbox);
})

slider.addEventListener("change",handleslider);

const functions = {
  generatenumber: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  generatelower: () => {
    return String.fromCharCode(functions.generatenumber(97, 123));
  },
  generateupper: () => {
    return String.fromCharCode(functions.generatenumber(65, 91));
  },
  generatesymbol: () => {
    const str = "~`!@#$%^&*()_+?:,.<>-{}|";
    return str[functions.generatenumber(0, str.length)];
  }
};


const generatepassword=()=>{
  if(selectedchoices.length<1){
    return;
  }
  display.value='';
  let disp="";

  
  for(let i=0;i<selectedchoices.length;i++){
    const str="generate"+selectedchoices[i];
    if(str=="generatenumber"){
      disp+=functions[str](0,10);
    }
    else{
      disp+=functions[str]();
    }
  }
  for(let i=0;i<len-selectedchoices.length;i++){
    let ind=functions["generatenumber"](0,selectedchoices.length);
    if("generate"+selectedchoices[ind]=="generatenumber"){
      disp+=functions["generatenumber"](0,10);

    }
    else{
      disp+=functions["generate"+selectedchoices[ind]]();
    }

  }
  display.value=disp;
  generatestrength();
}

gener.addEventListener("click",generatepassword);