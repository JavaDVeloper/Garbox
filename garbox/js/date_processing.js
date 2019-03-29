var ts_chosen = 0;
var gmt_chosen = 0;

function pickStartDate(){
	$('#datepicker_start').datepicker();
}

function pickFinishDate(){
	$( "#datepicker_finish" ).datepicker();
}


function serverTimestamp(){
	$.get("/api/timestamp", function(data){
	$('#server_time').val(data);
	});
	ts_chosen = 1;
	gmt_chosen = 0;
}

/*function myFunction() {
  setInterval(serverTimestamp, 200);
}
*/

function serverGMT(){
	$.get("/api/gmt", function(data){
	$('#server_time').val(data);
	});
	ts_chosen = 0;
	gmt_chosen = 1;
}


function localTimestamp(){
		
			var milliseconds = new Date().getTime();
		
			$('#local_time').val(milliseconds);
			//document.getElementById("local_time").value = milliseconds;
}

function localGMT(){
		
			var now = new Date();
		
			var day = now.getDate();
            if (day<10) day = "0"+ day;
    
			var month = now.getMonth()+1;
			var year = now.getFullYear();
			
			var hour = now.getHours();
			if (hour<10) hour = "0"+hour;
			
			var minute = now.getMinutes();
			if (minute<10) minute = "0"+minute;
			
			var second = now.getSeconds();
			if (second<10) second = "0"+second;
					
	
			document.getElementById("local_time").value =
				year+"/"+month+"/"+day+" | "+hour+":"+minute+":"+second;
				
}


function counting(){
	if (ts_chosen == 1){
		var miliseconds = new Date().getTime();
		$('#local_time').val(miliseconds);
		setTimeout(counting, 10);
	}
	else if(gmt_chosen == 1){
		var now = new Date();
		
		var day = now.getDate();
		if (day<10) day = "0"+ day;

		var month = now.getMonth()+1;
		var year = now.getFullYear();
		
		var hour = now.getHours();
		if (hour<10) hour = "0"+hour;
		
		var minute = now.getMinutes();
		if (minute<10) minute = "0"+minute;
		
		var second = now.getSeconds();
		if (second<10) second = "0"+second;
		$('#local_time').val(year+"/"+month+"/"+day+" | "+hour+":"+minute+":"+second);

		setTimeout(counting, 1000);
	}
}

function counting_gmt(){
	var gmtime = localGMT()
	$('#local_time').val(gmtime);
	setTimeout(counting_gmt, 1000);
}

$('#btn-tmsp').on('click', localTimestamp);
$('#btn-tmsp').on('click', serverTimestamp);
$('#btn-gmt').on('click', localGMT);
$('#btn-gmt').on('click', serverGMT);
$('#btn-start').on('click', counting);

var months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

function loadDays(){
	var listOfDays, listOfMonths, listOfYears, listOfYearsFinish, listOfYearsDob;
	for (i = 1; i <= 31; i++){
		listOfDays += "<option value="+ i +" >" + i + "</option>";
	}

	for (i = 0; i <= 11; i++){
		listOfMonths += "<option value="+ i +" >" + months[i] + "</option>";
	}

	for (i = 1995; i <= 2019; i++){
		listOfYears += "<option value="+ i +" >" + i + "</option>";
	}

	for (i = 2017; i <= 2070; i++){
		listOfYearsFinish += "<option value="+ i +" >" + i + "</option>";
	}

	for (i = 1950; i <= 2001; i++){
		listOfYearsDob += "<option value="+ i +" >" + i + "</option>";
	}

	$('#daypicker_start').html(listOfDays);	
	$('#monthpicker_start').html(listOfMonths);	
	$('#yearpicker_start').html(listOfYears);
	
	$('#daypicker_finish').html(listOfDays);
	$('#monthpicker_finish').html(listOfMonths);
	$('#yearpicker_finish').html(listOfYearsFinish);	
	
	$('#daypicker_dob').html(listOfDays);
	$('#monthpicker_dob').html(listOfMonths);
	$('#yearpicker_dob').html(listOfYearsDob);
}

