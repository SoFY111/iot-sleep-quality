import React from "react";
import {firestoreAppDb} from "../firebaseConfig";

class AvgTempAndHum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avgHeat: 0,
            avgHum: 0
        }
    }

    componentDidMount() {
        /*firestoreAppDb.collection('data')
            .onSnapshot(docs => {
                let allDays = []
                docs.forEach(doc => {
                    allDays.push(doc.id)
                    console.log(doc.id)
                })
                //this.calcAvgTempAndHum(allDays)
            })*/
    }

    calcAvgTempAndHum = (allDays) => {
        let counter = 0, totalHeat = 0, totalHum = 0;
        allDays.forEach(day => {
            firestoreAppDb.collection('data')
                .doc(day)
                .collection(day)
                .onSnapshot(dates => {
                    dates.forEach(date => {
                        counter++;
                        totalHeat += date.data()?.temp
                        totalHum += date.data()?.humadity
                    })
                    this.setState({
                        avgHeat: (totalHeat / counter).toFixed(2),
                        avgHum: (totalHum / counter).toFixed(2)
                    })
                })
        })
    }


    render() {
        return (
            <div className="p-8 ">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-3 border-red-500">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Ortalama Nem ve Sıcaklık</h2>
                    <div className="flex flex-col text-gray-500">
                        <label>Nem: 36{this.state.avgHum}%</label>
                        <label>Sıcaklık: 26.3{this.state.avgHeat}C</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default AvgTempAndHum
