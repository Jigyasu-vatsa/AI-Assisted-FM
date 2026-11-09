import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBasicPriority,
  calculateLocationAwarePriority,
  getPriorityTier,
  runAlgorithm1Allocation,
  runSyntheticSimulation,
  calculateDistanceKm,
  computeRemainingExpiryHours,
} from './calculations';
import { FoodDonation, VolunteerProfile, FoodDemandRequest } from '../types';

test('Equation 1: Basic Priority Score = Q_i / (T_{e,i} + ε)', () => {
  // Q = 50kg, Te = 2.0h, ε = 0.1 => 50 / 2.1 ≈ 23.81
  const score = calculateBasicPriority(50, 2.0, 0.1);
  assert.equal(score, 23.81);

  // When Te approaches 0 (imminent expiry), ε prevents division by zero
  const nearZeroScore = calculateBasicPriority(30, 0.0, 0.1);
  assert.equal(nearZeroScore, 300); // 30 / 0.1 = 300
});

test('Equation 2: Location-Aware Priority = [Q_i / (T_{e,i} + ε)] * [1 / (1 + D_i)]', () => {
  // Q = 40kg, Te = 1.9h, ε = 0.1 => basic = 40 / 2.0 = 20
  // D = 3.0km => weight = 1 / (1 + 3) = 0.25 => final = 20 * 0.25 = 5.0
  const score = calculateLocationAwarePriority(40, 1.9, 3.0, 0.1);
  assert.equal(score, 5.0);

  // Zero distance yields full basic score
  const zeroDistScore = calculateLocationAwarePriority(50, 2.0, 0, 0.1);
  assert.equal(zeroDistScore, 23.81);
});

test('Priority Tiers correctly classify urgency', () => {
  assert.equal(getPriorityTier(35), 'CRITICAL');
  assert.equal(getPriorityTier(15), 'HIGH');
  assert.equal(getPriorityTier(6), 'MEDIUM');
  assert.equal(getPriorityTier(1.2), 'LOW');
});

test('Algorithm 1: Allocates food candidates in descending order of Priority', () => {
  const dummyDonations: FoodDonation[] = [
    {
      id: 'DON-LOW',
      title: 'Bread with long expiry',
      category: 'Bakery & Bread',
      dietary: 'Vegetarian',
      condition: 'Ambient / Room Temp',
      quantityKg: 10,
      servings: 20,
      packaging: 'Carton',
      prepTimestamp: new Date().toISOString(),
      expiryTimestamp: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(), // 10h left
      providerId: 'p1',
      providerName: 'Provider 1',
      providerType: 'Bakery',
      location: { lat: 26.35, lng: 86.06, address: 'Test 1', zone: 'Zone A' },
      contactPhone: '9999999999',
      status: 'AVAILABLE',
      createdTimestamp: new Date().toISOString(),
    },
    {
      id: 'DON-HIGH',
      title: 'Urgent Large Cooked Meal',
      category: 'Cooked Meals',
      dietary: 'Vegetarian',
      condition: 'Hot & Fresh',
      quantityKg: 80,
      servings: 180,
      packaging: 'Thermal containers',
      prepTimestamp: new Date().toISOString(),
      expiryTimestamp: new Date(Date.now() + 1.2 * 60 * 60 * 1000).toISOString(), // 1.2h left
      providerId: 'p2',
      providerName: 'Provider 2',
      providerType: 'Hostel Mess',
      location: { lat: 26.36, lng: 86.07, address: 'Test 2', zone: 'Zone B' },
      contactPhone: '9999999999',
      status: 'AVAILABLE',
      createdTimestamp: new Date().toISOString(),
    },
  ];

  const dummyVolunteers: VolunteerProfile[] = [
    {
      id: 'vol-test-1',
      name: 'Ravi (EV)',
      phone: '9999999999',
      vehicleType: 'Electric Two-Wheeler',
      currentLocation: { lat: 26.355, lng: 86.065, address: 'Center', zone: 'Zone C' },
      activeStatus: 'Available',
      rating: 4.9,
      totalDeliveries: 10,
      totalKgSaved: 100,
      verificationBadge: true,
      joinedDate: '2026-01-01',
    },
  ];

  const dummyReceivers: FoodDemandRequest[] = [
    {
      id: 'rec-test-1',
      receiverId: 'rec-1',
      receiverName: 'Children Shelter',
      receiverType: 'Orphanage',
      requiredMeals: 100,
      urgency: 'Immediate (within 2h)',
      dietaryPreference: 'Vegetarian',
      location: { lat: 26.35, lng: 86.07, address: 'Shelter', zone: 'Zone B' },
      contactPhone: '9999999999',
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    },
  ];

  const result = runAlgorithm1Allocation(dummyDonations, dummyVolunteers, dummyReceivers, 0.1);

  assert.equal(result.complexity, 'O(n log n)');
  assert.equal(result.rankedAllocations.length, 2);
  // DON-HIGH must be ranked #1
  assert.equal(result.rankedAllocations[0].donationId, 'DON-HIGH');
  assert.equal(result.rankedAllocations[0].rank, 1);
  assert.ok(result.rankedAllocations[0].priorityScore > result.rankedAllocations[1].priorityScore);
});

test('Section 5 Synthetic Simulation: n=100 items validates Paper II metrics', () => {
  const result = runSyntheticSimulation(100, 1.0, 1.0, 12345);

  assert.equal(result.sampleSize, 100);
  assert.equal(result.complexityLabel, 'O(n log n)');
  assert.equal(result.dataset.length, 100);

  // Priority-based Wastage Reduction Rate must outperform FCFS
  assert.ok(result.priorityWastageReductionRate > result.fcfsWastageReductionRate);
  // Wastage reduction improvement in the 25-40% range as stated in Paper II
  assert.ok(result.wrrImprovementPercent >= 20);

  // Travel Distance Optimization (TDO) achieves 15-25% reduction
  assert.ok(result.travelDistanceOptimizationPercent >= 15);

  // Delivery efficiency improvement
  assert.ok(result.priorityDeliveryEfficiency > result.fcfsDeliveryEfficiency);
  // Allocation time reduction
  assert.ok(result.priorityAvgAllocationTimeMin < result.fcfsAvgAllocationTimeMin);
});

test('Haversine distance calculation is accurate', () => {
  // Sijoul (26.3698, 86.0585) to Madhubani Town (26.3582, 86.0694) ~1.7 - 2.0 km
  const dist = calculateDistanceKm(26.3698, 86.0585, 26.3582, 86.0694);
  assert.ok(dist >= 1.4 && dist <= 2.2);
});