var paidAmount;
function getAmount(contPRSI){

	if(contPRSI >= 10 && contPRSI <= 14){
		paidAmount = 97.20;
	}
	else if(contPRSI >= 15 && contPRSI <= 19){
		paidAmount = 158.50;
	}
	else if(contPRSI >= 20 && contPRSI <= 29){
		paidAmount = 207.10;
	}
	else if(contPRSI >= 30 && contPRSI <= 39){
		paidAmount = 218.70;
	}
	else if(contPRSI >= 40 && contPRSI <= 47){
		paidAmount = 238.50;
	}
	else if(contPRSI >= 48){
		paidAmount = 243.30;
	}
	else{
		paidAmount = 0;
	}
console.log("Paid amount: " + paidAmount);
	return paidAmount;
}

var dayStart, monthStart, yearStart, dayFinish, monthFinish, yearFinish;

function comparePRSI(){
	var paidPRSIRates = calcPaidPRSI();
	var obligatoryYears = calcObligatoryPRSI();

	var contributionPRSI = Math.round(paidPRSIRates/obligatoryYears);

	console.log(contributionPRSI);

	if($('#yearpicker_finish').val() > $('#yearpicker_dob').val()){
		$('#finish-comment').text("Okres pracy przekroczyl wiek emerytalny." + <br/> + "Sprobuj jeszcze raz.");
	}
	else if($('#yearpicker_finish').val() == $('#yearpicker_dob').val())

	if(amountPaidPRSI < 520){
		$('#information-for-user').html("Liczba odprowadzonych składek PRSI (" + Math.round(amountPaidPRSI) + ") nie przekroczyła wymaganego minimum (520), a zatem świadczenie nie przysługuje.");
	}
	else{
	$('#information-for-user').html("Średnioroczny udział składek PRSI wyniósł " + contributionPRSI + ", co upoważnia do świadczenia w wysokości " + getAmount(contributionPRSI) + " € tygodniowo.")
	}
}

var amountPaidPRSI = 0;

function calcPaidPRSI(){
	dayStart = $('#daypicker_start').val();
	dayFinish = $('#daypicker_finish').val();

	monthStart = $('#monthpicker_start').val();
	monthFinish = $('#monthpicker_finish').val();

	yearStart = $('#yearpicker_start').val();
	yearFinish = $('#yearpicker_finish').val();

	var totalDays, daysInFirstYear, daysInLastYear, daysInFullYears, daysFromLeapYears;
	if(yearStart == yearFinish){

		totalDays = howManyDaysIfLessThanYear(dayStart, monthStart, yearStart, dayFinish, monthFinish);
	}
	else{
		daysInFirstYear = howManyDaysFromMonthsInFirstYear(dayStart, monthStart, yearStart);

		daysInLastYear = howManyDaysFromMonthsInLastYear(dayFinish, monthFinish, yearFinish);

		daysInFullYears = howManyDaysFromFullYears(yearStart, yearFinish);

		daysFromLeapYears = howManyLeapYears(yearStart, yearFinish);

		totalDays = daysInFirstYear + daysInLastYear + daysInFullYears + daysFromLeapYears;

	console.log(daysInFirstYear + daysInLastYear + daysInFullYears + daysFromLeapYears);
	console.log(daysInFirstYear + " " + daysInLastYear + " " + daysInFullYears + " " + daysFromLeapYears);
	}

	amountPaidPRSI = totalDays/7;
	console.log("Paid PRSI: " + amountPaidPRSI);
	return amountPaidPRSI;
}

