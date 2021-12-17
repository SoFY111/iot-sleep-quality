import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import firestoreDb from "../firebaseConfig";

const LastUpdatedCard = () => {

    const [lastAddedDate, setLastAddedDate] = useState()

    useEffect(async () => {

        const docRef = doc(firestoreDb, "lastAddedDate", "lastAddedDate");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const firestoreDate = docSnap.data()?.date.seconds * 1000;
            /*
            console.log((docSnap.data()?.date.seconds))
            console.log((firestoreDate))
            console.log(typeof(firestoreDate))
            console.log((docSnap.data()?.date).toDate().toLocaleDateString('en-US') + ' ' + (docSnap.data()?.date).toDate().toLocaleTimeString())
            */

            const utcDate = (new Date(firestoreDate)).toUTCString();
            console.log(firestoreDate)
            const lastDate = new Date(utcDate).getDate() + "/" + (new Date(utcDate).getMonth() + 1) + "/" + new Date(utcDate).getFullYear() + ' ' + new Date(utcDate).getUTCHours() + ':'+ new Date(utcDate).getUTCMinutes();
            setLastAddedDate(lastDate);


        } else {
            // doc.data() will be undefined in this case
            setLastAddedDate("Veri güncellenemedi.")
        }

        /*const datas = collection(firestoreDb, '1639515600');
        const citySnapshot = await getDocs(datas);
        citySnapshot.docs.map(doc => console.log(doc.data()));*/

    }, [])


    return(
        <div className="p-8">
            <div className="h-[135px] bg-white p-6 rounded-lg shadow-lg border-l-3 border-teal-500">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Son Veri Güncelleme Tarihi</h2>
                <p className="text-gray-500">{lastAddedDate}</p>
            </div>
        </div>
    )
}

export default LastUpdatedCard
