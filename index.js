
// ----------Form Onload Code------------

var selectedRow=null;
var formData=[{'id':'1','name':'vipul','email':'vipul@gmail.com','gender':'Male','hobbies':'Sports','country':'India', 'state':'Gujarat', 'city':'Surat'},
{'id':'2','name':'aishal','email':'aishal@gmail.com','gender':'Male','hobbies':'Sports','country':'India', 'state':'Gujarat', 'city':'Surat'}
];
tableDisplayRecord(formData);



// ----------Data Dispaly Code------------

function readFormData(){
    let id;
    var checkboxesValue=[];
    let formDataIns={};
    let idValue=$("input[name='id']").val();
    if(idValue==""){
        id=Number(formData[formData.length-1].id);
        id=id+1;
    }else{
        id=idValue;
    }
    let name=$("input[name='name']").val();
    let email=$("input[name='email']").val();
    let gender=$('input[name="gender"]:checked').val();
    $.each($("input[name='hobbies']:checked"),function(){
        checkboxesValue.push($(this).val());
    })
    let hobbies=checkboxesValue.join(",");
    let country=$("select[name='country']").val();
    let state=$("select[name='state']").val();
    let city=$("select[name='city']").val();

    formDataIns={'id':id,'name':name,'email':email,'gender':gender,'hobbies':hobbies,'country':country,'state':state,'city':city}
    return formDataIns;
}

// ----------Insert New Record Code------------
function tableDisplayRecord(data){
        $.each(data,function(index){
            var table=$("tbody")[0];
            var newRow=table.insertRow(table.length)
            cellId=newRow.insertCell(0);
            cellId.innerHTML=data[index].id;
            cellName=newRow.insertCell(1);
            cellName.innerHTML=data[index].name;
            cellEmail=newRow.insertCell(2);
            cellEmail.innerHTML=data[index].email;
            cellGender=newRow.insertCell(3);
            cellGender.innerHTML=data[index].gender;
            cellHobbies=newRow.insertCell(4);
            cellHobbies.innerHTML=data[index].hobbies;
            cellCountry=newRow.insertCell(5);
            cellCountry.innerHTML=data[index].country;
            cellState=newRow.insertCell(6);
            cellState.innerHTML=data[index].state;
            cellCity=newRow.insertCell(7);
            cellCity.innerHTML=data[index].city;
            cellBtnEdit=newRow.insertCell(8);
            cellBtnEdit.innerHTML=`<a class="btn btn-success" onClick="onEdit(this)">Edit</a>`;
            cellBtnClear=newRow.insertCell(9);
            cellBtnClear.innerHTML=` <a class="btn btn-danger" onClick="onDelete(this)">Remove</a>`;
        })
    
}

// ----------ResetForm Code------------

function resetForm(){
    $('input[name="id"]').val("");
    $('input[name="name"]').val("");
    $('input[name="email"]').val("");
    $('input[name="gender"]').prop('checked', false);
    $('input[name="hobbies"]').prop('checked', false);
    $('select[name="country"]').val("");
    $('select[name="state"]').val("");
    $('select[name="city"]').val("");
    $('input[name="btnSubmit"]').val("Save");
    selectedRow=null;

}

    
// ----------Edit Code------------

function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    let hobbiesValue=selectedRow.cells[4].innerHTML;
    let spliteHobbies=hobbiesValue.split(",");
    $('input[name="id"]').val(selectedRow.cells[0].innerHTML);
    $('input[name="name"]').val(selectedRow.cells[1].innerHTML);
    $('input[name="email"]').val(selectedRow.cells[2].innerHTML);

    let gender=$('input[name="gender"]');
    if(selectedRow.cells[3].innerHTML=="Male"){
        gender[0].checked=true;
    }
    else{
        gender[1].checked=true;
    }
    let hobbies=$('input[name="hobbies"]');
    $.each(spliteHobbies,function(index,currElem){
        if (currElem=='Reading'){
            hobbies[0].checked=true;
        }
        else if(currElem=='Traveling'){
            hobbies[1].checked=true; 
        }
        else if(currElem=='Sports'){
            hobbies[2].checked=true; 
        }
    })
   let country=selectedRow.cells[5].innerHTML;
   let state=selectedRow.cells[6].innerHTML;
    $('select[name="country"]').val(country);
    getStateData(country);
    $('select[name="state"]').val(state);
    getCityData(country,state);
    $('select[name="city"]').val(selectedRow.cells[7].innerHTML);
    $('input[name="btnSubmit"]').val("Update");
}

// ----------DropDown Code------------

