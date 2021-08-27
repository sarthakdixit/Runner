import haversine from 'haversine-distance'

export const calculateDistance = (lat1, lat2, long1, long2) => {
    const a = { latitude: lat1, longitude: long1 }
    const b = { latitude: lat2, longitude: long2 }
    return haversine(a, b)
}