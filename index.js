const xlsx = require('xlsx');
const fs = require('fs');


// Conversion to JSON
const workbook = xlsx.readFile('data.xlsx');
const sheetinExcel = workbook.SheetNames[0];
const name = workbook.Sheets[sheetinExcel];
const jsonData = xlsx.utils.sheet_to_json(name, { raw: false, dateNF: 'yyyy-mm-dd' });
// Save the JSON data to a file
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));



// Actual data for analyzing.
{
    "Position ID": "WFS000065",
    "Position Status": "Active",
    "Time": "09/14/2023 03:00 PM",
    "Time Out": "09/14/2023 07:14 PM",
    "Timecard Hours (as Time)": "14:14",
    "Pay Cycle Start Date": "09/10/2023",
    "Pay Cycle End Date": "09/23/2023",
    "Employee Name": "REsaXiaWE, XAis",
    "File Number": "000065"
}

// a) who has worked for 7 consecutive days.
console.log("Who has worked for 7 consecutive days.")
const output = [];
let prevUser = data[1]['Employee Name'];
let prevDate = new Date(data[1]['Time']).getDate();
let counter = 1;


data.slice(2, data.length).map((item)=>{
  const currUser = item['Employee Name'];
  let date = new Date(item['Time']).getDate();
  // console.log(currUser);
  // console.log(prevUser);
  if(date == prevDate + 1 && currUser === prevUser)
  {
    // console.log(date);
    // console.log(prevDate);
    prevDate = date;
    counter = counter + 1;
    // console.log(counter);
  }
  else if(currUser !== prevUser)
  {
    prevUser = currUser;
    prevDate = date;
    counter = 1;
    // console.log(prevUser + " " + currUser);
    // console.log(date + " " + prevDate)
  }

  if(counter === 7)
  {
      output.push(currUser);
  }
  
});

const uniqueArr = [...new Set(output)];
console.log(uniqueArr);



// who have less than 10 hours of time between shifts but greater than 1 hour
// Assuming that the shift is when an person left from one time i.e time out and get on same data on new time as time.
// calculated the differnece and added the logic.
console.log("Who have less than 1 - hours of time between shifts but greater than 1 hour.")
const result = [];

for (let i = 0; i < data.length - 1; i++) {
  const curr = data[i];
  const next = data[i + 1];
  
  
  const start = new Date(curr["Time Out"]);
  const end = new Date(next["Time"]);
  
  var diff = (end - start)/(1000 * 60 * 60);
//   console.log(diff/(1000 * 60 * 60));
//   console.log(data[i]["Employee Name"])
  
  if (diff > 1 && diff < 10) {
    result.push(data[i]["Employee Name"])
  }
}

console.log([new Set(result)]);



// c) Who has worked for more than 14 hours in a single shift
// Logic : Iterated over the json and looks for Timecard Hour attibute if its greated than 14 as per question then added into answer.
console.log("Who has worked for more than 14 hours in a single shift");
data.map((item) => {
  const timeInShift = (item['Timecard Hours (as Time)']);
  // console.log(timeInShift.charAt(1));
  // console.log(parseInt(timeInShift.charAt(0)));
  // console.log(timeInShift);
  if (timeInShift.length === 0) {
    // console.log('yes');
    // If 
  }
  else if (timeInShift.charAt(1) !== " " && timeInShift.charAt(1) !== ':') {
    // console.log(timeInShift);
    if (parseInt(timeInShift.slice(0, 2)) > 14) {
      console.log(timeInShift);
      console.log(item['Employee Name']);
    }
  }
});
