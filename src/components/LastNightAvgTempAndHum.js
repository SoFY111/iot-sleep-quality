import React from "react";
import {firestoreAppDb} from "../firebaseConfig";

class LastNightAvgTempAndHum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastDayAvgTemp: 0,
            lastDayAvgHum: 0
        }
    }

    componentDidMount() {
        firestoreAppDb.collection('data')
            .orderBy('date', 'desc')
            .limit(1)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.ccs(doc.id)
                })
            });
    }

    ccs = (lastDay) => {
        //console.log(lastDay)
        firestoreAppDb.collection('data')
            .doc(lastDay)
            .collection(lastDay)
            .limit(57)
            .onSnapshot(docs => {
                let counter = 0;
                let totalHeat = 0, totalHum = 0;
                docs.forEach((doc, index) => {
                    counter++;
                    totalHeat += doc.data()?.temp;
                    totalHum += doc.data()?.humadity;
                    // console.log(counter + ') docId: ' + doc.id + '\ntemp:' +doc.data()?.temp + '\nhum:' + doc.data()?.humadity)
                })
                // console.log('Ortalama Sıcaklık(Toplam): ' + (totalHeat/counter).toFixed(2) + '(' + totalHeat + ')\nOrtalama Nem(Toplam): ' + (totalHum/counter).toFixed(2) + '%(' + totalHeat + ')')
                this.setState({
                    lastDayAvgTemp: (totalHeat/counter).toFixed(2),
                    lastDayAvgHum: (totalHum/counter).toFixed(2)
                })
            })
    }
    render() {
        return <>
            <div className="p-8 ">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-3 border-indigo-500">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Son Gece Ortalama Nem ve Sıcaklık</h2>
                    <div className="flex flex-col text-gray-500">
                        <label>Nem: {this.state.lastDayAvgHum}%</label>
                        <label>Sıcaklık: {this.state.lastDayAvgTemp}C</label>
                    </div>
                </div>
            </div>
        </>
    }
}

export default LastNightAvgTempAndHum
