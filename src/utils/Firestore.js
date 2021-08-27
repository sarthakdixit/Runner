import firestore from '@react-native-firebase/firestore'

export const FIRESTORE = {
    getData : async (coll, id) => {
        try{
            let arr = []
            let snap = await firestore().collection(coll).get()
            snap.forEach(documentSnapshot => {
                let obj = documentSnapshot.data()
                if(obj.user == id){
                    let t = obj.createdAt
                    arr.push({
                        "datetime" : t.toDate(),
                        "distance" : obj.distance,
                        "time" : obj.time
                    })
                }
            })
            return {
                "success": true,
                "mssg" : "Got Data",
                "data" : arr
            }
        }catch(e){
            return {
                "success": false,
                "mssg" : e.message
            }
        }
    },
    addData : async (coll, id, totalTime, totalDistance) => {
        try{
            let data = await firestore().collection(coll).add({
                user : id,
                time : totalTime,
                distance : totalDistance,
                createdAt : new Date()
            })
            return {
                "success": true,
                "mssg" : "Data added"
            }
        }catch(e){
            return {
                "success": false,
                "mssg" : e.message
            }
        }
    }
}