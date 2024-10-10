'use client';

import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { TextField, Button, Box, Paper, Divider } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'
import { Upload } from '@mui/icons-material';
import { Typography } from '@mui/material';

type RowData = any

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<RowData[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [total, setTotal] = useState<number>(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: RowData[] = utils.sheet_to_json(worksheet, {
          raw: true,
          range: 7,
        });
        setData(jsonData);
      };
      reader.readAsBinaryString(file);
      setFile(file);
    }
  };

  const handleCalculate = () => {
    if (startTime && endTime) {
      const filteredData = data.filter((item) => {
        const time = dayjs(item["Giờ"], 'HH:mm:ss');
        return time.isAfter(startTime) && time.isBefore(endTime);
      });

      console.log(filteredData)

      const totalAmount = filteredData.reduce((acc, item) => acc + item["Thành tiền (VNĐ)"], 0);
      setTotal(totalAmount);
    }
  };



  return (
    <div className='p-8 shadow bg-gray-100 h-screen'>
      <Paper className="h-full p-16 flex flex-col gap-8 ">
        <Box className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Upload .xlsx File</h1>

          <Button variant="contained" component="label" className="mb-4" startIcon={<Upload />}>
            Select Excel File
            <input type="file" accept=".xlsx" hidden onChange={handleFileUpload} />
          </Button>

          {file && <Typography color='success'>File uploaded: {file.name}</Typography>}

        </Box>

        <Divider />

        <Box className='flex-1 flex flex-col items-center'>
          <h1 className="text-2xl font-bold mb-4">Select time range to calcualte total amount</h1>
          <div className="flex flex-col gap-4 justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex space-x-4">
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  views={['hours', 'minutes', 'seconds']}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  minTime={startTime || undefined}
                  views={['hours', 'minutes', 'seconds']}
                />
              </div>
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalculate}
              disabled={!startTime || !endTime || !file}
            >
              Calculate Total
            </Button>
            {
              total && file
                ? <div className="mt-4">
                  <h2 className="text-xl font-bold">Total Amount: {total?.toLocaleString()} VNĐ</h2>
                </div>
                : ''
            }
          </div>

        </Box>
      </Paper>
    </div>

  );
};

export default UploadPage;