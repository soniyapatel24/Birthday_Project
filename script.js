function calculateBirthday() {
  const name = document.getElementById("nameInput").value.trim();
  const dob = document.getElementById("dobInput").value;
  const resultDiv = document.getElementById("result");

  if (!name || !dob) {
    resultDiv.innerHTML = `<p style="color:red;">⚠ Please enter your name and date of birth!</p>`;
    return;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  // 1️⃣ Calculate exact age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); // last day of previous month
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // 2️⃣ Calculate next birthday
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() > birthDate.getDate())
  ) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  let diffTime = nextBirthday - today;
  let daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let monthsLeft = nextBirthday.getMonth() - today.getMonth();
  let daysRemaining = nextBirthday.getDate() - today.getDate();
  if (daysRemaining < 0) {
    monthsLeft -= 1;
    const prevMonth = new Date(nextBirthday.getFullYear(), nextBirthday.getMonth(), 0);
    daysRemaining += prevMonth.getDate();
  }
  if (monthsLeft < 0) monthsLeft += 12;

  const options = { weekday: "long" };
  const nextBirthdayDay = nextBirthday.toLocaleDateString("en-US", options);

  // 3️⃣ Show result
  resultDiv.innerHTML = `
    <h3>🎉 Hello, ${name}!</h3>
    <p>👶 You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>
    <p>🎂 Your next birthday is after <strong>${monthsLeft}</strong> months and <strong>${daysRemaining}</strong> days.</p>
    <p>🗓️ Your next birthday will be on: <strong>${nextBirthdayDay}, ${nextBirthday.toDateString()}</strong></p>
  `;
}

