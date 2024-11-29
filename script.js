const ridersData = [
  { name: "John Doe", time: "1:20:30", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Jane Smith", time: "1:21:15", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Bob Brown", time: "1:22:10", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Alice Green", time: "1:23:05", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Charlie White", time: "1:25:20", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Emily Black", time: "1:26:50", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "David Blue", time: "1:27:35", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Fiona Pink", time: "1:28:40", img: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "George Yellow", time: "1:30:10", img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Hannah Violet", time: "1:32:50", img: "https://randomuser.me/api/portraits/women/5.jpg" },
  { name: "John Doe", time: "1:20:30", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Jane Smith", time: "1:21:15", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Bob Brown", time: "1:22:10", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Alice Green", time: "1:23:05", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Charlie White", time: "1:25:20", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Emily Black", time: "1:26:50", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "David Blue", time: "1:27:35", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Fiona Pink", time: "1:28:40", img: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "George Yellow", time: "1:30:10", img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Hannah Violet", time: "1:32:50", img: "https://randomuser.me/api/portraits/women/5.jpg" },
  // Add more riders to simulate more than 30
];

let currentPage = 1;
const ridersPerPage = 10;

function renderLeaderboard() {
  const tableBody = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * ridersPerPage;
  const endIndex = Math.min(startIndex + ridersPerPage, ridersData.length);
  
  for (let i = startIndex; i < endIndex; i++) {
    const rider = ridersData[i];
    const row = tableBody.insertRow();

    // Rank highlighting for top 3
    const rankCell = row.insertCell(0);
    const riderCell = row.insertCell(1);
    const timeCell = row.insertCell(2);

    rankCell.innerText = i + 1;
    riderCell.innerHTML = `<img src="${rider.img}" alt="${rider.name}"> ${rider.name}`;
    timeCell.innerText = rider.time;

    // Apply ranking background colors
    if (i === 0) {
      row.classList.add('rank-1');
    } else if (i === 1) {
      row.classList.add('rank-2');
    } else if (i === 2) {
      row.classList.add('rank-3');
    }
  }

  // Update button states
  document.getElementById('prev').disabled = currentPage === 1;
  document.getElementById('next').disabled = currentPage * ridersPerPage >= ridersData.length;
}

function changePage(direction) {
  currentPage += direction;
  renderLeaderboard();
}

renderLeaderboard();
