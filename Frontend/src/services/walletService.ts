/**
 * Payment/Wallet Service
 * Handles wallet and payment operations
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { Wallet, WalletTransaction } from "../shared/types";

/**
 * Get wallet balance
 */
export async function getWalletBalance(): Promise<Wallet> {
  try {
    const response = await apiClient.get<Wallet>(API_ENDPOINTS.WALLET.BALANCE);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch wallet");
    }

    return response.data!;
  } catch (error) {
    console.error("Get wallet balance error:", error);
    throw error;
  }
}

/**
 * Get transaction history
 */
export async function getTransactionHistory(
  page: number = 1,
  limit: number = 20
): Promise<WalletTransaction[]> {
  try {
    const response = await apiClient.get<WalletTransaction[]>(
      API_ENDPOINTS.WALLET.TRANSACTIONS,
      { params: { page, limit } }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch transactions");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get transaction history error:", error);
    throw error;
  }
}

/**
 * Add funds to wallet
 */
export async function topupWallet(
  amount: number,
  paymentMethod: string
): Promise<{ transactionId: string; status: string }> {
  try {
    const response = await apiClient.post<{ transactionId: string; status: string }>(
      API_ENDPOINTS.WALLET.TOPUP,
      { amount, paymentMethod }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to top up wallet");
    }

    return response.data!;
  } catch (error) {
    console.error("Topup wallet error:", error);
    throw error;
  }
}

/**
 * Withdraw funds from wallet
 */
export async function withdrawFromWallet(
  amount: number,
  bankAccount: string
): Promise<{ transactionId: string; status: string }> {
  try {
    const response = await apiClient.post<{ transactionId: string; status: string }>(
      `${API_ENDPOINTS.WALLET.BALANCE}/withdraw`,
      { amount, bankAccount }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to withdraw funds");
    }

    return response.data!;
  } catch (error) {
    console.error("Withdraw error:", error);
    throw error;
  }
}