var stateObject = {
    "India": { 
    "Delhi": ["new Delhi", "Firozabad","Shergarh"],
    "Kerala": ["Thiruvananthapuram", "Kozhikode","Kochi"],
    "Gujarat": ["Ahmedabad", "Surat","Vadodara"],
    },
    "Australia": {
    "South Australia": ["Dunstan", "Mitchell"],
    "Victoria": ["Altona", "Euroa"]
    }, 
    "Canada": {
    "Alberta": ["Acadia", "Bighorn"],
    "Columbia": ["Washington", "Barranquilla"]
    },
    }
var countyList, stateList, cityList;
(function () {
         countyList=$('select[name="country"]')[0];
         stateList=$('select[name="state"]')[0];
         cityList=$('select[name="city"]')[0];
         $.each(stateObject,function(key,value){
            countyList.options[countyList.options.length] = new Option(key, key);
         })

    countyList.onchange = function () {
        getStateData(this.value);
    }
    countyList.onchange();
    stateList.onchange = function () {
        getCityData(countyList.value, this.value);
    };
})();

function getStateData(country) {
    stateList.length = 1;
    cityList.length = 1;
    if (this.selectedIndex < 1) return;
    for (var state in stateObject[country]) {
        stateList.options[stateList.options.length] = new Option(state, state);
    }
}

function getCityData(country, state) {
    cityList.length = 1;
    if (this.selectedIndex < 1) return;
    var city = stateObject[country][state];
    for (var i = 0; i < city.length; i++) {
        cityList.options[cityList.options.length] = new Option(city[i], city[i]);
    }
}
    

// ----------Update Record------------
function updateRecord(formDataUpd){
    let id,name,email,gender,hobbies,country,state,city;
    id=formDataUpd.id;
    name=formDataUpd.name;
    email=formDataUpd.email;
    gender=formDataUpd.gender;
    hobbies=formDataUpd.hobbies;
    country=formDataUpd.country;
    state=formDataUpd.state;
    city=formDataUpd.city;

   $.each(formData,function(index){
        if(formData[index].id==id){
            formData[index].id=id;
            formData[index].name=name;
            formData[index].email=email;
            formData[index].gender=gender;
            formData[index].hobbies=hobbies;
            formData[index].country=country;
            formData[index].state=state;
            formData[index].city=city;

            selectedRow.cells[0].innerHTML=id;
            selectedRow.cells[1].innerHTML=name;
            selectedRow.cells[2].innerHTML=email;
            selectedRow.cells[3].innerHTML=gender;
            selectedRow.cells[4].innerHTML=hobbies;
            selectedRow.cells[5].innerHTML=country;
            selectedRow.cells[6].innerHTML=state;
            selectedRow.cells[7].innerHTML=city;
        }
   }); 
 }

// ----------Delete Record------------

function onDelete(td){
    if(confirm('Are you sure to delete this record ?')){
        row=td.parentElement.parentElement;
       for(let i=0;i<formData.length;i++){   
            if(row.cells[0].innerHTML==formData[i].id)
            {
                formData.splice(i,1);
            }
        }
        $(row).remove();
        resetForm();
    }
}

// ----------Name Validation Code------------

function nameValidate(){
    let isValid=true;
    let name=$('input[name="name"]').val();
    let nameValidation=$('input[name="name"]').prev().prev('span');
    if(name.length<1){
        isValid=false;
           nameValidation.text("This field is  Required");
    }
    else
    {
        nameValidation.text("");
        isValid=true;
    }
   return isValid;
}
//-----------------Email Validation----------------------
function emailValidate(){
    let isValid=true;
    let email=$('input[name="email"]').val();
    let emailValidation=$('input[name="email"]').prev().prev('span');
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.length<1) {
       isValid=false;
       emailValidation.text("This field is required.");
    }
    else if (!filter.test(email)) {
       isValid=false;
       emailValidation.text("Please provide a valid email address."); 
   }
    else
    {
        emailValidation.text("");
        isValid=true
    }
    return isValid;
}
//-----------------Gender And Hobbies Validation--------------

function genderValidate(){
    let isValid=true;
    var getSelectedValue=$('input[name="gender"]:checked').val();
    let gender=$('input[name="gender"]').parent().prev().prev('span');
    if(getSelectedValue == null) { 
        isValid=false;
        gender.text("This field is Required");
    } 
    else { 
        gender.text("");
        isValid=true;             
    } 
    return isValid;
}

function hobbiesValidate(){
    let isValid=true;
    var getSelectedValue = $(`input[name="hobbies"]:checked`).val(); 
     let hobbies = $('input[name="hobbies"]').parent().prev().prev('span');
    if(getSelectedValue == null) { 
        isValid=false;
        hobbies.text('This field is required.');
    } 
    else { 
        hobbies.text("");
        isValid=true; 
            
    } 
    return isValid;
}