function calcObligatoryPRSI(){
	dayStart = $('#daypicker_start').val();
	dayFinish = $('#daypicker_dob').val();

	monthStart = $('#monthpicker_start').val();
	monthFinish = $('#monthpicker_dob').val();

	yearStart = $('#yearpicker_start').val();
	yearFinish = parseInt($('#yearpicker_dob').val()) + 67;

	console.log("PENSION YEAR: " + yearFinish);

	var totalDays, daysInFirstYear, daysInLastYear, daysInFullYears, daysFromLeapYears;
	if(yearStart == yearFinish){

		totalDays = howManyDaysIfLessThanYear(dayStart, monthStart, yearStart, dayFinish, monthFinish);
	}
	else{
		daysInFirstYear = howManyDaysFromMonthsInFirstYear(dayStart, monthStart, yearStart);

		daysInLastYear = howManyDaysFromMonthsInLastYear(dayFinish, monthFinish, yearFinish);

		daysInFullYears = howManyDaysFromFullYears(yearStart, yearFinish);

		daysFromLeapYears = howManyLeapYears(yearStart, yearFinish);

		totalDays = daysInFirstYear + daysInLastYear + daysInFullYears;

	console.log(daysInFirstYear + daysInLastYear + daysInFullYears + daysFromLeapYears);
	console.log("tra ta ta: " + daysInFirstYear + " " + daysInLastYear + " " + daysInFullYears + " " + daysFromLeapYears);
	}

	var obligatoryYears = totalDays/365;
	console.log("Obligatory years: " + obligatoryYears);
	return obligatoryYears;
}

var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function howManyDaysIfLessThanYear(dayStart, monthStart, year, dayFinish, monthFinish){

	var daysFromFullMonthsInYear = 0;

	for (i = monthStart; i < monthFinish; i++){
		daysFromFullMonthsInYear += daysInMonths[i];
	}

	console.log("aaaaa " + daysFromFullMonthsInYear);

	daysInYear = daysFromFullMonthsInYear - dayStart + 1 + parseInt(dayFinish);

	console.log("bbbb " + daysInYear);

	if(year % 4 == 0 && monthStart < 2){
		daysInYear++;
	}

	return daysInYear;
}

function howManyDaysFromMonthsInFirstYear(dayStart, monthStart, yearStart){
	
	var daysFromFullMonthsInFirstYear = 0;

	console.log("ble " + dayStart + " " + monthStart + " " + yearStart );
	for (i = monthStart; i < 12; i++){
		daysFromFullMonthsInFirstYear += daysInMonths[i];
	}

	console.log("cle " + daysFromFullMonthsInFirstYear );

	daysFromMonthsInFirstYear = daysFromFullMonthsInFirstYear - dayStart + 1;

	console.log("dle " + daysFromMonthsInFirstYear );

	if(yearStart % 4 == 0 && monthStart < 2){
		daysFromMonthsInFirstYear++;
	}

	console.log("ele " + daysFromMonthsInFirstYear );

	return daysFromMonthsInFirstYear;
}

function howManyDaysFromMonthsInLastYear(dayFinish, monthFinish, yearFinish){

	var daysFromFullMonthsInLastYear = 0;

	for (i = 0; i < monthFinish; i++){
		daysFromFullMonthsInLastYear += daysInMonths[i];
	}

	console.log("fle " + daysFromFullMonthsInLastYear);

	daysFromMonthsLastYear = daysFromFullMonthsInLastYear + parseInt(dayFinish);

	console.log("gle " + daysFromMonthsLastYear);
	
	if(yearFinish % 4 == 0 && monthFinish > 1){
		daysFromMonthsLastYear++;
	}
	
	console.log("hle " + daysFromMonthsLastYear);
	
	return daysFromMonthsLastYear;
}

function howManyDaysFromFullYears(yearStart, yearFinish){
	console.log("ile " + (yearFinish - yearStart - 1) * 365);
	return (yearFinish - yearStart - 1) * 365;
}


function howManyLeapYears(yearStart, yearFinish){

	var leapyear = 0;

	for(i = parseInt(yearStart) + 1; i < parseInt(yearFinish); i++){
		if(i % 4 == 0){
			leapyear++;
		}
	}
	console.log("jle " + i + " " + leapyear);
	return leapyear;
}
