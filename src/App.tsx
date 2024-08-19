import React, { useState } from 'react';
import './App.css';
import { LoggingService } from './services/LoggingService';

function App() {
  const [bottleCount, setBottleCount] = useState(0);
  const [canCount, setCanCount] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [lastInsertionTime, setLastInsertionTime] = useState<number | null>(null);

  const handleBottleClick = async () => {
    const currentTime = Date.now();
    const newBottleCount = bottleCount + 1;

    if (lastInsertionTime && currentTime - lastInsertionTime < 1000) {
      alert('You are inserting too quickly!');
      return;
    }

    setBottleCount(newBottleCount);
    setLastInsertionTime(currentTime);

    await LoggingService.logEvent({stationId: 'Station1', eventType: 'Bottle Turn-In', bottleCount: newBottleCount, canCount: canCount, voucherAmount: calculateTotalAmount(newBottleCount, canCount)});
  };

  const handleCanClick = async () => {
    const currentTime = Date.now();
    const newCanCount = canCount + 1;

    if (lastInsertionTime && currentTime - lastInsertionTime < 500) {
      alert('You are inserting too quickly!');
      return;
    }

    setCanCount(newCanCount);
    setLastInsertionTime(currentTime);

    await LoggingService.logEvent({stationId: 'Station1', eventType: 'Can Turn-In', bottleCount: bottleCount, canCount: newCanCount, voucherAmount: calculateTotalAmount(bottleCount, newCanCount)});
  };

  const handleGenerateVoucher = async () => {
    const totalAmount = calculateTotalAmount(bottleCount, canCount);

    setVoucherAmount(totalAmount);

    await LoggingService.logEvent({stationId: 'Station1', eventType: 'Voucher Printed', bottleCount: bottleCount, canCount: canCount, voucherAmount: totalAmount});

    setBottleCount(0);
    setCanCount(0);
  };

  const calculateTotalAmount = (bottleCount: number, canCount: number) => {
    return bottleCount * 3 + canCount * 2;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <h1 className="main-title">Bottle Deposit Machine</h1>
          <div className="controls-container">
            <div className="control-section">
              <button onClick={handleBottleClick}>Insert Bottle</button>
              <div>Bottles Count: <input type="text" value={bottleCount} readOnly /></div>
            </div>
            <div className="control-section">
              <button onClick={handleCanClick}>Insert Can</button>
              <div>Cans Count: <input type="text" value={canCount} readOnly /></div>
            </div>
          </div>
          <div className="voucher-section">
            <button className="voucher-button" onClick={handleGenerateVoucher}>
              Print Voucher
            </button>
            <h2>Total Voucher Amount: {voucherAmount} NOK</h2>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