// ------------------------Country Validation------------------
function countryValidate(){
    let isValid=true;
    let country=$(`select[name="country"]`).val();
    let countryValidation=$('select[name="country"]').prev().prev('span');;
    if(country==""){
        isValid=false;
        countryValidation.text("This field is required."); 
        stateValidate();     
        cityValidate();
    }
    else
    {
        countryValidation.text("");
        isValid=true;
        stateValidate();     
        cityValidate();
    }
   return isValid;
}

// ------------------------State Validation------------------
function stateValidate(){
    let isValid=true;
    let state=$(`select[name="state"]`).val();
    let stateValidation=$('select[name="state"]').prev().prev('span');
    if(state==""){
        isValid=false;
        stateValidation.text("This field is required."); 
        cityValidate();
    }
    else
    {
        stateValidation.text("");
        isValid=true;
    }
   return isValid;
}

function cityValidate(){
    let isValid=true;
    let city=$(`select[name="city"]`).val();
    let cityValidation=$('select[name="city"]').prev().prev('span');
    if(city==""){
        isValid=false;
        cityValidation.text("This field is required."); 
    }
    else
    {
        cityValidation.text("");
        isValid=true;
    }
   return isValid;
}

//---------------------onChange Validation Code----------------------

let nameOnChangeValidate=$(`input[name="name"]`);
let emailOnChangeValidate=$(`input[name="email"]`);
let genderOnChangeValidate=$(`input[name="gender"]`);
let hobbiesOnChangeValidate=$(`input[name="hobbies"]`);
let countryOnChangeValidate=$(`select[name="country"]`);
let stateOnChangeValidate=$(`select[name="state"]`);
let cityOnChangeValidate=$(`select[name="city"]`);

nameOnChangeValidate.change(nameValidate);
emailOnChangeValidate.change(emailValidate);
genderOnChangeValidate.click(genderValidate);
hobbiesOnChangeValidate.click(hobbiesValidate);
countryOnChangeValidate.change(countryValidate);
stateOnChangeValidate.change(stateValidate);
cityOnChangeValidate.change(cityValidate);

// -------------------Validation Fuctions Call For Submit------------------
function validations(){
            nameValidate();  
            emailValidate();
            genderValidate();
            hobbiesValidate();
            countryValidate();
            stateValidate();
            cityValidate();
            if(nameValidate()==true && emailValidate()==true && genderValidate()==true && hobbiesValidate()==true && countryValidate()==true &&  stateValidate()==true &&  cityValidate()==true)
            {
                return true;
            }
        return false;
}
//------------onsubmit code-------------
$('input[name="btnSubmit"]').click(function(event){
    event.preventDefault();
    //  if(validate('name','nameError') && validate('email','emailError') && radioButtonValidate('gender','genderError') && radioButtonValidate('hobbies','hobbiesError') && validate('country','countryError') && validate('state','stateError') && validate('city','cityError')){   
        let formDataInsUpd=readFormData();
        if(validations()){
        if(selectedRow==null){
            tableDisplayRecord([formDataInsUpd]);
            formData.push(formDataInsUpd)
        }
        else if(selectedRow){
            updateRecord(formDataInsUpd);
            $('input[name="btnSubmit"]').val("Save");
        }
        resetForm();
       }

})

//--------------Sorting in Array---------------
let selectSort=$("select[name='sort']")
 selectSort.change(function(){
        tr =$('tbody').children('tr')
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for(j=0;j<td.length;td++){
                tr[i].style.display = "none";
            } 
        }
     
    if(selectSort.val()=='asc'){
        tableDisplayRecord(aSort(formData))
    }
    else if(selectSort.val()=='desc'){
        tableDisplayRecord(dSort(formData))
    }
    else
    {
        tableDisplayRecord(formData)
    }
    })

function aSort(Data){
    var byName = Data.slice(0);
    byName.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return byName;
}

function dSort(Data){
    var byName = Data.slice(0);
    byName.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x > y ? -1 : x < y ? 1 : 0;
    });
    return byName;
}


//---------------Searching Code-------------------
function search_Record(){
    let searchData=[];
    let input = $('input[name="search"]').val();
    let filter=input.toLowerCase();
    tr =$('tbody').children('tr')
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for(j=0;j<td.length;td++){
            tr[i].style.display = "none";
        } 
    }
    $.each(formData,function(index,currElem){
        $.each(currElem,function(i){
            if(currElem[i].toString().toLowerCase()==filter){
                searchData.push(currElem);
            }
        })
    })
    if(searchData==""){
        tableDisplayRecord(formData)
    }
    else{
        tableDisplayRecord(searchData)
    }
}





