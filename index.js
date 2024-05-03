


async function addAttendee() {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const specialization = document.getElementById("specialization").value;

  // Add attendee to the array
  // attendees.push({ name, gender, specialization });
  try {
    const response = await fetch("/api/attendees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, gender, specialization }),
    });

    if (response.ok) {
      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("specialization").value = "";
      updateAttendeesList();
    } else {
      console.error("Failed to add attendee:", response.status);
    }
  } catch (error) {
    console.error("Failed to add attendee:", err);
  }
}

function updateAttendeesList() {
  const selectedAttendeesList = document.getElementById("selected-attendees");
  selectedAttendeesList.innerHTML = "";

  // Randomly select 20 attendees
  const shuffledAttendees = shuffleArray(attendees);
  const selected = shuffledAttendees.slice(0, 20);

  selected.forEach((attendee) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${attendee.name} (${attendee.gender}) - ${attendee.specialization}`;
    selectedAttendeesList.appendChild(listItem);
  });
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
