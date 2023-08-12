import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from 'react-chartjs-2';

import { Booking } from "../../../models/booking";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const YearlyEarningsReport = (props: any) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const uniqueMonths = new Set<string>();
  const uniqueYears = new Set<number>();
  const monthHoursMap: Record<string, number[]> = {};

  props.data.forEach((booking: Booking) => {
    const bookingDate = new Date(booking.parking_date_time);
    const month = bookingDate.getMonth(); // Months are 0-based
    const year = bookingDate.getFullYear();
    const hours = booking.hours;

    if (!monthHoursMap.hasOwnProperty(month)) {
      monthHoursMap[month] = [];
    }

    monthHoursMap[month].push(hours);
    uniqueMonths.add(monthNames[month]);
    uniqueYears.add(year);
  });

  const monthsArray = Array.from(uniqueMonths);
  //const yearsArray = Array.from(uniqueYears);

  const monthlyTotalHoursArray: number[] = [];

  for (const month in monthHoursMap) {
    if (Object.prototype.hasOwnProperty.call(monthHoursMap, month)) {
      const totalHours = monthHoursMap[month].reduce(
        (acc, hours) => acc + hours + 2,
        0
      );
      monthlyTotalHoursArray.push(totalHours);
    }
  }

  const [data] = useState({
    labels: monthsArray,
    datasets: [
      {
        label: "2023",
        data: monthlyTotalHoursArray,
        backgroundColor: ["rgb(153, 102, 255)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  });

  return (
    <Box sx={{height: "300px", width: 1 , textAlign: "center" }}>
        <Typography variant="h5"><b>Yearly Earnings Report</b></Typography>
      <Bar data={data} />
    </Box>
  );
};

export default YearlyEarningsReport;
