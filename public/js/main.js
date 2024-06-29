const submitBtn=document.getElementById('submitBtn');
const cityName=document.getElementById('cityName');
const output=document.getElementById('city_name');
const temp=document.getElementById('temp');
const tempStatus=document.getElementById('temp_status');
const day=document.getElementById('day');
const today_date=document.getElementById('today_date');
const datahide = document.querySelector('.middle_layer');

const getInfo= async(event)=>{
    event.preventDefault();

    let cityVal=cityName.value;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


        // Get the current date
        const date = new Date();

        // Get the current day of the week as a number (0-6)
        const dayIndex = date.getDay();
        const month = date.getMonth();

        // Get the day name from the array
        const dayName = days[dayIndex];
        const currentMonthName = monthNames[month];
        const todayDate=date.getDate();

        day.innerHTML=dayName;
        today_date.innerHTML=todayDate+" "+currentMonthName;
    
    if(cityName.value===""){
        output.innerText="Enter City Name....."
    }
    else{
        
        try{
            
            let Url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=a9d77877e3107f691d86fbd761231fbc`
            const response=await fetch(Url); 
            const data=await response.json();
            const arrData=await [data];

            let tempData = arrData[0].main.temp;
            let tempCelsius = tempData - 273.15; 
            let tempSpan = document.querySelector('#temp span');
            
            output.innerHTML=arrData[0].name+" ,"+arrData[0].sys.country;
            tempSpan.innerHTML = tempCelsius.toFixed(2);
            // tempStatus.innerHTML=arrData[0].weather[0].main;
            const tempMood = arrData[0].weather[0].main;
            
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
    
                }
                datahide.classList.remove('data_hide');
                cityVal = "";
        }
        catch(err)
        {
            cityVal = " ";
            datahide.classList.add("data_hide");
            output.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        

    }
}

submitBtn.addEventListener('click',getInfo);