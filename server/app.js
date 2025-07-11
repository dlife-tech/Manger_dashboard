const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controller/erorController');
const AppError = require('./Utils/appError');
const handlerFunction = require('./Routes/User');

const userRouter = require('./Routes/User');
const HotelRouter = require('./Routes/Hotel');
const ResortRouter = require('./Routes/Resort');
const LodgeRouter = require('./Routes/Lodge');
const GuestHouseRouter = require('./Routes/Guesthouse');
const PalaceRouter = require('./Routes/Palace');
const HouseboatRouter = require('./Routes/Houseboat');
const VillaRouter = require('./Routes/Villa');
const HomestayRouter = require('./Routes/Homestay');
const CottageRouter = require('./Routes/Cottage');
const ApartmentRouter = require('./Routes/Apartment');
const ApartHotelmentRouter = require('./Routes/Apart_hotel');
const HostelRouter = require('./Routes/Hostel');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/v1/user', userRouter);
app.use('/hotel', HotelRouter);
app.use('/resort', ResortRouter);
app.use('/lodge', LodgeRouter);
app.use('/guesthouse', GuestHouseRouter);
app.use('/palace', PalaceRouter);
app.use('/houseboat', HouseboatRouter);
app.use('/villa', VillaRouter);
app.use('/homestay', HomestayRouter);
app.use('/cottage', CottageRouter);
app.use('/apartment', ApartmentRouter);
app.use('/aparthotel', ApartHotelmentRouter);
app.use('/hostel', HostelRouter);

// Global error handler
app.use(globalErrorHandler);

// Fallback route for unhandled paths
app.use('/:id', handlerFunction);

module.exports = app;
