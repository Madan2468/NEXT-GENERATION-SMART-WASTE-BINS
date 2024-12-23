import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RouteOptimization.css";
import * as turf from "@turf/turf";

// Custom car icon
const createCarIcon = (color = "blue") =>
  L.divIcon({
    html: `<div style="font-size: 24px; color: ${color};"><i class="fa fa-car"></i></div>`,
    className: "custom-car-icon",
  });

const RouteOptimization = () => {
  const [routes, setRoutes] = useState([]); // Store routes for all trucks

  // Sample data for bins
  const bins = [
    {
      id: 1,
      name: "Bin 1",
      coords: [28.6139, 77.209],
      fillLevel: 80,
      capacity: 100,
    },
    {
      id: 2,
      name: "Bin 2",
      coords: [28.5355, 77.391],
      fillLevel: 50,
      capacity: 100,
    },
    {
      id: 3,
      name: "Bin 3",
      coords: [28.4595, 77.0266],
      fillLevel: 90,
      capacity: 100,
    },
    {
      id: 4,
      name: "Bin 4",
      coords: [28.7041, 77.1025],
      fillLevel: 75,
      capacity: 100,
    },
    {
      id: 5,
      name: "Bin 5",
      coords: [28.4089, 77.3178],
      fillLevel: 60,
      capacity: 100,
    },
    {
      id: 6,
      name: "Bin 6",
      coords: [28.5, 77.3],
      fillLevel: 85,
      capacity: 100,
    },
    {
      id: 7,
      name: "Bin 7",
      coords: [28.7, 77.2],
      fillLevel: 95,
      capacity: 100,
    },
    {
      id: 8,
      name: "Bin 8",
      coords: [28.52, 77.25],
      fillLevel: 40,
      capacity: 100,
    },
    {
      id: 9,
      name: "Bin 9",
      coords: [28.555, 77.2025],
      fillLevel: 70,
      capacity: 100,
    },
    {
      id: 10,
      name: "Bin 10",
      coords: [28.63, 77.1],
      fillLevel: 90,
      capacity: 100,
    },
    {
      id: 11,
      name: "Bin 11",
      coords: [28.515, 77.25],
      fillLevel: 75,
      capacity: 100,
    },
    {
      id: 12,
      name: "Bin 12",
      coords: [28.505, 77.12],
      fillLevel: 80,
      capacity: 100,
    },
    {
      id: 13,
      name: "Bin 13",
      coords: [28.45, 77.05],
      fillLevel: 85,
      capacity: 100,
    },
    {
      id: 14,
      name: "Bin 14",
      coords: [28.605, 77.22],
      fillLevel: 100,
      capacity: 100,
    },
    {
      id: 15,
      name: "Bin 15",
      coords: [28.705, 77.35],
      fillLevel: 70,
      capacity: 100,
    },
    {
      id: 16,
      name: "Bin 16",
      coords: [28.5, 77.15],
      fillLevel: 95,
      capacity: 100,
    },
    {
      id: 17,
      name: "Bin 17",
      coords: [28.46, 77.2],
      fillLevel: 65,
      capacity: 100,
    },
    {
      id: 18,
      name: "Bin 18",
      coords: [28.52, 77.31],
      fillLevel: 80,
      capacity: 100,
    },
  ];

  // Sample data for trucks
  const trucks = [
    {
      id: 1,
      name: "Truck 1",
      capacity: 150,
      coords: [28.6139, 77.209],
      color: "blue",
    },
    {
      id: 2,
      name: "Truck 2",
      capacity: 150,
      coords: [28.6139, 77.209],
      color: "green",
    },
    {
      id: 3,
      name: "Truck 3",
      capacity: 150,
      coords: [28.6139, 77.209],
      color: "red",
    },
    {
      id: 4,
      name: "Truck 4",
      capacity: 150,
      coords: [28.6139, 77.209],
      color: "purple",
    },
    {
      id: 5,
      name: "Truck 5",
      capacity: 150,
      coords: [28.6139, 77.209],
      color: "orange",
    },
  ];

  const depot = [28.6139, 77.209]; // Depot location (same for all trucks)

  const calculateCVRP = () => {
    const truckRoutes = trucks.map((truck) => ({
      truck,
      route: [],
      remainingCapacity: truck.capacity,
    }));
    const remainingBins = bins.filter((bin) => bin.fillLevel > 70); // Filter bins by fill level > 70

    // Assign bins to trucks based on nearest neighbor heuristic
    remainingBins.forEach((bin) => {
      let bestTruck = null;
      let bestDistance = Infinity;

      truckRoutes.forEach((truckRoute) => {
        const lastPoint =
          truckRoute.route.length > 0
            ? truckRoute.route[truckRoute.route.length - 1]
            : depot;
        const distance = turf.distance(
          turf.point(lastPoint),
          turf.point(bin.coords),
          { units: "kilometers" }
        );

        if (
          truckRoute.remainingCapacity >= bin.fillLevel &&
          distance < bestDistance
        ) {
          bestTruck = truckRoute;
          bestDistance = distance;
        }
      });

      if (bestTruck) {
        bestTruck.route.push(bin.coords);
        bestTruck.remainingCapacity -= bin.fillLevel;
      }
    });

    // Return each truck to the depot
    truckRoutes.forEach((truckRoute) => {
      if (truckRoute.route.length > 0) {
        truckRoute.route.push(depot);
      }
    });

    setRoutes(truckRoutes);
  };

  return (
    <div className="route-optimization-container">
      <h1 className="route-optimization-title">Route Optimization</h1>
      <button onClick={calculateCVRP} className="route-optimization-button">
        Optimize Routes
      </button>
      <div className="route-optimization-map">
        <MapContainer
          center={[28.5355, 77.391]}
          zoom={11}
          scrollWheelZoom={true}
          className="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Render Bins */}
          {bins.map((bin) => (
            <Marker
              key={bin.id}
              position={bin.coords}
              icon={L.divIcon({
                html: `<div style="font-size: 12px; color: black;">📍</div>`,
                className: "custom-bin-icon",
              })}
            >
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={0.9}
                permanent
              >
                {bin.name} (Fill: {bin.fillLevel}/{bin.capacity})
              </Tooltip>
            </Marker>
          ))}
          {/* Render Trucks and Routes */}
          {routes.map(({ truck, route }, index) => (
            <React.Fragment key={index}>
              <Marker
                position={depot}
                icon={createCarIcon(truck.color)} // Truck's icon
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={0.9}
                  permanent
                >
                  {truck.name}
                </Tooltip>
              </Marker>
              <Polyline
                positions={[depot, ...route]}
                color={truck.color}
                weight={4}
                dashArray="5, 10"
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteOptimization;
