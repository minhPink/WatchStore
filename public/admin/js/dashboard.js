// const ctx = document.querySelector('.activity-chart');
const ctx2 = document.querySelector(".prog-chart");

// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//         datasets: [{
//             label: 'Time',
//             data: [8, 6, 7, 6, 10, 8, 4],
//             backgroundColor: '#1e293b',
//             borderWidth: 3,
//             borderRadius: 6,
//             hoverBackgroundColor: '#60a5fa'
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 border: {
//                     display: true
//                 },
//                 grid: {
//                     display: true,
//                     color: '#1e293b'
//                 }
//             },
//             y: {
//                 ticks: {
//                     display: false
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//         animation: {
//             duration: 1000,
//             easing: 'easeInOutQuad',
//         }
//     }
// });

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: [
          6000000, 10000000, 8000000, 14000000, 6000000, 7000000, 4000000,
          8000000, 15000000, 18000000, 14000000, 9000000,
        ],
        borderColor: "#0891b2",
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: true,
        },
        border: {
          display: false,
          dash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  },
});
