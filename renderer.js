// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const puppeteer = require("puppeteer");
const axios = require('axios');
const os = require('os');
const si = require('systeminformation');
let request = require('async-request'),
  response1, response2;
console.log('Hostname:', os.hostname());
console.log('Platform:', os.platform());
console.log('Arch:', os.arch());
console.log('CPU Cores:', os.cpus().length);
console.log('Total Memory (bytes):', os.totalmem());
console.log('Free Memory (bytes):', os.freemem());
let oswidth = 2000;
let osheight = 2000;
si.graphics().then(data => {
  oswidth = data.displays[0].resolutionX;
  osheight = data.displays[0].resolutionY;
  console.log('Monitor Size (width x height):', data.displays[0].resolutionX + 'x' + data.displays[0].resolutionY);
}).catch(error => {
  console.error('Error:', error);
});
async function scraper(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: parseInt(oswidth) || 3000, height: parseInt(osheight) || 3000 });
  await page.goto(url);
  const title = await page.title();

  setInterval(async () => {
    console.log('Taking screenshot...');
    try {
      stat = await request('http://127.0.0.1:45837/stat');
      response1 = await request('http://127.0.0.1:45837/width');
      response2 = await request('http://127.0.0.1:45837/height');
    } catch (e) {
      console.error('Error:', e);
    }
    await page.setViewport({ width: parseInt(response1.body), height: parseInt(response2.body) });

    if (parseInt(stat.body) === 1) {//click on x=50%width y=50%height
      //!important 按換頁
      await page.mouse.click(Math.round(parseInt(response1.body) * 0.99), Math.round(parseInt(response2.body) * 0.5), { delay: 1000 });
      //!important 內建1SEC
      //wait 3sec
      console.log('wait 3sec...');
      //!important 等動畫
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const screenshotData = await page.screenshot({ encoding: 'base64' });

        // Create a FormData object
        const formData = new FormData();

        // Convert the base64 data into a Blob
        const byteCharacters = atob(screenshotData);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });

        const uploadUrl = 'http://127.0.0.1:45837/upload';

        // Append your data to the FormData object
        formData.append('image', blob, 'image.png');

        // Send the POST request using FormData
        const response = await axios.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        });

        console.log('Screenshot uploaded:', response.data);

      } catch (error2) {
        console.error('Error:', error2);
      }
    } else { console.log('hold...'); }
  }, 6000);

  // Wait until the user closes the browser
  await new Promise((resolve) => setTimeout(resolve, 180000000));

  // Close the browser when done
  await browser.close();

  // await browser.close();
  // return title;
}

document.querySelector("#main").addEventListener("click", async function () {
  const result = await scraper("https://ebook.hyread.com.tw/bookDetail.jsp?id=311928");
  document.querySelector("#result").innerHTML = result;
});

document.querySelector("#setwidth").addEventListener("click", async function () {
  var width = document.getElementById("width").value;
  var apiUrl = `http://127.0.0.1:45837/setwidth?width=${width}`;

  // Now, you can use the apiUrl for your wget request or any other HTTP request method.
  // For example, you can use fetch to send a GET request:
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      // Request was successful
      console.log("Width set successfully!");
    } else {
      console.error("Failed to set width.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

//height
document.querySelector("#setheight").addEventListener("click", async function () {
  var height = document.getElementById("height").value;
  var apiUrl = `http://127.0.0.1:45837/setheight?height=${height}`;

  // Now, you can use the apiUrl for your wget request or any other HTTP request method.
  // For example, you can use fetch to send a GET request:
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      // Request was successful
      console.log("height set successfully!");
    } else {
      console.error("Failed to set height.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

//stat
document.querySelector("#setstat").addEventListener("click", async function () {
  var stat = document.getElementById("stat").value;
  var apiUrl = `http://127.0.0.1:45837/setstat?stat=${stat}`;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      // Request was successful
      console.log("stat set successfully!");
    } else {
      console.error("Failed to set stat.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});