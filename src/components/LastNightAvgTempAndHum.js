import {useEffect, useState} from "react";
import firestoreDb from "../firebaseConfig";
import {collection, getDocs, getDoc, doc, listCollections, getFirestore} from 'firebase/firestore'
import { firestoreAppDb } from '../firebaseConfig';

const LastNightAvgTempAndHum = () => {

    const [allDates, setAllDates] = useState([])
    const [datesLength, setDatesLength] = useState(0)
    const [lastDay, setLastDay] = useState()

    useEffect(async () => {

       /* await firestoreAppDb.collection('data')
            .doc('1639515600')
            .collection('1639515600')
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    console.log(doc.data())
                })
            })*/

         /*firestoreAppDb.collection('data')
             .orderBy('date', 'asc')
             .limit(1)
             .onSnapshot(docs => {
                let dates = []
                docs.forEach(doc => {
                    dates.push(doc.id)
                })
                setDatesLength(dates.length)
                setAllDates(dates)
            });

         console.log(allDates)*/

         firestoreAppDb.collection('data')
             .orderBy('date', 'asc')
             .limit(1)
             .onSnapshot(docs => {
                docs.forEach(doc => {
                    setLastDay(doc.id)
                })
            });

         firestoreAppDb.collection('data')
             .doc(lastDay)
             .collection(lastDay)
             .onSnapshot(docs => {
                 
             })

         console.log('lastDay: ' + lastDay)

        /*firestoreAppDb
            .collection("data/1639515600/1639515600").get().then(subDocs => {
                subDocs.forEach(subDoc => {
                    console.log(subDoc.id)
                })
        })*/


    }, [datesLength])

    return(
        <div className="p-8 ">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-3 border-indigo-500">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Son Gece Ortalama Nem ve Sıcaklık</h2>
                <div className="flex flex-col text-gray-500">
                    <label>Nem: 30%</label>
                    <label>Sıcaklık: 22.2C</label>
                </div>
            </div>
        </div>
    )
}

export default LastNightAvgTempAndHum
