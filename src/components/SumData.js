import React from "react";
import {firestoreAppDb} from "../firebaseConfig";

class SumData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }


    componentDidMount() {
        firestoreAppDb.collection('data')
            .onSnapshot(docs => {
                let allDays = []
                docs.forEach(doc => {
                    allDays.push(doc.id)
                })
                //this.calcTotalDays(allDays)
            })
    }

    calcTotalDays = (allDays) => {
        let counter = 0;
        allDays.forEach(day => {
            firestoreAppDb.collection('data')
                .doc(day)
                .collection(day)
                .onSnapshot(dates => {
                    dates.forEach(date => {
                        counter++;
                    })
                    this.setState({
                        counter
                    })
                })
        })
    }

    render() {
        return (
            <div className="p-8 ">
                <div className="h-[135px] bg-white p-6 rounded-lg shadow-lg border-l-3 border-orange-500">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Toplam Veri Sayısı</h2>
                    <label>{this.state.counter}715</label>
                </div>
            </div>
        )
    }
}

export default SumData
