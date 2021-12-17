import React from "react";
import {firestoreAppDb} from "../firebaseConfig";

import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

class MidContent extends React.Component {

    state = {
        sevenDaysAvg: []
    }

    componentDidMount() {
        firestoreAppDb.collection('data')
            .orderBy('date', "desc")
            .limit(7)
            .onSnapshot(days => {
                let lastSevenDays = []
                days.forEach(day => {
                    lastSevenDays.push(day.id)
                })
                this.calcLastSevenDaysAvg(lastSevenDays)
            })
    }

    calcLastSevenDaysAvg = (lastSevenDays) => {
        let counter = 0, totalHeat = 0, totalHum = 0, lastSevenDaysAvg = [];
        lastSevenDays.forEach(days => {
            firestoreAppDb.collection('data')
                .doc(days)
                .collection(days)
                .limit(57)
                .onSnapshot(dates => {
                    dates.forEach(date => {
                        counter++;
                        totalHeat += date.data()?.temp
                        totalHum += date.data()?.humadity
                    })
                    lastSevenDaysAvg.push({
                        date: days,
                        avgHeat: (totalHeat / counter).toFixed(2),
                        avgHum: (totalHum / counter).toFixed(2)
                    })
                })
            counter = 0
        })
        this.setState({
            sevenDaysAvg: lastSevenDaysAvg
        })
    }

    render(){
        return(
            <div className="flex flex-row align-center justify-center mt-6">
                <LeftContent sevenDaysAvg={this.state.sevenDaysAvg}/>
                <div className="rightContent w-[73%]">
                    <RightContent />
                </div>
            </div>
        )
    }
}

export default MidContent
