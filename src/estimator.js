const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let days;
  if (data.periodType === 'days') {
    days = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    days = data.timeToElapse * 7;
  } else if (data.periodType === 'months') {
    days = data.timeToElapse * 30;
  }
  // Challenge 1
  impact.currentlyInfected = Math.trunc(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(data.reportedCases * 50);
  const value = Math.trunc(days / 3);
  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * 2 ** value);
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * 2 ** value);
  // Challenge 2
  // severe cases by requested time
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  // hospital Bed capacity
  impact.hospitalBedsByRequestedTime = Math.trunc(
    (data.totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    (data.totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime
  );
  // Challenge 3
  // Cases for ICU Bed
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );
  // Cases Requiring Ventilators
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );
  // Dollars in flight
  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime
    * data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation) / days
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime
    * data.region.avgDailyIncomeInUSD
    * data.region.avgDailyIncomePopulation) / days
  );

  return {
    data,
    impact,
    severeImpact
  };
};
// console.log(covid19ImpactEstimator(
//   {
//     region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//     },
//     periodType: "days",
//     timeToElapse: 58,
//     reportedCases: 674,
//     population: 66622705,
//     totalHospitalBeds: 1380614
//    }
// ));
export default covid19ImpactEstimator;
// module.exports = covid19ImpactEstimator;
