let area = [40.0, -98.5]; // zoom level currently set to US area - zoom variable can change with more data if bridges array has more data added

let zoomLevel = 4; // 1 = whole world, 20 = city blocks set zoom level to 1 see more of the map

// Map is basically where do we put the map tools on what page
// Set view method takes 2 arguments, where and how far to zoom to
let map = L.map('bridge-map').setView(area, zoomLevel);

// Building map tiles layer from open street map library and adding them to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 5 largest Bridges Array Objects
let bridges = [
    {
        name: 'Verrazano-Narrows Bridge',
        location: [40.6066, -74.0447],
        span: '1298.4 meters',
        city: 'New York, NY',
    },
    {
        name: 'Golden Gate Bridge',
        location: [37.8199, -122.4783],
        span: '1280.2 meters',
        city: 'San Francisco and Marin, CA',
    },
    {
        name: 'Mackinac Bridge',
        location: [45.8174, -84.7278],
        span: '1158.0 meters',
        city: 'Mackinaw and St Ignace, MI',
    },
    {
        name: 'George Washington Bridge',
        location: [40.8517, -73.9527],
        span: '1067.0 meters',
        city: 'New York, NY and New Jersey, NJ',
    },
    {
        name: 'Tacoma Narrows Bridge',
        location: [47.269, -122.5517],
        span: '853.44 meters',
        city: 'Tacoma and Kitsap, WA',
    },
];

// Bridge Icon
// L.icon allows us to customize our marker through objects
let bridgeIcon = L.icon({
    iconUrl: 'bridge.png',
    iconSize: [20, 40],
});

// Largest bridge icon
let largestBridgeIcon = L.icon({
    iconUrl: 'largestBridge.png',
    iconSize: [38, 95],
});

// Largest bridge span, then replace it with the largest   bridge icon
// Reduce allows us to go through our bridges array- where max is the max value and bridge is the current bridge or index being process throughout the array.
// Math.max() compares 2 values (current max value (starts with initial  first element value of bridge from bridges[0].span length) and the current bridge span, however we need to parse them into floats/ numbers because they are strings in the array the largest value compared of the 2 is the new largest value until the next value beats it, replacing it essentially. The value of reduce is being assigned by largest bridge and so when we use the value, it will have the largest value (span length) and it will work with more data inside the bridges array.
let largestBridge = bridges.reduce(
    (max, bridge) => Math.max(parseFloat(max), parseFloat(bridge.span)),
    bridges[0].span
);
// looping each and putting markers on those 5 bridges where 1 of those bridges will be replaced with a large bridge icon based on the largest bridge variable
bridges.forEach(function (bridge) {
    let bridgeName = bridge.name;

    let bridgeCity = bridge.city;

    let bridgeLocation = bridge.location;

    let bridgeSpan = bridge.span;

    // If the current bridge span === to the largestBridge variable, set the marker of that bridge location to largest bridge icon with info desc
    if (parseFloat(bridgeSpan) === largestBridge) {
        L.marker(bridgeLocation, {
            icon: largestBridgeIcon,
        })
            .bindPopup(
                `<br>${bridgeName}</br><br>${bridgeCity}</br><br>${bridgeSpan}</br><b>Currently the largest bridge!</b>`
            )
            .addTo(map);
        // Else add the rest of the bridges as regular bridge icon and respective info icon
    } else {
        L.marker(bridgeLocation, {
            icon: bridgeIcon,
        })
            .bindPopup(
                `<br>${bridgeName}</br><br>${bridgeCity}</br><br>${bridgeSpan}</br>`
            )
            .addTo(map);
    }
});