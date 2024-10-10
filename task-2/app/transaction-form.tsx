'use client'
import { Button, Container, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { KeyboardBackspace } from '@mui/icons-material';

// Define schema with Zod for validation
const transactionSchema = z.object({
  time: z.string().min(1, "Thời gian là bắt buộc"),
  quantity: z.number().min(0.01, "Số lượng phải lớn hơn 0"),
  unit: z.string().min(1, "Đơn vị là bắt buộc"),
  revenue: z.number().min(1, "Doanh thu phải lớn hơn 0"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
});

type TransactionFormInputs = z.infer<typeof transactionSchema>;

const TransactionForm = () => {
  const [transactionTime, setTransactionTime] = useState(new Date().toISOString());
  const defaultValues = {
    time: '',
    quantity: 0,
    unit: '',
    revenue: 0,
    price: 0,
  }
  const { control, handleSubmit, formState: { errors } } = useForm<TransactionFormInputs>({
    defaultValues,
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = (data: TransactionFormInputs) => {
    console.log('Form data: ', data);
    confirm('Submit successfully')
  };

  return (
    <Container maxWidth="sm" className='mt-8'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between'>
          <Button startIcon={<KeyboardBackspace />} variant='text' className='bg-transparent text-black hover:bg-transparent p-0'>Đóng</Button>
          <Button variant="contained" color="primary" type='submit' className='bg-[#007bff]' size='large'>
            Cập nhật
          </Button>
        </div>
        <Typography variant="h4" gutterBottom fontWeight={'bold'}>
          Nhập giao dịch
        </Typography>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TextField
              label="Thời gian"
              type="datetime-local"
              fullWidth
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...field}
              onChange={(e) => {
                setTransactionTime(e.target.value);
                field.onChange(e.target.value);
              }}
              error={!!errors.time}
              helperText={errors.time?.message}
            />
          )}
        />

        {/* Quantity Input */}
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <TextField
              label="Số lượng"
              type="number"
              fullWidth
              margin="normal"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />

        {/* Unit Dropdown */}
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Trụ"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.unit}
              helperText={errors.unit?.message}
            >
              <MenuItem value="unit1">Unit 1</MenuItem>
              <MenuItem value="unit2">Unit 2</MenuItem>
            </TextField>
          )}
        />

        {/* Revenue Input */}
        <Controller
          name="revenue"
          control={control}
          render={({ field }) => (
            <TextField
              label="Doanh thu"
              type="number"
              fullWidth
              margin="normal"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
              error={!!errors.revenue}
              helperText={errors.revenue?.message}
            />
          )}
        />

        {/* Price Input */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              label="Đơn giá"
              type="number"
              fullWidth
              margin="normal"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />

      </form>

    </Container>
  );
};

export default TransactionForm;
