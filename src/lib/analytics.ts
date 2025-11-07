import { Car } from './api';

export interface PerformanceScore {
  carId: string;
  carName: string;
  overallScore: number;
  speedScore: number;
  accelerationScore: number;
  aerodynamicsScore: number;
  efficiencyScore: number;
}

export interface LeaderboardEntry extends PerformanceScore {
  rank: number;
  constructor: string;
}

export const calculatePerformanceScore = (car: Car): PerformanceScore => {
  // Normalize scores to 0-100 scale
  const speedScore = Math.min((car.top_speed_kmh / 370) * 100, 100);
  const accelerationScore = Math.min((3 / car.acceleration_0_100_kmh) * 100, 100);
  const aerodynamicsScore = Math.min((car.downforce_kgf / 3500) * 100, 100);
  const efficiencyScore = Math.min(((800 - car.minimum_weight_kg) / 50) * 100, 100);

  const overallScore = (speedScore + accelerationScore + aerodynamicsScore + efficiencyScore) / 4;

  return {
    carId: car.car_id,
    carName: car.car_name,
    overallScore: Math.round(overallScore),
    speedScore: Math.round(speedScore),
    accelerationScore: Math.round(accelerationScore),
    aerodynamicsScore: Math.round(aerodynamicsScore),
    efficiencyScore: Math.round(efficiencyScore),
  };
};

export const generateLeaderboard = (cars: Car[]): LeaderboardEntry[] => {
  const scores = cars.map(car => ({
    ...calculatePerformanceScore(car),
    constructor: car.constructor,
  }));

  const sorted = scores.sort((a, b) => b.overallScore - a.overallScore);
  
  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
};

export const calculateAverageStats = (cars: Car[]) => {
  if (cars.length === 0) return null;

  const sum = cars.reduce((acc, car) => ({
    topSpeed: acc.topSpeed + car.top_speed_kmh,
    acceleration: acc.acceleration + car.acceleration_0_100_kmh,
    downforce: acc.downforce + car.downforce_kgf,
    weight: acc.weight + car.minimum_weight_kg,
  }), { topSpeed: 0, acceleration: 0, downforce: 0, weight: 0 });

  return {
    avgTopSpeed: Math.round(sum.topSpeed / cars.length),
    avgAcceleration: (sum.acceleration / cars.length).toFixed(2),
    avgDownforce: Math.round(sum.downforce / cars.length),
    avgWeight: Math.round(sum.weight / cars.length),
    totalCars: cars.length,
  };
};

export const compareCars = (cars: Car[]) => {
  return cars.map(car => ({
    ...car,
    performance: calculatePerformanceScore(car),
  }));
};
