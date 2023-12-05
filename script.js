document.addEventListener('DOMContentLoaded', function () {
    var ageForm = document.getElementById('ageForm');
    var dayInput = document.getElementById('Day');
    var monthInput = document.getElementById('Month');
    var yearInput = document.getElementById('Year');
    var dayError = document.getElementById('dayError');
    var monthError = document.getElementById('monthError');
    var yearError = document.getElementById('yearError');
    var yearShow = document.getElementById('yearsshow');
    var monthShow = document.getElementById('monthshow');
    var daysShow = document.getElementById('Daysshow');

    ageForm.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrors();

      var day = parseInt(dayInput.value, 10);
      var month = parseInt(monthInput.value, 10);
      var year = parseInt(yearInput.value, 10);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showError("All fields are required");
        return;
      }

      if (day < 1 || day > 31) {
        showError("Day must be between 1 and 31");
        return;
      }

      if (month < 1 || month > 12) {
        showError("Month must be between 1 and 12");
        return;
      }

      var currentDate = new Date();
      var inputDate = new Date(year, month - 1, day);

      if (inputDate > currentDate) {
        showError("Year cannot be in the future");
        return;
      }

      var age = calculateAge(currentDate, inputDate);
      animateNumbers(age);
    });

    function showError(message) {
      dayError.textContent = message;
      dayError.style.display = "block";
    }

    function clearErrors() {
      dayError.textContent = "";
      dayError.style.display = "none";
      monthError.textContent = "";
      monthError.style.display = "none";
      yearError.textContent = "";
      yearError.style.display = "none";
    }

    function calculateAge(currentDate, inputDate) {
      var age = {};
      var ageInMilliseconds = currentDate - inputDate;

      age.years = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
      ageInMilliseconds %= (365.25 * 24 * 60 * 60 * 1000);

      age.months = Math.floor(ageInMilliseconds / (30.44 * 24 * 60 * 60 * 1000));
      ageInMilliseconds %= (30.44 * 24 * 60 * 60 * 1000);

      age.days = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));

      return age;
    }

    function animateNumbers(age) {
      var startAge = { years: 0, months: 0, days: 0 };
      var duration = 1000; // Animation duration in milliseconds
      var startTime;

      function updateNumbers(timestamp) {
        if (!startTime) startTime = timestamp;

        var progress = timestamp - startTime;
        var percentage = progress / duration;

        if (percentage > 1) percentage = 1;

        yearShow.textContent = Math.floor(startAge.years + percentage * (age.years - startAge.years));
        monthShow.textContent = Math.floor(startAge.months + percentage * (age.months - startAge.months));
        daysShow.textContent = Math.floor(startAge.days + percentage * (age.days - startAge.days));

        if (percentage < 1) {
          requestAnimationFrame(updateNumbers);
        }
      }

      requestAnimationFrame(updateNumbers);
    }
  });