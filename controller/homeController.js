async function homePage(req, res) {
    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Coming Soon</title>
<link rel="stylesheet" href="styles.css">
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.coming-soon-container {
  text-align: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.coming-soon-container h1 {
  color: #333333;
  font-size: 36px;
}

.coming-soon-container p {
  color: #666666;
  font-size: 18px;
  line-height: 1.6;
}

.countdown {
  font-size: 24px;
  margin-top: 20px;
  color: #555555;
}
</style>
</head>
<body>
<div class="coming-soon-container">
  <h1>Coming Soon</h1>
  <p>Our website is under construction. We'll be here soon with our new awesome site.</p>
  <div class="countdown">
    <p id="demo"></p>
  </div>
</div>

<script>
// Set the date we're counting down to
var countDownDate = new Date("Jan 1, 2025 15:37:25").getTime();

// Update the countdown every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the countdown is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
</script>

</body>
</html>`)
}

module.exports = { homePage }