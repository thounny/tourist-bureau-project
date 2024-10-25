"use strict";

let categories = [
  "Adventures",
  "Arts & Crafts",
  "Museums",
  "Wine Tastings",
  "Other",
];

let activities = [
  {
    category: "Adventures",
    id: "A101",
    name: "Valley Hot Air Balloons",
    description:
      "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.",
    location: "121 S. Main Street",
    price: 265.0,
  },
  {
    category: "Adventures",
    id: "A102",
    name: "River Runners: Float Trip",
    description:
      "A mellow float trip with lovely scenery, great fishing, just a few riffles, and it finishes back at our base. It is a perfect trip for those wishing to take their time, or those on a limited schedule.",
    location: "145 FM 103",
    price: 65.0,
  },
  {
    category: "Adventures",
    id: "A103",
    name: "River Runners: Ride the Rapids",
    description:
      "Experience 3-4 hours of Class II and III whitewater rafting with breathtaking scenery. It is a fun, thrilling, and memorable adventure that everyone from ages 8 and up can enjoy – no experience necessary!",
    location: "145 FM 103",
    price: 145.0,
  },
  {
    category: "Arts & Crafts",
    id: "AC101",
    name: "Painting with a Twist : Oils",
    description:
      "Enjoy 2 hours of creating an oil painting by following along with an experienced artist.  Drinks and snacks are included.",
    location: "1991 Paint Drive",
    price: 40.0,
  },
  {
    category: "Arts & Crafts",
    id: "AC102",
    name: "Painting with a Twist : Watercolor",
    description:
      "Enjoy 2 hours of creating a watercolor painting by following along with an experienced artist.  Drinks and snacks are included.",
    location: "1991 Paint Drive",
    price: 40.0,
  },
  {
    category: "Museums",
    id: "M101",
    name: "Bravings Airship Museum",
    description:
      "Enjoy climbing on and in our collection of small airplanes.  You will find bi-planes, experimental planes and small jets.",
    location: "101 Airfield Drive",
    price: 10.0,
  },
  {
    category: "Museums",
    id: "M102",
    name: "Forks and Spoons Museum",
    description:
      "Enjoy touring our qwerky Forks and Spoons Museum.  It houses the worlds largest collection of, you guessed it, forks and spoons!",
    location: "1056 Lost Knives Court",
    price: 3.0,
  },
  {
    category: "Museums",
    id: "M103",
    name: "Steenges Computing Museum",
    description:
      "Enjoy our the Stengees Computing Museum that illustrates how computing has changed over the last 60 years.",
    location: "103 Technology Way",
    price: 0.0,
  },
  {
    category: "Wine Tastings",
    id: "WT-101",
    name: "Hastings Winery Tours and Tastings",
    description:
      "Hastings Winery is a small, family owned winery in the heart of San Jose, CA. We pride ourselves on producing single vineyard, small-batch, handcrafted premium wines sourced from the finest grapes in our valley.",
    location: "10987 FM 1187",
    price: 12.0,
  },
  {
    category: "Wine Tastings",
    id: "WT-102",
    name: "Lone Oak Winery",
    description:
      "We are a family and friend centered winery that thrives to make each of our guests feel right at home. With a growing wine list of the finest local wines, we offer tours and an incredible experience. We are open for to-go, curbside, and delivery.",
    location: "121 Burleson Court",
    price: 0.0,
  },
  {
    category: "Other",
    id: "OTH101",
    name: "Fire Department: Ride Along",
    description:
      "Spend the day hanging out at one of our local fire stations, visiting with the staff and learning about their jobs.  If they receive a call, you can ride along with them!",
    location: "10 Redline Drive",
    price: 25.0,
  },
  {
    category: "Other",
    id: "OTH102",
    name: "Homes For Our Neighbors",
    description:
      "Yes, you are a visitor!  But what better way to learn about a community than volunteer with the locals to build affordable housing.  Whether it be for an hour or a week, we would love to have you with us!",
    location: "Call (555) 555-5555",
    price: 0.0,
  },
];

window.onload = () => {
  const categorySelect = document.getElementById("categories");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    categorySelect.appendChild(option);
  });
  categorySelect.addEventListener("change", displayActivities);
};

function displayActivities() {
  const selectedCategory = document.getElementById("categories").value;
  const activitiesSelect = document.getElementById("activities");
  activitiesSelect.innerHTML = "<option>Select one</option>"; // RESET activities dropdown

  const matchingActivities = activities.filter(
    (activity) => activity.category === selectedCategory
  );

  matchingActivities.forEach((activity) => {
    const option = document.createElement("option");
    option.textContent = activity.name;
    activitiesSelect.appendChild(option);
  });

  activitiesSelect.disabled = false;
  activitiesSelect.addEventListener("change", displayActivityDetails);
}

function displayActivityDetails() {
  const selectedActivity = document.getElementById("activities").value;
  const activity = activities.find((act) => act.name === selectedActivity);

  const detailsDiv = document.getElementById("activity-details");
  detailsDiv.innerHTML = `
    <h2>${activity.name}</h2>
    <p>${activity.description}</p>
    <p><strong>Location:</strong> ${activity.location}</p>
    <p><strong>Price:</strong> $${activity.price.toFixed(2)}</p>
    ${activity.price > 0 ? displayPurchaseForm(activity) : ""}
    `;
}

function displayPurchaseForm(activity) {
  return `
    <form id="purchase-form">
                <label for="ticketCount">Number of Tickets</label>
                <input type="number" id="ticketCount" name="ticketCount" min="1" required>
                <br>
                <label for="ccNumber">Credit Card Number</label>
                <input type="text" id="ccNumber" name="ccNumber" required>
                <br>
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
                <br>
                <button type="submit">Purchase Tickets</button>
                <button type="reset">Reset</button>
            </form>
            <p id="confirmation-message"></p>
    `;
}

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const ticketCount = document.getElementById("ticketCount").value;
  const activity = activities.find(
    (act) => act.name === document.getElementById("activities").value
  );

  const confirmationMessage = `
    Your credit card has been charged $${(ticketCount * activity.price).toFixed(
      2
    )} for ${ticketCount} tickets to ${activity.name}.
  `;
  document.getElementById("confirmation-message").textContent =
    confirmationMessage;
});

document.addEventListener("reset", (event) => {
  document.getElementById("activity-details").innerHTML = "";
  document.getElementById("confirmation-message").textContent = "";
  document.getElementById("categories").selectedIndex = 0;
  document.getElementById("activities").innerHTML =
    "<option>Select one</option>";
  document.getElementById("activities").disabled = true;
});
