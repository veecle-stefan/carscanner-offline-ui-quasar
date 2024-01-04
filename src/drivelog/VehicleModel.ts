import { HeaderMapping, VehicleRecords } from './VehicleRecords';

export class VehicleModel {
  records: VehicleRecords;
  driveTimeS = 0;
  WattHours = 0;
  consumption = 0;
  totalDistanceM = 0;
  averageSpeed = 0;

  constructor(records: VehicleRecords) {
    this.records = records;
    this.compute();
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    alt1: number,
    lat2: number,
    lon2: number,
    alt2: number,
  ) {
    const R = 6371000; // Radius of the Earth in meters

    // Convert latitude and longitude from degrees to radians
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;

    // Haversine formula for horizontal distance
    const deltaLat = radLat2 - radLat1;
    const deltaLon = radLon2 - radLon1;
    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const horizontalDistance = R * c;

    // Calculate the difference in altitude
    const deltaAlt = alt2 - alt1;

    if (isNaN(deltaAlt)) {
      console.log('Something is wrong!');
    }

    // Calculate the total distance considering the elevation difference
    const totalDistance = Math.sqrt(horizontalDistance ** 2 + deltaAlt ** 2);

    return totalDistance; // Distance in meters
  }

  compute() {
    /*
        const SOCrange = this.records.ranges.State_of_charge;
        const capacity = this.records.ranges.Battery_DC_Capacity_kWh;
        console.log(`This trip used ${SOCrange.span}% of the battery (${SOCrange.min}% to ${SOCrange.max}%)`);
        console.log(`This trip used supposedly ${capacity.span} kWh of the battery`);

        let lastRecord: HeaderMapping | undefined = undefined;
        let WattSeconds = 0;
        let driveTime = 0;
        this.totalDistanceM = 0;
        for (const r of this.records.records) {
            const dcA = r.Battery_DC_Current_A;
            const dcV = r.Battery_DC_Voltage_V;
            if ((dcA !== undefined) && (dcA != "") && (dcV !== undefined) && (dcV != "")) {
                if (lastRecord != null) {
                    const timeDiffMS = r.timestamp - lastRecord.timestamp;
                    const seconds = (timeDiffMS / 1000);
                    const power =  dcA * dcV;
                    const distance = this.calculateDistance(r.Latitude, r.Longtitude, r.Altitude_GPS_m, lastRecord.Latitude, lastRecord.Longtitude, lastRecord.Altitude_GPS_m);
                    this.totalDistanceM += distance;
                    WattSeconds += power * seconds;
                    driveTime += seconds;
                }
                lastRecord = r;
            }
        }

        this.driveTimeS = Math.trunc(driveTime);
        this.WattHours = Math.trunc(WattSeconds / 3600);
        this.consumption = this.WattHours / (this.totalDistanceM / 1000);
        this.averageSpeed = (this.totalDistanceM / 1000) / (driveTime / 3600);

        console.log(`Computed actual coulomb count: ${this.WattHours} Wh`);
        console.log(`Computed actual drive time: ${Math.trunc(driveTime/3600)}h:${Math.trunc(driveTime / 60) % 60}m `);
        console.log(`Total distance travelled: ${this.totalDistanceM / 1000} km`);
        console.log(`Consumption: ${this.consumption} Wh/km`);
        console.log(`Avg Speed: ${this.averageSpeed} km/h`);
        */
  }
}
