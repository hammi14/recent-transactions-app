import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TransactionsScreen from "../app/(tabs)/transactions"; // Sesuaikan path dengan lokasi file komponenmu
import transactionsData from '../src/data/mockTransactions';

// Mock data transaksi untuk pengujian
jest.mock("../src/data/mockTransactions", () => [
  { id: "1", name: "Burger King", amount: 80, category: "Food", date: "2025-04-27" },
  { id: "2", name: "Bus Ticket", amount: 15, category: "Transport", date: "2025-04-27" },
  { id: "3", name: "Netflix", amount: 120, category: "Entertainment", date: "2025-04-26" },
  { id: "4", name: "Starbucks", amount: 55, category: "Food", date: "2025-04-25" },
  { id: "5", name: "Train Ticket", amount: 40, category: "Transport", date: "2025-04-24" },
  { id: "6", name: "Groceries", amount: 200, category: "Shopping", date: "2025-04-23" },
  { id: "7", name: "Spotify", amount: 75, category: "Entertainment", date: "2025-04-22" },
  { id: "8", name: "McDonalds", amount: 90, category: "Food", date: "2025-04-21" },
  { id: "9", name: "Uber", amount: 60, category: "Transport", date: "2025-04-20" },
  { id: "10", name: "Shopee", amount: 150, category: "Shopping", date: "2025-04-19" },
]);

describe('TransactionsScreen', () => {
  it('calculates total correctly', () => {
    const { getByText } = render(<TransactionsScreen />);

    // Total perhitungan berdasarkan semua transaksi
    const total = 80 + 15 + 120 + 55 + 40 + 200 + 75 + 90 + 60 + 150;
    expect(getByText(`Total: $${total}`)).toBeTruthy();
  });

  it('updates total when filtered by search', () => {
    const { getByText, getByTestId } = render(<TransactionsScreen />);

    // Cari transaksi berdasarkan kategori 'Food'
    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'Food');

    // Transaksi yang terfilter hanya kategori 'Food'
    const filteredTotal = 80 + 55 + 90;
    expect(getByText(`Total: $${filteredTotal}`)).toBeTruthy();
  });
});
